import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'history-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents" infinite-scroll
            [infiniteScrollDistance]="1"
            [infiniteScrollThrottle]="500"
            (scrolled)="onScroll()">
      <h1>History</h1>
      <div *ngFor="let item of items">
        <br>
        <a href="{{item.url}}">
          <h3>{{item.type}} - {{item.who }} - {{item.createdAt | date: 'yyyy/MM/dd HH:mm'}}</h3>
          <template [ngIf]="item.type === '\u798f\u5229'">
            <img style="width:256px;height:auto;" src="{{item.url}}"/>
          </template>
          <template [ngIf]="item.type !== '\u798f\u5229'">
            <p>{{item.desc}}</p>
          </template>
        </a>    
      </div>
      <div [ngBusy]="busy"></div>
    </section>
  `
})
export class HistoryViewComponent implements AfterViewInit, OnInit {
  private items: any = []
  private currentDayIndex = 0;
  private dates: string[];
  private end = false;
  private busy: Subscription; 

  constructor(private gankService: GankService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.gankService.getDates().then(respDates => {
      this.dates = respDates;
      this.busy = this.next(0);
    });
  }

  onScroll () {
    if (!this.end)
      this.next(1);
  }

  next(increment: number): Subscription {
    this.currentDayIndex += increment;
    return this.loadHistoryArticles(() => {
      this.currentDayIndex -= increment;
    });
  }

  loadHistoryArticles(exception: Function): Subscription {
    return this.gankService.getByDay(this.dates[this.currentDayIndex].replace(/-/g, '/')).subscribe(resp => {
      let results = resp['results'];
      if (results.length === 0) {
        this.end = true;
      } else {
        for (let c of resp['category']) {
          this.items = this.items.concat(results[c]);
        }
      }
    }, error => {
      console.error(error);
      exception();
    });
  }

}
