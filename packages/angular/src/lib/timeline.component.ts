import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Timeline ---------- */

@Component({
  selector: 'sds-timeline',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-timeline',
  },
  template: `<ng-content />`,
})
export class SdsTimelineComponent {}

/* ---------- Timeline Item ---------- */

@Component({
  selector: 'sds-timeline-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-timeline-item__indicator">
      <span *ngIf="icon" class="sds-timeline-item__icon">{{ icon }}</span>
    </div>
    <div class="sds-timeline-item__content">
      <div *ngIf="title" class="sds-timeline-item__title">{{ title }}</div>
      <div *ngIf="time" class="sds-timeline-item__time">{{ time }}</div>
      <div *ngIf="description" class="sds-timeline-item__description">{{ description }}</div>
      <ng-content />
    </div>
  `,
})
export class SdsTimelineItemComponent {
  @Input() title = '';
  @Input() time = '';
  @Input() description = '';
  @Input() status: 'complete' | 'active' | 'pending' | undefined;
  @Input() icon = '';

  get hostClasses(): string {
    return [
      'sds-timeline-item',
      this.status && `sds-timeline-item--${this.status}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
