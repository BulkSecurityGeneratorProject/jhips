/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemTypeComponent } from 'app/entities/purchase-item-type/purchase-item-type.component';
import { PurchaseItemTypeService } from 'app/entities/purchase-item-type/purchase-item-type.service';
import { PurchaseItemType } from 'app/shared/model/purchase-item-type.model';

describe('Component Tests', () => {
    describe('PurchaseItemType Management Component', () => {
        let comp: PurchaseItemTypeComponent;
        let fixture: ComponentFixture<PurchaseItemTypeComponent>;
        let service: PurchaseItemTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemTypeComponent],
                providers: []
            })
                .overrideTemplate(PurchaseItemTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseItemTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PurchaseItemType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.purchaseItemTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
