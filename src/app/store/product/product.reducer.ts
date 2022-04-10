import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { initialState, ProductState } from './product.state';

const _productReducer = createReducer(
  initialState,
  on(ProductActions.getProductsSuccess, (state, { productsPagination }) => {
    return {
      ...state,
      productsPagination,
    };
  }),
  on(ProductActions.getProductsError, (state, { errorMessage }) => {
    return {
      ...state,
      productsPagination: null,
      errorMessage,
    };
  }),

  on(ProductActions.getNextPageProducts, (state) => {
    return {
      ...state,
      productsPagination: {
        ...state.productsPagination,
        info: {
          ...state.productsPagination.info,
          page: state.productsPagination.info.page + 1,
        },
      },
    };
  }),
  on(ProductActions.getPrevPageProducts, (state) => {
    return {
      ...state,
      productsPagination: {
        ...state.productsPagination,
        info: {
          ...state.productsPagination.info,
          page: state.productsPagination.info.page - 1,
        },
      },
    };
  }),

  on(ProductActions.searchProductsByParams, (state, { params }) => {
    return {
      ...state,
      filterParams: params,
    };
  }),
  on(ProductActions.addFavoritePoducts, (state, { product }) => {
    const favoriteProducts = [...state.favoriteProducts, product];
    return {
      ...state,
      favoriteProducts,
    };
  }),
  on(ProductActions.removeFavoriteProduct, (state, { product }) => {
    const favoriteProducts = state.favoriteProducts.filter(
      (p) => p.title !== product.title && p.description !== product.description
    );
    return {
      ...state,
      favoriteProducts,
    };
  })
);

export function productReducer(state: ProductState, action: Action) {
  return _productReducer(state, action);
}
