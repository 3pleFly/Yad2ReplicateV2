import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangedSelect } from '../../models/ranged-select.interface';
import { LocalisationService } from 'src/app/core/services/localisation.service';

@Component({
  selector: 'app-ranged-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select class="select" (change)="selectFrom($event)">
      <option hidden disabled selected>{{ local.placeholder_from }}</option>
      <option value="all">{{ local.all }}</option>
      <option *ngFor="let num of numbers">{{ num }}</option>
    </select>
    <select class="select" (change)="selectTo($event)">
      <option hidden disabled selected>{{ local.placeholder_to }}</option>
      <option value="all">{{ local.all }}</option>
      <option *ngFor="let num of numbers">{{ num }}</option>
    </select>
  `,
  styleUrls: ['./ranged-select.component.css'],
})
export default class RangedSelectComponent implements OnInit {
  constructor(private localService: LocalisationService) {}
  @Input() range!: RangedSelect;
  @Input() max!: number;
  @Input() increment!: number;
  @Output() newRange = new EventEmitter<RangedSelect>();

  local = this.localService.searchbox;

  numbers = [0];

  ngOnInit(): void {
    this.generateRange();
  }

  selectFrom(e: any) {
    const newRange = { ...this.range, from: e.target.value };
    this.newRange.emit(newRange);
  }

  selectTo(e: any) {
    const newRange = { ...this.range, to: e.target.value };
    this.newRange.emit(newRange);
  }

  generateRange() {
    let currentNum = 0;
    while (currentNum < this.max) {
      currentNum += this.increment;
      this.numbers.push(currentNum);
    }
  }
}
