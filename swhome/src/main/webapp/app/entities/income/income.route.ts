import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Income } from 'app/shared/model/income.model';
import { IncomeService } from './income.service';
import { IncomeComponent } from './income.component';
import { IncomeDetailComponent } from './income-detail.component';
import { IncomeUpdateComponent } from './income-update.component';
import { IncomeDeletePopupComponent } from './income-delete-dialog.component';
import { IIncome } from 'app/shared/model/income.model';

@Injectable({ providedIn: 'root' })
export class IncomeResolve implements Resolve<IIncome> {
    constructor(private service: IncomeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((income: HttpResponse<Income>) => income.body));
        }
        return of(new Income());
    }
}

export const incomeRoute: Routes = [
    {
        path: 'income',
        component: IncomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'income/:id/view',
        component: IncomeDetailComponent,
        resolve: {
            income: IncomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'income/new',
        component: IncomeUpdateComponent,
        resolve: {
            income: IncomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'income/:id/edit',
        component: IncomeUpdateComponent,
        resolve: {
            income: IncomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomePopupRoute: Routes = [
    {
        path: 'income/:id/delete',
        component: IncomeDeletePopupComponent,
        resolve: {
            income: IncomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.income.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
