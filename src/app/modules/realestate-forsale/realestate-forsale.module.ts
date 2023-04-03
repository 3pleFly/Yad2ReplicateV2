import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealestateForsaleRoutingModule } from './realestate-forsale-routing.module';
import { RealestateForsaleComponent } from './components/realestate-forsale/realestate-forsale.component';
import { NavbarComponent } from 'src/app/modules/realestate-forsale/components/navbar/navbar.component';
import { SearchBoxComponent } from 'src/app/modules/realestate-forsale/components/search-box/search-box.component';
import { CheckmarkControlComponent } from 'src/app/shared/components/checkmark-control/checkmark-control.component';
import { SelectDropdownCheckboxComponent } from 'src/app/shared/components/select-dropdown-checkbox/select-dropdown-checkbox.component';
import RangedSelectComponent from 'src/app/shared/components/ranged-select/ranged-select.component';
import { CommonInputComponent } from 'src/app/shared/components/common-input/common-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdContainerComponent as AdContainerComponent } from './components/ad-previewer/ad-container.component';
import { PagerComponent } from './components/pager/pager.component';
import { RecentlySoldBoxComponent } from './components/recently-sold-box/recently-sold-box.component';
import { Yad2TranslationPipe } from "../../shared/pipes/translate.pipe";
import { RealestateDataService } from './services/realestate-data.service';
import { IconComponent } from "../../shared/components/icon/icon.component";
@NgModule({
    declarations: [
        RealestateForsaleComponent,
        SearchBoxComponent,
        AdContainerComponent,
        PagerComponent,
        NavbarComponent,
        RecentlySoldBoxComponent,
    ],
    providers: [RealestateDataService],
    imports: [
        CommonModule,
        RealestateForsaleRoutingModule,
        SelectDropdownCheckboxComponent,
        CheckmarkControlComponent,
        RangedSelectComponent,
        CommonInputComponent,
        FontAwesomeModule,
        Yad2TranslationPipe,
        IconComponent
    ]
})
export default class RealestateForsaleModule {}
