import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- SideNavigation ---------- */

@Component({
  selector: 'sds-side-nav',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsSideNavComponent {
  @Input() collapsed = false;

  get hostClasses(): string {
    return [
      'sds-sidenav',
      this.collapsed && 'is-collapsed',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- SideNavItem ---------- */

@Component({
  selector: 'sds-side-nav-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <span *ngIf="icon" class="sds-sidenav-icon">
      <ng-content select="[sdsNavIcon]" />
    </span>
    <span class="sds-sidenav-item-label">{{ label }}</span>
    <ng-content />
  `,
})
export class SdsSideNavItemComponent {
  @Input() active = false;
  @Input() icon = false;
  @Input() label = '';

  get hostClasses(): string {
    return [
      'sds-sidenav-item',
      this.active && 'active',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- SideNavGroup ---------- */

@Component({
  selector: 'sds-side-nav-group',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-sidenav-group',
  },
  template: `
    <div class="sds-sidenav-group-label">{{ label }}</div>
    <ng-content />
  `,
})
export class SdsSideNavGroupComponent {
  @Input() label = '';
}
