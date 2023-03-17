import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-input.component.html',
  styleUrls: ['./common-input.component.css'],
})
export class CommonInputComponent {
  constructor() {}

  @Input() placeholder!: string;
  @Input() labelName!: string;
  @Input() readonly!: boolean;
}
