/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { MarketComponent } from 'app/entities/market/market.component';
import { MarketService } from 'app/entities/market/market.service';
import { Market } from 'app/shared/model/market.model';

describe('Component Tests', () => {
    describe('Market Management Component', () => {
        let comp: MarketComponent;
        let fixture: ComponentFixture<MarketComponent>;
        let service: MarketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [MarketComponent],
                providers: []
            })
                .overrideTemplate(MarketComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarketComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarketService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Market(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.markets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
