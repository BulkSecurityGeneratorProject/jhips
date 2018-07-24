import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHouseholdMember } from 'app/shared/model/household-member.model';
import { HouseholdMemberService } from './household-member.service';
import { IHousehold } from 'app/shared/model/household.model';
import { HouseholdService } from 'app/entities/household';

@Component({
    selector: 'jhi-household-member-update',
    templateUrl: './household-member-update.component.html'
})
export class HouseholdMemberUpdateComponent implements OnInit {
    private _householdMember: IHouseholdMember;
    isSaving: boolean;

    households: IHousehold[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private householdMemberService: HouseholdMemberService,
        private householdService: HouseholdService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ householdMember }) => {
            this.householdMember = householdMember;
        });
        this.householdService.query().subscribe(
            (res: HttpResponse<IHousehold[]>) => {
                this.households = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.householdMember.id !== undefined) {
            this.subscribeToSaveResponse(this.householdMemberService.update(this.householdMember));
        } else {
            this.subscribeToSaveResponse(this.householdMemberService.create(this.householdMember));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHouseholdMember>>) {
        result.subscribe((res: HttpResponse<IHouseholdMember>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHouseholdById(index: number, item: IHousehold) {
        return item.id;
    }
    get householdMember() {
        return this._householdMember;
    }

    set householdMember(householdMember: IHouseholdMember) {
        this._householdMember = householdMember;
    }
}
