/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdMemberDetailComponent } from 'app/entities/household-member/household-member-detail.component';
import { HouseholdMember } from 'app/shared/model/household-member.model';

describe('Component Tests', () => {
    describe('HouseholdMember Management Detail Component', () => {
        let comp: HouseholdMemberDetailComponent;
        let fixture: ComponentFixture<HouseholdMemberDetailComponent>;
        const route = ({ data: of({ householdMember: new HouseholdMember(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdMemberDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HouseholdMemberDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseholdMemberDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.householdMember).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
