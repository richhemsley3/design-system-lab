import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-checkbox',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <label [class]="hostClasses">
      <input
        #inputEl
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        hidden
      />
      <span class="sds-checkbox-box">
        <span *ngIf="indeterminate" class="sds-checkbox-dash"></span>
        <svg *ngIf="!indeterminate" viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path
            d="M1 5l3.5 3.5L11 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      {{ label }}
    </label>
  `,
})
export class SdsCheckboxComponent implements AfterViewInit, OnChanges {
  @Input() label = '';
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  get hostClasses(): string {
    return [
      'sds-checkbox',
      this.indeterminate && 'sds-checkbox--indeterminate',
      this.disabled && 'sds-checkbox--disabled',
    ]
      .filter(Boolean)
      .join(' ');
  }

  ngAfterViewInit(): void {
    this.syncIndeterminate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indeterminate'] && this.inputEl) {
      this.syncIndeterminate();
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }

  private syncIndeterminate(): void {
    if (this.inputEl?.nativeElement) {
      this.inputEl.nativeElement.indeterminate = this.indeterminate;
    }
  }
}
