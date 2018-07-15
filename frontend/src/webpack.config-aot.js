var ngtoolsWebpack = require('@ngtools/webpack');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var helpers = require('./config/helpers');

module.exports = {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/wc/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
      'app': './app/main.ts',
      'external': './config/external.ts',
      'shared': './config/shared.css'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('.', 'app'),
                loader: extractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap'})
            },
            {
                test: /\.css$/,
                include: helpers.root('.', 'app'),
                loader: 'raw-loader'
            },
            {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?(v=)?(\d+)(\.\d+)*)?$/,
              loader: 'file-loader?name=extra/[name].[ext]'
            }
        ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new extractTextPlugin({filename: '[name].[hash].css', disable: false, allChunks: true}),
      new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'shared', 'external']
      }),
      new htmlWebpackPlugin({
          hash: true,
          template: 'index.html'
      }),
      new ngtoolsWebpack.AngularCompilerPlugin({
        tsConfigPath: './tsconfig.aot.json',
        entryModule: './app/app.module#AppModule',
        sourceMap: true
      }),
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
      })]
};
