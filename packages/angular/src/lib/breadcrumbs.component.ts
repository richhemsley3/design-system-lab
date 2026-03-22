import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Breadcrumbs ---------- */

@Component({
  selector: 'sds-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-breadcrumb',
    'aria-label': 'Breadcrumb',
  },
  template: `
    <ol class="sds-breadcrumb__list">
      <ng-content />
    </ol>
  `,
})
export class SdsBreadcrumbsComponent {}

/* ---------- BreadcrumbItem ---------- */

@Component({
  selector: 'sds-breadcrumb-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-breadcrumb__item',
  },
  template: `
    <span *ngIf="current; else linkRef" class="sds-breadcrumb__current" aria-current="page">
      <ng-container *ngTemplateOutlet="contentTpl" />
    </span>
    <ng-template #linkRef>
      <a class="sds-breadcrumb__link" [attr.href]="href">
        <ng-container *ngTemplateOutlet="contentTpl" />
      </a>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content />
    </ng-template>
  `,
})
export class SdsBreadcrumbItemComponent {
  @Input() href = '';
  @Input() current = false;
}
