import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-file-upload',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <div
      class="sds-file-upload__dropzone"
      (dragover)="onDragOver($event)"
      (dragleave)="dragging = false"
      (drop)="onDrop($event)"
      [class.sds-file-upload__dropzone--dragging]="dragging"
    >
      <ng-content />
      <input
        #fileInput
        type="file"
        class="sds-file-upload__input"
        [accept]="accept"
        [multiple]="multiple"
        [disabled]="disabled"
        (change)="onFileChange($event)"
      />
    </div>
    <div *ngIf="hint" class="sds-file-upload__hint">{{ hint }}</div>
  `,
})
export class SdsFileUploadComponent {
  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() hint = '';
  @Output() filesSelected = new EventEmitter<FileList>();

  dragging = false;

  get hostClasses(): string {
    return [
      'sds-file-upload',
      this.disabled && 'sds-file-upload--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    if (!this.disabled && event.dataTransfer?.files) {
      this.filesSelected.emit(event.dataTransfer.files);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.filesSelected.emit(input.files);
    }
  }
}
