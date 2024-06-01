import { Given, Then, When } from '@wdio/cucumber-framework';
import { SampleApi } from '../../../api-lib/fintech/sample-api.ts';
import { scenarioContext } from '../../../../core/config/project-config.ts';
import { expect } from '@wdio/globals';

Given(/^I want to execute a GET request to "([^"]*)"$/, async (url) => {

  const sampleApi = new SampleApi();
  const postRes = await sampleApi.getPost();

  scenarioContext.setValue('postRes', postRes);
  console.log(JSON.stringify(postRes.data));

})

When(/^I execute the request$/, async () => {

    console.log(`I execute the request`);
})

Then(/^I should receive a response with status (\d+)$/, async (status) => {

  const postResponse = scenarioContext.getValue('postRes') as any;

  console.log(postResponse.data);
  expect(postResponse.status).toBe(status);
  expect(postResponse.data).not.toBeNull();
  expect(postResponse.data.userId).toBe(1);
})