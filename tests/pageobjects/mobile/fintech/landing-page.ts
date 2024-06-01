import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';

export class LandingPage extends MobileBasePage{

  private readonly heroCardLocator = "~landingPageHeroCard";

  public async waitForHeroCard(){
    await this.waitForElementExist(this.heroCardLocator);
  }

  public async isHeroCardVisible(){
    return await (await this.findElement(this.heroCardLocator)).isDisplayed();
  }
}