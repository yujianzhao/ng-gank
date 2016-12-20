import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';

@Component({
  selector: 'daily-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents" >
      <div *ngFor="let sec of category">
        <h1>{{sec}}</h1>
        <div *ngFor="let item of dailyData[sec]">
          <br>
          <a href="{{item.url}}">
            <h3>{{item.who }} - {{item.createdAt | date: 'yyyy/MM/dd HH:mm'}}</h3>
            <template [ngIf]="item.type === '\u798f\u5229'">
              <img style="width:256px;height:auto;" src="{{item.url}}"/>
            </template>
            <template [ngIf]="item.type !== '\u798f\u5229'">
              <p>{{item.desc}}</p>
            </template>
          </a>    
        </div>
      </div>
      <b>Source Published: {{ mostRecentDate | date: 'yyyy/MM/dd HH:mm'}}</b>
    </section>
  `
})
export class DailyViewComponent implements AfterViewInit, OnInit {
  private dailyData: any;
  private category: string[];
  private mostRecentDate: string;
  constructor(private gankService: GankService) {

  }

  ngOnInit() {
    this.gankService.getDates().then(days => {
      this.mostRecentDate = days[0];
      this.gankService.getByDay(days[0].replace(/-/g, '/')).subscribe(resp => {
        this.category = resp['category'];
        this.dailyData = resp['results'];
      }, error => {
        console.error(error);
      });
    });
  }

  ngAfterViewInit() {
  }



}
