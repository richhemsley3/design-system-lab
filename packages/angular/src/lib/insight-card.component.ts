import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-insight-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-insight-card__header">
      <div *ngIf="title" class="sds-insight-card__title">{{ title }}</div>
      <span *ngIf="severity" [class]="severityClasses">{{ severity }}</span>
    </div>
    <div *ngIf="description" class="sds-insight-card__description">{{ description }}</div>
    <div *ngIf="meta" class="sds-insight-card__meta">{{ meta }}</div>
    <ng-content />
  `,
})
export class SdsInsightCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() severity: 'info' | 'warning' | 'critical' | undefined;
  @Input() compact = false;
  @Input() meta = '';

  get hostClasses(): string {
    return [
      'sds-insight-card',
      this.compact && 'sds-insight-card--compact',
      this.severity && `sds-insight-card--${this.severity}`,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get severityClasses(): string {
    return [
      'sds-insight-card__severity',
      this.severity && `sds-insight-card__severity--${this.severity}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
