import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';

import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [SharedModule],
  exports: [PaginationComponent],
  declarations: [PaginationComponent],
  providers: [],
})
export class PaginationModule { }
