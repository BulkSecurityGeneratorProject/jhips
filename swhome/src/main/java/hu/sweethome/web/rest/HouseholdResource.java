package hu.sweethome.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.sweethome.domain.Household;
import hu.sweethome.repository.HouseholdRepository;
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
 * REST controller for managing Household.
 */
@RestController
@RequestMapping("/api")
public class HouseholdResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdResource.class);

    private static final String ENTITY_NAME = "household";

    private final HouseholdRepository householdRepository;

    public HouseholdResource(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }

    /**
     * POST  /households : Create a new household.
     *
     * @param household the household to create
     * @return the ResponseEntity with status 201 (Created) and with body the new household, or with status 400 (Bad Request) if the household has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/households")
    @Timed
    public ResponseEntity<Household> createHousehold(@RequestBody Household household) throws URISyntaxException {
        log.debug("REST request to save Household : {}", household);
        if (household.getId() != null) {
            throw new BadRequestAlertException("A new household cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Household result = householdRepository.save(household);
        return ResponseEntity.created(new URI("/api/households/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /households : Updates an existing household.
     *
     * @param household the household to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated household,
     * or with status 400 (Bad Request) if the household is not valid,
     * or with status 500 (Internal Server Error) if the household couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/households")
    @Timed
    public ResponseEntity<Household> updateHousehold(@RequestBody Household household) throws URISyntaxException {
        log.debug("REST request to update Household : {}", household);
        if (household.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Household result = householdRepository.save(household);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, household.getId().toString()))
            .body(result);
    }

    /**
     * GET  /households : get all the households.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of households in body
     */
    @GetMapping("/households")
    @Timed
    public List<Household> getAllHouseholds() {
        log.debug("REST request to get all Households");
        return householdRepository.findAll();
    }

    /**
     * GET  /households/:id : get the "id" household.
     *
     * @param id the id of the household to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the household, or with status 404 (Not Found)
     */
    @GetMapping("/households/{id}")
    @Timed
    public ResponseEntity<Household> getHousehold(@PathVariable Long id) {
        log.debug("REST request to get Household : {}", id);
        Optional<Household> household = householdRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(household);
    }

    /**
     * DELETE  /households/:id : delete the "id" household.
     *
     * @param id the id of the household to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/households/{id}")
    @Timed
    public ResponseEntity<Void> deleteHousehold(@PathVariable Long id) {
        log.debug("REST request to delete Household : {}", id);

        householdRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
