import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() currentpage: number = 1;
  @Input() totalpages: number = 0;

  @Output() changePage = new EventEmitter<any>(true);

  disablePreviousPage: boolean = true;
  disableNextPage: boolean = true;
  private noOfPagesInView = 5;
  public pagesInView: number[] = [];
  private changeBy = 1;

  constructor() { }

  ngOnInit(): void {
    this.pagesInView = this.getPagesInView();
    console.log('this.pagesInView', this.pagesInView);
  }

  getPagesInView() {
    let initialPages: any = [...new Array(this.noOfPagesInView).keys()].map(x => ++x);
    if (this.currentpage < this.noOfPagesInView) {
      return initialPages;
    } else if (this.currentpage != this.totalpages) {
      console.log('aaa', this.changeBy, this.pagesInView.map(el => el + (this.changeBy)));
      return this.pagesInView.length ?
        this.pagesInView.map(el => el + (this.changeBy)) :
        initialPages;
    } else {
      return this.pagesInView.length ?
        this.pagesInView :
        initialPages;
    }

    // 1 => 12345
    // 2 => 12345
    // 3 => 12345
    // 4 => 12345
    // 5 => 23456
    // 6 => 34567
    // 7 => 45678
    // 8 => 56789
    // 9 => 678910
  }

  setCurrentPage(page: number) {
    if (this.currentpage !== page) {
      this.currentpage = page;
      if (this.currentpage === this.totalpages && this.changeBy === 1) {
        this.changeBy = -1;
      } else if (this.currentpage === 1 && this.changeBy === -1) {
        this.changeBy = 1;
      }
      this.pagesInView = this.getPagesInView();
      this.changePage.emit(page);
    }
  }
}
