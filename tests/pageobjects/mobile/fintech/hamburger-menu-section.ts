import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';
import { baseConfig } from '../../../../core/config/project-config.ts';

const locator = {
  android:{
    hamburgerIcon: "~moreTab",
    mortgageTab: "~mortgagesTab",
    nextButton: "~nextButton",
    finishButton: "~finishButton"
  },
  ios:{
    hamburgerIcon: "~moreTab",
    mortgageTab: "~mortgagesTab",
    nextButton: "~nextButton",
    finishButton: "~finishButton"
  }
}[baseConfig.device];

export class HamburgerMenuSection extends MobileBasePage{

  private readonly btnHamburgerIcon = "~moreTab";
  private readonly mortgageTab = "~mortgagesTab";
  private readonly btnNextOnboarding = "~nextButton";
  private readonly btnFinishOnboarding = "~finishButton";


  public async waitForHamburgerIcon(){
    await this.waitForElementExist(this.btnHamburgerIcon);
  }

  public async clickHamburgerIcon(){
    await this.findElement(this.btnHamburgerIcon).click();
  }

  public async clickMortgageTab(){
    await this.findElement(this.mortgageTab).click();
  }

  private async clickNextButtonIfDisplayed(){
    if(await this.findElement(this.btnNextOnboarding).isDisplayed()){
      await this.waitAndClick(this.btnNextOnboarding);
    }
  }

  private async clickFinishButtonIfDisplayed(){
    if(await this.findElement(this.btnFinishOnboarding).isDisplayed()){
      await this.waitAndClick(this.btnFinishOnboarding);
    }
  }

  public async handleLaunchPopup(){
    // Loop 6 times to handle the launch popup
    for (let i = 0; i < 6; i++) {
    await this.clickNextButtonIfDisplayed();
    }
    await this.clickFinishButtonIfDisplayed();
  }

}
