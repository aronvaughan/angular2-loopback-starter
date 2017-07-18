import { AngularClientTestProjectPage } from './app.po';

describe('angular-client-test-project App', () => {
  let page: AngularClientTestProjectPage;

  beforeEach(() => {
    page = new AngularClientTestProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
