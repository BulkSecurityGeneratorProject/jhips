import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    PurchaseItemComponent,
    PurchaseItemDetailComponent,
    PurchaseItemUpdateComponent,
    PurchaseItemDeletePopupComponent,
    PurchaseItemDeleteDialogComponent,
    purchaseItemRoute,
    purchaseItemPopupRoute
} from './';

const ENTITY_STATES = [...purchaseItemRoute, ...purchaseItemPopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseItemComponent,
        PurchaseItemDetailComponent,
        PurchaseItemUpdateComponent,
        PurchaseItemDeleteDialogComponent,
        PurchaseItemDeletePopupComponent
    ],
    entryComponents: [
        PurchaseItemComponent,
        PurchaseItemUpdateComponent,
        PurchaseItemDeleteDialogComponent,
        PurchaseItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomePurchaseItemModule {}
