/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { IncomeComponent } from 'app/entities/income/income.component';
import { IncomeService } from 'app/entities/income/income.service';
import { Income } from 'app/shared/model/income.model';

describe('Component Tests', () => {
    describe('Income Management Component', () => {
        let comp: IncomeComponent;
        let fixture: ComponentFixture<IncomeComponent>;
        let service: IncomeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [IncomeComponent],
                providers: []
            })
                .overrideTemplate(IncomeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Income(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
