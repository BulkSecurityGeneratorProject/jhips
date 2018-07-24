import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncome } from 'app/shared/model/income.model';
import { Principal } from 'app/core';
import { IncomeService } from './income.service';

@Component({
    selector: 'jhi-income',
    templateUrl: './income.component.html'
})
export class IncomeComponent implements OnInit, OnDestroy {
    incomes: IIncome[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private incomeService: IncomeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.incomeService.query().subscribe(
            (res: HttpResponse<IIncome[]>) => {
                this.incomes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncomes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncome) {
        return item.id;
    }

    registerChangeInIncomes() {
        this.eventSubscriber = this.eventManager.subscribe('incomeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
