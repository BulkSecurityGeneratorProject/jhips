import { IHousehold } from 'app/shared/model//household.model';

export interface IHouseholdMember {
    id?: number;
    name?: string;
    household?: IHousehold;
}

export class HouseholdMember implements IHouseholdMember {
    constructor(public id?: number, public name?: string, public household?: IHousehold) {}
}
