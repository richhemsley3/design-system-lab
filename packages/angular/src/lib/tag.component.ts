import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-tag',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <span *ngIf="dot" class="sds-tag-dot"></span>
    <ng-content />
  `,
})
export class SdsTagComponent {
  @Input() status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | undefined;
  @Input() variant: 'filled' | 'outline' = 'filled';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dot = false;

  get hostClasses(): string {
    return [
      'sds-tag',
      this.status && `sds-tag--${this.status}`,
      this.variant === 'outline' && 'sds-tag--outline',
      this.size !== 'md' && `sds-tag--${this.size}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
