/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { IncomeDetailComponent } from 'app/entities/income/income-detail.component';
import { Income } from 'app/shared/model/income.model';

describe('Component Tests', () => {
    describe('Income Management Detail Component', () => {
        let comp: IncomeDetailComponent;
        let fixture: ComponentFixture<IncomeDetailComponent>;
        const route = ({ data: of({ income: new Income(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [IncomeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.income).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
