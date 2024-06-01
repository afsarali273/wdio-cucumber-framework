import { $, browser, $$ } from '@wdio/globals';
import { delay } from '../utils/custom-utils.ts';

export class WebBasePage{

  protected findElement(locator: string) {
    return $(locator);
  }

  protected findElements(locator: string) {
    return $$(locator);
  }

  protected navigate(url: string) {
    return browser.url(url);
  }

  protected getCurrentUrl() {
    return browser.getUrl();
  }

  protected getTitle() {
    return browser.getTitle();
  }

  protected refresh() {
    return browser.refresh();
  }

  protected back() {
    return browser.back();
  }

  protected forward() {
    return browser.forward();
  }

  protected close() {
    return browser.closeWindow();
  }

  protected quit() {
    return browser.deleteSession();
  }

  protected waitForUrlNavigation(url: string, timeout: number = 30000) {
    return browser.waitUntil(async () => await browser.getUrl() === url, { timeout: timeout });
  }

  protected waitForUrlContainsNavigation(urlContains: string, timeout: number = 30000) {
    return browser.waitUntil(async () => (await browser.getUrl()).includes(urlContains), { timeout: timeout });
  }

  protected waitForPageLoad(timeout: number = 30000) {
    return browser.waitUntil(async () => {
      return await browser.execute(() => document.readyState === 'complete');
    }, {
      timeout: timeout,
      timeoutMsg: `Page did not load within ${timeout / 1000} seconds`
    });
  }

  protected waitForElementExist(locator: string, timeout: number = 30000) {
    return $(locator).waitForExist({ timeout: timeout });
  }

  protected waitForElementVisible(locator: string, timeout: number = 30000) {
    return $(locator).waitForDisplayed({ timeout: timeout });
  }

  protected waitForElementNotVisible(locator: string, timeout: number = 30000) {
    return $(locator).waitForDisplayed({ reverse: true, timeout: timeout });
  }

  protected waitForElementClickable(locator: string, timeout: number = 30000) {
    return $(locator).waitForClickable({ timeout: timeout });
  }

  protected waitForElementNotExist(locator: string, timeout: number = 30000) {
    return $(locator).waitForExist({ reverse: true, timeout: timeout });
  }

  // Now Actions

  protected click(locator: string) {
    return $(locator).click();
  }

  protected async waitAndClick(locator: string , timeout: number = 30000) {
   await this.findElement(locator).waitUntil(() => this.findElement(locator).isDisplayed(), {timeout: timeout});
    await this.click(locator);
    await delay(300);
  }

  protected clearAndType(locator: string, text: string) {
      $(locator).clearValue().then(r => {
        return $(locator).setValue(text);
      });
  }

  protected type(locator: string, text: string) {
    return $(locator).setValue(text);
  }

  protected clickAndType(locator: string, text: string) {
     this.click(locator).then(r => {
      return this.type(locator, text);
     });
  }

  protected getText(locator: string) {
    return $(locator).getText();
  }

  protected getAttribute(locator: string, attribute: string) {
    return $(locator).getAttribute(attribute);
  }

  protected getCssProperty(locator: string, cssProperty: string) {
    return $(locator).getCSSProperty(cssProperty);
  }

  protected getTagName(locator: string) {
    return $(locator).getTagName();
  }

  protected executeScript(script: string, ...args: any[]) {
    return browser.execute(script, ...args);
  }

  protected scrollIntoView(locator: string) {
    return $(locator).scrollIntoView();
  }

 protected executeAsyncScript(script: string, ...args: any[]) {
    return browser.executeAsync(script, ...args);
  }

  protected switchToFrame(locator: string) {
    return browser.switchToFrame($(locator));
  }

  protected switchToParentFrame() {
    return browser.switchToParentFrame();
  }

  protected switchToWindow(windowHandle: string) {
    return browser.switchToWindow(windowHandle);
  }

  protected switchToWindowByIndex(index: number) {
    return browser.switchToWindow(browser.getWindowHandles()[index]);
  }

  protected acceptAlert() {
    return browser.acceptAlert();
  }

  protected dismissAlert() {
    return browser.dismissAlert();
  }

  protected getAlertText() {
    return browser.getAlertText();
  }

  protected isClickable(locator: string) {
    return $(locator).isClickable();
  }

  protected isDisplayed(locator: string) {
    return $(locator).isDisplayed();
  }

  protected isEnabled(locator: string) {
    return $(locator).isEnabled();
  }

  protected isSelected(locator: string) {
    return $(locator).isSelected();
  }

  protected isExisting(locator: string) {
    return $(locator).isExisting();
  }

  protected isFocused(locator: string) {
    return $(locator).isFocused();
  }

  protected isDisplayedInViewport(locator: string) {
    return $(locator).isDisplayedInViewport();
  }

  // protected getLocation(locator: string) {
  //   return $(locator).getLocation();
  // }

  protected getParentElement(locator: string) {
    return $(locator).parentElement();
  }

  protected selectByAttribute(locator: string, attribute: string, value: string) {
    return $(locator).selectByAttribute(attribute, value);
  }

  protected selectByIndex(locator: string, index: number) {
    return $(locator).selectByIndex(index);
  }

  protected selectByVisibleText(locator: string, text: string) {
    return $(locator).selectByVisibleText(text);
  }







}