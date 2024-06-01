import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';


export class IpaOnboardingPage extends MobileBasePage{

  private readonly mortgagePlanQuestionCard = "~mortgagePlanQuestionCard";
  private readonly getANewMortgageButton = "~in_principle_approval_loan_type_new_purchase";
  private readonly refinanceMortgageButton = "~in_principle_approval_loan_type_refinancing";

  private readonly propertyTimelineCard = "~propertyTimelineQuestionCard";
  private readonly justStartedMySearchButton = "~in_principle_approval_timeline_searching";
  private readonly viewingPropertiesButton = "~in_principle_approval_timeline_viewing";
  private readonly choosenPropertyButton = "~in_principle_approval_timeline_chosen";
  private readonly sellMyCurrentPropertyButton = "~in_principle_approval_timeline_sell_first";

  // Purchase Timeline Question Card
  private readonly purchaseTimelineCard = "~purchaseTimeQuestionCard";
  private readonly purchaseHighLevelTimeline = "~in_principle_approval_purchase_timeline";
  private readonly gettingPreparedButton = "~in_principle_approval_purchase_medium";
  private readonly takingItSlowButton = "~in_principle_approval_purchase_low";
  private readonly stillExploringButton = "~in_principle_approval_purchase_unknown";

  // Next Steps Question Card
  private readonly nextStepsCard = "~nextStepQuestionCard";
  private readonly estimateAffordabilityButton = "~in_principle_approval_next_estimate_affordability";
  private readonly compareLoanOffersButton = "~in_principle_approval_next_compare_loans";
  private readonly getIPAButton = "~in_principle_approval_next_get_approval";
  private readonly mortgageAdvisorButton = "~in_principle_approval_next_get_advice";

  private readonly letsGoButton = "~letsGoButton";

  public async selectMortgagePlan(mortgagePlan: string){
    switch (mortgagePlan) {
      case "New Mortgage":
        await this.findElement(this.getANewMortgageButton).click();
        break;
      case "Refinance Mortgage":
        await this.findElement(this.refinanceMortgageButton).click();
        break;
      default:
        throw new Error("Invalid Mortgage Plan");
    }
  }

  public async waitForMortgagePlanQuestionCard(){
    await this.waitForElementExist(this.mortgagePlanQuestionCard);
  }

  public async isGetMortgagePlanQuestionCardVisible(){
    return await (await this.findElement(this.mortgagePlanQuestionCard)).isDisplayed();
  }

  public async selectPropertyTimeline(propertyTimeline: string){
    switch (propertyTimeline) {
      case "Just started my search":
        await this.waitAndClick(this.justStartedMySearchButton);
        break;
      case "Viewing properties":
        await this.findElement(this.viewingPropertiesButton).click();
        break;
      case "Chosen property":
        await this.findElement(this.choosenPropertyButton).click();
        break;
      case "Sell my current property":
        await this.findElement(this.sellMyCurrentPropertyButton).click();
        break;
      default:
        throw new Error("Invalid Property Timeline");
    }
  }

  public async selectPurchaseTimeline(purchaseTimeline: string){
    switch (purchaseTimeline) {
      case "Getting prepared":
        await this.waitAndClick(this.gettingPreparedButton);
        break;
      case "Taking it slow":
        await this.findElement(this.takingItSlowButton).click();
        break;
      case "Still exploring":
        await this.findElement(this.stillExploringButton).click();
        break;
      default:
        throw new Error("Invalid Purchase Timeline");
    }
  }

  public async selectNextSteps(nextStep: string){
    switch (nextStep) {
      case "Estimate affordability":
        await this.waitAndClick(this.estimateAffordabilityButton);
        break;
      case "Compare loan offers":
        await this.waitAndClick(this.compareLoanOffersButton);
        break;
      case "Get IPA":
        await this.findElement(this.getIPAButton).click();
        break;
      case "Mortgage advisor":
        await this.findElement(this.mortgageAdvisorButton).click();
        break;
      default:
        throw new Error("Invalid Next Steps");
    }
  }

  public async clickLetsGoButton(){
    await this.waitAndClick(this.letsGoButton);
  }

  async chooseAnswersToOnboardingQuestions(tableData: any) {
    await this.selectMortgagePlan(tableData.mortgagePlan);
    await this.selectPropertyTimeline(tableData.propertyTimeline);
    await this.selectPurchaseTimeline(tableData.purchaseTimeline);
    await this.selectNextSteps(tableData.nextSteps);
    await this.clickLetsGoButton();
  }
}

