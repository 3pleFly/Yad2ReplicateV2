import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { defaultIfEmpty, map, startWith, tap } from 'rxjs';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-realestate-forsale',
  templateUrl: './realestate-forsale.component.html',
  styleUrls: ['./realestate-forsale.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealestateForsaleComponent implements OnInit {
  adService = inject(AdService);

  propertyAdDtos$ = this.adService.getPropertyAds();

  maxAdPages$ = this.adService.getCountPropertyAds().pipe(
    map((count) => Math.floor(count / 10) + 1),
    tap((v) => console.log(v))
  );

  ngOnInit(): void {}

  onPageChange(page: number) {
    console.log('?');

    const offset = (page - 1) * 10;
    this.propertyAdDtos$ = this.adService.getPropertyAds(10, offset);
  }
}
