import {
  mockProductPagination
} from '@app/helpers/mock-data';
import * as ProductActions from '../product.actions';
import * as ProductReducer from '../product.reducer';
import { initialState, ProductState } from '../product.state';

describe('ProductReducer', () => {
  let newState: ProductState;

  beforeEach(() => {
    newState = {
      productsPagination: null,
      errorMessage: '',
      filterParams: {},
      favoriteProducts: [],
    };
  });
  it('[Product state] should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = ProductReducer.productReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('[Product state] Get products success: should retrieve all products and update the state in an immutable way', () => {
    const action = ProductActions.getProductsSuccess({
      productsPagination: mockProductPagination,
    });
    const state = ProductReducer.productReducer(initialState, action);
    const updatedState: ProductState = {
      ...newState,
      productsPagination: mockProductPagination
    }
    expect(state).toEqual(updatedState);
    expect(state).not.toBe(newState);
  });

  it('[Product state] Get charproductsacters error: should retrive error when get product could not be possible', () => {
    const action = ProductActions.getProductsError({ errorMessage: 'ERROR' });
    const state = ProductReducer.productReducer(initialState, action);
    const updatedState: ProductState = {
      ...newState,
      errorMessage: 'ERROR'
    }
    expect(state).toEqual(updatedState);
    expect(state).not.toBe(newState);
  });

  it('[Product state] Get next page success: should retrive new list of products', () => {
    const action = ProductActions.getNextPageProducts();
    const state = ProductReducer.productReducer(initialState, action);
    const updatedState: ProductState = {
      ...newState,
      productsPagination: {
        info: {
          page: 1,
          pageSize: 5,
          pages: 0
        },
        results: []
      }
    }
    expect(state).toEqual(updatedState);
    expect(state).not.toBe(newState);
  });

  it('[Product state] Get prev page success: should retrive new list of products', () => {
    const action = ProductActions.getPrevPageProducts();
    const state = ProductReducer.productReducer(initialState, action);
    const updatedState: ProductState = {
      ...newState,
      productsPagination: {
        info: {
          page: -1,
          pageSize: 5,
          pages: 0
        },
        results: []
      }
    }
    expect(state).toEqual(updatedState);
    expect(state).not.toBe(newState);
  });
});
