import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Market } from 'app/shared/model/market.model';
import { MarketService } from './market.service';
import { MarketComponent } from './market.component';
import { MarketDetailComponent } from './market-detail.component';
import { MarketUpdateComponent } from './market-update.component';
import { MarketDeletePopupComponent } from './market-delete-dialog.component';
import { IMarket } from 'app/shared/model/market.model';

@Injectable({ providedIn: 'root' })
export class MarketResolve implements Resolve<IMarket> {
    constructor(private service: MarketService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((market: HttpResponse<Market>) => market.body));
        }
        return of(new Market());
    }
}

export const marketRoute: Routes = [
    {
        path: 'market',
        component: MarketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.market.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'market/:id/view',
        component: MarketDetailComponent,
        resolve: {
            market: MarketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.market.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'market/new',
        component: MarketUpdateComponent,
        resolve: {
            market: MarketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.market.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'market/:id/edit',
        component: MarketUpdateComponent,
        resolve: {
            market: MarketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.market.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marketPopupRoute: Routes = [
    {
        path: 'market/:id/delete',
        component: MarketDeletePopupComponent,
        resolve: {
            market: MarketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.market.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
