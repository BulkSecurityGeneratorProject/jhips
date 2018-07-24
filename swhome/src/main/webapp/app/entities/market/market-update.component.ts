import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMarket } from 'app/shared/model/market.model';
import { MarketService } from './market.service';

@Component({
    selector: 'jhi-market-update',
    templateUrl: './market-update.component.html'
})
export class MarketUpdateComponent implements OnInit {
    private _market: IMarket;
    isSaving: boolean;

    constructor(private marketService: MarketService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ market }) => {
            this.market = market;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.market.id !== undefined) {
            this.subscribeToSaveResponse(this.marketService.update(this.market));
        } else {
            this.subscribeToSaveResponse(this.marketService.create(this.market));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMarket>>) {
        result.subscribe((res: HttpResponse<IMarket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get market() {
        return this._market;
    }

    set market(market: IMarket) {
        this._market = market;
    }
}
