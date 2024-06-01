export class SelenoidService {

  public static getSelenoidConfig(): any {
    const selenoidUser = process.env.SELENOID_USER;
    const selenoidPassword = process.env.SELENOID_PASSWORD;
    return {
      hostname: `${selenoidUser}:${selenoidPassword}@selenoid-01.guruestate.com`,
      port: 4444,
      path: '/wd/hub'
    };
  }
}