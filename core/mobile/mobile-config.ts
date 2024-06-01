import type { Options } from '@wdio/types';
import { SauceLabService } from '../utils/remote-service/sauce-lab-service.ts';
import { AutomationConfig } from '../config/model/automation-config.ts';
import { mobileAppConfig } from '../config/device-capabilities.ts';

export function setUpServices(baseConfig: AutomationConfig): Options.Testrunner['services'] {
  if (baseConfig.isMobileApp) {
    return MobileService.getMobileServiceConfig(baseConfig);
  }
  return [];
}

export class MobileService{

 public static getMobileServiceConfig(baseConfig: AutomationConfig): any {
   if(baseConfig.uiConfig.isRemote) {
     return SauceLabService.getSauceServiceConfig();
   }else {
     // TODO: Add support for auto starting appium server
     return [];
   }
 }

 public static getMobileConfig(baseConfig: AutomationConfig): any {
   if(baseConfig.uiConfig.isRemote) {
     return SauceLabService.getSauceConfig();
   }
   return mobileAppConfig; // Local Appium server Config
 }

}

