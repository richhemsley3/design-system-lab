import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ---------- SplitView ---------- */

@Component({
  selector: 'sds-split-view',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `<ng-content />`,
})
export class SdsSplitViewComponent {
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() bordered = false;

  get hostClasses(): string {
    return [
      'sds-split',
      this.direction === 'vertical' && 'sds-split--vertical',
      this.bordered && 'sds-split--bordered',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/* ---------- SplitPane ---------- */

@Component({
  selector: 'sds-split-pane',
  standalone: true,
  host: {
    class: 'sds-split__pane',
  },
  template: `<ng-content />`,
})
export class SdsSplitPaneComponent {}
