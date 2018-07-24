/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdDetailComponent } from 'app/entities/household/household-detail.component';
import { Household } from 'app/shared/model/household.model';

describe('Component Tests', () => {
    describe('Household Management Detail Component', () => {
        let comp: HouseholdDetailComponent;
        let fixture: ComponentFixture<HouseholdDetailComponent>;
        const route = ({ data: of({ household: new Household(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HouseholdDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseholdDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.household).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
