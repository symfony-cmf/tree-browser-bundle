var path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.resolve.alias.bundle = path.join(__dirname, 'Resources/assets/js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // vendors
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jquery-ui/jquery-ui.js',

      // jasmine helpers
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/jasmine-ajax/lib/mock-ajax.js',

      // specs
      'Tests/tests.cmf_tree_browser.js'
    ],


    // list of files to exclude
    exclude: ['*.swp', '*~'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'Tests/tests.cmf_tree_browser.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
