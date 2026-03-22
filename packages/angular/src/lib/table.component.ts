import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-table-wrapper',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-table-container',
  },
  template: `
    <div [class]="tableClasses">
      <ng-content />
    </div>
  `,
})
export class SdsTableWrapperComponent {
  @Input() striped = false;
  @Input() hoverable = false;
  @Input() compact = false;

  get tableClasses(): string {
    return [
      'sds-table',
      this.striped && 'sds-table--striped',
      this.hoverable && 'sds-table--hoverable',
      this.compact && 'sds-table--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
