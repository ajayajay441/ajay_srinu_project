import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: "app-quotationspage",
  templateUrl: "./quotationspage.component.html",
  styleUrls: ["./quotationspage.component.scss"],
})

export class QuotationspageComponent implements OnInit {
  quotationTypes: any = [
    { label: 'Quotations', value: 'quotations' },
    { label: 'Contracts', value: 'contracts' },
  ];
  quotationType = 'quotations'; // default selection
  filter: string = '';
  modelChanged: Subject<string> = new Subject<string>();
  constructor(private router: Router) {
    this.modelChanged.pipe(
      debounceTime(1000)
    ).pipe(
      distinctUntilChanged()
    )
      // wait 300ms after the last event before emitting last event
      // only emit if value is different from previous value
      .subscribe(filter => this.filter = filter);
  }

  filterChanged(filter: string) {
    this.modelChanged.next(filter);
  }

  ngOnInit(): void { }
}
