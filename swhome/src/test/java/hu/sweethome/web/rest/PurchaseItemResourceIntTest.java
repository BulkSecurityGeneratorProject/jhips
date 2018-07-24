package hu.sweethome.web.rest;

import hu.sweethome.SwhomeApp;

import hu.sweethome.domain.PurchaseItem;
import hu.sweethome.repository.PurchaseItemRepository;
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
 * Test class for the PurchaseItemResource REST controller.
 *
 * @see PurchaseItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SwhomeApp.class)
public class PurchaseItemResourceIntTest {

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final Long DEFAULT_TOTAL_PRICE = 1L;
    private static final Long UPDATED_TOTAL_PRICE = 2L;

    @Autowired
    private PurchaseItemRepository purchaseItemRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPurchaseItemMockMvc;

    private PurchaseItem purchaseItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseItemResource purchaseItemResource = new PurchaseItemResource(purchaseItemRepository);
        this.restPurchaseItemMockMvc = MockMvcBuilders.standaloneSetup(purchaseItemResource)
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
    public static PurchaseItem createEntity(EntityManager em) {
        PurchaseItem purchaseItem = new PurchaseItem()
            .amount(DEFAULT_AMOUNT)
            .totalPrice(DEFAULT_TOTAL_PRICE);
        return purchaseItem;
    }

    @Before
    public void initTest() {
        purchaseItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseItem() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem
        restPurchaseItemMockMvc.perform(post("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItem)))
            .andExpect(status().isCreated());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseItem testPurchaseItem = purchaseItemList.get(purchaseItemList.size() - 1);
        assertThat(testPurchaseItem.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPurchaseItem.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void createPurchaseItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem with an existing ID
        purchaseItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseItemMockMvc.perform(post("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItem)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        // Get all the purchaseItemList
        restPurchaseItemMockMvc.perform(get("/api/purchase-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.intValue())));
    }
    

    @Test
    @Transactional
    public void getPurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(get("/api/purchase-items/{id}", purchaseItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseItem.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseItem() throws Exception {
        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(get("/api/purchase-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        int databaseSizeBeforeUpdate = purchaseItemRepository.findAll().size();

        // Update the purchaseItem
        PurchaseItem updatedPurchaseItem = purchaseItemRepository.findById(purchaseItem.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseItem are not directly saved in db
        em.detach(updatedPurchaseItem);
        updatedPurchaseItem
            .amount(UPDATED_AMOUNT)
            .totalPrice(UPDATED_TOTAL_PRICE);

        restPurchaseItemMockMvc.perform(put("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseItem)))
            .andExpect(status().isOk());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeUpdate);
        PurchaseItem testPurchaseItem = purchaseItemList.get(purchaseItemList.size() - 1);
        assertThat(testPurchaseItem.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPurchaseItem.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseItem() throws Exception {
        int databaseSizeBeforeUpdate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPurchaseItemMockMvc.perform(put("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItem)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        int databaseSizeBeforeDelete = purchaseItemRepository.findAll().size();

        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(delete("/api/purchase-items/{id}", purchaseItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseItem.class);
        PurchaseItem purchaseItem1 = new PurchaseItem();
        purchaseItem1.setId(1L);
        PurchaseItem purchaseItem2 = new PurchaseItem();
        purchaseItem2.setId(purchaseItem1.getId());
        assertThat(purchaseItem1).isEqualTo(purchaseItem2);
        purchaseItem2.setId(2L);
        assertThat(purchaseItem1).isNotEqualTo(purchaseItem2);
        purchaseItem1.setId(null);
        assertThat(purchaseItem1).isNotEqualTo(purchaseItem2);
    }
}
