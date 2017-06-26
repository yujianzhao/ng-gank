import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'daily-view',
  styles: [`
 
  `],
  template: `
    <section class="page-contents" >
      <div *ngFor="let sec of category">
        <h1>{{sec}}</h1>
        <div *ngFor="let item of dailyData[sec]">
          <br>
          <a href="{{item.url}}">
            <h3>{{item.who }} - {{item.createdAt | date: 'yyyy/MM/dd HH:mm'}}</h3>
            <ng-template [ngIf]="item.type === '\u798f\u5229'">
              <img style="width:256px;height:auto;" src="{{item.url}}"/>
            </ng-template>
            <ng-template [ngIf]="item.type !== '\u798f\u5229'">
              <p>{{item.desc}}</p>
            </ng-template>
          </a>    
        </div>
      </div>
      <b>Source Published: {{ mostRecentDate | date: 'yyyy/MM/dd HH:mm'}}</b>
      <ngloading [loads]="[busy1]"></ngloading>
    </section>
  `
})
export class DailyViewComponent implements AfterViewInit, OnInit {
  public dailyData: any;
  public category: string[];
  public mostRecentDate: string;
  public busy1: Promise<any>;
  public busy2: Subscription;  

  constructor(private gankService: GankService) {

  }

  ngOnInit() {
    this.busy1 = this.gankService.getDates().then(days => {
      this.mostRecentDate = days[0];
      this.busy2 = this.gankService.getByDay(days[0].replace(/-/g, '/')).subscribe(resp => {
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
