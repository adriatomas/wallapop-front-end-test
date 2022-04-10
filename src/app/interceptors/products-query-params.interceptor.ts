import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  sortByNumericFieldAsc,
  sortByStringFieldAsc,
} from '@app/helpers/sort.helper';
import { Product } from '@app/models/product.model';
import { DEFAULT_PAGINATION_INFO } from '@app/services/product/product.service';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ProductsQueryParamsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          let items: Product[] = response.body?.items;

          if (!items?.length) {
            return response;
          }


          if (req.params.get('findBy') !== null) {
            const findByQuery = req.params.get('findBy')?.toLowerCase();
            items = items.filter(
              ({ title, description, email, price }) =>
                title.toLowerCase().includes(findByQuery) ||
                description.toLowerCase().includes(findByQuery) ||
                email.toLowerCase().includes(findByQuery) ||
                price.toLowerCase().includes(findByQuery)
            );
          }

          if (req.params.get('sortBy') !== null) {
            const sortByField = req.params.get('sortBy');
            response.body.items = !isNaN(items[0][sortByField])
              ? sortByNumericFieldAsc(response.body.items, sortByField)
              : sortByStringFieldAsc(response.body.items, sortByField);
          }

          if (req.params.get('page') !== null && req.params.get('pageSize') !== null){
            const page = parseInt(req.params.get('page'));
            const pageSize = parseInt(req.params.get('pageSize'));
            response = response.clone({
              body: {
                items: items.slice(page * pageSize, page * pageSize + pageSize),
                totalPages: Math.ceil(items.length / pageSize),
              },
            });
          }
        }
        return response;
      })
    );
  }
}
