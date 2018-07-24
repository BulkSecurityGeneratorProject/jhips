import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    IncomeComponent,
    IncomeDetailComponent,
    IncomeUpdateComponent,
    IncomeDeletePopupComponent,
    IncomeDeleteDialogComponent,
    incomeRoute,
    incomePopupRoute
} from './';

const ENTITY_STATES = [...incomeRoute, ...incomePopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [IncomeComponent, IncomeDetailComponent, IncomeUpdateComponent, IncomeDeleteDialogComponent, IncomeDeletePopupComponent],
    entryComponents: [IncomeComponent, IncomeUpdateComponent, IncomeDeleteDialogComponent, IncomeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomeIncomeModule {}
