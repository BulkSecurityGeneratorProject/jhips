import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseItem } from 'app/shared/model/purchase-item.model';
import { PurchaseItemService } from './purchase-item.service';

@Component({
    selector: 'jhi-purchase-item-delete-dialog',
    templateUrl: './purchase-item-delete-dialog.component.html'
})
export class PurchaseItemDeleteDialogComponent {
    purchaseItem: IPurchaseItem;

    constructor(
        private purchaseItemService: PurchaseItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.purchaseItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'purchaseItemListModification',
                content: 'Deleted an purchaseItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-item-delete-popup',
    template: ''
})
export class PurchaseItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchaseItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PurchaseItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.purchaseItem = purchaseItem;
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
