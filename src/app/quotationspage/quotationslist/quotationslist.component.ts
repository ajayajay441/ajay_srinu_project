import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-quotationslist',
  templateUrl: './quotationslist.component.html',
  styleUrls: ['./quotationslist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuotationslistComponent implements OnInit {
  @Input() filter: string;
  displayedColumns: string[] = [
    "qtno",
    "reference",
    "origin",
    "destination",
    "qtexpiry",
    "amount",
    "weight",
    "service",
    "status",
    "details",
  ];
  ELEMENT_DATA: PeriodicElement[] = [
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "America",
      destination: "Lyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "Brazil",
      destination: "Xyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "India",
      destination: "Fyon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "South Africa",
      destination: "Ayon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
    {
      qtno: "US-DXB001",
      reference: "US-DXB001",
      origin: "West Indies",
      destination: "Ryon",
      qtexpiry: "20/01/2021",
      amount: "AED 2000",
      weight: "2334 kg.",
      service: "FCL IMP",
      status: "Pending",
      details: "Details",
    },
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  expandedElement: PeriodicElement | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {
    this.filter = '';
  }

  ngOnChanges(changes: any) {
    const filterValue = changes.filter.currentValue;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  qtno: string;
  reference: string;
  origin: string;
  destination: string;
  qtexpiry: string;
  amount: string;
  weight: string;
  service: string;
  status: string;
  details: string;
  isExpanded?: boolean
}