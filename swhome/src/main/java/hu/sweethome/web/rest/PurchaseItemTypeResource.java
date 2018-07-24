package hu.sweethome.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.sweethome.domain.PurchaseItemType;
import hu.sweethome.repository.PurchaseItemTypeRepository;
import hu.sweethome.web.rest.errors.BadRequestAlertException;
import hu.sweethome.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PurchaseItemType.
 */
@RestController
@RequestMapping("/api")
public class PurchaseItemTypeResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseItemTypeResource.class);

    private static final String ENTITY_NAME = "purchaseItemType";

    private final PurchaseItemTypeRepository purchaseItemTypeRepository;

    public PurchaseItemTypeResource(PurchaseItemTypeRepository purchaseItemTypeRepository) {
        this.purchaseItemTypeRepository = purchaseItemTypeRepository;
    }

    /**
     * POST  /purchase-item-types : Create a new purchaseItemType.
     *
     * @param purchaseItemType the purchaseItemType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchaseItemType, or with status 400 (Bad Request) if the purchaseItemType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchase-item-types")
    @Timed
    public ResponseEntity<PurchaseItemType> createPurchaseItemType(@RequestBody PurchaseItemType purchaseItemType) throws URISyntaxException {
        log.debug("REST request to save PurchaseItemType : {}", purchaseItemType);
        if (purchaseItemType.getId() != null) {
            throw new BadRequestAlertException("A new purchaseItemType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseItemType result = purchaseItemTypeRepository.save(purchaseItemType);
        return ResponseEntity.created(new URI("/api/purchase-item-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchase-item-types : Updates an existing purchaseItemType.
     *
     * @param purchaseItemType the purchaseItemType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchaseItemType,
     * or with status 400 (Bad Request) if the purchaseItemType is not valid,
     * or with status 500 (Internal Server Error) if the purchaseItemType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchase-item-types")
    @Timed
    public ResponseEntity<PurchaseItemType> updatePurchaseItemType(@RequestBody PurchaseItemType purchaseItemType) throws URISyntaxException {
        log.debug("REST request to update PurchaseItemType : {}", purchaseItemType);
        if (purchaseItemType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseItemType result = purchaseItemTypeRepository.save(purchaseItemType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, purchaseItemType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchase-item-types : get all the purchaseItemTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of purchaseItemTypes in body
     */
    @GetMapping("/purchase-item-types")
    @Timed
    public List<PurchaseItemType> getAllPurchaseItemTypes() {
        log.debug("REST request to get all PurchaseItemTypes");
        return purchaseItemTypeRepository.findAll();
    }

    /**
     * GET  /purchase-item-types/:id : get the "id" purchaseItemType.
     *
     * @param id the id of the purchaseItemType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchaseItemType, or with status 404 (Not Found)
     */
    @GetMapping("/purchase-item-types/{id}")
    @Timed
    public ResponseEntity<PurchaseItemType> getPurchaseItemType(@PathVariable Long id) {
        log.debug("REST request to get PurchaseItemType : {}", id);
        Optional<PurchaseItemType> purchaseItemType = purchaseItemTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchaseItemType);
    }

    /**
     * DELETE  /purchase-item-types/:id : delete the "id" purchaseItemType.
     *
     * @param id the id of the purchaseItemType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchase-item-types/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchaseItemType(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseItemType : {}", id);

        purchaseItemTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
