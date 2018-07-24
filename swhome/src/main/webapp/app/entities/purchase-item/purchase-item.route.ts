import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseItem } from 'app/shared/model/purchase-item.model';
import { PurchaseItemService } from './purchase-item.service';
import { PurchaseItemComponent } from './purchase-item.component';
import { PurchaseItemDetailComponent } from './purchase-item-detail.component';
import { PurchaseItemUpdateComponent } from './purchase-item-update.component';
import { PurchaseItemDeletePopupComponent } from './purchase-item-delete-dialog.component';
import { IPurchaseItem } from 'app/shared/model/purchase-item.model';

@Injectable({ providedIn: 'root' })
export class PurchaseItemResolve implements Resolve<IPurchaseItem> {
    constructor(private service: PurchaseItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((purchaseItem: HttpResponse<PurchaseItem>) => purchaseItem.body));
        }
        return of(new PurchaseItem());
    }
}

export const purchaseItemRoute: Routes = [
    {
        path: 'purchase-item',
        component: PurchaseItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item/:id/view',
        component: PurchaseItemDetailComponent,
        resolve: {
            purchaseItem: PurchaseItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item/new',
        component: PurchaseItemUpdateComponent,
        resolve: {
            purchaseItem: PurchaseItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item/:id/edit',
        component: PurchaseItemUpdateComponent,
        resolve: {
            purchaseItem: PurchaseItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseItemPopupRoute: Routes = [
    {
        path: 'purchase-item/:id/delete',
        component: PurchaseItemDeletePopupComponent,
        resolve: {
            purchaseItem: PurchaseItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
