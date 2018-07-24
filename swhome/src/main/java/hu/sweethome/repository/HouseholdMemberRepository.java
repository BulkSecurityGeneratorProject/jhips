package hu.sweethome.repository;

import hu.sweethome.domain.HouseholdMember;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HouseholdMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseholdMemberRepository extends JpaRepository<HouseholdMember, Long> {

}
