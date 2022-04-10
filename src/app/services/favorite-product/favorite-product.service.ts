import { Injectable } from '@angular/core';
import { Product } from '@app/models/product.model';
import { AppState } from '@app/store/app.reducers';
import { selectFavoriteProducts } from '@app/store/product/product.selector';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class FavoriteProductService {
  get favoriteProducts(): Product[] {
    return this._favoriteProducts;
  }

  private _favoriteProducts: Product[] = [];

  constructor(private readonly _store: Store<AppState>) {
    this._store
      .select(selectFavoriteProducts)
      .subscribe((products) => (this._favoriteProducts = products));
  }

  isFavoriteProduct(product: Product): boolean {
    return this._favoriteProducts.some(
      (p) => p.title == product.title && p.description === p.description
    );
  }
}
