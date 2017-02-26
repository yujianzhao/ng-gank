import {Component, AfterViewInit, OnInit} from '@angular/core';
import {PouchDBService} from './services/pouchdb.service';

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

  constructor(private pouchDBService: PouchDBService) {
    // pouchDBService.test();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }



}
