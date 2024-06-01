import { WebBasePage } from './web-base-page.ts';
import { browser } from '@wdio/globals';

export class MobileBasePage extends WebBasePage{

  //Android and iOS specific methods

  protected getContext() {
    return browser.getContext();
  }

  protected switchContext(context: string) {
    return browser.switchContext(context);
  }

  protected getContexts() {
    return browser.getContexts();
  }

  protected getDeviceTime() {
    return browser.getDeviceTime();
  }

  protected getPerformanceMetrics() {
    return browser.getPerformanceDataTypes();
  }

  protected pressKeycode(keycode: number) {
    return browser.pressKeyCode(keycode);
  }

//  sendKeyEvent

  protected getNetworkConnection() {
    return browser.getNetworkConnection();
  }

  protected getCurrentActivity() {
    return browser.getCurrentActivity();
  }

  protected getDeviceOrientation() {
    return browser.getOrientation();
  }

  protected installApp(appPath: string) {
    return browser.installApp(appPath);
  }

  protected isAppInstalled(bundleId: string) {
    return browser.isAppInstalled(bundleId);
  }

  protected launchApp() {
   return  this.executeScript('mobile: launchApp');
  }

  protected activateApp(appId: string) {
    return browser.activateApp(appId);
  }

  protected closeApp() {
    return this.executeScript('mobile: terminateApp');
  }

  protected removeApp(appId: string) {
    return browser.removeApp(appId);
  }

  protected appBackground(seconds?: number) {
    return browser.execute('mobile: backgroundApp', {seconds: seconds});
  }

}