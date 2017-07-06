var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        index: [
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    "babel-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Todo',
            filename: 'build/todo.html',
            template: './index.html',
            chunks: ['index']
        })
    ]
}