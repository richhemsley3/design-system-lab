import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Filter Bar ---------- */

@Component({
  selector: 'sds-filter-bar',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-filter-bar',
  },
  template: `
    <div class="sds-filter-bar__chips">
      <ng-content />
    </div>
    <button
      type="button"
      class="sds-filter-bar__clear"
      (click)="cleared.emit()"
    >
      Clear all
    </button>
  `,
})
export class SdsFilterBarComponent {
  @Output() cleared = new EventEmitter<void>();
}

/* ---------- Filter Chip ---------- */

@Component({
  selector: 'sds-filter-chip',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <span class="sds-filter-chip__label">{{ label }}</span>
    <span *ngIf="value" class="sds-filter-chip__value">{{ value }}</span>
    <ng-content />
  `,
})
export class SdsFilterChipComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() active = false;

  get hostClasses(): string {
    return [
      'sds-filter-chip',
      this.active && 'sds-filter-chip--active',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
