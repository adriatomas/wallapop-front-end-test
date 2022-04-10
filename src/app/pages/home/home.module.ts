import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@app/components/button/button.module';
import { PaginationModule } from '@app/components/pagination/pagination.module';
import { ProductItemModule } from '@app/components/product-item/product-item.module';
import { SearchInputModule } from '@app/components/search-input/search-input.module';
import { SharedModule } from '@app/core/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    PaginationModule,
    ProductItemModule,
    SearchInputModule,
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
