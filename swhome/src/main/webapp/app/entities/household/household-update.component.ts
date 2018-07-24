import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHousehold } from 'app/shared/model/household.model';
import { HouseholdService } from './household.service';

@Component({
    selector: 'jhi-household-update',
    templateUrl: './household-update.component.html'
})
export class HouseholdUpdateComponent implements OnInit {
    private _household: IHousehold;
    isSaving: boolean;

    constructor(private householdService: HouseholdService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ household }) => {
            this.household = household;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.household.id !== undefined) {
            this.subscribeToSaveResponse(this.householdService.update(this.household));
        } else {
            this.subscribeToSaveResponse(this.householdService.create(this.household));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHousehold>>) {
        result.subscribe((res: HttpResponse<IHousehold>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get household() {
        return this._household;
    }

    set household(household: IHousehold) {
        this._household = household;
    }
}
