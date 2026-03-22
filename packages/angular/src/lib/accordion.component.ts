import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Accordion ---------- */

@Component({
  selector: 'sds-accordion',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsAccordionComponent {
  @Input() bordered = false;

  get hostClasses(): string {
    return [
      'sds-accordion',
      this.bordered && 'sds-accordion--bordered',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- Accordion Item ---------- */

@Component({
  selector: 'sds-accordion-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-accordion-item',
  },
  template: `
    <button
      type="button"
      class="sds-accordion-header"
      [attr.aria-expanded]="expanded"
      (click)="toggle()"
    >
      <span class="sds-accordion-header-text">{{ title }}</span>
      <span class="sds-accordion-icon"></span>
    </button>
    <div *ngIf="expanded" class="sds-accordion-panel">
      <div class="sds-accordion-panel-inner">
        <ng-content />
      </div>
    </div>
  `,
})
export class SdsAccordionItemComponent {
  @Input() title = '';
  @Input() expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
