export class SauceLabService {

  public static getSauceConfig(): any {
      return {
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        region: 'us',
      };
  }

  public static getSauceServiceConfig(): any {

    return [['sauce', {
      sauceConnect: true,
      sauceConnectOpts: {
        tunnelIdentifier: process.env.SAUCE_TUNNEL_NAME,
        logger: console.log,
      },
    }
    ]];
  }
}