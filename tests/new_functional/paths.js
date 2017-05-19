/**
 * Paths to project folders
 */

const homePath = './app';
const appPath = './app/assets';
const distPath = './static';

const paths = {
  app: appPath,
  input: appPath + '/**/*',
  output: distPath,
  scripts: {
    dir: appPath + '/js/',
    input: appPath + '/js/**/*.js',
    output: distPath + '/js/'
  },
  styles: {
    dir: appPath + '/styles/',
    input: appPath + '/styles/**/{fixed,responsive}.scss',
    input_all: appPath + '/styles/**/*.scss',
    output: distPath + '/css/'
  },
  templates: {
    dir: appPath + '/templates/',
    input: [homePath + '/templates/**/*.html', homePath + '/themes/**/*.html']
  },
  svgs: {
    dir: appPath + '/img/',
    input: appPath + '/img/**/*.svg',
    output: distPath + '/img/'
  },
  images: {
    input: appPath + '/img/{,theme/**/}**.{svg,png,jpg,jpeg,gif}',
    output: distPath + '/img/'
  },
  fonts: {
    input: appPath + '/fonts/**/*.{ttf,woff,woff2,eot}',
    output: distPath + '/fonts/'
  },
  favicons: {
    input: appPath + '/favicons/**/*.{png,xml,ico,json,svg}',
    output: distPath + '/favicons/'
  },
  test: {
    input: appPath + '/js/**/*.js',
    karmaConf: 'tests/karma/karma.conf.js',
    karmaSpec: 'tests/karma/spec/**/*.js',
    wdioConf: 'tests/new_functional/wdio.conf.js',
    wdioSpec: 'tests/new_functional/spec',
    coverage: 'tests/karma/coverage/',
    results: 'tests/karma/results/',
    errorShots: 'tests/errorShots'
  }
};

module.exports = paths;
