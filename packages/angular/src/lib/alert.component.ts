import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-alert',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'alert',
  },
  template: `
    <ng-content select="[sdsAlertIcon]" />
    <div class="sds-alert__content">
      <div *ngIf="title" class="sds-alert__title">{{ title }}</div>
      <div class="sds-alert__message">
        <ng-content />
      </div>
    </div>
    <ng-content select="[sdsAlertActions]" />
    <button
      *ngIf="dismissible"
      type="button"
      class="sds-alert__dismiss"
      (click)="dismissed.emit()"
      aria-label="Dismiss"
    >
      &times;
    </button>
  `,
})
export class SdsAlertComponent {
  @Input() variant: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Input() compact = false;
  @Output() dismissed = new EventEmitter<void>();

  get hostClasses(): string {
    return [
      'sds-alert',
      `sds-alert--${this.variant}`,
      this.compact && 'sds-alert--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
