import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Modal ---------- */

@Component({
  selector: 'sds-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="open">
      <div class="sds-modal-overlay is-open" (click)="onOverlayClick()">
        <div
          [class]="modalClasses"
          role="dialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <div *ngIf="title" class="sds-modal-header">
            <div class="sds-modal-header__title">{{ title }}</div>
            <button
              type="button"
              class="sds-modal-header__close"
              (click)="closed.emit()"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <ng-content />
        </div>
      </div>
    </ng-container>
  `,
})
export class SdsModalComponent {
  @Input() open = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();

  get modalClasses(): string {
    return ['sds-modal', `sds-modal--${this.size}`].join(' ');
  }

  onOverlayClick(): void {
    this.closed.emit();
  }
}

/* ---------- Modal Body ---------- */

@Component({
  selector: 'sds-modal-body',
  standalone: true,
  host: {
    class: 'sds-modal-body',
  },
  template: `<ng-content />`,
})
export class SdsModalBodyComponent {}

/* ---------- Modal Footer ---------- */

@Component({
  selector: 'sds-modal-footer',
  standalone: true,
  host: {
    class: 'sds-modal-footer',
  },
  template: `<ng-content />`,
})
export class SdsModalFooterComponent {}
