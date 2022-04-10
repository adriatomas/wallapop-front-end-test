import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';

import { SearchInputComponent } from './search-input.component';

@NgModule({
  imports: [SharedModule],
  exports: [SearchInputComponent],
  declarations: [SearchInputComponent],
  providers: [],
})
export class SearchInputModule { }
