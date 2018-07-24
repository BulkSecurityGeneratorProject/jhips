/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemComponent } from 'app/entities/purchase-item/purchase-item.component';
import { PurchaseItemService } from 'app/entities/purchase-item/purchase-item.service';
import { PurchaseItem } from 'app/shared/model/purchase-item.model';

describe('Component Tests', () => {
    describe('PurchaseItem Management Component', () => {
        let comp: PurchaseItemComponent;
        let fixture: ComponentFixture<PurchaseItemComponent>;
        let service: PurchaseItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemComponent],
                providers: []
            })
                .overrideTemplate(PurchaseItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PurchaseItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.purchaseItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
