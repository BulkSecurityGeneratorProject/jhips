/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdDeleteDialogComponent } from 'app/entities/household/household-delete-dialog.component';
import { HouseholdService } from 'app/entities/household/household.service';

describe('Component Tests', () => {
    describe('Household Management Delete Component', () => {
        let comp: HouseholdDeleteDialogComponent;
        let fixture: ComponentFixture<HouseholdDeleteDialogComponent>;
        let service: HouseholdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdDeleteDialogComponent]
            })
                .overrideTemplate(HouseholdDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseholdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseholdService);
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
