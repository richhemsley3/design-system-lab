import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-stat-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-stat-card__label">{{ label }}</div>
    <div class="sds-stat-card__value">{{ value }}</div>
    <div
      *ngIf="trendValue"
      [class]="trendClasses"
    >
      <span *ngIf="trendDirection === 'up'" class="sds-stat-card__trend-icon">&#9650;</span>
      <span *ngIf="trendDirection === 'down'" class="sds-stat-card__trend-icon">&#9660;</span>
      {{ trendValue }}
    </div>
    <div *ngIf="footer" class="sds-stat-card__footer">{{ footer }}</div>
    <ng-content />
  `,
})
export class SdsStatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() trendDirection: 'up' | 'down' | undefined;
  @Input() trendValue = '';
  @Input() trendPositive = true;
  @Input() compact = false;
  @Input() highlight = false;
  @Input() footer = '';

  get hostClasses(): string {
    return [
      'sds-stat-card',
      this.compact && 'sds-stat-card--compact',
      this.highlight && 'sds-stat-card--highlight',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get trendClasses(): string {
    return [
      'sds-stat-card__trend',
      this.trendPositive
        ? 'sds-stat-card__trend--positive'
        : 'sds-stat-card__trend--negative',
    ].join(' ');
  }
}
