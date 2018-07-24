import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHousehold } from 'app/shared/model/household.model';

type EntityResponseType = HttpResponse<IHousehold>;
type EntityArrayResponseType = HttpResponse<IHousehold[]>;

@Injectable({ providedIn: 'root' })
export class HouseholdService {
    private resourceUrl = SERVER_API_URL + 'api/households';

    constructor(private http: HttpClient) {}

    create(household: IHousehold): Observable<EntityResponseType> {
        return this.http.post<IHousehold>(this.resourceUrl, household, { observe: 'response' });
    }

    update(household: IHousehold): Observable<EntityResponseType> {
        return this.http.put<IHousehold>(this.resourceUrl, household, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHousehold>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHousehold[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
