import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'meizi-view',
  styles: [`
    button {
      margin: 10px;
    }
    img {
      margin: 2px;
    }
  `],
  template: `
    <section class="page-contents" infinite-scroll
            [infiniteScrollDistance]="1"
            [infiniteScrollThrottle]="500"
            (scrolled)="onScroll()">
      <h1>Meizi</h1>
      <ng-template ngFor let-item [ngForOf]="items">
        <a href="{{item.url}}">
          <img style="width:256px;height:auto;" src="{{item.url}}"/>
        </a>
      </ng-template>
    </section>
  `
})
export class MeiziViewComponent implements AfterViewInit, OnInit {
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
    return this.loadPhotos(() => {
      this.currentPage -= increment;
    });
  }
  loadPhotos(exception: Function): Subscription {
    return this.gankService.getPhotos(12, this.currentPage).subscribe(results => {
      if (results.length === 0)
        this.end = true;
      this.items = this.items.concat(results);
    }, error =>  {
      console.error(error);
      exception();
    });
  }

}
