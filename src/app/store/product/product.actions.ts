import { ProductFilterParams } from '@app/models/product-filter-params.model';
import { ProductPagination } from '@app/models/product-pagination.model';
import { Product } from '@app/models/product.model';
import { createAction, props } from '@ngrx/store';

const GET_PRODUCTS = '[Product state] Get products';
const GET_PRODUCTS_SUCCESS = '[Product state] Get products success';
const GET_PRODUCTS_ERROR = '[Product state] Get products error';

const GET_NEXT_PAGE_PRODUCTS = '[Product state] Get next products';

const GET_PREV_PAGE_PRODUCTS = '[Product state] Get prev products';

const SEARCH_PRODUCT_BY_PARAMS = '[Product state] Search products by params';

const GET_FAVORITE_PRODUCTS = '[Product state] Get List of favorite products';
const ADD_FAVORITE_PRODUCT = '[Product state] Add favorite product';
const REMOVE_FAVORITE_PRODUCT = '[Product state] Remove favorite product';

export const getProducts = createAction(
  GET_PRODUCTS,
  props<{ filterParams?: ProductFilterParams }>()
);
export const getProductsSuccess = createAction(
  GET_PRODUCTS_SUCCESS,
  props<{ productsPagination: ProductPagination }>()
);
export const getProductsError = createAction(
  GET_PRODUCTS_ERROR,
  props<{ errorMessage: string }>()
);

export const getNextPageProducts = createAction(GET_NEXT_PAGE_PRODUCTS);
export const getPrevPageProducts = createAction(GET_PREV_PAGE_PRODUCTS);

export const searchProductsByParams = createAction(
  SEARCH_PRODUCT_BY_PARAMS,
  props<{ params: ProductFilterParams }>()
);

export const getFavoritePoducts = createAction(GET_FAVORITE_PRODUCTS);
export const addFavoritePoducts = createAction(
  ADD_FAVORITE_PRODUCT,
  props<{ product: Product }>()
);

export const removeFavoriteProduct = createAction(
  REMOVE_FAVORITE_PRODUCT,
  props<{ product: Product }>()
);
