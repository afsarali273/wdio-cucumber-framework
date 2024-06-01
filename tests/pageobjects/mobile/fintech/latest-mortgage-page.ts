import { MobileBasePage } from '../../../../core/lib/mobile-base-page.ts';


export class LatestMortgagePage extends MobileBasePage{

  private readonly buyAHomeTab = "~Buy a home";
  private readonly refinanceTab = "~Refinance a loan";
  private readonly refineFilterCard = "~refineFilterCard";
  private readonly lowestInterestChip = "~Lowest Interest";
  private readonly topSellingChip = "~Top Selling";

  public async clickBuyAHomeTab(){
    await this.findElement(this.buyAHomeTab).click();
  }

  public async clickRefinanceTab(){
    await this.findElement(this.refinanceTab).click();
  }

  public async clickLowestInterestChip(){
    await this.findElement(this.lowestInterestChip).click();
  }

  public async clickTopSellingChip(){
    await this.findElement(this.topSellingChip).click();
  }

  public async clickRefineFilterCard(){
    await this.findElement(this.refineFilterCard).click();
  }
}