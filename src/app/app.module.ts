import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GankService} from './services/gank.service';
import {SidebarModule} from 'ng2-sidebar';
import {SideMenuComponent} from './side-menu.component';
import {RouterModule} from '@angular/router';
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
import {appRoutes} from './app.routes';
import {PouchDBService} from './services/pouchdb.service';

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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GankService, PouchDBService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
