import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaginationInfo } from '@app/models/pagination-info.model';
import { ProductFilterParams } from '@app/models/product-filter-params.model';
import { Product } from '@app/models/product.model';
import { FavoriteProductService } from '@app/services/favorite-product/favorite-product.service';
import { FavoriteModalComponent } from '@app/components/favorite-modal/favorite-modal.component';
import { AppState } from '@app/store/app.reducers';
import {
  addFavoritePoducts,
  getNextPageProducts,
  getPrevPageProducts,
  getProducts,
  removeFavoriteProduct,
  searchProductsByParams
} from '@app/store/product/product.actions';
import {
  selectAllProducts,
  selectFavoriteProducts,
  selectProductsError, selectProductsPaginationInfo
} from '@app/store/product/product.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  favoriteProducts$: Observable<Product[]>;
  paginationInfo$: Observable<PaginationInfo>;
  getProductsError$: Observable<string>;
  searchFormGroup: FormGroup;
  private _onDestroy = new Subject<void>();

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _fb: FormBuilder,
    private readonly _matDialog: MatDialog,
    public readonly favoriteProductService: FavoriteProductService
  ) {}

  ngOnInit() {
    this._loadInitialData();
    this._watchFormChanges();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  next(): void {
    this._store.dispatch(getNextPageProducts());
  }
  prev(): void {
    this._store.dispatch(getPrevPageProducts());
  }

  toggleFavoriteProduct(selected: boolean, product: Product): void {
    if (selected) {
      this._store.dispatch(addFavoritePoducts({ product }));
      return;
    }
    this._store.dispatch(removeFavoriteProduct({ product }));
  }

  openFavoritesModal(): void {
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'favorite-modal-component';
    dialogConfig.panelClass = 'app-modal';

    const modalDialog = this._matDialog.open(
      FavoriteModalComponent,
      dialogConfig
    );
  }

  private _loadInitialData(): void {
    this.products$ = this._store.select(selectAllProducts);
    this.paginationInfo$ = this._store.select(selectProductsPaginationInfo);
    this.getProductsError$ = this._store.select(selectProductsError);
    this.favoriteProducts$ = this._store.select(selectFavoriteProducts);
    this._store.dispatch(getProducts({}));
    this.searchFormGroup = this._fb.group({
      search: '',
      sortBy: '',
    });
  }

  private _watchFormChanges(): void {
    this.searchFormGroup
      .get('search')
      .valueChanges.pipe(
        filter((val) => !val || val.length > 2),
        debounceTime(1500),
        distinctUntilChanged(),
        takeUntil(this._onDestroy)
      )
      .subscribe((val) => {
        this._getProducts();
      });

    this.searchFormGroup
      .get('sortBy')
      .valueChanges.pipe(takeUntil(this._onDestroy))
      .subscribe(() => this._getProducts());
  }

  private _getProducts() {
    const { sortBy, search } = this.searchFormGroup.getRawValue();
    const params: ProductFilterParams = {};

    if (sortBy && sortBy !== '') {
      params.sortBy = sortBy;
    }
    if (search && search !== '') {
      params.findBy = search;
      params.page = 0;
    }
    this._store.dispatch(searchProductsByParams({ params }));
  }
}
