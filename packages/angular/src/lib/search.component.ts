import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-search',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <span class="sds-search__icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M11.5 11.5L14.5 14.5M10.5 6.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </span>
    <input
      type="search"
      class="sds-search__input"
      [value]="value"
      [placeholder]="placeholder"
      (input)="onInput($event)"
    />
    <button
      *ngIf="value"
      type="button"
      class="sds-search__clear"
      (click)="onClear()"
      aria-label="Clear search"
    >
      &times;
    </button>
  `,
})
export class SdsSearchComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() value = '';
  @Input() placeholder = 'Search…';
  @Output() valueChange = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  get hostClasses(): string {
    return [
      'sds-search',
      `sds-search--${this.size}`,
    ].join(' ');
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onClear(): void {
    this.value = '';
    this.valueChange.emit('');
    this.cleared.emit();
  }
}
