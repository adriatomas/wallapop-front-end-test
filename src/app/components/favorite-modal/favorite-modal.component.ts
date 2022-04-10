import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '@app/models/product.model';
import { FavoriteProductService } from '@app/services/favorite-product/favorite-product.service';
import { AppState } from '@app/store/app.reducers';
import { removeFavoriteProduct } from '@app/store/product/product.actions';
import { selectFavoriteProducts } from '@app/store/product/product.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent implements OnInit, OnDestroy {
  favoriteProducts: Product[] = [];
  searchControl: FormControl = new FormControl('');

  private _onDestroy = new Subject<void>();
  private _initialFavoriteProducts: Product[] = []
  constructor(
    private _dialogRef: MatDialogRef<FavoriteModalComponent>,
    private _store: Store<AppState>,
    public readonly favoriteProductService: FavoriteProductService
  ) {}

  ngOnInit(): void {
    this._store
      .select(selectFavoriteProducts)
      .pipe(takeUntil(this._onDestroy))
      .subscribe((res) => {
        this._initialFavoriteProducts = res;
        this.favoriteProducts = res;
      });
    this._watchSearchInput();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  removeProduct(selection: boolean, product: Product): void {
    this._store.dispatch(removeFavoriteProduct({ product }));
  }
  closeModal() {
    this._dialogRef.close();
  }

  private _watchSearchInput(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((val) => {
        if (!val) {
          this.favoriteProducts = this._initialFavoriteProducts;
        }
        this.favoriteProducts = this._initialFavoriteProducts.filter((product) =>
          product.title.toLowerCase().includes(val.toLowerCase())
        );
      });
  }
}
