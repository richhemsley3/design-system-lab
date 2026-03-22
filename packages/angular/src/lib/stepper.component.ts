import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Stepper ---------- */

@Component({
  selector: 'sds-stepper',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsStepperComponent {
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() compact = false;

  get hostClasses(): string {
    return [
      'sds-stepper',
      `sds-stepper--${this.direction}`,
      this.compact && 'sds-stepper--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Step ---------- */

@Component({
  selector: 'sds-step',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-step__indicator"></div>
    <div class="sds-step__content">
      <div *ngIf="label" class="sds-step__label">{{ label }}</div>
      <div *ngIf="description" class="sds-step__description">{{ description }}</div>
      <ng-content />
    </div>
  `,
})
export class SdsStepComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() status: 'complete' | 'active' | 'pending' = 'pending';

  get hostClasses(): string {
    return [
      'sds-step',
      `sds-step--${this.status}`,
    ].join(' ');
  }
}
