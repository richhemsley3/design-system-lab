import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-skeleton',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    '[style.width]': 'width',
    '[style.height]': 'height',
  },
  template: ``,
})
export class SdsSkeletonComponent {
  @Input() variant: 'text' | 'circle' | 'rect' = 'text';
  @Input() width: string | undefined;
  @Input() height: string | undefined;

  get hostClasses(): string {
    return [
      'sds-skeleton',
      `sds-skeleton--${this.variant}`,
    ].join(' ');
  }
}
