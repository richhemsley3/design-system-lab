import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Dropdown Menu ---------- */

@Component({
  selector: 'sds-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-dropdown-menu',
    'role': 'menu',
  },
  template: `<ng-content />`,
})
export class SdsDropdownMenuComponent {}

/* ---------- Dropdown Item ---------- */

@Component({
  selector: 'sds-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'menuitem',
    '[attr.aria-disabled]': 'disabled',
  },
  template: `<ng-content />`,
})
export class SdsDropdownItemComponent {
  @Input() danger = false;
  @Input() disabled = false;

  get hostClasses(): string {
    return [
      'sds-dropdown-item',
      this.danger && 'sds-dropdown-item--danger',
      this.disabled && 'sds-dropdown-item--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Dropdown Divider ---------- */

@Component({
  selector: 'sds-dropdown-divider',
  standalone: true,
  host: {
    class: 'sds-dropdown-divider',
    'role': 'separator',
  },
  template: ``,
})
export class SdsDropdownDividerComponent {}

/* ---------- Dropdown Header ---------- */

@Component({
  selector: 'sds-dropdown-header',
  standalone: true,
  host: {
    class: 'sds-dropdown-header',
  },
  template: `<ng-content />`,
})
export class SdsDropdownHeaderComponent {}
