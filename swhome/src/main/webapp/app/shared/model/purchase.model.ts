import { Moment } from 'moment';
import { IHouseholdMember } from 'app/shared/model//household-member.model';
import { IMarket } from 'app/shared/model//market.model';

export interface IPurchase {
    id?: number;
    date?: Moment;
    householdMember?: IHouseholdMember;
    market?: IMarket;
}

export class Purchase implements IPurchase {
    constructor(public id?: number, public date?: Moment, public householdMember?: IHouseholdMember, public market?: IMarket) {}
}
