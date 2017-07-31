let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    output: {
        path: path.join(__dirname, 'resources', 'js'),
        filename: 'bundle.[hash].js',
        publicPath: 'resources'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                }
            }, {
                test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
                use: ["file-loader"]
            }, {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/views/index.html',
            filename: '../index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],
    devtool: 'source-map'
};