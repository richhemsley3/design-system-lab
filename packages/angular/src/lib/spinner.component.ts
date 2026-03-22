import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-spinner',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    'role': 'status',
    '[attr.aria-label]': '"Loading"',
  },
  template: `
    <svg class="sds-spinner__svg" viewBox="0 0 24 24" fill="none">
      <circle
        class="sds-spinner__track"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        stroke-width="3"
        opacity="0.25"
      />
      <path
        class="sds-spinner__arc"
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  `,
})
export class SdsSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() onDark = false;
  @Input() inline = false;

  get hostClasses(): string {
    return [
      'sds-spinner',
      `sds-spinner--${this.size}`,
      this.onDark && 'sds-spinner--on-dark',
      this.inline && 'sds-spinner--inline',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
