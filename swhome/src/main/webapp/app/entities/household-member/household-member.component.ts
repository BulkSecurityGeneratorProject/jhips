import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHouseholdMember } from 'app/shared/model/household-member.model';
import { Principal } from 'app/core';
import { HouseholdMemberService } from './household-member.service';

@Component({
    selector: 'jhi-household-member',
    templateUrl: './household-member.component.html'
})
export class HouseholdMemberComponent implements OnInit, OnDestroy {
    householdMembers: IHouseholdMember[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private householdMemberService: HouseholdMemberService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.householdMemberService.query().subscribe(
            (res: HttpResponse<IHouseholdMember[]>) => {
                this.householdMembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHouseholdMembers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHouseholdMember) {
        return item.id;
    }

    registerChangeInHouseholdMembers() {
        this.eventSubscriber = this.eventManager.subscribe('householdMemberListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
