import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Yad2Icon } from '../../models/yad2-icon.interface';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{ grayed: grayed, 'container': true }">
      <ng-container *ngIf="icon.imgSrc">
        <img [src]="icon.imgSrc" />
      </ng-container>
      <span>
        {{ icon.name }}
      </span>
    </div>
  `,
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() icon!: Yad2Icon;
  @Input() grayed?: boolean;

  getImgSrc(key: string) {
    return '';
  }
}
