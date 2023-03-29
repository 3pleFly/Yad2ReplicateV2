import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RequiredAsteriskPipe } from '../../pipes/required-asterisk.pipe';
import { TranslationType } from '../../models/translation-type.interface';
import { Yad2TranslationPipe } from '../../pipes/translate.pipe';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessages } from '../../models/validation-messages.interface';
@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RequiredAsteriskPipe,
    Yad2TranslationPipe,
    ValidationErrorComponent,
  ],
})
export class DropdownSelectComponent implements OnInit {
  constructor(private localService: LocalisationService) {}

  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() options!: string[] | null;
  @Input() required = false;
  @Input() translatonSrc!: TranslationType;
  @Input() controlErrors!: ValidationErrors | null;
  @Input() controlTouched!: boolean;
  @Input() controlInvalid!: boolean;
  @Input() controlDirty!: boolean;
  @Input() validationMessages!: ValidationMessages;

  @Input()
  get selectedOption(): string {
    return this._selectedOption;
  }
  set selectedOption(option: string) {
    this._selectedOption = option;
    this.select.emit(option);
    this.inputValue = option;
  }

  @Output() select = new EventEmitter<string | null>();

  ngOnInit(): void {}

  private _selectedOption!: string;
  dropdownArrowImg = this.localService.main.dropdownArrowLight;
  markSelectedImg = this.localService.main.markSelected;
  optionsDropdownView = false;
  inputValue: string | null = null;

  markOption(option: string, e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (this.selectedOption === option) {
      this.select.emit(null);
      this.selectedOption = '';
      this.inputValue = null;
      return;
    }
    this.selectedOption = option;
    this.optionsDropdownView = false;
  }

  toggleDropdownView(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.optionsDropdownView = !this.optionsDropdownView;
  }

  closeDropdown(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.optionsDropdownView = false;
  }
}
