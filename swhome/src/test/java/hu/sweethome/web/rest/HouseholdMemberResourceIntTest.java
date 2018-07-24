package hu.sweethome.web.rest;

import hu.sweethome.SwhomeApp;

import hu.sweethome.domain.HouseholdMember;
import hu.sweethome.repository.HouseholdMemberRepository;
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
 * Test class for the HouseholdMemberResource REST controller.
 *
 * @see HouseholdMemberResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SwhomeApp.class)
public class HouseholdMemberResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private HouseholdMemberRepository householdMemberRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHouseholdMemberMockMvc;

    private HouseholdMember householdMember;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseholdMemberResource householdMemberResource = new HouseholdMemberResource(householdMemberRepository);
        this.restHouseholdMemberMockMvc = MockMvcBuilders.standaloneSetup(householdMemberResource)
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
    public static HouseholdMember createEntity(EntityManager em) {
        HouseholdMember householdMember = new HouseholdMember()
            .name(DEFAULT_NAME);
        return householdMember;
    }

    @Before
    public void initTest() {
        householdMember = createEntity(em);
    }

    @Test
    @Transactional
    public void createHouseholdMember() throws Exception {
        int databaseSizeBeforeCreate = householdMemberRepository.findAll().size();

        // Create the HouseholdMember
        restHouseholdMemberMockMvc.perform(post("/api/household-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMember)))
            .andExpect(status().isCreated());

        // Validate the HouseholdMember in the database
        List<HouseholdMember> householdMemberList = householdMemberRepository.findAll();
        assertThat(householdMemberList).hasSize(databaseSizeBeforeCreate + 1);
        HouseholdMember testHouseholdMember = householdMemberList.get(householdMemberList.size() - 1);
        assertThat(testHouseholdMember.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createHouseholdMemberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = householdMemberRepository.findAll().size();

        // Create the HouseholdMember with an existing ID
        householdMember.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseholdMemberMockMvc.perform(post("/api/household-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMember)))
            .andExpect(status().isBadRequest());

        // Validate the HouseholdMember in the database
        List<HouseholdMember> householdMemberList = householdMemberRepository.findAll();
        assertThat(householdMemberList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHouseholdMembers() throws Exception {
        // Initialize the database
        householdMemberRepository.saveAndFlush(householdMember);

        // Get all the householdMemberList
        restHouseholdMemberMockMvc.perform(get("/api/household-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(householdMember.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getHouseholdMember() throws Exception {
        // Initialize the database
        householdMemberRepository.saveAndFlush(householdMember);

        // Get the householdMember
        restHouseholdMemberMockMvc.perform(get("/api/household-members/{id}", householdMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(householdMember.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHouseholdMember() throws Exception {
        // Get the householdMember
        restHouseholdMemberMockMvc.perform(get("/api/household-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHouseholdMember() throws Exception {
        // Initialize the database
        householdMemberRepository.saveAndFlush(householdMember);

        int databaseSizeBeforeUpdate = householdMemberRepository.findAll().size();

        // Update the householdMember
        HouseholdMember updatedHouseholdMember = householdMemberRepository.findById(householdMember.getId()).get();
        // Disconnect from session so that the updates on updatedHouseholdMember are not directly saved in db
        em.detach(updatedHouseholdMember);
        updatedHouseholdMember
            .name(UPDATED_NAME);

        restHouseholdMemberMockMvc.perform(put("/api/household-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHouseholdMember)))
            .andExpect(status().isOk());

        // Validate the HouseholdMember in the database
        List<HouseholdMember> householdMemberList = householdMemberRepository.findAll();
        assertThat(householdMemberList).hasSize(databaseSizeBeforeUpdate);
        HouseholdMember testHouseholdMember = householdMemberList.get(householdMemberList.size() - 1);
        assertThat(testHouseholdMember.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingHouseholdMember() throws Exception {
        int databaseSizeBeforeUpdate = householdMemberRepository.findAll().size();

        // Create the HouseholdMember

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHouseholdMemberMockMvc.perform(put("/api/household-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(householdMember)))
            .andExpect(status().isBadRequest());

        // Validate the HouseholdMember in the database
        List<HouseholdMember> householdMemberList = householdMemberRepository.findAll();
        assertThat(householdMemberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHouseholdMember() throws Exception {
        // Initialize the database
        householdMemberRepository.saveAndFlush(householdMember);

        int databaseSizeBeforeDelete = householdMemberRepository.findAll().size();

        // Get the householdMember
        restHouseholdMemberMockMvc.perform(delete("/api/household-members/{id}", householdMember.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HouseholdMember> householdMemberList = householdMemberRepository.findAll();
        assertThat(householdMemberList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HouseholdMember.class);
        HouseholdMember householdMember1 = new HouseholdMember();
        householdMember1.setId(1L);
        HouseholdMember householdMember2 = new HouseholdMember();
        householdMember2.setId(householdMember1.getId());
        assertThat(householdMember1).isEqualTo(householdMember2);
        householdMember2.setId(2L);
        assertThat(householdMember1).isNotEqualTo(householdMember2);
        householdMember1.setId(null);
        assertThat(householdMember1).isNotEqualTo(householdMember2);
    }
}
