import {  Given, Then, When } from '@wdio/cucumber-framework';
import { DataTable, World, Status } from '@cucumber/cucumber'
import { HamburgerMenuSection } from '../../../pageobjects/mobile/fintech/hamburger-menu-section.ts';
import { IpaLandingPage } from '../../../pageobjects/mobile/fintech/ipa-landing-page.ts';
import { expect } from '@wdio/globals';
import { IpaOnboardingPage } from '../../../pageobjects/mobile/fintech/ipa-onboarding-page.ts';
import { LatestMortgagePage } from '../../../pageobjects/mobile/fintech/latest-mortgage-page.ts';

Given('I click on the more icon to navigate to the mortgage page', async () => {
  const hamburgerMenu = new HamburgerMenuSection();
  await hamburgerMenu.clickHamburgerIcon();
  await hamburgerMenu.clickMortgageTab();
});

Then('I should see ipa landing page', async () => {
const ipaLandingPage = new IpaLandingPage();
await ipaLandingPage.waitForLetsGetsStartedButton();
expect(await ipaLandingPage.isLetsGetsStartedButtonDisplayed()).toBe(true);
});

When('I click on the Get Started button', async () => {
  const ipaLandingPage = new IpaLandingPage();
  await ipaLandingPage.clickLetsGetsStartedButton();
});

Then('I should see IPA onboarding screen', async () => {
  const ipaOnboardingPage = new IpaOnboardingPage();
  await ipaOnboardingPage.waitForMortgagePlanQuestionCard();
  expect(await ipaOnboardingPage.isGetMortgagePlanQuestionCardVisible()).toBe(true);

});

When('I choose below answers to onboarding questions', async (table: DataTable) => {
  const ipaOnboardingPage = new IpaOnboardingPage();
  const tableData = table.rowsHash();
  console.log(tableData);
  await ipaOnboardingPage.chooseAnswersToOnboardingQuestions(tableData);
});

