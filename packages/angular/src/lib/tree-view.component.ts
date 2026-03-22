import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- Tree View ---------- */

@Component({
  selector: 'sds-tree-view',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'sds-tree-view',
    'role': 'tree',
  },
  template: `<ng-content />`,
})
export class SdsTreeViewComponent {}

/* ---------- Tree Item ---------- */

@Component({
  selector: 'sds-tree-item',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'treeitem',
    '[attr.aria-expanded]': 'hasChildren ? expanded : null',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled',
  },
  template: `
    <div class="sds-tree-item__row" (click)="toggle()">
      <span
        *ngIf="hasChildren"
        class="sds-tree-item__expand"
        [class.sds-tree-item__expand--open]="expanded"
      >
        &#9656;
      </span>
      <span *ngIf="icon" class="sds-tree-item__icon">{{ icon }}</span>
      <span class="sds-tree-item__label">{{ label }}</span>
    </div>
    <div *ngIf="expanded" class="sds-tree-item__children" role="group">
      <ng-content />
    </div>
  `,
})
export class SdsTreeItemComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() selected = false;
  @Input() disabled = false;
  @Input() expanded = false;

  get hasChildren(): boolean {
    return true; // Overridden by content projection presence in real usage
  }

  get hostClasses(): string {
    return [
      'sds-tree-item',
      this.selected && 'sds-tree-item--selected',
      this.disabled && 'sds-tree-item--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  toggle(): void {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }
}
