import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-header',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-header',
  },
  template: `
    <div *ngIf="logo" class="sds-header-logo">
      <ng-content select="[sdsHeaderLogo]" />
    </div>
    <div class="sds-header-actions">
      <ng-content />
    </div>
  `,
})
export class SdsHeaderComponent {
  @Input() logo = false;
}
