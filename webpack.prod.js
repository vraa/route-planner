let baseConfig = require('./webpack.config');
let webpack = require('webpack');

module.exports = Object.assign({}, baseConfig, {
    plugins: [].concat(
        [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        baseConfig.plugins
    ),
    devtool: 'none'
});