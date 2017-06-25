import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { appRoutes } from './app.module';
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
      [sidebarClass]="'sidemenu-sidebar'"
      [ariaLabel]="'app-side-menu'">

      <div routerLink='' (click)="direct($event)"><img src="./assets/icons/apple-touch-icon-60x60.png" alt="logo"></div>

      <div routerLink='{{item.path}}' routerLinkActive="route-active" (click)="direct($event)" *ngFor="let item of menuItems">
        <img style="width:15px;height:auto;color:white;" src="../assets/icons/{{item.data.title}}.svg"> {{item.data.title}}
      </div>

      <span style="position: absolute; bottom: 0; margin: 2px;">
        <a href="https://jbosoft.com/">JingboSoft</a>            
        <p>{{version}}</p>
      </span>
    </ng-sidebar>
    <header class="sidemenu-header">
      <button (click)="toggleSidebar()" class="sidemenu-header-toggle">Toggle sidebar</button>
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

  private menuItems = [];

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
    Object.keys(appRoutes).map(r => {
      let routeObj = appRoutes[r];
      if (routeObj.path && routeObj.data.menu) {
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
