import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';

@Component({
  selector: 'posting-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents">
      <h1>提交干货</h1>
      <form class="ui form">
        <div class="field">
          <label>URL</label>
          <input type="text" name="url" placeholder="Web URL">
        </div>
        <div class="field">
          <label>Web ID</label>
          <input type="text" name="web-id" placeholder="Your web name or ID">
        </div>
        <div class="field">
          <label>Type</label>
          <select class="ui fluid dropdown" name="type">
            <option value="na">选择一个</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
            <option value="休息视频">休息视频</option>
            <option value="福利">福利</option>
            <option value="拓展资源">拓展资源</option>
            <option value="前端">前端</option>
            <option value="瞎推荐">瞎推荐</option>
            <option value="App">App</option>
          </select>
        </div>
        <div class="field">
          <label>Debug</label>
          <input type="text" name="debug" placeholder="true | false">
        </div>
        <div class="field">
          <label>Description</label>
          <textarea name="Description" rows="6" cols="40" placeholder="描述你的干货"></textarea>
        </div>
        <div class="ui button" tabindex="0">Submit</div>
      </form>
    </section>
  `
})
export class PostingViewComponent implements AfterViewInit, OnInit {

  constructor(private gankService: GankService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }



}
