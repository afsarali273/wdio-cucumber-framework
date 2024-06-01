import { WebBasePage } from '../../../../core/lib/web-base-page.ts';
import { baseConfig } from '../../../../core/config/project-config.ts';

export class UrlNavigation extends WebBasePage{

  public async navigateToFintechHomePage(){
    await this.navigate(this.getUrl('fintech'));
  }

  public async navigateToSendHelperHomePage(){
    await this.navigate(this.getUrl('sendhelper'));
  }

  private getUrl(application: string){
    const baseUrl = baseConfig.environment === 'prod' ? 'https://www.' : `https://${baseConfig.environment}.`;
    const urls = {
      fintech: `${baseUrl}propertyguru.com.sg/mortgage`,
      sendhelper: `${baseUrl}sendhelper.com`
    }
    return urls[application];
  }

}