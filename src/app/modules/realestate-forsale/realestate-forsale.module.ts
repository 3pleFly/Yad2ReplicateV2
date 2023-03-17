import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealestateForsaleRoutingModule } from './realestate-forsale-routing.module';
import { RealestateForsaleComponent } from './components/realestate-forsale/realestate-forsale.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SearchBoxComponent } from 'src/app/modules/realestate-forsale/components/search-box/search-box.component';
import { CheckmarkControlComponent } from 'src/app/shared/components/checkmark-control/checkmark-control.component';
import { SelectDropdownCheckboxComponent } from 'src/app/shared/components/select-dropdown-checkbox/select-dropdown-checkbox.component';
import RangedSelectComponent from 'src/app/shared/components/ranged-select/ranged-select.component';
import { CommonInputComponent } from 'src/app/shared/components/common-input/common-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdPreviewerComponent } from './components/ad-previewer/ad-previewer.component';

@NgModule({
  declarations: [
    RealestateForsaleComponent,
    SearchBoxComponent,
    AdPreviewerComponent,
  ],
  imports: [
    CommonModule,
    RealestateForsaleRoutingModule,
    NavbarComponent,
    SelectDropdownCheckboxComponent,
    CheckmarkControlComponent,
    RangedSelectComponent,
    CommonInputComponent,
    FontAwesomeModule,
  ],
})
export default class RealestateForsaleModule {}
