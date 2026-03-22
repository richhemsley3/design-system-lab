import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [class]="hostClasses">
      <input
        type="radio"
        [checked]="checked"
        [disabled]="disabled"
        [name]="name"
        [value]="value"
        (change)="onSelect()"
        hidden
      />
      <span class="sds-radio-circle">
        <span class="sds-radio-dot"></span>
      </span>
      {{ label }}
    </label>
  `,
})
export class SdsRadioComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() name = '';
  @Input() value = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  get hostClasses(): string {
    return [
      'sds-radio',
      this.disabled && 'sds-radio--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onSelect(): void {
    this.checked = true;
    this.checkedChange.emit(true);
  }
}
