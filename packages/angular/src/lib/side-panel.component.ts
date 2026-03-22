import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-side-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="open">
      <div class="sds-side-panel-overlay is-open" (click)="onOverlayClick()">
        <div
          [class]="panelClasses"
          role="dialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <div *ngIf="title" class="sds-side-panel-header">
            <span>{{ title }}</span>
            <button type="button" (click)="closed.emit()" aria-label="Close">
              &times;
            </button>
          </div>
          <ng-content />
        </div>
      </div>
    </ng-container>
  `,
})
export class SdsSidePanelComponent {
  @Input() open = false;
  @Input() side: 'left' | 'right' = 'right';
  @Input() width: 'narrow' | 'medium' | 'wide' = 'medium';
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();

  get panelClasses(): string {
    return [
      'sds-side-panel',
      `sds-side-panel--${this.side}`,
      `sds-side-panel--${this.width}`,
    ].join(' ');
  }

  onOverlayClick(): void {
    this.closed.emit();
  }
}
