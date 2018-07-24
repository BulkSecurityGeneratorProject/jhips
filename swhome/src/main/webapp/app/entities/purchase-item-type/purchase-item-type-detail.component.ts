import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';

@Component({
    selector: 'jhi-purchase-item-type-detail',
    templateUrl: './purchase-item-type-detail.component.html'
})
export class PurchaseItemTypeDetailComponent implements OnInit {
    purchaseItemType: IPurchaseItemType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseItemType }) => {
            this.purchaseItemType = purchaseItemType;
        });
    }

    previousState() {
        window.history.back();
    }
}
