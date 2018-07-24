package hu.sweethome.web.rest;

import hu.sweethome.SwhomeApp;

import hu.sweethome.domain.PurchaseItemType;
import hu.sweethome.repository.PurchaseItemTypeRepository;
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
 * Test class for the PurchaseItemTypeResource REST controller.
 *
 * @see PurchaseItemTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SwhomeApp.class)
public class PurchaseItemTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PurchaseItemTypeRepository purchaseItemTypeRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPurchaseItemTypeMockMvc;

    private PurchaseItemType purchaseItemType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseItemTypeResource purchaseItemTypeResource = new PurchaseItemTypeResource(purchaseItemTypeRepository);
        this.restPurchaseItemTypeMockMvc = MockMvcBuilders.standaloneSetup(purchaseItemTypeResource)
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
    public static PurchaseItemType createEntity(EntityManager em) {
        PurchaseItemType purchaseItemType = new PurchaseItemType()
            .name(DEFAULT_NAME);
        return purchaseItemType;
    }

    @Before
    public void initTest() {
        purchaseItemType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseItemType() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemTypeRepository.findAll().size();

        // Create the PurchaseItemType
        restPurchaseItemTypeMockMvc.perform(post("/api/purchase-item-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemType)))
            .andExpect(status().isCreated());

        // Validate the PurchaseItemType in the database
        List<PurchaseItemType> purchaseItemTypeList = purchaseItemTypeRepository.findAll();
        assertThat(purchaseItemTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseItemType testPurchaseItemType = purchaseItemTypeList.get(purchaseItemTypeList.size() - 1);
        assertThat(testPurchaseItemType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPurchaseItemTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemTypeRepository.findAll().size();

        // Create the PurchaseItemType with an existing ID
        purchaseItemType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseItemTypeMockMvc.perform(post("/api/purchase-item-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemType)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItemType in the database
        List<PurchaseItemType> purchaseItemTypeList = purchaseItemTypeRepository.findAll();
        assertThat(purchaseItemTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPurchaseItemTypes() throws Exception {
        // Initialize the database
        purchaseItemTypeRepository.saveAndFlush(purchaseItemType);

        // Get all the purchaseItemTypeList
        restPurchaseItemTypeMockMvc.perform(get("/api/purchase-item-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseItemType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getPurchaseItemType() throws Exception {
        // Initialize the database
        purchaseItemTypeRepository.saveAndFlush(purchaseItemType);

        // Get the purchaseItemType
        restPurchaseItemTypeMockMvc.perform(get("/api/purchase-item-types/{id}", purchaseItemType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseItemType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseItemType() throws Exception {
        // Get the purchaseItemType
        restPurchaseItemTypeMockMvc.perform(get("/api/purchase-item-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseItemType() throws Exception {
        // Initialize the database
        purchaseItemTypeRepository.saveAndFlush(purchaseItemType);

        int databaseSizeBeforeUpdate = purchaseItemTypeRepository.findAll().size();

        // Update the purchaseItemType
        PurchaseItemType updatedPurchaseItemType = purchaseItemTypeRepository.findById(purchaseItemType.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseItemType are not directly saved in db
        em.detach(updatedPurchaseItemType);
        updatedPurchaseItemType
            .name(UPDATED_NAME);

        restPurchaseItemTypeMockMvc.perform(put("/api/purchase-item-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseItemType)))
            .andExpect(status().isOk());

        // Validate the PurchaseItemType in the database
        List<PurchaseItemType> purchaseItemTypeList = purchaseItemTypeRepository.findAll();
        assertThat(purchaseItemTypeList).hasSize(databaseSizeBeforeUpdate);
        PurchaseItemType testPurchaseItemType = purchaseItemTypeList.get(purchaseItemTypeList.size() - 1);
        assertThat(testPurchaseItemType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseItemType() throws Exception {
        int databaseSizeBeforeUpdate = purchaseItemTypeRepository.findAll().size();

        // Create the PurchaseItemType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPurchaseItemTypeMockMvc.perform(put("/api/purchase-item-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemType)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItemType in the database
        List<PurchaseItemType> purchaseItemTypeList = purchaseItemTypeRepository.findAll();
        assertThat(purchaseItemTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseItemType() throws Exception {
        // Initialize the database
        purchaseItemTypeRepository.saveAndFlush(purchaseItemType);

        int databaseSizeBeforeDelete = purchaseItemTypeRepository.findAll().size();

        // Get the purchaseItemType
        restPurchaseItemTypeMockMvc.perform(delete("/api/purchase-item-types/{id}", purchaseItemType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PurchaseItemType> purchaseItemTypeList = purchaseItemTypeRepository.findAll();
        assertThat(purchaseItemTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseItemType.class);
        PurchaseItemType purchaseItemType1 = new PurchaseItemType();
        purchaseItemType1.setId(1L);
        PurchaseItemType purchaseItemType2 = new PurchaseItemType();
        purchaseItemType2.setId(purchaseItemType1.getId());
        assertThat(purchaseItemType1).isEqualTo(purchaseItemType2);
        purchaseItemType2.setId(2L);
        assertThat(purchaseItemType1).isNotEqualTo(purchaseItemType2);
        purchaseItemType1.setId(null);
        assertThat(purchaseItemType1).isNotEqualTo(purchaseItemType2);
    }
}
