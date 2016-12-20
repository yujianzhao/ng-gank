import {Component, AfterViewInit, OnInit} from '@angular/core';
import {GankService} from './services/gank.service';
import * as PouchDB from 'pouchdb-browser';

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
    var db = new PouchDB('my_database');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }



}
