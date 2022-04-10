import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';

import { FavoriteIconComponent } from './favorite-icon.component';

@NgModule({
  imports: [SharedModule],
  exports: [FavoriteIconComponent],
  declarations: [FavoriteIconComponent],
  providers: [],
})
export class FavoriteIconModule { }
