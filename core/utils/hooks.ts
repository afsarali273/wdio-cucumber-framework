import type {Options} from "@wdio/types";
import { baseConfig } from '../config/project-config.ts';

// Import the module
 import { generate } from 'multiple-cucumber-html-reporter'
import * as fs from 'fs';

export  function setUpOnPrepare(): Options.Testrunner['onPrepare'] {


    return function (config, capabilities) {
        console.log('='.repeat(70));
        console.log('Test Configuration Information:');
        console.log('-'.repeat(70));
        console.log(`| Environment: ${baseConfig.environment.padEnd(50)} |`);
        console.log(`| Test Types : ${getTestTypes(baseConfig).padEnd(50)} |`);
        console.log(`| Country    : ${baseConfig.country.padEnd(50)} |`);
        console.log(`| Tags       : ${parseTagsFromCommandLine().padEnd(50)} |`);
        console.log('='.repeat(70));


        // Remove the `.tmp/` folder that holds the json and report files
         fs.rm('./test-results/', { recursive: true, force: true }, (err) => {
             if (err) {
                  console.error('Error removing .tmp/ folder', err);
             }
          });
    };
}

function getTestTypes(baseConfig) {
    const testTypes = [];
    if (baseConfig.isUiTest) {
        testTypes.push('UI');
    }
    if (baseConfig.isApiTest) {
        testTypes.push('API');
    }
    if (baseConfig.isMobileApp) {
        testTypes.push('Mobile App');
    }
    return testTypes.join(', ');
}

export function setUpOnComplete(): Options.Testrunner['onComplete'] {
    return function(exitCode, config, capabilities, results) {


        const options  = {
            theme: 'bootstrap',
            jsonDir: './test-results/json-report',
            reportPath: './test-results/html-reports/',
            reportSuiteAsScenarios: true,
            ignoreBadJsonFile: true,
            launchReport: true,
            scenarioTimestamp: true,
            metadata: {
                env: baseConfig.environment,
                Browser: baseConfig.uiConfig?.browserType || 'API Tests',
                Platform: baseConfig.device,
                Parallel: 'None',
                Executed: new Date().toISOString()
            }
        };

     try{
        generate(options);
        //wait for 10 sec
        setTimeout(() => {
            console.log('Generating HTML report');
           // generate(options);
        }, 10000);
      }catch(err){
          console.error('Error while generating report');
      }
    };

}

export function setUpBefore(): Options.Testrunner['before'] {
    return function (capabilities, specs) {
        console.log('Before hook');
    };
}

export function setUpAfter(): Options.Testrunner['after'] {
    return function (result, capabilities, specs) {
       console.log('After hook');
    };
}

export function setUpBeforeSession(): Options.Testrunner['beforeSession'] {
    return function (config, capabilities, specs) {
        console.log('Before session hook');
    };
}

export function setUpAfterSession(): Options.Testrunner['afterSession'] {
    return function (config, capabilities, specs) {
        console.log('After session hook');
    };
}

export function setUpBeforeCommand(): Options.Testrunner['beforeCommand'] {
    return function (commandName, args) {
        console.log('Before command hook');
    };
}

export function setUpAfterCommand(): Options.Testrunner['afterCommand'] {
    return function (commandName, args, result, error) {
        console.log('After command hook');
    };
}

export function setUpBeforeFeature(): Options.Testrunner['beforeFeature'] {
    return function (uri, feature) {
        console.log('Before feature hook');
    };
}

export function setUpAfterFeature(): Options.Testrunner['afterFeature'] {
    return function (uri, feature) {
        console.log('After feature hook');
    };
}

/*
  * Parses tags from the command-line arguments.
  * @returns {string} - The tag expression string.
  *
 */
export function parseTagsFromCommandLine() {
    let myTags = [];
    let myTagExpression = '';

    if(!process.argv.includes('--tags')) {
        return '';
    }
    // Parse command-line arguments to extract tags
    process.argv.forEach((arg, index) => {
        if (arg === '--tags') {
            myTags = process.argv.slice(index + 1);
        }
    });


    // Handle 'and', 'not', and tags conditions
    if (myTags.includes('and') && myTags.includes('not')) {
        const andIndex = myTags.indexOf('and');
        const notIndex = myTags.indexOf('not');
        const tagsBeforeAnd = myTags.slice(0, andIndex);
        const tagsAfterAnd = myTags.slice(andIndex + 1, notIndex);
        const notTag = myTags[notIndex + 1];
        myTagExpression = `${tagsBeforeAnd.join(' and ')} and ${tagsAfterAnd.join(' and ')} not ${notTag}`;
    } else if (myTags.includes('and')) {
        const andIndex = myTags.indexOf('and');
        const tagsBeforeAnd = myTags.slice(0, andIndex);
        const tagsAfterAnd = myTags.slice(andIndex + 1);
        myTagExpression = `${tagsBeforeAnd.join(' and ')} and ${tagsAfterAnd.join(' and ')}`;
    } else if (myTags.includes('not')) {
        const notIndex = myTags.indexOf('not');
        const notTag = myTags[notIndex + 1];
        myTags.splice(notIndex, 2); // Remove 'not' and the following tag from myTags
        myTagExpression = `${myTags.join(' and ')} not ${notTag}`;
    } else {
        myTagExpression = `${myTags.join(' and ')}`;
    }

    return myTagExpression+' and not @in-progress'; // Exclude tests marked as in-progress
}

/**
 * Gets executed before a worker process is spawned and can be used to initialize specific service
 * for that worker as well as modify runtime environments in an async fashion.
 * @param  {string} cid      capability id (e.g 0-0)
 * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
 * @param  {object} specs    specs to be run in the worker process
 * @param  {object} args     object that will be merged with the main configuration once worker is initialized
 * @param  {object} execArgv list of string arguments passed to the worker process
 */
// onWorkerStart: function (cid, caps, specs, args, execArgv) {
// },
/**
 * Gets executed just after a worker process has exited.
 * @param  {string} cid      capability id (e.g 0-0)
 * @param  {number} exitCode 0 - success, 1 - fail
 * @param  {object} specs    specs to be run in the worker process
 * @param  {number} retries  number of retries used
 */
// onWorkerEnd: function (cid, exitCode, specs, retries) {
// },
/**
 * Gets executed just before initialising the webdriver session and test framework. It allows you
 * to manipulate configurations depending on the capability or spec.
 * @param {object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that are to be run
 * @param {string} cid worker id (e.g. 0-0)
 */
// beforeSession: function (config, capabilities, specs, cid) {
//     console.log('Capabilities: ', capabilities);
//     console.log('Config: ', config);
//     capabilities = [{  }];
// },
/**
 * Gets executed before test execution begins. At this point you can access to all global
 * variables like `browser`. It is the perfect place to define custom commands.
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs        List of spec file paths that are to be run
 * @param {object}         browser      instance of created browser/device session
 */
// before: function (capabilities, specs) {
// },
/**
 * Runs before a WebdriverIO command gets executed.
 * @param {string} commandName hook command name
 * @param {Array} args arguments that command would receive
 */
// beforeCommand: function (commandName, args) {
// },
/**
 * Cucumber Hooks
 *
 * Runs before a Cucumber Feature.
 * @param {string}                   uri      path to feature file
 * @param {GherkinDocument.IFeature} feature  Cucumber feature object
 */
// beforeFeature: function (uri, feature) {
// },
/**
 *
 * Runs before a Cucumber Scenario.
 * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
 * @param {object}                 context  Cucumber World object
 */
// beforeScenario: function (world, context) {
// },
/**
 *
 * Runs before a Cucumber Step.
 * @param {Pickle.IPickleStep} step     step data
 * @param {IPickle}            scenario scenario pickle
 * @param {object}             context  Cucumber World object
 */
// beforeStep: function (step, scenario, context) {
// },
/**
 *
 * Runs after a Cucumber Step.
 * @param {Pickle.IPickleStep} step             step data
 * @param {IPickle}            scenario         scenario pickle
 * @param {object}             result           results object containing scenario results
 * @param {boolean}            result.passed    true if scenario has passed
 * @param {string}             result.error     error stack if scenario failed
 * @param {number}             result.duration  duration of scenario in milliseconds
 * @param {object}             context          Cucumber World object
 */
// afterStep: function (step, scenario, result, context) {
// },
/**
 *
 * Runs after a Cucumber Scenario.
 * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
 * @param {object}                 result           results object containing scenario results
 * @param {boolean}                result.passed    true if scenario has passed
 * @param {string}                 result.error     error stack if scenario failed
 * @param {number}                 result.duration  duration of scenario in milliseconds
 * @param {object}                 context          Cucumber World object
 */
// afterScenario: function (world, result, context) {
// },
/**
 *
 * Runs after a Cucumber Feature.
 * @param {string}                   uri      path to feature file
 * @param {GherkinDocument.IFeature} feature  Cucumber feature object
 */
// afterFeature: function (uri, feature) {
// },

/**
 * Runs after a WebdriverIO command gets executed
 * @param {string} commandName hook command name
 * @param {Array} args arguments that command would receive
 * @param {number} result 0 - command success, 1 - command error
 * @param {object} error error object if any
 */
// afterCommand: function (commandName, args, result, error) {
// },
/**
 * Gets executed after all tests are done. You still have access to all global variables from
 * the test.
 * @param {number} result 0 - test pass, 1 - test fail
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that ran
 */
// after: function (result, capabilities, specs) {
// },
/**
 * Gets executed right after terminating the webdriver session.
 * @param {object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs List of spec file paths that ran
 */
// afterSession: function (config, capabilities, specs) {
// },
/**
 * Gets executed after all workers got shut down and the process is about to exit. An error
 * thrown in the onComplete hook will result in the test run failing.
 * @param {object} exitCode 0 - success, 1 - fail
 * @param {object} config wdio configuration object
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {<Object>} results object containing test results
 */
// onComplete: function(exitCode, config, capabilities, results) {
// },
/**
 * Gets executed when a refresh happens.
 * @param {string} oldSessionId session ID of the old session
 * @param {string} newSessionId session ID of the new session
 */
// onReload: function(oldSessionId, newSessionId) {
// }
/**
 * Hook that gets executed before a WebdriverIO assertion happens.
 * @param {object} params information about the assertion to be executed
 */
// beforeAssertion: function(params) {
// }
/**
 * Hook that gets executed after a WebdriverIO assertion happened.
 * @param {object} params information about the assertion that was executed, including its results
 */
// afterAssertion: function(params) {
// }
