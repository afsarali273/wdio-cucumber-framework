import { MobileBasePage } from '../../../../../core/lib/mobile-base-page.ts';
import { delay } from '../../../../../core/utils/custom-utils.ts';

export class EnquiryModalComponent extends MobileBasePage{

  private readonly skipButtonLocator = "~ipaEnquirySkipButton";
  private readonly nameInputBoxLocator = "~nameTextBox";
  private readonly emailInputBoxLocator = "~emailTextBox";
  private readonly phoneInputBoxLocator = "~phoneTextBox";
  private readonly enquireNowButtonLocator = "~letsTalkButton";

  public async clickSkipButton(){
    await this.findElement(this.skipButtonLocator).click();
  }

  public async enterName(name: string){
    await this.findElement(this.nameInputBoxLocator).click();
    return await this.findElement(this.nameInputBoxLocator).setValue(name);
  }

  public async enterEmail(email: string){
    await this.findElement(this.emailInputBoxLocator).click();
    await this.findElement(this.emailInputBoxLocator).setValue(email);
  }

  public async enterPhone(phone: string){
    await this.findElement(this.phoneInputBoxLocator).click();
    await this.findElement(this.phoneInputBoxLocator).setValue(phone);
  }

  public async clickEnquireNowButton(){
    await this.findElement(this.enquireNowButtonLocator).click();
  }


  public async submitEnquiryForm(name: string, email: string, phone: string){
    await this.enterName(name);
    await delay(500);
    await this.enterEmail(email);
    await delay(500);
    await this.enterPhone(phone);
    await delay(500);
    await this.clickEnquireNowButton();
  }
}
