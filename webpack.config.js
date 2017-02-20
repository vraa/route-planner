let path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    output: {
        path: path.join(__dirname, 'resources', 'js'),
        filename: 'bundle.js',
        publicPath: '/resources/js'
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
            }
        ]
    },
    devtool: 'source-map'
};