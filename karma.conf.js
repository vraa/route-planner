module.exports = function (config) {

    config.set({

        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,
        colors: true,
        port: 9876,

        files: [
            './test/tests.webpack.js'
        ],

        preprocessors: {
            './test/tests.webpack.js': ['webpack']
        },
        browsers: ['Chrome'],

        singleRun: true,

        autoWatch: false,

        frameworks: ['jasmine'],

        webpack: {},

        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true
            }
        }
    });
};
