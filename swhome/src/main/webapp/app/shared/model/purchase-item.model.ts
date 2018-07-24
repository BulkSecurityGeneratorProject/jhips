import { IPurchase } from 'app/shared/model//purchase.model';
import { IUnit } from 'app/shared/model//unit.model';
import { IPurchaseItemType } from 'app/shared/model//purchase-item-type.model';

export interface IPurchaseItem {
    id?: number;
    amount?: number;
    totalPrice?: number;
    purchase?: IPurchase;
    unit?: IUnit;
    type?: IPurchaseItemType;
}

export class PurchaseItem implements IPurchaseItem {
    constructor(
        public id?: number,
        public amount?: number,
        public totalPrice?: number,
        public purchase?: IPurchase,
        public unit?: IUnit,
        public type?: IPurchaseItemType
    ) {}
}
