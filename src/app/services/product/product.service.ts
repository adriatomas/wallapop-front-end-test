import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/api-base.service';
import { PaginationInfo } from '@app/models/pagination-info.model';
import { ProductFilterParams } from '@app/models/product-filter-params.model';
import { ProductsResponse } from '@app/models/products-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const DEFAULT_ITEMS_PER_PAGE = 5;
export const DEFAULT_PAGINATION_INFO: PaginationInfo = {
  page: 0,
  pageSize: DEFAULT_ITEMS_PER_PAGE,
};

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(readonly httpClient: HttpClient) {
    super(httpClient);
  }

  getProducts(params: ProductFilterParams = {}): Observable<ProductsResponse> {
    return this.get<ProductsResponse>(`/items.json`, { params }).pipe(
      map((res) => res)
    );
  }
}
