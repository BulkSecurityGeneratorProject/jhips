/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SwhomeTestModule } from '../../../test.module';
import { IncomeDeleteDialogComponent } from 'app/entities/income/income-delete-dialog.component';
import { IncomeService } from 'app/entities/income/income.service';

describe('Component Tests', () => {
    describe('Income Management Delete Component', () => {
        let comp: IncomeDeleteDialogComponent;
        let fixture: ComponentFixture<IncomeDeleteDialogComponent>;
        let service: IncomeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [IncomeDeleteDialogComponent]
            })
                .overrideTemplate(IncomeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeService);
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
