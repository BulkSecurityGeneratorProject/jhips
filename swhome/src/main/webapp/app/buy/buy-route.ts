import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Purchase } from 'app/shared/model/purchase.model';
import { IPurchase } from 'app/shared/model/purchase.model';
import {PurchaseService} from "app/entities/purchase";
import {BuyComponentComponent} from "app/buy/buy-component/buy-component.component";

@Injectable({ providedIn: 'root' })
export class BuyResolve implements Resolve<IPurchase> {
    constructor(private service: PurchaseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((purchase: HttpResponse<Purchase>) => purchase.body));
        }
        return of(new Purchase());
    }
}

export const buyRoute: Routes = [
    {
        path: 'buying',
        component: BuyComponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

