import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private httpLoading$ = new ReplaySubject<boolean>(1);
  private bodyContainer: HTMLElement;
  constructor() {
    this.bodyContainer = document.getElementById('body-content');
  }

  httpProgress(): Observable<boolean> {
    return this.httpLoading$.asObservable();
  }

  setHttpProgressStatus(inprogess: boolean) {
    this.setBodyScroll(inprogess);
    this.httpLoading$.next(inprogess);
  }

  private setBodyScroll(inprogress: boolean) {
    if (this.bodyContainer) {
      this.bodyContainer.style.overflowY = inprogress ? 'hidden' : 'scroll';
    }
  }
}
