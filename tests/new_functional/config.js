const paths = require('./paths');
const capabilities = require('./capabilities');
const argv = require('yargs');
const chaiAsPromised = require('chai-as-promised');

let config = {
  services: ['selenium-standalone'],
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'error',
  coloredLogs: true,
  bail: 1,
  screenshotPath: paths.test.errorShots,
  baseUrl: process.env.BASEURL,
  waitforTimeout: 2000,
  updateJob: true,
  specs: [`${paths.test.wdioSpec}/**/*.spec.js`],
  suites: {
    core: [
      `${paths.test.wdioSpec}/*.spec.js`
    ],
    census: [
      `${paths.test.wdioSpec}/census/**/*.spec.js`
    ],
    ukis: [
      `${paths.test.wdioSpec}/ukis/**/*.spec.js`
    ]
  },
  sync: false,
  connectionRetryTimeout: 5000,
  connectionRetryCount: 3,
  capabilities: [capabilities.chrome],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 12000000
  },
  before: function(capabilities, specs) {
    // Allow chaining of browser promises with chai assertions
    chaiAsPromised.transferPromiseness = browser.transferPromiseness;
  },
  afterTest: function(test) {
    // Dump page source on failure to help with debugging tests

  }
};

const sauceLabsConfig = {
  services: ['sauce'],
  sauceConnect: true,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  capabilities: [capabilities.firefox]
};

const phantomjsConfig = {
  services: ['phantomjs'],
  waitforTimeout: 3000,
  capabilities: [capabilities.phantomjs],
  maxInstances: 4,
  phantomjsOpts: {
    ignoreSslErrors: true
  }

};

if (process.env.TRAVIS === 'true') {
  config = Object.assign(config, phantomjsConfig, {logLevel: 'silent'});

  // Yuk, is there a better way to add behaviour to the before hook?
  const before = config.before;
  config.before = () => {
    before();
    browser.setViewportSize({
      width: 1280,
      height: 1024
    });

  };

} else {
  if (argv.sauce) {
    config = Object.assign(config, sauceLabsConfig);
  } else if (argv.headless) {
    config = Object.assign(config, phantomjsConfig);
  }
}

module.exports = config;
