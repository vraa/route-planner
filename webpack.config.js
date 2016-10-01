module.exports = {
    entry: './src/js/main.js',
    output: {
        path: './resources/js',
        filename: 'bundle.js',
        publicPath: '/resources/js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    devtool: '#source-map'
}