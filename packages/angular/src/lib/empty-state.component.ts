import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-empty-state',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <ng-content select="[sdsEmptyStateIcon]" />
    <div *ngIf="heading" class="sds-empty-state__heading">{{ heading }}</div>
    <div *ngIf="description" class="sds-empty-state__description">{{ description }}</div>
    <ng-content />
  `,
})
export class SdsEmptyStateComponent {
  @Input() heading = '';
  @Input() description = '';
  @Input() compact = false;

  get hostClasses(): string {
    return [
      'sds-empty-state',
      this.compact && 'sds-empty-state--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
