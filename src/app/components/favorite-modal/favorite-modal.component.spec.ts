/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mockProduct } from '@app/helpers/mock-data';
import { findComponent } from '@app/helpers/tests.helper';
import { FavoriteProductService } from '@app/services/favorite-product/favorite-product.service';
import { selectFavoriteProducts } from '@app/store/product/product.selector';
import { initialState } from '@app/store/product/product.state';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProductItemModule } from '../product-item/product-item.module';
import { SearchInputModule } from '../search-input/search-input.module';
import { FavoriteModalComponent } from './favorite-modal.component';

describe('FavoriteModalComponent', () => {
  let component: FavoriteModalComponent;
  let fixture: ComponentFixture<FavoriteModalComponent>;
  let store: MockStore;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FavoriteModalComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MatDialogModule,
          StoreModule.forRoot({}),
          TranslateModule.forRoot(),
          ProductItemModule,
          SearchInputModule,
        ],
        providers: [
          provideMockStore({
            initialState,
          }),
          {
            provide: MatDialogRef,
            useValue: mockDialogRef,
          },
          FavoriteProductService,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render favorite items', () => {
    selectFavoriteProducts.setResult([mockProduct]);
    store.refreshState();
    fixture.detectChanges();

    const favoriteItem = findComponent(fixture, 'app-product-item');
    expect(favoriteItem).toBeTruthy();
  });

  it('should render search input component', () => {
    selectFavoriteProducts.setResult([mockProduct]);
    store.refreshState();
    fixture.detectChanges();

    const searchInput = findComponent(fixture, 'app-search-input');
    expect(searchInput).toBeTruthy();
  });

  it('should render noItems template when on favorite items', () => {
    selectFavoriteProducts.setResult([]);
    store.refreshState();
    fixture.detectChanges();

    const noItemsTemplate = findComponent(fixture, '.favorite-modal__no-items');
    expect(noItemsTemplate).toBeTruthy();
  });

  it('should render noItems template when on favorite items', fakeAsync(() => {
    spyOn(component, 'removeProduct');
    selectFavoriteProducts.setResult([mockProduct]);
    store.refreshState();
    fixture.detectChanges();

    const favoriteIcon = findComponent(
      fixture,
      '.favorite-modal .favorite-modal__products > app-product-item .product .product__content .product__favorite > app-favorite-icon > .favorite-icon'
    );

    favoriteIcon.nativeElement.dispatchEvent(new Event('click'));
    tick();
    expect(component.removeProduct).toHaveBeenCalled();
  }));
});
