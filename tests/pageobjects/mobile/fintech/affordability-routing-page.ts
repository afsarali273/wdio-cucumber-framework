import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';


export class AffordabilityRoutingPage extends MobileBasePage{

  private readonly affordabilityTitle = "~affordabilityResultText";
  private readonly estimateAffordabilityButton = "~estimateAffordabilityButton";
  private readonly lookingForAdviceButton = "~lookingForAdviceButton";

  public async clickEstimateAffordabilityButton(){
    await this.findElement(this.estimateAffordabilityButton).click();
  }

  public async clickLookingForAdviceButton(){
    await this.findElement(this.lookingForAdviceButton).click();
  }

  public async getAffordabilityTitle(){
    return await this.findElement(this.affordabilityTitle).getText();
  }

}