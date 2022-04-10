import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const MODULES = [
  TranslateModule,
  HttpClientModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  MatDialogModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [],
})
export class SharedModule {}
