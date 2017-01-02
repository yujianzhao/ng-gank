import {Component, AfterViewInit, OnInit} from '@angular/core';

@Component({
  selector: 'about-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents">
      <h1>About</h1>
      <div class="ui horizontal list">
        <div class="item">
          <a href="https://github.com/Aaron-Zhao">
            <img class="ui mini circular image" src="../assets/images/aaron.png">
            <div class="content">
              <div class="ui sub header">Aaron</div>
              Developer
            </div>
          </a>
        </div>
      </div>
      <div class="ui floating message">
        <p>用 Angular 2 做的一个 gank.io 的 Web 前端。 前端采用了 PouchDB 作为数据库来储存 Archive 的信息；一部分 GUI 采用了semantic-ui。</p>
        <p>This is a simple app built on Angular 2. All data come from <a href="http://gank.io/api">gank.io API</a>, 
        a place where people share some open source projects and other interesting stuffs. I used PouchDB to store archive info on the front-end.</p>
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
