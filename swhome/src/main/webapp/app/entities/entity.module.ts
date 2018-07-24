import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SwhomeHouseholdMemberModule } from './household-member/household-member.module';
import { SwhomeHouseholdModule } from './household/household.module';
import { SwhomePurchaseModule } from './purchase/purchase.module';
import { SwhomePurchaseItemModule } from './purchase-item/purchase-item.module';
import { SwhomeUnitModule } from './unit/unit.module';
import { SwhomeMarketModule } from './market/market.module';
import { SwhomeIncomeModule } from './income/income.module';
import { SwhomePurchaseItemTypeModule } from './purchase-item-type/purchase-item-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SwhomeHouseholdMemberModule,
        SwhomeHouseholdModule,
        SwhomePurchaseModule,
        SwhomePurchaseItemModule,
        SwhomeUnitModule,
        SwhomeMarketModule,
        SwhomeIncomeModule,
        SwhomePurchaseItemTypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwhomeEntityModule {}
