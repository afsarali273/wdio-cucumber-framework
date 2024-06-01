import { Given, Then } from '@wdio/cucumber-framework';
import { HamburgerMenuSection } from '../../../pageobjects/mobile/fintech/hamburger-menu-section.ts';
import { EnquiryModalComponent } from '../../../pageobjects/mobile/fintech/enquiry-modal/enquiry-modal-component.ts';
import { LandingPage } from '../../../pageobjects/mobile/fintech/landing-page.ts';
import { expect } from '@wdio/globals';

Given(/^I launch the app$/, async () => {
    console.log('I launch the app');
    const  hamburgerMenu = new HamburgerMenuSection();
    await hamburgerMenu.handleLaunchPopup();
    await hamburgerMenu.waitForHamburgerIcon();
    await hamburgerMenu.clickHamburgerIcon();
    console.log('I click the hamburger icon');
});

Then('I send enquiry with below data', async () => {
    const enquiryModalComponent = new EnquiryModalComponent();
    await enquiryModalComponent.submitEnquiryForm('John Doe', 'fintech-test@tes.com', '97865734\n');
});

Then('I should see landing page success modal', async () => {
    const landingPage = new LandingPage();
    await landingPage.waitForHeroCard();
    expect(await landingPage.isHeroCardVisible()).toBe(true);
});


