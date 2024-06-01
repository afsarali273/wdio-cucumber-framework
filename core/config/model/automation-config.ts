export class AutomationConfig {
  mobileAppConfig?: AppConfig;
  uiConfig: UiConfig;
  environment: string;
  country: string ;
  countryName: string;
  defaultPwd: string | undefined;
  isUiTest: boolean = false;
  isMobileApp: boolean = false;
  isApiTest: boolean = false;
  device: string;
}

export class AppConfig {
  path: string;
  remotePath: string;
  isAndroid: boolean;
  isIos: boolean;
}

export class UiConfig {
  browserType: string ;
  device: Device ;
  headless: boolean;
  isRemote: boolean;
}
export enum Device {
  //Desktop
  desktop,
  //Mobile
  mobile,
  //Tablet
  tablet,
  android,
  ios
}

