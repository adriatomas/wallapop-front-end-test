import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ProductState } from './product.state';

export const selectProductsState = (state: AppState) =>
  state?.productState || null;

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state?.productsPagination?.results || []
);

export const selectProductsPaginationInfo = createSelector(
  selectProductsState,
  (state: ProductState) => state?.productsPagination?.info || null
);
export const selectProductsFilterParams = createSelector(
  selectProductsState,
  (state: ProductState) => state?.filterParams || null
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductState) => state?.errorMessage || null
);

export const selectProductError = createSelector(
  selectProductsState,
  (state: ProductState) => state?.errorMessage || null
);

export const selectFavoriteProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state?.favoriteProducts || []
);
