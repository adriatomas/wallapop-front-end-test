import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [SharedModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  providers: [],
})
export class ButtonModule { }
