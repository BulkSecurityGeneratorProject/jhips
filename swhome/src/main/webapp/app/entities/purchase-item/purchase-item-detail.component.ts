import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseItem } from 'app/shared/model/purchase-item.model';

@Component({
    selector: 'jhi-purchase-item-detail',
    templateUrl: './purchase-item-detail.component.html'
})
export class PurchaseItemDetailComponent implements OnInit {
    purchaseItem: IPurchaseItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseItem }) => {
            this.purchaseItem = purchaseItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
