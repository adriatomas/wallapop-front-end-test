import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { mockProduct } from '@app/helpers/mock-data';
import { findComponent } from '@app/helpers/tests.helper';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductItemComponent],
        imports: [TranslateModule.forRoot(), SharedModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product data', () => {
    fixture.detectChanges()
    const productImg = findComponent(fixture, '.product__img > img');
    const productTitle = findComponent(
      fixture,
      '.product__content--section > .product__content--title'
    );
    const productPrice = findComponent(fixture, '.product__header--price');
    const productEmail = findComponent(fixture, '.product__content--email');

    expect(productImg).toBeTruthy();
    expect(productTitle).toBeTruthy();
    expect(productPrice).toBeTruthy();
    expect(productEmail).toBeTruthy();
  });
  it('should render only title and image on favoriteItemView', () => {
    component.favoriteView = true;
    fixture.detectChanges();

    const productImg = findComponent(fixture, '.product__img > img');
    const productTitle = findComponent(
      fixture,
      '.product__content--title'
    );
    const productPrice = findComponent(fixture, '.product__header--price');
    const productEmail = findComponent(fixture, '.product__content--email');

    expect(productImg).toBeTruthy();
    expect(productTitle).toBeTruthy();
    expect(productPrice).toEqual(null);
    expect(productEmail).toEqual(null);
  });
});
