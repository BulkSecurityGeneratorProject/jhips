/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { PurchaseItemTypeDetailComponent } from 'app/entities/purchase-item-type/purchase-item-type-detail.component';
import { PurchaseItemType } from 'app/shared/model/purchase-item-type.model';

describe('Component Tests', () => {
    describe('PurchaseItemType Management Detail Component', () => {
        let comp: PurchaseItemTypeDetailComponent;
        let fixture: ComponentFixture<PurchaseItemTypeDetailComponent>;
        const route = ({ data: of({ purchaseItemType: new PurchaseItemType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [PurchaseItemTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PurchaseItemTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PurchaseItemTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.purchaseItemType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
