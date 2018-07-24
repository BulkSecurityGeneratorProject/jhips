package hu.sweethome.web.rest;

import com.codahale.metrics.annotation.Timed;
import hu.sweethome.domain.HouseholdMember;
import hu.sweethome.repository.HouseholdMemberRepository;
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
 * REST controller for managing HouseholdMember.
 */
@RestController
@RequestMapping("/api")
public class HouseholdMemberResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdMemberResource.class);

    private static final String ENTITY_NAME = "householdMember";

    private final HouseholdMemberRepository householdMemberRepository;

    public HouseholdMemberResource(HouseholdMemberRepository householdMemberRepository) {
        this.householdMemberRepository = householdMemberRepository;
    }

    /**
     * POST  /household-members : Create a new householdMember.
     *
     * @param householdMember the householdMember to create
     * @return the ResponseEntity with status 201 (Created) and with body the new householdMember, or with status 400 (Bad Request) if the householdMember has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/household-members")
    @Timed
    public ResponseEntity<HouseholdMember> createHouseholdMember(@RequestBody HouseholdMember householdMember) throws URISyntaxException {
        log.debug("REST request to save HouseholdMember : {}", householdMember);
        if (householdMember.getId() != null) {
            throw new BadRequestAlertException("A new householdMember cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseholdMember result = householdMemberRepository.save(householdMember);
        return ResponseEntity.created(new URI("/api/household-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /household-members : Updates an existing householdMember.
     *
     * @param householdMember the householdMember to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated householdMember,
     * or with status 400 (Bad Request) if the householdMember is not valid,
     * or with status 500 (Internal Server Error) if the householdMember couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/household-members")
    @Timed
    public ResponseEntity<HouseholdMember> updateHouseholdMember(@RequestBody HouseholdMember householdMember) throws URISyntaxException {
        log.debug("REST request to update HouseholdMember : {}", householdMember);
        if (householdMember.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseholdMember result = householdMemberRepository.save(householdMember);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, householdMember.getId().toString()))
            .body(result);
    }

    /**
     * GET  /household-members : get all the householdMembers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of householdMembers in body
     */
    @GetMapping("/household-members")
    @Timed
    public List<HouseholdMember> getAllHouseholdMembers() {
        log.debug("REST request to get all HouseholdMembers");
        return householdMemberRepository.findAll();
    }

    /**
     * GET  /household-members/:id : get the "id" householdMember.
     *
     * @param id the id of the householdMember to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the householdMember, or with status 404 (Not Found)
     */
    @GetMapping("/household-members/{id}")
    @Timed
    public ResponseEntity<HouseholdMember> getHouseholdMember(@PathVariable Long id) {
        log.debug("REST request to get HouseholdMember : {}", id);
        Optional<HouseholdMember> householdMember = householdMemberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(householdMember);
    }

    /**
     * DELETE  /household-members/:id : delete the "id" householdMember.
     *
     * @param id the id of the householdMember to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/household-members/{id}")
    @Timed
    public ResponseEntity<Void> deleteHouseholdMember(@PathVariable Long id) {
        log.debug("REST request to delete HouseholdMember : {}", id);

        householdMemberRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
