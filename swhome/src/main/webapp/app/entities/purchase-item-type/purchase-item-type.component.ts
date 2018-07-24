import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';
import { Principal } from 'app/core';
import { PurchaseItemTypeService } from './purchase-item-type.service';

@Component({
    selector: 'jhi-purchase-item-type',
    templateUrl: './purchase-item-type.component.html'
})
export class PurchaseItemTypeComponent implements OnInit, OnDestroy {
    purchaseItemTypes: IPurchaseItemType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private purchaseItemTypeService: PurchaseItemTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.purchaseItemTypeService.query().subscribe(
            (res: HttpResponse<IPurchaseItemType[]>) => {
                this.purchaseItemTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPurchaseItemTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPurchaseItemType) {
        return item.id;
    }

    registerChangeInPurchaseItemTypes() {
        this.eventSubscriber = this.eventManager.subscribe('purchaseItemTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
