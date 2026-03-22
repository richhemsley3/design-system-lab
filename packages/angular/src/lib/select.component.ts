import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

let nextId = 0;

@Component({
  selector: 'sds-select-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sds-field">
      <label
        *ngIf="label"
        [attr.for]="selectId"
        [class.sds-field-label]="true"
        [class.sds-field-label--required]="required"
      >
        {{ label }}
      </label>
      <select
        [id]="selectId"
        [class]="selectClasses"
        [required]="required"
      >
        <ng-content />
      </select>
      <p *ngIf="error" class="sds-field-error">{{ error }}</p>
      <p *ngIf="!error && helperText" class="sds-field-helper">{{ helperText }}</p>
    </div>
  `,
})
export class SdsSelectFieldComponent {
  @Input() label = '';
  @Input() helperText = '';
  @Input() error = '';
  @Input() selectSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() required = false;

  selectId = `sds-select-${nextId++}`;

  get selectClasses(): string {
    return [
      'sds-select',
      this.selectSize !== 'md' && `sds-select--${this.selectSize}`,
      this.error && 'sds-select--error',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
