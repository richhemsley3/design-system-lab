import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- SegmentedControl ---------- */

@Component({
  selector: 'sds-segmented-control',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'radiogroup',
  },
  template: `<ng-content />`,
})
export class SdsSegmentedControlComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() block = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  get hostClasses(): string {
    return [
      'sds-segmented',
      this.size === 'sm' && 'sds-segmented--sm',
      this.size === 'lg' && 'sds-segmented--lg',
      this.block && 'sds-segmented--block',
    ]
      .filter(Boolean)
      .join(' ');
  }

  selectOption(optionValue: string): void {
    this.value = optionValue;
    this.valueChange.emit(optionValue);
  }
}

/* ---------- SegmentedOption ---------- */

@Component({
  selector: 'sds-segmented-option',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'radio',
    '[attr.aria-checked]': 'active',
    '(click)': 'onClick()',
  },
  template: `<ng-content />`,
})
export class SdsSegmentedOptionComponent {
  @Input() value = '';
  @Input() active = false;

  get hostClasses(): string {
    return [
      'sds-segmented__option',
      this.active && 'sds-segmented__option--active',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(): void {
    // Parent component handles selection via valueChange
  }
}
