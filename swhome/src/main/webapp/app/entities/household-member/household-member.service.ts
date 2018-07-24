import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouseholdMember } from 'app/shared/model/household-member.model';

type EntityResponseType = HttpResponse<IHouseholdMember>;
type EntityArrayResponseType = HttpResponse<IHouseholdMember[]>;

@Injectable({ providedIn: 'root' })
export class HouseholdMemberService {
    private resourceUrl = SERVER_API_URL + 'api/household-members';

    constructor(private http: HttpClient) {}

    create(householdMember: IHouseholdMember): Observable<EntityResponseType> {
        return this.http.post<IHouseholdMember>(this.resourceUrl, householdMember, { observe: 'response' });
    }

    update(householdMember: IHouseholdMember): Observable<EntityResponseType> {
        return this.http.put<IHouseholdMember>(this.resourceUrl, householdMember, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHouseholdMember>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHouseholdMember[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
