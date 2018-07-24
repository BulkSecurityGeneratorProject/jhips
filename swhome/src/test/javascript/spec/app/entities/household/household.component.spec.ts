/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdComponent } from 'app/entities/household/household.component';
import { HouseholdService } from 'app/entities/household/household.service';
import { Household } from 'app/shared/model/household.model';

describe('Component Tests', () => {
    describe('Household Management Component', () => {
        let comp: HouseholdComponent;
        let fixture: ComponentFixture<HouseholdComponent>;
        let service: HouseholdService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdComponent],
                providers: []
            })
                .overrideTemplate(HouseholdComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseholdComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseholdService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Household(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.households[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
