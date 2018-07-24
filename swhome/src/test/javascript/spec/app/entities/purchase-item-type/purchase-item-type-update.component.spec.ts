/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemTypeUpdateComponent } from 'app/entities/purchase-item-type/purchase-item-type-update.component';
import { PurchaseItemTypeService } from 'app/entities/purchase-item-type/purchase-item-type.service';
import { PurchaseItemType } from 'app/shared/model/purchase-item-type.model';

describe('Component Tests', () => {
    describe('PurchaseItemType Management Update Component', () => {
        let comp: PurchaseItemTypeUpdateComponent;
        let fixture: ComponentFixture<PurchaseItemTypeUpdateComponent>;
        let service: PurchaseItemTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemTypeUpdateComponent]
            })
                .overrideTemplate(PurchaseItemTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseItemTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseItemType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseItemType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseItemType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseItemType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
