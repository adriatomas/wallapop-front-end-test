/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on OnInput function call', fakeAsync(() => {
    component.onInput({ srcElement: { value: 'test' } });
    fixture.detectChanges();
    expect(component.value).toEqual('test');
  }));
});
