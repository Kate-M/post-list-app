const path = require('path');
const postcss = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('jquery');
const webpack = require('webpack');

module.exports = {
    entry: {
        js: ['babel-polyfill', 'fetch-polyfill','./app/js/script.js', './app/js/jPages.js'],
        css: './app/scss/style.scss'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]/script.js"
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'app/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'app/scss'),
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [

                                    path.resolve(__dirname, './node_modules/compass-mixins/lib')
                                ]
                            }
                        },
                     ]
                })
            }
        ]
    },
    plugins: [
        postcss,
        new LiveReloadPlugin(),
        new ExtractTextPlugin({
            filename: './css/style.css',
            allChunks: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
    ]
};

