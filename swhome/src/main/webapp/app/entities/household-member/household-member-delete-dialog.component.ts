import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHouseholdMember } from 'app/shared/model/household-member.model';
import { HouseholdMemberService } from './household-member.service';

@Component({
    selector: 'jhi-household-member-delete-dialog',
    templateUrl: './household-member-delete-dialog.component.html'
})
export class HouseholdMemberDeleteDialogComponent {
    householdMember: IHouseholdMember;

    constructor(
        private householdMemberService: HouseholdMemberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.householdMemberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'householdMemberListModification',
                content: 'Deleted an householdMember'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-household-member-delete-popup',
    template: ''
})
export class HouseholdMemberDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ householdMember }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HouseholdMemberDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.householdMember = householdMember;
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
