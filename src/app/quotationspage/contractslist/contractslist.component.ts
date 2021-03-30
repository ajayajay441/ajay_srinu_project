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
  displayedColumns: string[] = [
    "contractRef",
    "validFrom",
    "validTo",
    "signedby",
    "details",
  ];
  displayedColumns1: string[] = [
    "service",
    "from",
    "to",
    "term",
    "createBooking",
  ];
  ELEMENT_DATA1: SubElement[] = [
    {
      service: "FSL-98001",
      from: "Jan 1, 2021",
      to: "Jan 1, 2021",
      term: "Hemand",
      createBooking: "Details",
    },
  ];
  ELEMENT_DATA: PeriodicElement[] = [
    {
      contractRef: "FSL-98001",
      validFrom: "Jan 1, 2021",
      validTo: "Jan 1, 2021",
      signedby: "Hemand",
      details: "Details",
    },
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource1 = new MatTableDataSource(this.ELEMENT_DATA1);
  expandedElement: PeriodicElement | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;

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

  ngOnInit(): void {}
  goTo(routePageName: string, data: any) {
    console.log("data", data);
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
}

export interface PeriodicElement {
  contractRef: string;
  validFrom: string;
  validTo: string;
  signedby: string;
  details: string;
  isExpanded?: boolean;
}
export interface SubElement {
  service: string;
  from: string;
  to: string;
  term: string;
  createBooking: string;
}
