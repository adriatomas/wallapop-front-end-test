import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { startWith, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  get currentLang() {
    return this._translateService.currentLang || this._currentLang;
  }

  private _currentLang = 'es';
  private _onDestroy = new Subject<void>()

  constructor(private _translateService: TranslateService, public loaderService: LoaderService, private _title: Title) {
    this._translateService.setDefaultLang(this.currentLang);
    this._setTitle();
  }

  ngOnInit() {
    this._watchLangChanges();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  changeAppLanguage(lang: string) {
    this._translateService.use(lang);
  }

  private _watchLangChanges(): void {
    this._translateService.onLangChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this._setTitle();
      });
  }

  private _setTitle(): void {
    this._translateService.get('app-title')
      .pipe(take(1))
      .subscribe(translation => this._title.setTitle(translation))
  }
}
