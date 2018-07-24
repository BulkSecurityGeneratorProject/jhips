import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIncome } from 'app/shared/model/income.model';
import { IncomeService } from './income.service';
import { IHouseholdMember } from 'app/shared/model/household-member.model';
import { HouseholdMemberService } from 'app/entities/household-member';

@Component({
    selector: 'jhi-income-update',
    templateUrl: './income-update.component.html'
})
export class IncomeUpdateComponent implements OnInit {
    private _income: IIncome;
    isSaving: boolean;

    householdmembers: IHouseholdMember[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private incomeService: IncomeService,
        private householdMemberService: HouseholdMemberService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ income }) => {
            this.income = income;
        });
        this.householdMemberService.query().subscribe(
            (res: HttpResponse<IHouseholdMember[]>) => {
                this.householdmembers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.income.id !== undefined) {
            this.subscribeToSaveResponse(this.incomeService.update(this.income));
        } else {
            this.subscribeToSaveResponse(this.incomeService.create(this.income));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIncome>>) {
        result.subscribe((res: HttpResponse<IIncome>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get income() {
        return this._income;
    }

    set income(income: IIncome) {
        this._income = income;
    }
}
