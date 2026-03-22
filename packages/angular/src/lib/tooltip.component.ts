import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-tooltip-wrapper',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <ng-content />
    <div class="sds-tooltip" role="tooltip">
      <div *ngIf="title" class="sds-tooltip__title">{{ title }}</div>
      <div class="sds-tooltip__content">{{ content }}</div>
    </div>
  `,
})
export class SdsTooltipWrapperComponent {
  @Input() content = '';
  @Input() title = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  get hostClasses(): string {
    return [
      'sds-tooltip-wrapper',
      `sds-tooltip-wrapper--${this.position}`,
    ].join(' ');
  }
}
