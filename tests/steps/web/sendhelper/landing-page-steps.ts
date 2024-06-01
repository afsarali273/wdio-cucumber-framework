import { Given, Then } from '@wdio/cucumber-framework';
import { UrlNavigation } from '../../../pageobjects/web/common/navigation.ts';
import { yaml_data } from '../../../../core/config/project-config.ts';

Given(/^I am on the SendHelper landing page$/, async () => {
    const navigation = new UrlNavigation();
    await navigation.navigateToSendHelperHomePage();
});

Then(/^I should see "SendHelper" in the title$/, async () => {
    await expect(browser).toHaveTitle(yaml_data.Sendhelper.LandingPage.Title);
});