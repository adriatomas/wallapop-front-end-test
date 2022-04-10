import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';
import { ProductItemModule } from '../product-item/product-item.module';
import { SearchInputModule } from '../search-input/search-input.module';
import { FavoriteModalComponent } from './favorite-modal.component';

@NgModule({
  imports: [ProductItemModule, SearchInputModule, SharedModule],
  exports: [FavoriteModalComponent],
  declarations: [FavoriteModalComponent],
  providers: [],
})
export class FavoriteModalModule {}
