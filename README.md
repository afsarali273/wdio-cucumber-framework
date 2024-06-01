## WebdriverIO + Cucumber+ Appium + Axios + Selenium

It Covers all aspects of Automation testing 
- Including Web,Mobile,API Testing


## Installation
``
npm install
``

## .env file
Create a .env file in the root directory and add the following variables
```bash
#integration, staging, prod
ENVIRONMENT=integration
COUNTRY=SG
# desktop, mobile, tablet, App(android, ios)
RUN_DEVICE=desktop
# Y = yes , N = No
REMOTE_EXECUTION=N
# Set false for API testing
UI_TEST=true

AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>

##################### Optional  #####################

HEADLESS=false
BROWSER=chrome
LOG_TO_CONSOLE=true
PARALELL_INSTANCES=1

# Required for App testing
APP_PATH=<path to apk/IPA file>
APP_PACKAGE=<APP_PACKAGE>
APP_ACTIVITY=<APP_ACTIVITY>
SAUCE_TUNNEL_IDENTIFIER=<SAUCE_TUNNEL_IDENTIFIER>
SAUCE_USERNAME=<SAUCE_USERNAME>
SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>

```
<hr>

## Usage Instructions

| Testing Type                      | Parameters Required in .en file                                                                                                                                                                                                                                                                          |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Mobile Testing**                | - `APP_PATH`: Path to the mobile application.<br>- `RUN_DEVICE`: Specify either `android` or `ios`. <br> - `UI_TEST`: Set to `true`. <br>- For Android:<br>  - `APP_PACKAGE`: Android application package name.<br>  - `APP_ACTIVITY`: Android application activity name. |
| **Remote Execution for Mobile App** | - `REMOTE_EXECUTION`: Set to `Y`.<br>- `SAUCE_TUNNEL_IDENTIFIER`: Identifier for the Sauce Labs tunnel.<br>- `SAUCE_USERNAME`: Your Sauce Labs username.<br>- `SAUCE_ACCESS_KEY`: Your Sauce Labs access key.                                                                                            |
| **Web Testing**                   | - `BROWSER`: Desired browser for testing.<br>- `RUN_DEVICE`: Choose from `desktop`, `mobile`, or `tablet`.<br>- `HEADLESS`: Whether to run tests in headless mode.<br>- `UI_TEST`: Set to `true`.                                                                                                        |
| **API Testing**                   | - `UI_TEST`: Set to `false`.                                                                                                                                                                                                                                                                             |

***Additional Information:***

- Provide the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` for secret manager for all passwords and sensitive data

All Browser and devices Desired Capability/Config are set in <br>`devices` folder 
 ---> | api | mobile | web | -->  api.json, mobile.json, web.json



## Run Mobile App Tests

Run appium server locally or use the remote server (port 4723)
```bash
npm run test:android
```
```bash
npm run test:ios
```

## Run Web Tests

```bash
npm run test:web
```

## Run API Tests

```bash
npm run test:api
```

## Mandatory Tags

For Web 
```
@TEAM=your-team
@REGION=SG
@SUITE=regression or smoke
@SERVICE=some-service
@FEATURE=your-feature
@TYPE=ui
@DEVICE=desktop
@DEVICE=tablet
```

For Mobile App
```
@TEAM=fintech
@REGION=SG
@SUITE=regression or smoke
@SERVICE=some-service
@FEATURE=your-feature
@TYPE=ui
@DEVICE=android
@DEVICE=ios
```

For API
```
@TEAM=yout-team 
@REGION=SG 
@SUITE=regression or smoke
@SERVICE=some-service
@FEATURE=your-feature
@TYPE=api 
```

## Test Reports

- Test reports are generated in the `test-results/html-reports/index.html` directory
