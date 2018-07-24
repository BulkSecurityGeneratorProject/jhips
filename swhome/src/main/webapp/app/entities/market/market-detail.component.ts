import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarket } from 'app/shared/model/market.model';

@Component({
    selector: 'jhi-market-detail',
    templateUrl: './market-detail.component.html'
})
export class MarketDetailComponent implements OnInit {
    market: IMarket;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ market }) => {
            this.market = market;
        });
    }

    previousState() {
        window.history.back();
    }
}
