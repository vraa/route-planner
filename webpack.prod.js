let baseConfig = require('./webpack.config');
let webpack = require('webpack');

module.exports = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV' : JSON.stringify('production')
            }
        })
    ]
});