export interface IHousehold {
    id?: number;
}

export class Household implements IHousehold {
    constructor(public id?: number) {}
}
