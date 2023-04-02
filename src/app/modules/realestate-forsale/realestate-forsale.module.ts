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
import { AdPreviewerComponent } from './components/ad-previewer/ad-previewer.component';
import { PagerComponent } from './components/pager/pager.component';
import { AdService } from './services/ad.service';
import { AdContainerComponent } from './components/ad-container/ad-container.component';
import { RecentlySoldBoxComponent } from './components/recently-sold-box/recently-sold-box.component';
import { Yad2TranslationPipe } from "../../shared/pipes/translate.pipe";
@NgModule({
    declarations: [
        RealestateForsaleComponent,
        SearchBoxComponent,
        AdPreviewerComponent,
        PagerComponent,
        NavbarComponent,
        AdContainerComponent,
        RecentlySoldBoxComponent,
    ],
    providers: [AdService],
    imports: [
        CommonModule,
        RealestateForsaleRoutingModule,
        SelectDropdownCheckboxComponent,
        CheckmarkControlComponent,
        RangedSelectComponent,
        CommonInputComponent,
        FontAwesomeModule,
        Yad2TranslationPipe
    ]
})
export default class RealestateForsaleModule {}
