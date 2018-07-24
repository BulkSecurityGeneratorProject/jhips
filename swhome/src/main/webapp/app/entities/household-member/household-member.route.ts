import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HouseholdMember } from 'app/shared/model/household-member.model';
import { HouseholdMemberService } from './household-member.service';
import { HouseholdMemberComponent } from './household-member.component';
import { HouseholdMemberDetailComponent } from './household-member-detail.component';
import { HouseholdMemberUpdateComponent } from './household-member-update.component';
import { HouseholdMemberDeletePopupComponent } from './household-member-delete-dialog.component';
import { IHouseholdMember } from 'app/shared/model/household-member.model';

@Injectable({ providedIn: 'root' })
export class HouseholdMemberResolve implements Resolve<IHouseholdMember> {
    constructor(private service: HouseholdMemberService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((householdMember: HttpResponse<HouseholdMember>) => householdMember.body));
        }
        return of(new HouseholdMember());
    }
}

export const householdMemberRoute: Routes = [
    {
        path: 'household-member',
        component: HouseholdMemberComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.householdMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household-member/:id/view',
        component: HouseholdMemberDetailComponent,
        resolve: {
            householdMember: HouseholdMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.householdMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household-member/new',
        component: HouseholdMemberUpdateComponent,
        resolve: {
            householdMember: HouseholdMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.householdMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'household-member/:id/edit',
        component: HouseholdMemberUpdateComponent,
        resolve: {
            householdMember: HouseholdMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.householdMember.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const householdMemberPopupRoute: Routes = [
    {
        path: 'household-member/:id/delete',
        component: HouseholdMemberDeletePopupComponent,
        resolve: {
            householdMember: HouseholdMemberResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.householdMember.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
