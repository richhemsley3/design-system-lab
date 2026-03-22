import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-date-picker',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <input
      type="date"
      class="sds-date-picker__input"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      (change)="onChange($event)"
    />
  `,
})
export class SdsDatePickerComponent {
  @Input() value = '';
  @Input() placeholder = 'Select date';
  @Input() disabled = false;
  @Output() dateChange = new EventEmitter<string>();

  get hostClasses(): string {
    return [
      'sds-date-picker',
      this.disabled && 'sds-date-picker--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.dateChange.emit(this.value);
  }
}
