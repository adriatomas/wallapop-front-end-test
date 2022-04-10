import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './components/button/button.component';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';
import { FavoriteModalComponent } from './components/favorite-modal/favorite-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

const MODULES = [
  TranslateModule,
  HttpClientModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MatDialogModule,
];
const COMPONENTS = [
  PaginationComponent,
  ProductItemComponent,
  ButtonComponent,
  FavoriteIconComponent,
  FavoriteModalComponent,
  SearchInputComponent,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [],
})
export class SharedModule {}
