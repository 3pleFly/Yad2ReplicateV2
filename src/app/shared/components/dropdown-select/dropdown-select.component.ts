import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { RequiredAsteriskPipe } from '../../pipes/required-asterisk.pipe';

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [CommonModule, RequiredAsteriskPipe],
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectComponent {
  constructor(private localService: LocalisationService) {}
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() options!: string[];
  @Input() required = false;

  @Input()
  get selectedOption(): string {
    return this._selectedOption;
  }
  set selectedOption(option: string) {
    this._selectedOption = option;
    this.select.emit(option);
    this.inputValue = option;
  }
  private _selectedOption!: string;

  @Output() select = new EventEmitter<string | null>();

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
  }

  toggleDropdownView(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.optionsDropdownView = !this.optionsDropdownView;
  }

  @HostListener('focusout')
  closeDropdown() {
    this.optionsDropdownView = false;
  }
}
