import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'frescon';
  currentRoute = '';
  menuList: NavMenuItem[] = [
    { name: 'Overview', label: 'Overview', route: '/dashboard', icon: 'overview', isActive: true },
    { name: 'Shipments', label: 'Shipments', route: '/shipments', icon: 'shipments', isActive: false },
    { name: 'Administration', label: 'Administration', route: '/administration', icon: 'shipments', isActive: false },
  ];
  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentRoute = this.router.url;
      console.log('router url', this.router.url);
    });
    this.matIconRegistry.addSvgIcon(
      "overview",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./../assets/icons/menu-overview.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "shipments",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./../assets/icons/menu-overview.svg")
    );
  }

  onMenuItemClick(menuItem: NavMenuItem) {
    if (menuItem.subMenu) {
      menuItem.isExpanded = !menuItem.isExpanded;
    } else {
      this.goTo(menuItem.route);
    }
  }

  goTo(routePageName: string) {
    this.router.navigate([`${routePageName}`]); // navigate to other page
  }
}
interface NavMenuItem {
  name: string,
  label: string,
  route: string,
  icon: string,
  isActive?: boolean,
  isExpanded?: boolean
  subMenu?: NavMenuItem[]
}
