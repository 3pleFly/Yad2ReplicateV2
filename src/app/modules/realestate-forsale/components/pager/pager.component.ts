import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit {
  localService = inject(LocalisationService);

  local = this.localService.navigation;
  orangeArrow = this.localService.images.buttons.orangeArrow;
  grayArrow = this.localService.images.buttons.grayArrow;

  @Input() displayedPages: number = 7;
  @Input() currentPage: number = 1;

  _maxPageIndex: number = 10;

  get maxPageIndex(): number {
    return this._maxPageIndex;
  }

  @Input() set maxPageIndex(value: number) {
    this._maxPageIndex = value;
    this.changePage(1);
  }

  @Output() pageChange = new EventEmitter<number>();

  pageNumbers!: number[];

  ngOnInit(): void {
    this.changePage(1);
  }

  changePage(pageIndex: number) {
    let pageNumbers: number[] = [];

    if (this.maxPageIndex < this.displayedPages) {
      pageNumbers = Array.from({ length: this.maxPageIndex }, (_, i) => i + 1);
      pageNumbers.shift();
      this.setAndEmitPage(pageIndex, pageNumbers);
      return;
    } else if (pageIndex === this.maxPageIndex) {
      let start = pageIndex - this.displayedPages;

      pageNumbers = Array.from(
        { length: this.displayedPages + 1 },
        (_) => start++
      );
    } else if (pageIndex > this.displayedPages) {
      let start = pageIndex - this.displayedPages + 1;

      pageNumbers = Array.from(
        { length: this.displayedPages + 1 },
        (_) => start++
      );
    } else {
      pageNumbers = Array.from(
        { length: this.displayedPages + 1 },
        (_, i) => i + 1
      );
    }
    if (pageIndex < this.maxPageIndex - 1) pageNumbers.shift();

    this.setAndEmitPage(pageIndex, pageNumbers);
  }

  setAndEmitPage(pageIndex: number, pageNumbers: number[]) {
    this.pageNumbers = pageNumbers;
    this.currentPage = pageIndex;
    this.pageChange.emit(pageIndex);
  }

  isNextPageButtonDisabled() {
    return this.maxPageIndex === this.currentPage;
  }

  isPrevPageButtonDisabled() {
    return this.currentPage === 1;
  }

  showStartingElipsis() {
    return this.currentPage > this.displayedPages;
  }

  hideEndingElipsis() {
    return (
      this.maxPageIndex - this.currentPage >= 3 &&
      this.maxPageIndex > this.displayedPages
    );
  }

  hideMaxPageIndex() {
    return (
      this.maxPageIndex - this.currentPage > 1 &&
      this.maxPageIndex > this.displayedPages
    );
  }
}
