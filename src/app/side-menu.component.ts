import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {SIDEBAR_POSITION} from 'ng2-sidebar';
import {routes, RouteObj} from './app.routes';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'side-menu',
  styles: [`

  `],
  template: `
    <ng2-sidebar
      [(open)]="_open"
      [defaultStyles]="true"
      [position]="_POSITIONS[_positionNum]"
      [closeOnClickOutside]="_closeOnClickOutside"
      [showOverlay]="_showOverlay"
      [animate]="_animate"
      [trapFocus]="_trapFocus"
      [autoFocus]="_autoFocus"
      [sidebarClass]="'demo-sidebar'"
      [ariaLabel]="'app-side-menu'">
      <div routerLink='{{item.link}}' routerLinkActive="route-active" (click)="direct($event)" *ngFor="let item of menuItems">
        <img style="width:15px;height:auto;" src="../assets/icons/{{item.data.title}}.svg"> {{item.data.title}}
      </div>
    </ng2-sidebar>
    <header class="demo-header">
      <button (click)="toggleSidebar()" class="demo-header__toggle">Toggle sidebar</button>
      <h3>NgGank - {{title}}</h3>
    </header>
  `
})
export class SideMenuComponent implements AfterViewInit, OnInit{
  public title: string;
  private _open: boolean = false;
  private _positionNum: number = 0;
  private _closeOnClickOutside: boolean = true;
  private _showOverlay: boolean = true;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _POSITIONS = [SIDEBAR_POSITION.Left, SIDEBAR_POSITION.Right, SIDEBAR_POSITION.Top, SIDEBAR_POSITION.Bottom];

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
    this._open = !this._open;
  }

  private direct(event) {
    this.title = event.target.innerText;
    this.toggleSidebar();
  }

}
