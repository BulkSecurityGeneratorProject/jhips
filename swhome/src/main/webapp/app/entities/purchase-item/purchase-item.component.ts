import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPurchaseItem } from 'app/shared/model/purchase-item.model';
import { Principal } from 'app/core';
import { PurchaseItemService } from './purchase-item.service';

@Component({
    selector: 'jhi-purchase-item',
    templateUrl: './purchase-item.component.html'
})
export class PurchaseItemComponent implements OnInit, OnDestroy {
    purchaseItems: IPurchaseItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private purchaseItemService: PurchaseItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.purchaseItemService.query().subscribe(
            (res: HttpResponse<IPurchaseItem[]>) => {
                this.purchaseItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPurchaseItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPurchaseItem) {
        return item.id;
    }

    registerChangeInPurchaseItems() {
        this.eventSubscriber = this.eventManager.subscribe('purchaseItemListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
