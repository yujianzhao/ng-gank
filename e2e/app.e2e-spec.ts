import { NgGankPage } from './app.po';

describe('ng-gank App', function() {
  let page: NgGankPage;

  beforeEach(() => {
    page = new NgGankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
