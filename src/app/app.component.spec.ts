import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { clickElement, findComponent, findComponents } from './helpers/tests.helper';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not be rendered loader at the beginning', () => {
    const spinnerElement = findComponent(fixture, '.backdrop');
    expect(spinnerElement).toBeFalsy();
  });

  it('should have default language set to "ES"', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    expect(component.currentLang).toBe('es');
  });

  it('should have multiple language buttons', () => {
    const buttons = findComponents(fixture, '.content-container > .language-wrapper > button');
    expect(buttons.length).toEqual(2);
    expect(buttons[0].nativeElement.textContent.trim()).toEqual('ESP');
    expect(buttons[1].nativeElement.textContent.trim()).toEqual('ENG');
  });

  it('should change language with buttons interaction', () => {
    const spanishButton = findComponent(fixture, '.content-container > .language-wrapper > button:first-child');
    const englishButton = findComponent(fixture, '.content-container > .language-wrapper > button:last-child');

    // Click english button
    clickElement(fixture, englishButton);
    expect(component.currentLang).toBe('en');

    // Click english button
    clickElement(fixture, spanishButton);
    expect(component.currentLang).toBe('es');
  });
});
