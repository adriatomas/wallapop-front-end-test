import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { mockProductPagination, mockPagininationWithoutNext, mockPagininationWithoutPrev } from '@app/helpers/mock-data';
import { clickElement, findComponent } from '@app/helpers/tests.helper';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PaginationComponent } from './pagination.component';


describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldnt render pagination when no pagination$', () => {
    const paginationWrapper = findComponent(fixture, '.button-group');
    expect(paginationWrapper).toBeFalsy();
  });

  it('should render pagination when  pagination$ are informed', () => {
    component.pagination$ = of(mockProductPagination.info);
    fixture.detectChanges();

    const paginationWrapper = findComponent(fixture, '.button-group');

    expect(paginationWrapper).toBeTruthy();
  });

  it('should disable "prev" button cannot go prev', () => {
    component.pagination$ = of(mockPagininationWithoutPrev.info);
    fixture.detectChanges();

    const prevButton = findComponent(fixture, '.button-group > .button:first-child');

    expect(prevButton.nativeElement.disabled).toBeTruthy();
  });

  it('should disable "next" button cannot go next', () => {
    component.pagination$ = of(mockPagininationWithoutNext.info);
    fixture.detectChanges();

    const prevButton = findComponent(fixture, '.button-group > .button:last-child');

    expect(prevButton.nativeElement.disabled).toBeTruthy();
  });

  it('should emit next on next button click', fakeAsync(() => {
    spyOn(component.nextPage, 'emit');
    component.pagination$ = of(mockProductPagination.info);
    fixture.detectChanges();

    const nextButton = findComponent(fixture, '.button-group > .button:last-child');
    clickElement(fixture, nextButton);
    tick();

    expect(component.nextPage.emit).toHaveBeenCalledWith()
  }));

  it('should emit next on prev button click', fakeAsync(() => {
    spyOn(component.prevPage, 'emit');
    component.pagination$ = of(mockPagininationWithoutNext.info);
    fixture.detectChanges();

    const prevButton = findComponent(fixture, '.button-group > .button:first-child');
    clickElement(fixture, prevButton);
    tick();

    expect(component.prevPage.emit).toHaveBeenCalled()
  }));

});
