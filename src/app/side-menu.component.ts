import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {routes, RouteObj} from './app.routes';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'side-menu',
  styles: [`

  `],
  template: `
    <ng-sidebar
      [(opened)]="open"
      [position]="position"
      [closeOnClickOutside]="closeOnClickOutside"
      [animate]="animate"
      [trapFocus]="trapFocus"
      [autoFocus]="autoFocus"
      [sidebarClass]="'demo-sidebar'"
      [ariaLabel]="'app-side-menu'">
      <div routerLink='{{item.link}}' routerLinkActive="route-active" (click)="direct($event)" *ngFor="let item of menuItems">
        <img style="width:15px;height:auto;" src="../assets/icons/{{item.data.title}}.svg"> {{item.data.title}}
      </div>
    </ng-sidebar>
    <header class="demo-header">
      <button (click)="toggleSidebar()" class="demo-header__toggle">Toggle sidebar</button>
      <h3>NgGank - {{title}}</h3>
    </header>
  `
})
export class SideMenuComponent implements AfterViewInit, OnInit{
  public title: string;
  private open: boolean = false;
  private position: string = 'start';
  private closeOnClickOutside: boolean = true;
  private animate: boolean = true;
  private trapFocus: boolean = true;
  private autoFocus: boolean = true;

  private menuItems: RouteObj[] = [];

  constructor(router:Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.title = this.getTitle(router.routerState, router.routerState.root).join('-');
      }
    });
  }

  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ngOnInit() {
    Object.keys(routes).map(r => {
      let routeObj = routes[r];
      if (routeObj.path !== '' && routeObj.path !== '**') {
        this.menuItems.push(routeObj);
      }
    });
  }

  ngAfterViewInit() {

  }

  private toggleSidebar() {
    this.open = !this.open;
  }

  private direct(event) {
    this.title = event.target.innerText;
    this.toggleSidebar();
  }

}
