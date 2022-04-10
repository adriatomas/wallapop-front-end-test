import { Product } from './product.model';

export interface ProductsResponse {
  items: Product[],
  totalPages: number;
}