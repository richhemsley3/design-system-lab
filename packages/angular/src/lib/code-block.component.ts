import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-code-block',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div class="sds-code-block__header">
      <span *ngIf="language" class="sds-code-block__language">{{ language }}</span>
      <button
        type="button"
        class="sds-code-block__copy"
        (click)="copyCode()"
      >
        Copy
      </button>
    </div>
    <pre class="sds-code-block__pre"><code class="sds-code-block__code">{{ code }}</code></pre>
  `,
})
export class SdsCodeBlockComponent {
  @Input() code = '';
  @Input() language = '';
  @Input() showLineNumbers = false;
  @Input() compact = false;

  get hostClasses(): string {
    return [
      'sds-code-block',
      this.showLineNumbers && 'sds-code-block--line-numbers',
      this.compact && 'sds-code-block--compact',
    ]
      .filter(Boolean)
      .join(' ');
  }

  copyCode(): void {
    navigator.clipboard?.writeText(this.code);
  }
}
