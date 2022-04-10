import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';
import { FavoriteIconModule } from '../favorite-icon/favorite-icon.module';
import { ProductItemComponent } from './product-item.component';

@NgModule({
  imports: [SharedModule, FavoriteIconModule],
  exports: [ProductItemComponent],
  declarations: [ProductItemComponent],
  providers: [],
})
export class ProductItemModule {}
