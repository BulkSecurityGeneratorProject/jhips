/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SwhomeTestModule } from '../../../test.module';
import { HouseholdMemberUpdateComponent } from 'app/entities/household-member/household-member-update.component';
import { HouseholdMemberService } from 'app/entities/household-member/household-member.service';
import { HouseholdMember } from 'app/shared/model/household-member.model';

describe('Component Tests', () => {
    describe('HouseholdMember Management Update Component', () => {
        let comp: HouseholdMemberUpdateComponent;
        let fixture: ComponentFixture<HouseholdMemberUpdateComponent>;
        let service: HouseholdMemberService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SwhomeTestModule],
                declarations: [HouseholdMemberUpdateComponent]
            })
                .overrideTemplate(HouseholdMemberUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseholdMemberUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseholdMemberService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HouseholdMember(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.householdMember = entity;
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
                    const entity = new HouseholdMember();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.householdMember = entity;
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
