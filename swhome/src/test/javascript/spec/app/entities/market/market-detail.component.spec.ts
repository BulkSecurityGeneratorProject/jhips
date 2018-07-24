/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { MarketDetailComponent } from 'app/entities/market/market-detail.component';
import { Market } from 'app/shared/model/market.model';

describe('Component Tests', () => {
    describe('Market Management Detail Component', () => {
        let comp: MarketDetailComponent;
        let fixture: ComponentFixture<MarketDetailComponent>;
        const route = ({ data: of({ market: new Market(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [MarketDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MarketDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarketDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.market).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
