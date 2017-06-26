import {Component, AfterViewInit, OnInit} from '@angular/core';

@Component({
  selector: 'about-view',
  styles: [`
 
  `],
  template: `
    <section class="page-contents">
      <h1>About</h1>
      <div class="ui horizontal list">
        <div class="item">
          <a href="https://github.com/yujianzhao">
            <img class="ui mini circular image" src="../assets/images/aaron.png">
            <div class="content">
              <div class="ui sub header">yujianzhao</div>
              Developer
            </div>
          </a>
        </div>
      </div>
      <div class="ui floating message">
        <p><a href="https://github.com/yujianzhao/ng-gank">ng-gank</a> 用 Angular 做的一个 gank.io 的 Web 前端。</p>
        <p><a href="https://github.com/yujianzhao/ng-gank">ng-gank</a> is a simple app built on Angular. All data come from <a href="http://gank.io/api">gank.io API</a>, 
         a web service for submitting and retrieving daily curated tech articles and blogs.</p>
      </div>
    </section>
  `
})
export class AboutViewComponent implements AfterViewInit, OnInit {

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }



}
