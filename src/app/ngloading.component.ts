import {Component, AfterViewInit, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngloading',
  styles: [`
    .ngloading {
      text-align: center;
      position: absolute;
      top: 50px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: #f8f8f8;
    }
    .ngloading-content {
      z-index: 1002;
      position: relative;
      display: inline-block;
    }
    .hidden {
      display: none;
    }
  `],
  template: `
    <div class="ngloading" [ngClass]="{hidden: complete}">
      <div class="ngloading-content">
        <md-progress-spinner
          [color]="'warn'"
          [mode]="'indeterminate'"
          [value]="50"></md-progress-spinner>
      </div>
    </div>
  `
})
export class NgLoadingComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() loads: Promise<any>[];
  complete: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  // Lifecycle hook that is called when any data-bound property of a directive changes.
  ngOnChanges(changes: SimpleChanges) {
    this.reload();
  }

  reload() {
    if (this.loads) {
      this.complete = false;
      this.loads = this.loads.filter(v=>v);
      if (this.loads.length < 1) {
        this.complete = true;
      } else if (this.loads.length === 1) {
        this.loads[0].then(() => {
          this.complete = true;
        })
      } else {
        this.loads.reduce((acc, cur) => { 
          return (acc.then(r=>true) && cur.then(r=>true));
        }).then((done) => {
          this.complete = done;
        })
      }
    }
  }

  ngAfterViewInit() {
  }

}

