import {IOSViewComponent} from './ios-view.component';
import {DailyViewComponent} from './daily-view.component';
import {AndroidViewComponent} from './android-view.component';
import {MeiziViewComponent} from './meizi-view.component';
import {Routes} from '@angular/router';
import {ArchiveViewComponent} from './archive-view.component';
import {PostingViewComponent} from './posting-view.component';
import {AboutViewComponent} from './about-view.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {HistoryViewComponent} from './history-view.component';

interface RouteData {
  title: string
}

export class RouteObj {
  public link: string;
  constructor(
    public path: string,
    public data: RouteData,
    public component: any) {
    this.link = '/' + path;
  }

  getRoute() {
    return {
      path: this.path,
      component: this.component,
      data: this.data
    };
  }
}

export const routes = {
  daily: new RouteObj('daily', {title: 'Daily'}, DailyViewComponent),
  android: new RouteObj('android', {title: 'Android'}, AndroidViewComponent),
  ios: new RouteObj('ios', {title: 'iOS'}, IOSViewComponent),
  meizi: new RouteObj('meizi', {title: 'Meizi'}, MeiziViewComponent),
  history: new RouteObj('history', {title: 'History'}, HistoryViewComponent),
  archive: new RouteObj('archive', {title: 'Archive'}, ArchiveViewComponent),
  posting: new RouteObj('posting', {title: 'Posting'}, PostingViewComponent),
  about: new RouteObj('about', {title: 'About'}, AboutViewComponent),
  home: new RouteObj('', {title: 'Home'}, DailyViewComponent),
  others: new RouteObj('**', {title: 'Not Found'}, PageNotFoundComponent),
}

export const appRoutes: Routes = Object.keys(routes).map(r => routes[r].getRoute());
