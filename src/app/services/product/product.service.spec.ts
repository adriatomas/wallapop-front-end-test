import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  GET_PRODUCTS_URL,
  mockProductList,
  mockProductResponse,
} from '@app/helpers/mock-data';
import { ProductsResponse } from '@app/models/products-response.model';
import { ProductService } from './product.service';

describe('Service: Product', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list Product list', () => {
    const spyHttpClient = spyOn(httpClient, 'get').and.callThrough();

    service.getProducts().subscribe((res) => {
      expect(res).toEqual(mockProductResponse);
    });

    const expectedUrl = GET_PRODUCTS_URL;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(mockProductResponse);
    httpMock.verify();
    httpMock.expectNone(expectedUrl);
    expect(spyHttpClient).toHaveBeenCalledTimes(1);
  });

  it('should update url when adding pagination', () => {
    service.getProducts({ page: 1, pageSize: 5 }).subscribe((res) => {
      expect(res).toEqual(null);
    });

    const expectedUrl = `${GET_PRODUCTS_URL}?page=1&pageSize=5`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(null);
  });

  it('should update url when search by "iphone" word', () => {
    service.getProducts({ findBy: 'iphone' }).subscribe((res) => {
      expect(res).toEqual(null);
    });

    const expectedUrl = `${GET_PRODUCTS_URL}?findBy=iphone`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(null);
  });

  it('should update url when sorting by "title"', () => {
    service.getProducts({ sortBy: 'title' }).subscribe((res) => {
      expect(res).toEqual(null);
    });

    const expectedUrl = `${GET_PRODUCTS_URL}?sortBy=title`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(null);
  });

  it('should update url when adding all possible filter params', () => {
    service
      .getProducts({ page: 1, pageSize: 5, findBy: 'iphone', sortBy: 'title' })
      .subscribe((res) => {
        expect(res).toEqual(null);
      });

    const expectedUrl = `${GET_PRODUCTS_URL}?page=1&pageSize=5&findBy=iphone&sortBy=title`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(null);
  });
});
