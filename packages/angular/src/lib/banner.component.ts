import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-banner',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'alert',
  },
  template: `
    <div class="sds-banner__content">
      <div *ngIf="title" class="sds-banner__title">{{ title }}</div>
      <div *ngIf="message" class="sds-banner__message">{{ message }}</div>
      <ng-content />
    </div>
    <button
      *ngIf="dismissible"
      type="button"
      class="sds-banner__dismiss"
      (click)="dismissed.emit()"
      aria-label="Dismiss"
    >
      &times;
    </button>
  `,
})
export class SdsBannerComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();

  get hostClasses(): string {
    return [
      'sds-banner',
      `sds-banner--${this.variant}`,
    ].join(' ');
  }
}
