import { AppConfig, AutomationConfig, UiConfig } from './model/automation-config.ts';
import { ScenarioContext } from '../utils/scenario-context.ts';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { RunContext } from '../utils/run-context.ts';
import { CustomLogger } from '../utils/logger.ts';
// import { AwsSecretManager } from '../utils/secret-manager.ts';

let baseConfig: AutomationConfig;

let yaml_data: any;

let runContext: RunContext;

const scenarioContext: ScenarioContext = new ScenarioContext();

const envData = process.env;
 let secrets: { [key: string]: string };
 let stepLogger: CustomLogger;


export async function setup(): Promise<void> {
     baseConfig = automationConfigBuilder(envData);
     yaml_data =  loadYamlData();
     runContext = new RunContext();
  try {
    // const secretManager = new AwsSecretManager(envData.AWS_ACCESS_KEY_ID, envData.AWS_SECRET_ACCESS_KEY); // TODO: Add the AWS keys to the env file
    // secrets = await secretManager.fetchSecrets();
  } catch (error) {
    console.error('Error while fetching aws secrets, Will continue to run the tests');
  }
}


export function automationConfigBuilder(envData) {
  const automationConfig = new AutomationConfig();

  const uiConfig = new UiConfig();
  uiConfig.browserType = envData.BROWSER_NAME;
  uiConfig.headless = envData.HEADLESS === 'true';
  uiConfig.device = envData.RUN_DEVICE;
  uiConfig.isRemote = envData?.REMOTE_EXECUTION.toLowerCase() === ('y' || 'yes' || 'true');
  automationConfig.uiConfig = uiConfig;

  const appConfig = new AppConfig();
  appConfig.path = envData.APP_PATH;
  appConfig.isAndroid = envData.RUN_DEVICE === 'android';
  appConfig.isIos = envData.RUN_DEVICE === 'ios';
  automationConfig.mobileAppConfig = appConfig;

  automationConfig.country = envData.COUNTRY;
  automationConfig.environment = envData.ENVIRONMENT;
  automationConfig.defaultPwd = envData.DEFAULT_PASSWORD;
  automationConfig.isUiTest = envData.UI_TEST === 'true';
  automationConfig.isMobileApp = envData.RUN_DEVICE === 'android' || envData.RUN_DEVICE === 'ios';
  automationConfig.isApiTest = envData.UI_TEST !== 'true'

  return automationConfig;
}

export  function loadYamlData() {
  try {
    const fileName = './tests/testData/assets/';
    const yaml_file_name = `pg-${baseConfig.country.toLowerCase()}.yaml`;
    const fileContents = fs.readFileSync(fileName + yaml_file_name, 'utf8');
    return yaml.loadAll(fileContents)[0];
  } catch (e) {
    console.log(e);
  }
}

export {envData,stepLogger,runContext,secrets, baseConfig, yaml_data, scenarioContext};