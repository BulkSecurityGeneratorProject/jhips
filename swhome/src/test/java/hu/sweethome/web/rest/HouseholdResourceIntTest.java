package hu.sweethome.web.rest;

import hu.sweethome.SwhomeApp;

import hu.sweethome.domain.Household;
import hu.sweethome.repository.HouseholdRepository;
import hu.sweethome.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static hu.sweethome.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HouseholdResource REST controller.
 *
 * @see HouseholdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SwhomeApp.class)
public class HouseholdResourceIntTest {

    @Autowired
    private HouseholdRepository householdRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHouseholdMockMvc;

    private Household household;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseholdResource householdResource = new HouseholdResource(householdRepository);
        this.restHouseholdMockMvc = MockMvcBuilders.standaloneSetup(householdResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Household createEntity(EntityManager em) {
        Household household = new Household();
        return household;
    }

    @Before
    public void initTest() {
        household = createEntity(em);
    }

    @Test
    @Transactional
    public void createHousehold() throws Exception {
        int databaseSizeBeforeCreate = householdRepository.findAll().size();

        // Create the Household
        restHouseholdMockMvc.perform(post("/api/households")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(household)))
            .andExpect(status().isCreated());

        // Validate the Household in the database
        List<Household> householdList = householdRepository.findAll();
        assertThat(householdList).hasSize(databaseSizeBeforeCreate + 1);
        Household testHousehold = householdList.get(householdList.size() - 1);
    }

    @Test
    @Transactional
    public void createHouseholdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = householdRepository.findAll().size();

        // Create the Household with an existing ID
        household.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseholdMockMvc.perform(post("/api/households")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(household)))
            .andExpect(status().isBadRequest());

        // Validate the Household in the database
        List<Household> householdList = householdRepository.findAll();
        assertThat(householdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHouseholds() throws Exception {
        // Initialize the database
        householdRepository.saveAndFlush(household);

        // Get all the householdList
        restHouseholdMockMvc.perform(get("/api/households?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(household.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getHousehold() throws Exception {
        // Initialize the database
        householdRepository.saveAndFlush(household);

        // Get the household
        restHouseholdMockMvc.perform(get("/api/households/{id}", household.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(household.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingHousehold() throws Exception {
        // Get the household
        restHouseholdMockMvc.perform(get("/api/households/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHousehold() throws Exception {
        // Initialize the database
        householdRepository.saveAndFlush(household);

        int databaseSizeBeforeUpdate = householdRepository.findAll().size();

        // Update the household
        Household updatedHousehold = householdRepository.findById(household.getId()).get();
        // Disconnect from session so that the updates on updatedHousehold are not directly saved in db
        em.detach(updatedHousehold);

        restHouseholdMockMvc.perform(put("/api/households")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHousehold)))
            .andExpect(status().isOk());

        // Validate the Household in the database
        List<Household> householdList = householdRepository.findAll();
        assertThat(householdList).hasSize(databaseSizeBeforeUpdate);
        Household testHousehold = householdList.get(householdList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingHousehold() throws Exception {
        int databaseSizeBeforeUpdate = householdRepository.findAll().size();

        // Create the Household

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHouseholdMockMvc.perform(put("/api/households")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(household)))
            .andExpect(status().isBadRequest());

        // Validate the Household in the database
        List<Household> householdList = householdRepository.findAll();
        assertThat(householdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHousehold() throws Exception {
        // Initialize the database
        householdRepository.saveAndFlush(household);

        int databaseSizeBeforeDelete = householdRepository.findAll().size();

        // Get the household
        restHouseholdMockMvc.perform(delete("/api/households/{id}", household.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Household> householdList = householdRepository.findAll();
        assertThat(householdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Household.class);
        Household household1 = new Household();
        household1.setId(1L);
        Household household2 = new Household();
        household2.setId(household1.getId());
        assertThat(household1).isEqualTo(household2);
        household2.setId(2L);
        assertThat(household1).isNotEqualTo(household2);
        household1.setId(null);
        assertThat(household1).isNotEqualTo(household2);
    }
}
