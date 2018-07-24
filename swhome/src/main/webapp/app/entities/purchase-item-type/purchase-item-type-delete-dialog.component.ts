import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';
import { PurchaseItemTypeService } from './purchase-item-type.service';

@Component({
    selector: 'jhi-purchase-item-type-delete-dialog',
    templateUrl: './purchase-item-type-delete-dialog.component.html'
})
export class PurchaseItemTypeDeleteDialogComponent {
    purchaseItemType: IPurchaseItemType;

    constructor(
        private purchaseItemTypeService: PurchaseItemTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.purchaseItemTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'purchaseItemTypeListModification',
                content: 'Deleted an purchaseItemType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-item-type-delete-popup',
    template: ''
})
export class PurchaseItemTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseItemType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PurchaseItemTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.purchaseItemType = purchaseItemType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
