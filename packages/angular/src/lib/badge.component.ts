import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-badge',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `{{ displayContent }}<ng-content *ngIf="count === undefined" />`,
})
export class SdsBadgeComponent {
  @Input() variant: 'default' | 'primary' | 'danger' | 'danger-solid' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() count: number | undefined;
  @Input() maxCount = 99;

  get hostClasses(): string {
    return [
      'sds-badge',
      `sds-badge--${this.variant}`,
      this.size !== 'md' && `sds-badge--${this.size}`,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get displayContent(): string {
    if (this.count === undefined) return '';
    return this.count > this.maxCount ? `${this.maxCount}+` : String(this.count);
  }
}
