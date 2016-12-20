import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import * as jQuery from 'jquery';

@Component({
  selector: 'archive-view',
  styles: [`
 
  `],
  template: `
    <section class="demo-contents">

    </section>
  `
})
export class ArchiveViewComponent implements AfterViewInit, OnInit {

  constructor(private gankService: GankService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }



}
