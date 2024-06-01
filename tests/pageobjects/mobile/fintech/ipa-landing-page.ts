import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';

export class IpaLandingPage extends MobileBasePage{

  private readonly letsGetsStartedButton = "~letsGetStartedButton";

  public async clickLetsGetsStartedButton(){
    if(await this.isDisplayed(this.letsGetsStartedButton)){
      await this.findElement(this.letsGetsStartedButton).click();
    }
  }

  async waitForLetsGetsStartedButton() {
    await this.waitForElementExist(this.letsGetsStartedButton);
  }

  async isLetsGetsStartedButtonDisplayed() {
    return await (await this.findElement(this.letsGetsStartedButton)).isDisplayed();
  }
}