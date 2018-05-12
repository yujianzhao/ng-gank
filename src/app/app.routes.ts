import { Routes } from '@angular/router';
import {DailyViewComponent} from './daily-view.component';
import {MeiziViewComponent} from './meizi-view.component';
import {AndroidViewComponent} from './android-view.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {IOSViewComponent} from './ios-view.component';
import {HistoryViewComponent} from './history-view.component';
import {ArchiveViewComponent} from './archive-view.component';
import {PostingViewComponent} from './posting-view.component';
import {AboutViewComponent} from './about-view.component';

export const appRoutes: Routes = [
  { path: 'daily', component: DailyViewComponent, data: { title: 'Daily', menu: true }},
  { path: 'android', component: AndroidViewComponent, data: { title: 'Android', menu: true }},
  { path: 'ios', component: IOSViewComponent, data: { title: 'iOS', menu: true }},
  { path: 'meizi', component: MeiziViewComponent, data: { title: 'Meizi', menu: true }},
  { path: 'history', component: HistoryViewComponent, data: { title: 'History', menu: true }},
  { path: 'archive', component: ArchiveViewComponent, data: { title: 'Archive', menu: false }},
  { path: 'posting', component: PostingViewComponent, data: { title: 'Posting', menu: true }},
  { path: 'about', component: AboutViewComponent, data: { title: 'About', menu: true }},
  { path: '', component: DailyViewComponent, data: { title: 'Home', menu: false }},
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found', menu: false }}
]
