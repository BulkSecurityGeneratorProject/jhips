import { IHouseholdMember } from 'app/shared/model//household-member.model';

export interface IIncome {
    id?: number;
    name?: string;
    amount?: number;
    householdMember?: IHouseholdMember;
}

export class Income implements IIncome {
    constructor(public id?: number, public name?: string, public amount?: number, public householdMember?: IHouseholdMember) {}
}
