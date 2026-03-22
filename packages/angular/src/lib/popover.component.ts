import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-popover-wrapper',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <ng-content />
    <div *ngIf="open" class="sds-popover" role="dialog">
      <div *ngIf="title" class="sds-popover__header">
        <div class="sds-popover__title">{{ title }}</div>
        <button
          type="button"
          class="sds-popover__close"
          (click)="closed.emit()"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
      <div class="sds-popover__body">
        <ng-content select="[sdsPopoverBody]" />
      </div>
    </div>
  `,
})
export class SdsPopoverWrapperComponent {
  @Input() open = false;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();

  get hostClasses(): string {
    return [
      'sds-popover-wrapper',
      `sds-popover-wrapper--${this.position}`,
    ].join(' ');
  }
}
