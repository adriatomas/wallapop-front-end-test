import { TestBed } from '@angular/core/testing';
import {
  mockProductPagination,
  MockProductService,
} from '@app/helpers/mock-data';
import { ProductService } from '@app/services/product/product.service';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import * as ProductActions from '../product.actions';
import { ProductEffects } from '../product.effects';
import { selectProductsPaginationInfo } from '../product.selector';
import { initialState, ProductState } from '../product.state';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let store: MockStore<ProductState>;
  let httpService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState,
        }),
        { provide: ProductService, useClass: MockProductService },
      ],
    });
    effects = TestBed.inject(ProductEffects);
    store = TestBed.inject(MockStore);
    httpService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return getProducts action', (done) => {
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();

    const spy = spyOn(httpService, 'getProducts').and.callThrough();
    actions$ = of(ProductActions.getProducts);
    effects.getProducts$.subscribe((res) => {
      expect(res).toEqual(
        ProductActions.getProductsSuccess({
          productsPagination: mockProductPagination,
        })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it('should return getProductsError action', (done) => {
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();

    const spy = spyOn(httpService, 'getProducts').and.returnValue(
      throwError({ message: 'ERROR' })
    );
    actions$ = of(ProductActions.getProducts);
    effects.getProducts$.subscribe((error) => {
      expect(error).toEqual(
        ProductActions.getProductsError({ errorMessage: 'ERROR' })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should return getNextPageProductsSuccess action', (done) => {
    const output: any = {
      filterParams: null,
      type: '[Product state] Get products',
    };
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();

    actions$ = of(ProductActions.getNextPageProducts);

    effects.getNextPaginationProducts$.subscribe((res) => {
      expect(res).toEqual(output);
      done();
    });
  });
  it('should return getPrevPageProductsSuccess action', (done) => {
    const output: any = {
      filterParams: null,
      type: '[Product state] Get products',
    };
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();

    actions$ = of(ProductActions.getPrevPageProducts);

    effects.getPrevPaginationProducts$.subscribe((res) => {
      expect(res).toEqual(output);
      done();
    });
  });
});

