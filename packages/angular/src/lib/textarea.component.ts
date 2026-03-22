import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

let nextId = 0;

@Component({
  selector: 'sds-textarea-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sds-field">
      <label
        *ngIf="label"
        [attr.for]="textareaId"
        [class.sds-field-label]="true"
        [class.sds-field-label--required]="required"
      >
        {{ label }}
      </label>
      <textarea
        [id]="textareaId"
        [class]="textareaClasses"
        [required]="required"
        [attr.maxlength]="maxLength || null"
        (input)="onInput($event)"
      ></textarea>
      <div *ngIf="showCharCount || error || helperText" class="sds-textarea-footer">
        <p *ngIf="error" class="sds-field-error">{{ error }}</p>
        <p *ngIf="!error && helperText" class="sds-field-helper">{{ helperText }}</p>
        <span
          *ngIf="showCharCount"
          [class.sds-textarea-charcount]="true"
          [class.sds-textarea-charcount--over]="isOver"
        >
          {{ charCount }}{{ maxLength ? '/' + maxLength : '' }}
        </span>
      </div>
    </div>
  `,
})
export class SdsTextareaFieldComponent {
  @Input() label = '';
  @Input() helperText = '';
  @Input() error = '';
  @Input() maxLength: number | undefined;
  @Input() showCharCount = false;
  @Input() required = false;

  textareaId = `sds-textarea-${nextId++}`;
  charCount = 0;

  get isOver(): boolean {
    return this.maxLength !== undefined && this.charCount > this.maxLength;
  }

  get textareaClasses(): string {
    return [
      'sds-textarea',
      this.error && 'sds-textarea--error',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.charCount = target.value.length;
  }
}
