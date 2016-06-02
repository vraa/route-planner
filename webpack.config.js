var path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.join(__dirname, 'resources', 'js'),
        filename: 'bundle.js'
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