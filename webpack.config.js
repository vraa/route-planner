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
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
}