package hu.sweethome.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.sweethome.domain.PurchaseItem;
import hu.sweethome.repository.PurchaseItemRepository;
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
 * REST controller for managing PurchaseItem.
 */
@RestController
@RequestMapping("/api")
public class PurchaseItemResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseItemResource.class);

    private static final String ENTITY_NAME = "purchaseItem";

    private final PurchaseItemRepository purchaseItemRepository;

    public PurchaseItemResource(PurchaseItemRepository purchaseItemRepository) {
        this.purchaseItemRepository = purchaseItemRepository;
    }

    /**
     * POST  /purchase-items : Create a new purchaseItem.
     *
     * @param purchaseItem the purchaseItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchaseItem, or with status 400 (Bad Request) if the purchaseItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchase-items")
    @Timed
    public ResponseEntity<PurchaseItem> createPurchaseItem(@RequestBody PurchaseItem purchaseItem) throws URISyntaxException {
        log.debug("REST request to save PurchaseItem : {}", purchaseItem);
        if (purchaseItem.getId() != null) {
            throw new BadRequestAlertException("A new purchaseItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseItem result = purchaseItemRepository.save(purchaseItem);
        return ResponseEntity.created(new URI("/api/purchase-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchase-items : Updates an existing purchaseItem.
     *
     * @param purchaseItem the purchaseItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchaseItem,
     * or with status 400 (Bad Request) if the purchaseItem is not valid,
     * or with status 500 (Internal Server Error) if the purchaseItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchase-items")
    @Timed
    public ResponseEntity<PurchaseItem> updatePurchaseItem(@RequestBody PurchaseItem purchaseItem) throws URISyntaxException {
        log.debug("REST request to update PurchaseItem : {}", purchaseItem);
        if (purchaseItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseItem result = purchaseItemRepository.save(purchaseItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, purchaseItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchase-items : get all the purchaseItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of purchaseItems in body
     */
    @GetMapping("/purchase-items")
    @Timed
    public List<PurchaseItem> getAllPurchaseItems() {
        log.debug("REST request to get all PurchaseItems");
        return purchaseItemRepository.findAll();
    }

    /**
     * GET  /purchase-items/:id : get the "id" purchaseItem.
     *
     * @param id the id of the purchaseItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchaseItem, or with status 404 (Not Found)
     */
    @GetMapping("/purchase-items/{id}")
    @Timed
    public ResponseEntity<PurchaseItem> getPurchaseItem(@PathVariable Long id) {
        log.debug("REST request to get PurchaseItem : {}", id);
        Optional<PurchaseItem> purchaseItem = purchaseItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchaseItem);
    }

    /**
     * DELETE  /purchase-items/:id : delete the "id" purchaseItem.
     *
     * @param id the id of the purchaseItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchase-items/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchaseItem(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseItem : {}", id);

        purchaseItemRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
