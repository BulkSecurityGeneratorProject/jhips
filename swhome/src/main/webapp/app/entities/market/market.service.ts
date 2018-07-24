import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMarket } from 'app/shared/model/market.model';

type EntityResponseType = HttpResponse<IMarket>;
type EntityArrayResponseType = HttpResponse<IMarket[]>;

@Injectable({ providedIn: 'root' })
export class MarketService {
    private resourceUrl = SERVER_API_URL + 'api/markets';

    constructor(private http: HttpClient) {}

    create(market: IMarket): Observable<EntityResponseType> {
        return this.http.post<IMarket>(this.resourceUrl, market, { observe: 'response' });
    }

    update(market: IMarket): Observable<EntityResponseType> {
        return this.http.put<IMarket>(this.resourceUrl, market, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMarket>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMarket[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
