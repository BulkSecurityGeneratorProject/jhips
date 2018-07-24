import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';
import { PurchaseItemTypeService } from './purchase-item-type.service';

@Component({
    selector: 'jhi-purchase-item-type-update',
    templateUrl: './purchase-item-type-update.component.html'
})
export class PurchaseItemTypeUpdateComponent implements OnInit {
    private _purchaseItemType: IPurchaseItemType;
    isSaving: boolean;

    purchaseitemtypes: IPurchaseItemType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private purchaseItemTypeService: PurchaseItemTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchaseItemType }) => {
            this.purchaseItemType = purchaseItemType;
        });
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
        if (this.purchaseItemType.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseItemTypeService.update(this.purchaseItemType));
        } else {
            this.subscribeToSaveResponse(this.purchaseItemTypeService.create(this.purchaseItemType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseItemType>>) {
        result.subscribe((res: HttpResponse<IPurchaseItemType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPurchaseItemTypeById(index: number, item: IPurchaseItemType) {
        return item.id;
    }
    get purchaseItemType() {
        return this._purchaseItemType;
    }

    set purchaseItemType(purchaseItemType: IPurchaseItemType) {
        this._purchaseItemType = purchaseItemType;
    }
}
