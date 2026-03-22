import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Card ---------- */

@Component({
  selector: 'sds-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-card',
  },
  template: `<ng-content />`,
})
export class SdsCardComponent {}

/* ---------- Card Header ---------- */

@Component({
  selector: 'sds-card-header',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div *ngIf="title" class="sds-card-title">{{ title }}</div>
    <ng-content />
    <ng-content select="[sdsCardActions]" />
  `,
})
export class SdsCardHeaderComponent {
  @Input() title = '';
  @Input() bordered = false;

  get hostClasses(): string {
    return [
      'sds-card-header',
      this.bordered && 'sds-card-header--bordered',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Card Body ---------- */

@Component({
  selector: 'sds-card-body',
  standalone: true,
  host: {
    class: 'sds-card-body',
  },
  template: `<ng-content />`,
})
export class SdsCardBodyComponent {}

/* ---------- Card Footer ---------- */

@Component({
  selector: 'sds-card-footer',
  standalone: true,
  host: {
    class: 'sds-card-footer',
  },
  template: `<ng-content />`,
})
export class SdsCardFooterComponent {}
