import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

let nextId = 0;

@Component({
  selector: 'sds-input-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sds-field">
      <label
        *ngIf="label"
        [attr.for]="inputId"
        [class.sds-field-label]="true"
        [class.sds-field-label--required]="required"
      >
        {{ label }}
      </label>
      <div class="sds-input-wrapper">
        <input
          [id]="inputId"
          [class]="inputClasses"
          [required]="required"
        />
      </div>
      <p *ngIf="error" class="sds-field-error">{{ error }}</p>
      <p *ngIf="!error && success" class="sds-field-success">{{ success }}</p>
      <p *ngIf="!error && !success && helperText" class="sds-field-helper">{{ helperText }}</p>
    </div>
  `,
})
export class SdsInputFieldComponent {
  @Input() label = '';
  @Input() helperText = '';
  @Input() error = '';
  @Input() success = '';
  @Input() inputSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() required = false;

  inputId = `sds-input-${nextId++}`;

  get inputClasses(): string {
    return [
      'sds-input',
      this.inputSize !== 'md' && `sds-input--${this.inputSize}`,
      this.error && 'sds-input--error',
      this.success && !this.error && 'sds-input--success',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
