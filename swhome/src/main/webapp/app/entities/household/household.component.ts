import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHousehold } from 'app/shared/model/household.model';
import { Principal } from 'app/core';
import { HouseholdService } from './household.service';

@Component({
    selector: 'jhi-household',
    templateUrl: './household.component.html'
})
export class HouseholdComponent implements OnInit, OnDestroy {
    households: IHousehold[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private householdService: HouseholdService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.householdService.query().subscribe(
            (res: HttpResponse<IHousehold[]>) => {
                this.households = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHouseholds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHousehold) {
        return item.id;
    }

    registerChangeInHouseholds() {
        this.eventSubscriber = this.eventManager.subscribe('householdListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
