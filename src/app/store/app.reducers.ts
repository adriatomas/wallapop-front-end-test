import { ActionReducerMap } from '@ngrx/store';
import { productReducer } from './product/product.reducer';
import { ProductState } from './product/product.state';

export interface AppState {
  productState: ProductState
}

export const reducers: ActionReducerMap<AppState> = {
  productState: productReducer
};
