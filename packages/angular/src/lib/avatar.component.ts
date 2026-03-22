import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sds-avatar',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
  },
  template: `
    <img *ngIf="src; else fallback" [src]="src" [alt]="alt" />
    <ng-template #fallback>
      <ng-container *ngIf="initials; else contentSlot">{{ initials }}</ng-container>
      <ng-template #contentSlot><ng-content /></ng-template>
    </ng-template>
    <span
      *ngIf="status"
      [class]="'sds-avatar-status sds-avatar-status--' + status"
    ></span>
  `,
})
export class SdsAvatarComponent {
  @Input() initials = '';
  @Input() src = '';
  @Input() alt = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color: 'teal' | 'coral' | 'green' | 'gray' | undefined;
  @Input() status: 'online' | 'away' | 'busy' | 'offline' | undefined;

  get hostClasses(): string {
    return [
      'sds-avatar',
      this.size !== 'md' && `sds-avatar--${this.size}`,
      this.color && `sds-avatar--${this.color}`,
      this.src && 'sds-avatar--image',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
