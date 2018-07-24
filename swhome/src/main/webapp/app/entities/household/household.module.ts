import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    HouseholdComponent,
    HouseholdDetailComponent,
    HouseholdUpdateComponent,
    HouseholdDeletePopupComponent,
    HouseholdDeleteDialogComponent,
    householdRoute,
    householdPopupRoute
} from './';

const ENTITY_STATES = [...householdRoute, ...householdPopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HouseholdComponent,
        HouseholdDetailComponent,
        HouseholdUpdateComponent,
        HouseholdDeleteDialogComponent,
        HouseholdDeletePopupComponent
    ],
    entryComponents: [HouseholdComponent, HouseholdUpdateComponent, HouseholdDeleteDialogComponent, HouseholdDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomeHouseholdModule {}
