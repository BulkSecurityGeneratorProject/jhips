package hu.sweethome.repository;

import hu.sweethome.domain.PurchaseItemType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PurchaseItemType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseItemTypeRepository extends JpaRepository<PurchaseItemType, Long> {

}
