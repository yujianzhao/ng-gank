import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'android-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents" infinite-scroll
            [infiniteScrollDistance]="1"
            [infiniteScrollThrottle]="500"
            (scrolled)="onScroll()">
      <h1>Android</h1>
      <div *ngFor="let item of items">
        <br>
        <a href="{{item.url}}">
          <h3>{{item.who }} - {{item.createdAt | date: 'yyyy/MM/dd HH:mm'}}</h3>
          <p>{{item.desc}}</p>
        </a>    
      </div>
    </section>
  `
})
export class AndroidViewComponent implements AfterViewInit, OnInit {
  private items: any[] = [];
  private currentPage = 1;
  private end = false;
  private busy: Subscription; 

  constructor(private gankService: GankService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.busy = this.nextPage(0);
  }

  onScroll () {
    if (!this.end)
      this.nextPage(1);
  }

  nextPage(increment: number): Subscription {
    this.currentPage += increment;
    return this.loadAndroidArticles(() => {
      this.currentPage -= increment;
    });
  }

  loadAndroidArticles(exception: Function): Subscription{
    return this.gankService.getAndroidArticles(16, this.currentPage).subscribe(results => {
      if (results.length === 0)
        this.end = true;
      this.items = this.items.concat(results);
    }, error =>  {
      console.error(error);
      exception();
    });
  }

}
