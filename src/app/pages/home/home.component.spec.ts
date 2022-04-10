import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '@app/components/button/button.module';
import { PaginationComponent } from '@app/components/pagination/pagination.component';
import { PaginationModule } from '@app/components/pagination/pagination.module';
import { ProductItemModule } from '@app/components/product-item/product-item.module';
import { SearchInputModule } from '@app/components/search-input/search-input.module';
import {
  mockProductPagination,
  mockProductResponse
} from '@app/helpers/mock-data';
import { clickElement, findComponent } from '@app/helpers/tests.helper';
import { FavoriteProductService } from '@app/services/favorite-product/favorite-product.service';
import {
  selectAllProducts,
  selectFavoriteProducts,
  selectProductsError,
  selectProductsPaginationInfo
} from '@app/store/product/product.selector';
import { initialState } from '@app/store/product/product.state';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          TranslateModule.forRoot(),
          FormsModule,
          ReactiveFormsModule,
          MatDialogModule,
          StoreModule.forRoot({}),
          ButtonModule,
          PaginationModule,
          ProductItemModule,
          SearchInputModule,
        ],
        providers: [
          provideMockStore({
            initialState,
          }),
          FavoriteProductService,
        ],
        declarations: [HomeComponent, PaginationComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders pagination component', () => {
    fixture.detectChanges();

    selectAllProducts.setResult(mockProductResponse.items);
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();

    fixture.detectChanges();

    const pagination = findComponent(fixture, 'app-pagination');
    expect(pagination).toBeTruthy();
  });

  it('renders product-item component', () => {
    selectAllProducts.setResult(mockProductResponse.items);
    selectProductsPaginationInfo.setResult(mockProductPagination.info);
    store.refreshState();
    fixture.detectChanges();

    const productItem = findComponent(fixture, 'app-product-item');
    const noProductsTemplate = findComponent(fixture, '.no-products-wrapper');
    expect(noProductsTemplate).toBeFalsy();
    expect(productItem).toBeTruthy();
  });

  it('renders no products template when we dont have any product', () => {
    selectAllProducts.setResult([]);
    selectProductsError.setResult('ERROR');

    store.refreshState();
    fixture.detectChanges();

    const wrapperVal = findComponent(
      fixture,
      '.no-products-wrapper > .no-products-wrapper__title'
    );

    expect(wrapperVal.nativeElement.textContent.trim()).toBe('home.no_results');
    expect(wrapperVal).toBeTruthy();
  });

  it('should favorite counter starts at 0', () => {
    selectFavoriteProducts.setResult([]);
    store.refreshState();
    fixture.detectChanges();

    const favoriteParagraph = findComponent(fixture, '.favorites-wrapper > p');
    expect(favoriteParagraph.nativeElement.textContent).toBe(
      'home.favorite_title: 0'
    );
  });

  it('should favorite counter update on add favorite product', () => {
    selectFavoriteProducts.setResult(mockProductResponse.items);
    store.refreshState();
    fixture.detectChanges();

    const favoriteParagraph = findComponent(fixture, '.favorites-wrapper > p');
    expect(favoriteParagraph.nativeElement.textContent).toBe(
      'home.favorite_title: 1'
    );
  });

  it('should call openModal method to click button', fakeAsync(() => {
    spyOn(component, 'openFavoritesModal');
    const manageFavorotesBtn = findComponent(
      fixture,
      '.favorites-wrapper > .favorite-wrapper__manage > button'
    );
    clickElement(fixture, manageFavorotesBtn);
    tick();
    expect(component.openFavoritesModal).toHaveBeenCalledWith();
  }));

  it('renders noProducts template when we have an error from API', () => {
    selectAllProducts.setResult([]);
    selectProductsError.setResult('ERROR');
    store.refreshState();
    fixture.detectChanges();

    const noProductsTemplate = findComponent(fixture, '.no-products-wrapper');
    const wrapperVal = findComponent(
      fixture,
      '.no-products-wrapper > .no-products-wrapper__title'
    );

    expect(wrapperVal.nativeElement.textContent.trim()).toBe('home.no_results');
    expect(noProductsTemplate).toBeTruthy();
  });
});
