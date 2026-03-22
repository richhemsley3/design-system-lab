import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-status-indicator',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <span class="sds-status__dot"></span>
    <span *ngIf="label" class="sds-status__label">{{ label }}</span>
  `,
})
export class SdsStatusIndicatorComponent {
  @Input() status:
    | 'online'
    | 'connected'
    | 'offline'
    | 'disconnected'
    | 'warning'
    | 'degraded'
    | 'error'
    | 'critical'
    | 'scanning'
    | 'syncing' = 'online';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label = '';

  get hostClasses(): string {
    return [
      'sds-status',
      `sds-status--${this.status}`,
      this.size !== 'md' && `sds-status--${this.size}`,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
