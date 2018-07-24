import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    HouseholdMemberComponent,
    HouseholdMemberDetailComponent,
    HouseholdMemberUpdateComponent,
    HouseholdMemberDeletePopupComponent,
    HouseholdMemberDeleteDialogComponent,
    householdMemberRoute,
    householdMemberPopupRoute
} from './';

const ENTITY_STATES = [...householdMemberRoute, ...householdMemberPopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HouseholdMemberComponent,
        HouseholdMemberDetailComponent,
        HouseholdMemberUpdateComponent,
        HouseholdMemberDeleteDialogComponent,
        HouseholdMemberDeletePopupComponent
    ],
    entryComponents: [
        HouseholdMemberComponent,
        HouseholdMemberUpdateComponent,
        HouseholdMemberDeleteDialogComponent,
        HouseholdMemberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomeHouseholdMemberModule {}
