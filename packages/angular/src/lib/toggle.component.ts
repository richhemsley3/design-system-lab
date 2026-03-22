import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [class]="hostClasses">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        hidden
      />
      <span class="sds-toggle-track">
        <span class="sds-toggle-knob"></span>
      </span>
      {{ label }}
    </label>
  `,
})
export class SdsToggleComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  get hostClasses(): string {
    return [
      'sds-toggle',
      this.disabled && 'sds-toggle--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
