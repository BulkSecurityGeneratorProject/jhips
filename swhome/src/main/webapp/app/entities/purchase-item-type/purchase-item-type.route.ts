import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseItemType } from 'app/shared/model/purchase-item-type.model';
import { PurchaseItemTypeService } from './purchase-item-type.service';
import { PurchaseItemTypeComponent } from './purchase-item-type.component';
import { PurchaseItemTypeDetailComponent } from './purchase-item-type-detail.component';
import { PurchaseItemTypeUpdateComponent } from './purchase-item-type-update.component';
import { PurchaseItemTypeDeletePopupComponent } from './purchase-item-type-delete-dialog.component';
import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';

@Injectable({ providedIn: 'root' })
export class PurchaseItemTypeResolve implements Resolve<IPurchaseItemType> {
    constructor(private service: PurchaseItemTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((purchaseItemType: HttpResponse<PurchaseItemType>) => purchaseItemType.body));
        }
        return of(new PurchaseItemType());
    }
}

export const purchaseItemTypeRoute: Routes = [
    {
        path: 'purchase-item-type',
        component: PurchaseItemTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItemType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item-type/:id/view',
        component: PurchaseItemTypeDetailComponent,
        resolve: {
            purchaseItemType: PurchaseItemTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItemType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item-type/new',
        component: PurchaseItemTypeUpdateComponent,
        resolve: {
            purchaseItemType: PurchaseItemTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItemType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'purchase-item-type/:id/edit',
        component: PurchaseItemTypeUpdateComponent,
        resolve: {
            purchaseItemType: PurchaseItemTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItemType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseItemTypePopupRoute: Routes = [
    {
        path: 'purchase-item-type/:id/delete',
        component: PurchaseItemTypeDeletePopupComponent,
        resolve: {
            purchaseItemType: PurchaseItemTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'swhomeApp.purchaseItemType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
