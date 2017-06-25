import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GankService} from './services/gank.service';
import {SidebarModule } from 'ng-sidebar';
import {SideMenuComponent} from './side-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {DailyViewComponent} from './daily-view.component';
import {MeiziViewComponent} from './meizi-view.component';
import {AndroidViewComponent} from './android-view.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {IOSViewComponent} from './ios-view.component';
import {HistoryViewComponent} from './history-view.component';
import {ArchiveViewComponent} from './archive-view.component';
import {PostingViewComponent} from './posting-view.component';
import {InfiniteScrollModule} from 'angular2-infinite-scroll';
import {AboutViewComponent} from './about-view.component';
import {PouchDBService} from './services/pouchdb.service';
import {ToastrModule} from 'toastr-ng2';
import {PostFormComponent} from './forms/post-form.component';

export const appRoutes: Routes = [
  { path: 'daily', component: DailyViewComponent, data: { title: 'Daily', menu: true }},
  { path: 'android', component: AndroidViewComponent, data: { title: 'Android', menu: true }},  
  { path: 'ios', component: IOSViewComponent, data: { title: 'iOS', menu: true }},
  { path: 'meizi', component: MeiziViewComponent, data: { title: 'Meizi', menu: false }},
  { path: 'history', component: HistoryViewComponent, data: { title: 'History', menu: true }},
  { path: 'archive', component: ArchiveViewComponent, data: { title: 'Archive', menu: false }},
  { path: 'posting', component: PostingViewComponent, data: { title: 'Posting', menu: true }},
  { path: 'about', component: AboutViewComponent, data: { title: 'About', menu: true }},
  { path: '', component: DailyViewComponent, data: { title: 'Home', menu: false }},  
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found', menu: false }}
]


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    DailyViewComponent,
    MeiziViewComponent,
    AndroidViewComponent,
    IOSViewComponent,
    HistoryViewComponent,
    ArchiveViewComponent,
    PostingViewComponent,
    AboutViewComponent,
    PageNotFoundComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule,
    InfiniteScrollModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [GankService, PouchDBService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
