import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHousehold } from 'app/shared/model/household.model';

@Component({
    selector: 'jhi-household-detail',
    templateUrl: './household-detail.component.html'
})
export class HouseholdDetailComponent implements OnInit {
    household: IHousehold;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ household }) => {
            this.household = household;
        });
    }

    previousState() {
        window.history.back();
    }
}
