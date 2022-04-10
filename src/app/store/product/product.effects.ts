import { Injectable } from '@angular/core';
import { ProductPagination } from '@app/models/product-pagination.model';
import { DEFAULT_PAGINATION_INFO, ProductService } from '@app/services/product/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app.reducers';
import * as ProductActions from './product.actions';
import {
  selectProductsFilterParams,
  selectProductsPaginationInfo,
} from './product.selector';

@Injectable()
export class ProductEffects {
  constructor(
    private _actions$: Actions,
    private _productService: ProductService,
    private _store: Store<AppState>
  ) {}

  getProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.getProducts),
      withLatestFrom(this._store.select(selectProductsPaginationInfo)),
      exhaustMap(([{ filterParams }, paginationInfo]) => {
        const page = filterParams?.page ?? paginationInfo.page;
        const pageSize = paginationInfo?.pageSize ?? DEFAULT_PAGINATION_INFO.pageSize;
        filterParams = {
          ...filterParams,
          page,
          pageSize,
        };
        return this._productService.getProducts(filterParams).pipe(
          map((res) => {
            const productsPagination: ProductPagination = {
              info: {
                ...paginationInfo,
                pages: res.totalPages,

              },
              results: res.items,
            };
            return ProductActions.getProductsSuccess({ productsPagination });
          }),
          catchError(({ message }) => {
            return of(
              ProductActions.getProductsError({ errorMessage: message })
            );
          })
        );
      })
    );
  });

  getNextPaginationProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.getNextPageProducts),
      withLatestFrom(this._store.select(selectProductsFilterParams)),
      exhaustMap(([state, filterParams]) => {
        return of(ProductActions.getProducts({ filterParams }));
      })
    );
  });
  getPrevPaginationProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ProductActions.getPrevPageProducts),
      withLatestFrom(this._store.select(selectProductsFilterParams)),
      exhaustMap(([state, filterParams]) => {
        return of(ProductActions.getProducts({ filterParams }));
      })
    );
  });

  searchProductsByParams$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ProductActions.searchProductsByParams),
        map(({ params }) => {
          return ProductActions.getProducts({ filterParams: params });
        })
      );
    },
    { dispatch: true }
  );
}
