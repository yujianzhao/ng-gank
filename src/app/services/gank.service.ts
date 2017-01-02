import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {PostForm} from '../forms/post-form.component';

@Injectable()
export class GankService {
  private Dates: string[];
  constructor(private http: Http) {

  }

  getDates(): Promise<string[]> {
    if (!this.Dates) {
      return this.http.get(Gank.url.api.dayHistory).toPromise().then((resp: any) => {
        this.Dates = JSON.parse(resp._body).results;
        return this.Dates;
      }).catch(error => console.error(error));
    } else {
      return Promise.resolve(this.Dates);
    }
  }

  getPhotos(num: number, page: number): Observable<Object[]> {
    return this.get(Gank.url.api.data.fuli + num + '/' + page);
  }

  getAndroidArticles(num: number, page: number): Observable<Object[]> {
    return this.get(Gank.url.api.data.Android + num + '/' + page);
  }

  getiOSArticles(num: number, page: number): Observable<Object[]> {
    return this.get(Gank.url.api.data.iOS + num + '/' + page);
  }

  getAll(num: number, page: number): Observable<Object[]> {
    return this.get(Gank.url.api.data.all + num + '/' + page);
  }

  getByDay(day: string): Observable<Object> {
    return this.http.get(Gank.url.api.day + day).map((res: Response) => {
      let body = res.json();
      return body || {};
    }).catch(this.handleError);
  }

  getRandomPhotos(num: number): Observable<Object[]> {
    return this.get(Gank.url.api.random.fuli + num);
  }

  getRandomAndroidArticles(num: number): Observable<Object[]>{
    return this.get(Gank.url.api.random.Android + num);
  }
  getRandomiOSArticles(num: number): Observable<Object[]> {
    return this.get(Gank.url.api.random.iOS + num);
  }

  getRandomAll(num: number): Observable<Object[]>{
    return this.get(Gank.url.api.random.all + num);
  }

  getDayHistory(): Observable<Object[]> {
    return this.get(Gank.url.api.dayHistory);
  }

  postData(form: PostForm): Promise<Object> {
    let data = {
      url: form.url,
      desc: form.description,
      who: form.webid,
      type: form.type,
      debug: form.debug
    };
    return this.post(
      Gank.url.api.add2gank,
      Object.keys(data).map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      }).join('&'),
      {
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
      }
    );
  }

  private get(url): Observable<Object[]> {
    return this.http.get(url).map((res: Response) => {
      let body = res.json();
      return body.results || [];
    }).catch(this.handleError);
  }

  private post(url, data, options?): Promise<Object> {
    return this.http.post(url, data, options).toPromise().then((resp: any) => {
      return JSON.parse(resp._body);
    }).catch(error => console.error(error));
  }

  /* TODO: log error to server client log */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

export module Gank {
  export var gankio = {
    api: 'http://gank.io/api/',
    Android: 'data/Android/',
    fuli: 'data/%E7%A6%8F%E5%88%A9/',
    iOS: 'data/iOS/',
    all: 'data/all/'
  };

  export var url = {
    api: {
      data: {
        Android: gankio.api + gankio.Android,
        fuli: gankio.api + gankio.fuli,
        iOS: gankio.api + gankio.iOS,
        all: gankio.api + gankio.all
      },
      add2gank: gankio.api + 'add2gank',
      dayHistory: gankio.api + 'day/history',
      day: gankio.api + 'day/',
      random: {
        Android: gankio.api + 'random' + gankio.Android,
        fuli: gankio.api + 'random' + gankio.fuli,
        iOS: gankio.api + 'random' + gankio.iOS,
        all: gankio.api + 'random' + gankio.all
      }
    }
  };
}
