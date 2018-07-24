import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchaseItemType } from 'app/shared/model/purchase-item-type.model';

type EntityResponseType = HttpResponse<IPurchaseItemType>;
type EntityArrayResponseType = HttpResponse<IPurchaseItemType[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseItemTypeService {
    private resourceUrl = SERVER_API_URL + 'api/purchase-item-types';

    constructor(private http: HttpClient) {}

    create(purchaseItemType: IPurchaseItemType): Observable<EntityResponseType> {
        return this.http.post<IPurchaseItemType>(this.resourceUrl, purchaseItemType, { observe: 'response' });
    }

    update(purchaseItemType: IPurchaseItemType): Observable<EntityResponseType> {
        return this.http.put<IPurchaseItemType>(this.resourceUrl, purchaseItemType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPurchaseItemType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPurchaseItemType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
