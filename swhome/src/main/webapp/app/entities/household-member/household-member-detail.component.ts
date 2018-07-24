import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouseholdMember } from 'app/shared/model/household-member.model';

@Component({
    selector: 'jhi-household-member-detail',
    templateUrl: './household-member-detail.component.html'
})
export class HouseholdMemberDetailComponent implements OnInit {
    householdMember: IHouseholdMember;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ householdMember }) => {
            this.householdMember = householdMember;
        });
    }

    previousState() {
        window.history.back();
    }
}
