import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPurchaseItem } from 'app/shared/model/purchase-item.model';
import { PurchaseItemService } from './purchase-item.service';
import { IPurchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from 'app/entities/purchase';
import { IUnit } from 'app/shared/model/unit.model';
import { UnitService } from 'app/entities/unit';
import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';
import { PurchaseItemTypeService } from 'app/entities/purchase-item-type';

@Component({
    selector: 'jhi-purchase-item-update',
    templateUrl: './purchase-item-update.component.html'
})
export class PurchaseItemUpdateComponent implements OnInit {
    private _purchaseItem: IPurchaseItem;
    isSaving: boolean;

    purchases: IPurchase[];

    units: IUnit[];

    purchaseitemtypes: IPurchaseItemType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private purchaseItemService: PurchaseItemService,
        private purchaseService: PurchaseService,
        private unitService: UnitService,
        private purchaseItemTypeService: PurchaseItemTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchaseItem }) => {
            this.purchaseItem = purchaseItem;
        });
        this.purchaseService.query().subscribe(
            (res: HttpResponse<IPurchase[]>) => {
                this.purchases = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.unitService.query().subscribe(
            (res: HttpResponse<IUnit[]>) => {
                this.units = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.purchaseItemTypeService.query().subscribe(
            (res: HttpResponse<IPurchaseItemType[]>) => {
                this.purchaseitemtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.purchaseItem.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseItemService.update(this.purchaseItem));
        } else {
            this.subscribeToSaveResponse(this.purchaseItemService.create(this.purchaseItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseItem>>) {
        result.subscribe((res: HttpResponse<IPurchaseItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPurchaseById(index: number, item: IPurchase) {
        return item.id;
    }

    trackUnitById(index: number, item: IUnit) {
        return item.id;
    }

    trackPurchaseItemTypeById(index: number, item: IPurchaseItemType) {
        return item.id;
    }
    get purchaseItem() {
        return this._purchaseItem;
    }

    set purchaseItem(purchaseItem: IPurchaseItem) {
        this._purchaseItem = purchaseItem;
    }
}
