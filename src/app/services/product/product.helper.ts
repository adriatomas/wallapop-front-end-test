import { Product } from '@app/models/product.model';

export function mapToProductsPagination(products: Product[]): any {
  const page = 1;
  const pages = Math.ceil(products.length / 5);
  const pageSize = 5;
  return {
    info: {
      pageSize,
      page,
      pages,
    },
    results: products,
  };
}
