import {browser, by, element, ExpectedConditions, Key } from 'protractor';

describe('context-dialog', () => {
  beforeEach(() => browser.get('/context-dialog'));

  describe('disabling behavior', () => {

    it('should open the context dialog when not disabled', async () => {
      element(by.id('context-dialog')).click();
      expect(await browser.isElementPresent(by.css('.gh-context-dialog-panel'))).toBeTruthy();
    });

    it('should not execute click handlers when disabled', async () => {
      element(by.id('disable-toggle')).click();
      await element(by.id('context-dialog')).click();
      expect(await browser.isElementPresent(by.css('.gh-context-dialog-panel'))).toBeFalsy();
    });
  });

  describe('focus behaviour', () => {
    it('should trap the focus inside the overlay', async () => {
      element(by.id('context-dialog')).click();
      await browser.isElementPresent(by.css('.gh-context-dialog-panel'));
      expect(await browser.driver.switchTo().activeElement().getText()).toEqual('Edit');
      await browser.actions().sendKeys(Key.TAB).perform();
      expect(await browser.driver.switchTo().activeElement().getAttribute('aria-label'))
        .toEqual('close');
      await browser.actions().sendKeys(Key.TAB).perform();
      expect(await browser.driver.switchTo().activeElement().getText()).toEqual('Edit');
    });
  });

  describe('close behaviour', () => {
    it('should open and close the context dialog', async () => {
      await element(by.id('context-dialog')).click();
      await browser.isElementPresent(by.css('.gh-context-dialog-panel'));
      await element(by.css('.gh-context-dialog-close-trigger')).click();
      expect(await browser.isElementPresent(by.css('.gh-context-dialog-panel'))).toBeFalsy();
    });
  });
});
