import { MobileService } from '../../mobile/mobile-config.ts';
import { SelenoidService } from './selenoid-service.ts';
import { AutomationConfig } from '../../config/model/automation-config.ts';

export class RemoteServiceFactory {

  public static getRemoteServiceConfig(baseConfig: AutomationConfig) {

    if(baseConfig.isApiTest) {
      return {};
    }
      if(baseConfig.isMobileApp) {
        return MobileService.getMobileConfig(baseConfig);
      }

      if(baseConfig.uiConfig.isRemote){
        return SelenoidService.getSelenoidConfig();
      }

      return {};
  }
}