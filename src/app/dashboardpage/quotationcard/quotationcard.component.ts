import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotationcard',
  templateUrl: './quotationcard.component.html',
  styleUrls: ['./quotationcard.component.scss']
})
export class QuotationcardComponent implements OnInit {
  test_checkbox: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
