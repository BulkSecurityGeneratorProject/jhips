/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdMemberComponent } from 'app/entities/household-member/household-member.component';
import { HouseholdMemberService } from 'app/entities/household-member/household-member.service';
import { HouseholdMember } from 'app/shared/model/household-member.model';

describe('Component Tests', () => {
    describe('HouseholdMember Management Component', () => {
        let comp: HouseholdMemberComponent;
        let fixture: ComponentFixture<HouseholdMemberComponent>;
        let service: HouseholdMemberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdMemberComponent],
                providers: []
            })
                .overrideTemplate(HouseholdMemberComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseholdMemberComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseholdMemberService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HouseholdMember(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.householdMembers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
