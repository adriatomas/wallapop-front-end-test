import { ProductFilterParams } from '@app/models/product-filter-params.model';
import { ProductPagination } from '@app/models/product-pagination.model';
import { Product } from '@app/models/product.model';
import { DEFAULT_PAGINATION_INFO } from '@app/services/product/product.service';

export interface ProductState {
  productsPagination: ProductPagination;
  errorMessage: string;
  filterParams: ProductFilterParams,
  favoriteProducts: Product[];
}

export const initialState: ProductState = {
  productsPagination: {
    info: {
      pageSize: DEFAULT_PAGINATION_INFO.pageSize,
      page: DEFAULT_PAGINATION_INFO.page,
      pages: 0,
    },
    results: [],
  },
  errorMessage: '',
  filterParams: {},
  favoriteProducts: [],
};
