import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncome } from 'app/shared/model/income.model';

@Component({
    selector: 'jhi-income-detail',
    templateUrl: './income-detail.component.html'
})
export class IncomeDetailComponent implements OnInit {
    income: IIncome;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ income }) => {
            this.income = income;
        });
    }

    previousState() {
        window.history.back();
    }
}
