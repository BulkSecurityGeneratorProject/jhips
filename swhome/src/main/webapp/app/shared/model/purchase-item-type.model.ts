import { IPurchaseItemType } from 'app/shared/model//purchase-item-type.model';

export interface IPurchaseItemType {
    id?: number;
    name?: string;
    parent?: IPurchaseItemType;
}

export class PurchaseItemType implements IPurchaseItemType {
    constructor(public id?: number, public name?: string, public parent?: IPurchaseItemType) {}
}
