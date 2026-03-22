import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-inline-edit',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <ng-container *ngIf="!editing; else editMode">
      <span class="sds-inline-edit__value" (click)="startEditing()">
        {{ value || '—' }}
      </span>
    </ng-container>
    <ng-template #editMode>
      <input
        class="sds-inline-edit__input"
        [value]="value"
        (keydown.enter)="save($event)"
        (keydown.escape)="cancel()"
        (blur)="save($event)"
        #editInput
      />
      <div *ngIf="error" class="sds-inline-edit__error">{{ error }}</div>
    </ng-template>
  `,
})
export class SdsInlineEditComponent {
  @Input() value = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() error = '';
  @Output() saved = new EventEmitter<string>();

  editing = false;

  get hostClasses(): string {
    return [
      'sds-inline-edit',
      `sds-inline-edit--${this.size}`,
      this.editing && 'sds-inline-edit--editing',
      this.error && 'sds-inline-edit--error',
    ]
      .filter(Boolean)
      .join(' ');
  }

  startEditing(): void {
    this.editing = true;
  }

  save(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.editing = false;
    this.saved.emit(this.value);
  }

  cancel(): void {
    this.editing = false;
  }
}
