/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SwhomeTestModule } from '../../../test.module';
import { MarketDeleteDialogComponent } from 'app/entities/market/market-delete-dialog.component';
import { MarketService } from 'app/entities/market/market.service';

describe('Component Tests', () => {
    describe('Market Management Delete Component', () => {
        let comp: MarketDeleteDialogComponent;
        let fixture: ComponentFixture<MarketDeleteDialogComponent>;
        let service: MarketService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [MarketDeleteDialogComponent]
            })
                .overrideTemplate(MarketDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarketDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarketService);
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
