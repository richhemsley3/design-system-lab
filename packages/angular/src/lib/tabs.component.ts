import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Tabs ---------- */

@Component({
  selector: 'sds-tabs',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsTabsComponent {
  @Input() size: 'sm' | 'md' = 'md';

  get hostClasses(): string {
    return [
      'sds-tabs',
      this.size === 'sm' && 'sds-tabs--sm',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Tab ---------- */

@Component({
  selector: 'sds-tab',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'tab',
    '[attr.aria-selected]': 'active',
  },
  template: `
    {{ label }}
    <span *ngIf="badge !== undefined" class="sds-tab-badge">{{ badge }}</span>
  `,
})
export class SdsTabComponent {
  @Input() label = '';
  @Input() active = false;
  @Input() badge: string | number | undefined;

  get hostClasses(): string {
    return [
      'sds-tab',
      this.active && 'is-active',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Tab Panel ---------- */

@Component({
  selector: 'sds-tab-panel',
  standalone: true,
  host: {
    class: 'sds-tab-panel',
    'role': 'tabpanel',
  },
  template: `<ng-content />`,
})
export class SdsTabPanelComponent {}
