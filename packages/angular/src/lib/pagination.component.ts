import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-pagination',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'aria-label': 'Pagination',
  },
  template: `
    <button
      type="button"
      class="sds-pagination__arrow"
      [disabled]="currentPage <= 1"
      (click)="goToPage(currentPage - 1)"
      aria-label="Previous page"
    >
      &lsaquo;
    </button>

    <ng-container *ngIf="variant === 'simple'; else fullPages">
      <span>{{ currentPage }} of {{ totalPages }}</span>
    </ng-container>

    <ng-template #fullPages>
      <ng-container *ngFor="let item of pages">
        <button
          *ngIf="item.type === 'page'"
          type="button"
          [class]="'sds-pagination__btn' + (item.value === currentPage ? ' sds-pagination__btn--active' : '')"
          [attr.aria-current]="item.value === currentPage ? 'page' : null"
          (click)="goToPage(item.value)"
        >
          {{ item.value }}
        </button>
        <span *ngIf="item.type === 'ellipsis'" class="sds-pagination__ellipsis">&hellip;</span>
      </ng-container>
    </ng-template>

    <button
      type="button"
      class="sds-pagination__arrow"
      [disabled]="currentPage >= totalPages"
      (click)="goToPage(currentPage + 1)"
      aria-label="Next page"
    >
      &rsaquo;
    </button>
  `,
})
export class SdsPaginationComponent {
  @Input() variant: 'default' | 'simple' | 'compact' = 'default';
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get hostClasses(): string {
    return [
      'sds-pagination',
      this.variant === 'simple' && 'sds-pagination--simple',
      this.variant === 'compact' && 'sds-pagination--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get pages(): Array<{ type: 'page' | 'ellipsis'; value: number }> {
    const result: Array<{ type: 'page' | 'ellipsis'; value: number }> = [];
    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i === 1 ||
        i === this.totalPages ||
        (i >= this.currentPage - 1 && i <= this.currentPage + 1)
      ) {
        result.push({ type: 'page', value: i });
      } else if (
        (i === this.currentPage - 2 && i > 1) ||
        (i === this.currentPage + 2 && i < this.totalPages)
      ) {
        result.push({ type: 'ellipsis', value: i });
      }
    }
    return result;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
