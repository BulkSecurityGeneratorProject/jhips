/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemTypeDeleteDialogComponent } from 'app/entities/purchase-item-type/purchase-item-type-delete-dialog.component';
import { PurchaseItemTypeService } from 'app/entities/purchase-item-type/purchase-item-type.service';

describe('Component Tests', () => {
    describe('PurchaseItemType Management Delete Component', () => {
        let comp: PurchaseItemTypeDeleteDialogComponent;
        let fixture: ComponentFixture<PurchaseItemTypeDeleteDialogComponent>;
        let service: PurchaseItemTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemTypeDeleteDialogComponent]
            })
                .overrideTemplate(PurchaseItemTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseItemTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemTypeService);
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
