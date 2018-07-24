/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { MarketUpdateComponent } from 'app/entities/market/market-update.component';
import { MarketService } from 'app/entities/market/market.service';
import { Market } from 'app/shared/model/market.model';

describe('Component Tests', () => {
    describe('Market Management Update Component', () => {
        let comp: MarketUpdateComponent;
        let fixture: ComponentFixture<MarketUpdateComponent>;
        let service: MarketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [MarketUpdateComponent]
            })
                .overrideTemplate(MarketUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarketUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarketService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Market(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.market = entity;
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
                    const entity = new Market();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.market = entity;
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
