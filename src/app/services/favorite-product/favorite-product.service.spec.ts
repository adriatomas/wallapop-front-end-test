import { TestBed } from '@angular/core/testing';
import { mockProductResponse } from '@app/helpers/mock-data';
import { selectFavoriteProducts } from '@app/store/product/product.selector';
import { initialState } from '@app/store/product/product.state';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FavoriteProductService } from './favorite-product.service';

describe('Service: FavoriteProduct', () => {
  let service: FavoriteProductService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FavoriteProductService,
        provideMockStore({
          initialState,
        }),
      ],
    });
    service = TestBed.inject(FavoriteProductService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of favorite products', () => {
    selectFavoriteProducts.setResult(mockProductResponse.items);
    store.refreshState();

    expect(service.favoriteProducts).toEqual(mockProductResponse.items);
  });

  it('should return true when passing favorite product', () => {
    const product = mockProductResponse.items[0];
    selectFavoriteProducts.setResult(mockProductResponse.items);
    store.refreshState();

    expect(service.isFavoriteProduct(product)).toBeTrue();
  });
});
