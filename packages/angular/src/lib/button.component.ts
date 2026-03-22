import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-button',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <ng-content select="[sdsButtonIcon]" />
    <ng-content *ngIf="!iconOnly" />
  `,
})
export class SdsButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon = false;
  @Input() iconOnly = false;

  get hostClasses(): string {
    return [
      'sds-btn',
      `sds-btn--${this.variant}`,
      `sds-btn--${this.size}`,
      this.icon && 'sds-btn--icon',
      this.iconOnly && 'sds-btn--icon-only',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
