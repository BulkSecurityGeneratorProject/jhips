import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchaseItem } from 'app/shared/model/purchase-item.model';

type EntityResponseType = HttpResponse<IPurchaseItem>;
type EntityArrayResponseType = HttpResponse<IPurchaseItem[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseItemService {
    private resourceUrl = SERVER_API_URL + 'api/purchase-items';

    constructor(private http: HttpClient) {}

    create(purchaseItem: IPurchaseItem): Observable<EntityResponseType> {
        return this.http.post<IPurchaseItem>(this.resourceUrl, purchaseItem, { observe: 'response' });
    }

    update(purchaseItem: IPurchaseItem): Observable<EntityResponseType> {
        return this.http.put<IPurchaseItem>(this.resourceUrl, purchaseItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPurchaseItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPurchaseItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
