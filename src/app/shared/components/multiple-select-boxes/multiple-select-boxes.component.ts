import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueString } from 'src/app/core/models/key-value-string.type';
import { TranslationType } from '../../models/translation-type.interface';
import { Yad2TranslationPipe } from "../../pipes/translate.pipe";
@Component({
    selector: 'app-multiple-select-boxes',
    standalone: true,
    template: `
    <span class="label_text">{{ label }}</span>
    <ul class="boxes">
      <li
        (click)="toggleSelection(option)"
        [ngClass]="{ selected: isSelected(option) }"
        *ngFor="let option of options"
      >
        <ng-container *ngIf="getImgSrc(option) as imgSrc">
          <img [src]="imgSrc" />
        </ng-container>
        <span>
          {{ option | yad2Translate : localisationSrc }}
        </span>
      </li>
    </ul>
  `,
    styleUrls: ['./multiple-select-boxes.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, Yad2TranslationPipe]
})
export class MultipleSelectBoxesComponent {
  @Input() options: string[] | null = null;
  @Input() label = '';
  @Input() imgSrcs!: KeyValueString;
  @Input() localisationSrc!: TranslationType;


  @Output() optionsChange = new EventEmitter<string[]>();

  selectedOptions: string[] = [];

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  toggleSelection(option: string) {
    if (this.isSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter((o) => o !== option);
    } else {
      this.selectedOptions.push(option);
    }
    this.optionsChange.emit([...this.selectedOptions]);
  }

  getImgSrc(option: string) {
    if (this.imgSrcs) {
      return this.imgSrcs[option];
    }
    return null;
  }
}
