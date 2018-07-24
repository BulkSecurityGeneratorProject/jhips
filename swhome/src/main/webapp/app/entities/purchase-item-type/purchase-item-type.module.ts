import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    PurchaseItemTypeComponent,
    PurchaseItemTypeDetailComponent,
    PurchaseItemTypeUpdateComponent,
    PurchaseItemTypeDeletePopupComponent,
    PurchaseItemTypeDeleteDialogComponent,
    purchaseItemTypeRoute,
    purchaseItemTypePopupRoute
} from './';

const ENTITY_STATES = [...purchaseItemTypeRoute, ...purchaseItemTypePopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseItemTypeComponent,
        PurchaseItemTypeDetailComponent,
        PurchaseItemTypeUpdateComponent,
        PurchaseItemTypeDeleteDialogComponent,
        PurchaseItemTypeDeletePopupComponent
    ],
    entryComponents: [
        PurchaseItemTypeComponent,
        PurchaseItemTypeUpdateComponent,
        PurchaseItemTypeDeleteDialogComponent,
        PurchaseItemTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomePurchaseItemTypeModule {}
