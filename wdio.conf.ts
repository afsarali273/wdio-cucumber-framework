import type { Options } from '@wdio/types';
import { baseConfig, envData, setup } from './core/config/project-config.ts';
import { DeviceCapabilities } from './core/config/device-capabilities.ts';
import {
    parseTagsFromCommandLine,
    setUpAfter,
    setUpBefore,
    setUpOnComplete,
    setUpOnPrepare,
} from './core/utils/hooks.ts';
import {setUpServices } from './core/mobile/mobile-config.ts';
import { setUpReporter } from './core/utils/reporter.ts';
import { RemoteServiceFactory } from './core/utils/remote-service/remote-services.ts';
import { filterCucumberFeaturesByTags } from './core/utils/custom-utils.ts';

const featuresPath = '/tests/features/**/*.feature';


await setup();
export function setupCapabilities(): Options.Testrunner['capabilities'] {
    return new DeviceCapabilities().getCapabilities() as any[];
}

export function setLoggerLevel(): Options.Testrunner['logLevel'] {
    //trace | debug | info | warn | error | silent
    return 'info';
}

export function setSpecs(): string[] {
    return filterCucumberFeaturesByTags(featuresPath, parseTagsFromCommandLine());
}

export function setCucumberOpts(): Options.Testrunner['cucumberOpts'] {
    const myTagExpression = parseTagsFromCommandLine();

    return {
        require: ['./tests/steps/**/*.ts'],
        backtrace: false,
        requireModule: ['ts-node/register'],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        timeout: 60000,
        tags: myTagExpression,
        ignoreUndefinedDefinitions: false
    };
}

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    ...(RemoteServiceFactory.getRemoteServiceConfig(baseConfig) || {}),

    specs: setSpecs(),
    exclude: [],
    maxInstances: Number(envData?.PARALELL_INSTANCES ) || 1,
    capabilities: setupCapabilities(),
    logLevel: setLoggerLevel(),
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    services: setUpServices(baseConfig),
    reporters: setUpReporter(),
    cucumberOpts: setCucumberOpts(),
    onPrepare: setUpOnPrepare(),
    before: setUpBefore(),
    onComplete: setUpOnComplete(),
    after: setUpAfter(),
}
