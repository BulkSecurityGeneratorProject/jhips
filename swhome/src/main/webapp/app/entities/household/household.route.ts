import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Household } from 'app/shared/model/household.model';
import { HouseholdService } from './household.service';
import { HouseholdComponent } from './household.component';
import { HouseholdDetailComponent } from './household-detail.component';
import { HouseholdUpdateComponent } from './household-update.component';
import { HouseholdDeletePopupComponent } from './household-delete-dialog.component';
import { IHousehold } from 'app/shared/model/household.model';

@Injectable({ providedIn: 'root' })
export class HouseholdResolve implements Resolve<IHousehold> {
    constructor(private service: HouseholdService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((household: HttpResponse<Household>) => household.body));
        }
        return of(new Household());
    }
}

export const householdRoute: Routes = [
    {
        path: 'household',
        component: HouseholdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.household.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household/:id/view',
        component: HouseholdDetailComponent,
        resolve: {
            household: HouseholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.household.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household/new',
        component: HouseholdUpdateComponent,
        resolve: {
            household: HouseholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.household.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household/:id/edit',
        component: HouseholdUpdateComponent,
        resolve: {
            household: HouseholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.household.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const householdPopupRoute: Routes = [
    {
        path: 'household/:id/delete',
        component: HouseholdDeletePopupComponent,
        resolve: {
            household: HouseholdResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.household.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
