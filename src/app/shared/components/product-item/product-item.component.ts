import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@app/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  @Input() product: Product;
  @Input() isFavorite: boolean = false;
  @Input() favoriteView: boolean = false;
  @Output() toggleFavorite: EventEmitter<boolean> = new EventEmitter();
  
}
