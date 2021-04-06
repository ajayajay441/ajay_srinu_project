import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-contractslist",
  templateUrl: "./contractslist.component.html",
  styleUrls: ["./contractslist.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ContractslistComponent implements OnInit {
  @Input() filter: string;
  @Input() data: any;
  displayedColumns: string[] = [
    "reference-number",
    "valid_from",
    "expiry_date",
    "approved_by",
    "details",
  ];
  // ELEMENT_DATA: PeriodicElement[] = [
  //   {
  //     "reference-number": "FSL-98001",
  //     valid_from: "Jan 1, 2021",
  //     expiry_date: "Jan 1, 2021",
  //     approved_by: "SHANMU",
  //     details: "Details",
  //   },
  // ];
  dataSource = new MatTableDataSource();
  expandedElement: PeriodicElement | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private router: Router) {
    this.filter = "";
  }

  ngOnChanges(changes: any) {
    const filterValue = changes.filter.currentValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }
  goTo(routePageName: string, data: any) {
    // console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
}

export interface PeriodicElement {
  "reference-number": string;
  valid_from: string;
  expiry_date: string;
  approved_by: string;
  details: string;
  isExpanded?: boolean;
}
