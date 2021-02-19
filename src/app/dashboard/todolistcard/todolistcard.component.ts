import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolistcard',
  templateUrl: './todolistcard.component.html',
  styleUrls: ['./todolistcard.component.scss']
})
export class TodolistcardComponent implements OnInit {
  test_checkbox = true;
  constructor() { }

  ngOnInit(): void {
  }

}
