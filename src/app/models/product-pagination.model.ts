import { Product } from './product.model';
import { PaginationInfo } from './pagination-info.model';

export interface ProductPagination {
  info: PaginationInfo;
  results: Product[];
}
