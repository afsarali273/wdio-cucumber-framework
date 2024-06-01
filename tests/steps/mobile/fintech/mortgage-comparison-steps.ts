import { Then } from '@wdio/cucumber-framework';
import { LatestMortgagePage } from '../../../pageobjects/mobile/fintech/latest-mortgage-page.ts';

Then('I should see mortgage comparison screen', async () => {
  const latestMortgagePage = new LatestMortgagePage();
  await latestMortgagePage.clickTopSellingChip();
});