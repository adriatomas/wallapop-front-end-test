import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  element: DebugElement,
): void {
  const el: HTMLElement = element.nativeElement;
  el.click();
  fixture.detectChanges();
}
