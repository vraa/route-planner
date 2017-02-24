let baseConfig = require('./webpack.config');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV' : JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
});