package hu.sweethome.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PurchaseItem.
 */
@Entity
@Table(name = "purchase_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "total_price")
    private Long totalPrice;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Purchase purchase;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Unit unit;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PurchaseItemType type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public PurchaseItem amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public PurchaseItem totalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public PurchaseItem purchase(Purchase purchase) {
        this.purchase = purchase;
        return this;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Unit getUnit() {
        return unit;
    }

    public PurchaseItem unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public PurchaseItemType getType() {
        return type;
    }

    public PurchaseItem type(PurchaseItemType purchaseItemType) {
        this.type = purchaseItemType;
        return this;
    }

    public void setType(PurchaseItemType purchaseItemType) {
        this.type = purchaseItemType;
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
        PurchaseItem purchaseItem = (PurchaseItem) o;
        if (purchaseItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseItem{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
