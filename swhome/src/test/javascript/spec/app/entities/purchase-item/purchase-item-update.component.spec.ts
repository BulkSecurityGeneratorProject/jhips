/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemUpdateComponent } from 'app/entities/purchase-item/purchase-item-update.component';
import { PurchaseItemService } from 'app/entities/purchase-item/purchase-item.service';
import { PurchaseItem } from 'app/shared/model/purchase-item.model';

describe('Component Tests', () => {
    describe('PurchaseItem Management Update Component', () => {
        let comp: PurchaseItemUpdateComponent;
        let fixture: ComponentFixture<PurchaseItemUpdateComponent>;
        let service: PurchaseItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemUpdateComponent]
            })
                .overrideTemplate(PurchaseItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PurchaseItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PurchaseItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PurchaseItem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseItem = entity;
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
                    const entity = new PurchaseItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.purchaseItem = entity;
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
