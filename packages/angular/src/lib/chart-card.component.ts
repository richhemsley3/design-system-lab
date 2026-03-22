import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-chart-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-chart-card',
  },
  template: `
    <div *ngIf="title" class="sds-chart-card__header">
      <div class="sds-chart-card__title">{{ title }}</div>
      <ng-content select="[sdsChartCardActions]" />
    </div>
    <div class="sds-chart-card__body">
      <ng-content />
    </div>
  `,
})
export class SdsChartCardComponent {
  @Input() title = '';
}
