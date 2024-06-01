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

**Note:**
-
- For Mobile Testing, you need to provide the `APP_PATH`, `RUN_DEVICE=android/ios` Android ( `APP_PACKAGE`, `APP_ACTIVITY`), `UI_TEST=true`
- For Remote Execution for Mobile App, you need to provide the `REMOTE_EXECUTION=Y`, `SAUCE_TUNNEL_IDENTIFIER`, `SAUCE_USERNAME`, `SAUCE_ACCESS_KEY`
- For Web Testing, you need to provide the `BROWSER`, `RUN_DEVICE=desktop/mobile/tablet`, `HEADLESS`, `UI_TEST=true`
- For API Testing, you need to provide the `UI_TEST=false`
---
***Additional Information:***

- Provide the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` for secret manager for all passwords and sensitive data

All Browser and devices Desired Capability/Config are set in `devices` folder 
![image](https://github.com/afsarali-pg/pg-wdio-automation/assets/106514237/0f9cec71-7171-4424-81bf-575ed08ed70b)



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
@TYPE=api 
```

## Test Reports

- Test reports are generated in the `test-results/html-reports/index.html` directory
