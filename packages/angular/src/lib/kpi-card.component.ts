import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-kpi-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-kpi-card__label">{{ label }}</div>
    <div class="sds-kpi-card__value">{{ value }}</div>
    <div
      *ngIf="trendValue"
      [class]="trendClasses"
    >
      <span *ngIf="trendDirection === 'up'" class="sds-kpi-card__trend-icon">&#9650;</span>
      <span *ngIf="trendDirection === 'down'" class="sds-kpi-card__trend-icon">&#9660;</span>
      {{ trendValue }}
    </div>
    <ng-content />
  `,
})
export class SdsKpiCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() trendDirection: 'up' | 'down' | undefined;
  @Input() trendValue = '';
  @Input() layout: 'default' | 'row' = 'default';

  get hostClasses(): string {
    return [
      'sds-kpi-card',
      this.layout === 'row' && 'sds-kpi-card--row',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get trendClasses(): string {
    return [
      'sds-kpi-card__trend',
      this.trendDirection === 'up'
        ? 'sds-kpi-card__trend--up'
        : 'sds-kpi-card__trend--down',
    ].join(' ');
  }
}
