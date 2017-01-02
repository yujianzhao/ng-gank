import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment';
import {CustomValidators} from './validators.utils';
import {ToastrService} from 'toastr-ng2';
import {GankService} from '../services/gank.service';

@Component({
  selector: 'post-form',
  styles: [`
    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
  `],
  template:  `
    <form class="ui form" novalidate (ngSubmit)="onSubmit(form)" [formGroup]="form">
      <div class="field">
        <label>URL</label>
        <input type="text" placeholder="Web URL" formControlName="url">
      </div>
      <div class="field">
        <label>Web ID</label>
        <input type="text" placeholder="Your web name or ID" formControlName="webid">
      </div>
      <div class="field">
        <label>Type</label>
        <select class="ui fluid dropdown" formControlName="type">
          <option *ngFor="let type of types" [value]="type">{{type}}</option>
        </select>
      </div>
      <div class="field">
        <label>Description</label>
        <textarea rows="6" cols="40" placeholder="描述你的干货" formControlName="description"></textarea>
      </div>
      <button class="ui button" tabindex="0" type="submit">Submit</button>
      <div [ngBusy]="busy"></div>
    </form>
  `
})

export class PostFormComponent implements OnInit{
  types: string[] = ['Android', 'iOS', '休息视频', '福利', '拓展资源', '前端', '瞎推荐', 'App'];
  form: FormGroup
  busy: Promise<any>;
  constructor(private builder: FormBuilder, private gankService: GankService, private toastrService: ToastrService) {}
  ngOnInit() {
    this.form = this.builder.group({
      url: ['', [Validators.required, CustomValidators.url]],
      webid: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      debug: [!environment.production]
    });
  }
  onSubmit({ value, valid }: { value: PostForm, valid: boolean }) {
    if (!valid) {
      this.toastrService.error('信息格式不对', '表格错误');
    } else {
      this.busy = this.gankService.postData(value).then((resp: any) => {
        if (resp.error) {
          this.toastrService.error(resp.msg, '提交错误');
        } else {
          this.toastrService.success('干货提交成功! 又是美好的一天呢，少年！', '提交完成');
        }
      });
    }
  }
}

export interface PostForm  {
  url: string,
  webid: string,
  type: string,
  description: string,
  debug: boolean
}
