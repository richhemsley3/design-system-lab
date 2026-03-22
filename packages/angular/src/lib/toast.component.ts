import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-toast',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'alert',
  },
  template: `
    <div class="sds-toast__content">
      <div *ngIf="title" class="sds-toast__title">{{ title }}</div>
      <div *ngIf="message" class="sds-toast__message">{{ message }}</div>
    </div>
    <button
      *ngIf="dismissible"
      type="button"
      class="sds-toast__dismiss"
      (click)="dismissed.emit()"
      aria-label="Dismiss"
    >
      &times;
    </button>
  `,
})
export class SdsToastComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = true;
  @Output() dismissed = new EventEmitter<void>();

  get hostClasses(): string {
    return [
      'sds-toast',
      `sds-toast--${this.variant}`,
    ].join(' ');
  }
}
