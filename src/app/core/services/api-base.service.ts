import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  BASE_URL: string = environment.baseUrl;

  constructor(readonly httpClient: HttpClient) {}

  protected get<T = any, P = any>(url: string, params: P): Observable<T> {
    return this.httpClient.get<T>(`${this.BASE_URL}${url}`, params);
  }

  protected getById<T = any, P = any>(
    url: string,
    id: string,
    params: P
  ): Observable<T> {
    return this.httpClient.get<T>(`${this.BASE_URL}${url}/${id}`, params);
  }

  protected post<T = any, P = any>(
    payload: T,
    url: string,
    params: P
  ): Observable<T> {
    return this.httpClient.post<T>(`${this.BASE_URL}${url}`, payload, params);
  }

  protected put<T = any, P = any>(
    payload: T,
    url: string,
    params: P
  ): Observable<T> {
    return this.httpClient.put<T>(`${this.BASE_URL}${url}`, payload, params);
  }

  protected patch<T = any, P = any>(
    payload: T,
    url: string,
    params: P
  ): Observable<T> {
    return this.httpClient.patch<T>(`${this.BASE_URL}${url}`, payload, params);
  }

  protected delete(id: string, url: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}${url}/${id}`);
  }
}
