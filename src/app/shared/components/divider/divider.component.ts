import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent {

}
