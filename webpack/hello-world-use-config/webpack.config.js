/**
 * Created by ubuntu64 on 11/7/16.
 */
var webpack = require('webpack');

console.log(__dirname, '================================================');

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by ZhouYong!')
    ]
};