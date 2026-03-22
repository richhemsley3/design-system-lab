import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Notification Center ---------- */

@Component({
  selector: 'sds-notification-center',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-notification-center',
  },
  template: `
    <div class="sds-notification-center__header">
      <div class="sds-notification-center__title">{{ title }}</div>
      <button
        type="button"
        class="sds-notification-center__mark-all"
        (click)="markAllRead.emit()"
      >
        Mark all read
      </button>
    </div>
    <div class="sds-notification-center__list">
      <ng-content />
    </div>
  `,
})
export class SdsNotificationCenterComponent {
  @Input() title = 'Notifications';
  @Output() markAllRead = new EventEmitter<void>();
}

/* ---------- Notification Item ---------- */

@Component({
  selector: 'sds-notification-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-notification-item',
  },
  template: `<ng-content />`,
})
export class SdsNotificationItemComponent {}
