import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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
    { name: 'Overview', label: 'Overview', route: '/overview', icon: 'face', isActive: true },
    { name: 'Leaderboard', label: 'Leaderboard', route: '/leaderboard', icon: 'opacity', isActive: false },
    { name: 'Administration', label: 'Administration', route: '/administration', icon: 'play_circle', isActive: false },
    {
      name: 'Spreadsheets', label: 'Spreadsheets', route: '/spreadsheets', icon: 'play_circle', isActive: false,
      subMenu: [
        { name: 'sub menu 1', label: 'SubMenu1', route: '/test', icon: 'face', isActive: false },
        { name: 'sub menu 2', label: 'SubMenu2', route: '/test2', icon: 'opacity', isActive: false },
      ]
    },
  ];
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentRoute = this.router.url;
      console.log('router url', this.router.url);
    });
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
