import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { clickElement, findComponent } from '@app/helpers/tests.helper';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        declarations: [ButtonComponent],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on click button', fakeAsync(() => {
    spyOn(component.clicked, 'emit');
    const button = findComponent(fixture, '.button');
    clickElement(fixture, button);
    tick();
    expect(component.clicked.emit).toHaveBeenCalled();
  }));
});
