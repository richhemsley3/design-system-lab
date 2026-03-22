import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Command Palette ---------- */

@Component({
  selector: 'sds-command-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="open">
      <div class="sds-command-palette-overlay" (click)="closed.emit()">
        <div
          class="sds-command-palette"
          role="dialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <ng-content />
        </div>
      </div>
    </ng-container>
  `,
})
export class SdsCommandPaletteComponent {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();
}

/* ---------- Command Group ---------- */

@Component({
  selector: 'sds-command-group',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-command-group',
    'role': 'group',
  },
  template: `<ng-content />`,
})
export class SdsCommandGroupComponent {}

/* ---------- Command Item ---------- */

@Component({
  selector: 'sds-command-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-command-item',
    'role': 'option',
  },
  template: `<ng-content />`,
})
export class SdsCommandItemComponent {}
