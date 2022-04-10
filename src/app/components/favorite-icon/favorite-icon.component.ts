import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteIconComponent {
  @Input() selected: boolean = false;
  @Output() toggleSelection: EventEmitter<boolean> = new EventEmitter(); 

  onSelected($e: MouseEvent) {
    $e.preventDefault();
    this.selected = !this.selected;
    this.toggleSelection.emit(this.selected);
  }
}
