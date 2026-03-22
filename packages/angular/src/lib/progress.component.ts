import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-progress',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'progressbar',
    '[attr.aria-valuenow]': 'indeterminate ? undefined : value',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
  },
  template: `
    <div *ngIf="label" class="sds-progress__label">
      <span>{{ label }}</span>
      <span *ngIf="!indeterminate">{{ value }}%</span>
    </div>
    <div class="sds-progress__track">
      <div
        class="sds-progress__bar"
        [style.width.%]="indeterminate ? 100 : value"
      ></div>
    </div>
  `,
})
export class SdsProgressComponent {
  @Input() value = 0;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() status: 'default' | 'success' | 'warning' | 'error' = 'default';
  @Input() indeterminate = false;
  @Input() label = '';

  get hostClasses(): string {
    return [
      'sds-progress',
      `sds-progress--${this.size}`,
      this.status !== 'default' && `sds-progress--${this.status}`,
      this.indeterminate && 'sds-progress--indeterminate',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
