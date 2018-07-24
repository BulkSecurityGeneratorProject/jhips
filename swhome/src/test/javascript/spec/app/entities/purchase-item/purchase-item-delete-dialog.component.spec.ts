/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemDeleteDialogComponent } from 'app/entities/purchase-item/purchase-item-delete-dialog.component';
import { PurchaseItemService } from 'app/entities/purchase-item/purchase-item.service';

describe('Component Tests', () => {
    describe('PurchaseItem Management Delete Component', () => {
        let comp: PurchaseItemDeleteDialogComponent;
        let fixture: ComponentFixture<PurchaseItemDeleteDialogComponent>;
        let service: PurchaseItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemDeleteDialogComponent]
            })
                .overrideTemplate(PurchaseItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
