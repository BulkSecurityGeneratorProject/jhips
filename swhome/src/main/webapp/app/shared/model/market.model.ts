export interface IMarket {
    id?: number;
    name?: string;
}

export class Market implements IMarket {
    constructor(public id?: number, public name?: string) {}
}
