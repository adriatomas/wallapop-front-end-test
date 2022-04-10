import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [SharedModule, HomeRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule { }
