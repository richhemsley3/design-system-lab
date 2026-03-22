import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Data List ---------- */

@Component({
  selector: 'sds-data-list',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsDataListComponent {
  @Input() columns: 1 | 2 | 3 = 1;

  get hostClasses(): string {
    return [
      'sds-data-list',
      this.columns > 1 && `sds-data-list--${this.columns}-col`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Data List Item ---------- */

@Component({
  selector: 'sds-data-list-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-data-list-item',
  },
  template: `
    <dt class="sds-data-list-item__label">{{ label }}</dt>
    <dd class="sds-data-list-item__value"><ng-content /></dd>
  `,
})
export class SdsDataListItemComponent {
  @Input() label = '';
}
