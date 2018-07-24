import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPurchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';
import { IHouseholdMember } from 'app/shared/model/household-member.model';
import { HouseholdMemberService } from 'app/entities/household-member';
import { IMarket } from 'app/shared/model/market.model';
import { MarketService } from 'app/entities/market';

@Component({
    selector: 'jhi-purchase-update',
    templateUrl: './purchase-update.component.html'
})
export class PurchaseUpdateComponent implements OnInit {
    private _purchase: IPurchase;
    isSaving: boolean;

    householdmembers: IHouseholdMember[];

    markets: IMarket[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private purchaseService: PurchaseService,
        private householdMemberService: HouseholdMemberService,
        private marketService: MarketService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchase }) => {
            this.purchase = purchase;
        });
        this.householdMemberService.query().subscribe(
            (res: HttpResponse<IHouseholdMember[]>) => {
                this.householdmembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.marketService.query().subscribe(
            (res: HttpResponse<IMarket[]>) => {
                this.markets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.purchase.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.purchase.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseService.update(this.purchase));
        } else {
            this.subscribeToSaveResponse(this.purchaseService.create(this.purchase));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchase>>) {
        result.subscribe((res: HttpResponse<IPurchase>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHouseholdMemberById(index: number, item: IHouseholdMember) {
        return item.id;
    }

    trackMarketById(index: number, item: IMarket) {
        return item.id;
    }
    get purchase() {
        return this._purchase;
    }

    set purchase(purchase: IPurchase) {
        this._purchase = purchase;
        this.date = moment(purchase.date).format(DATE_TIME_FORMAT);
    }
}
