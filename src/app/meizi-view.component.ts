import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';

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
    <section class="demo-contents" infinite-scroll
            [infiniteScrollDistance]="1"
            [infiniteScrollThrottle]="500"
            (scrolled)="onScroll()">
      <h1>Meizi</h1>
      <template ngFor let-item [ngForOf]="items">
        <a href="{{item.url}}">
          <img style="width:256px;height:auto;" src="{{item.url}}"/>
        </a>
      </template>
    </section>
  `
})
export class MeiziViewComponent implements AfterViewInit, OnInit {
  private items: any[] = [];
  private currentPage = 1;
  private end = false;
  constructor(private gankService: GankService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.nextPage(0);
  }

  onScroll () {
    if (!this.end)
      this.nextPage(1);
  }

  nextPage(increment: number) {
    this.currentPage += increment;
    this.loadPhotos(() => {
      this.currentPage -= increment;
    });
  }
  loadPhotos(exception: Function) {
    this.gankService.getPhotos(12, this.currentPage).subscribe(results => {
      if (results.length === 0)
        this.end = true;
      this.items = this.items.concat(results);
    }, error =>  {
      console.error(error);
      exception();
    });
  }

}
