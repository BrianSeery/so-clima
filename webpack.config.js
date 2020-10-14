const HtmlWebpackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtractPluguing = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './src/app/index.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    node: {
        fs: 'empty',
        net: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader': MiniCssExtractPluguing.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPluguing({
            filename: 'bundle.css'
        })
    ]

};