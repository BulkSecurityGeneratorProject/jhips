package hu.sweethome.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PurchaseItemType.
 */
@Entity
@Table(name = "purchase_item_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseItemType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PurchaseItemType parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PurchaseItemType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PurchaseItemType getParent() {
        return parent;
    }

    public PurchaseItemType parent(PurchaseItemType purchaseItemType) {
        this.parent = purchaseItemType;
        return this;
    }

    public void setParent(PurchaseItemType purchaseItemType) {
        this.parent = purchaseItemType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PurchaseItemType purchaseItemType = (PurchaseItemType) o;
        if (purchaseItemType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseItemType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseItemType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
