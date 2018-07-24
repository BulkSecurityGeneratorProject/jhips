import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwhomeSharedModule } from 'app/shared';
import {
    MarketComponent,
    MarketDetailComponent,
    MarketUpdateComponent,
    MarketDeletePopupComponent,
    MarketDeleteDialogComponent,
    marketRoute,
    marketPopupRoute
} from './';

const ENTITY_STATES = [...marketRoute, ...marketPopupRoute];

@NgModule({
    imports: [SwhomeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MarketComponent, MarketDetailComponent, MarketUpdateComponent, MarketDeleteDialogComponent, MarketDeletePopupComponent],
    entryComponents: [MarketComponent, MarketUpdateComponent, MarketDeleteDialogComponent, MarketDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomeMarketModule {}
