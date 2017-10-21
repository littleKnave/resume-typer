/**
 * Created by Administrator on 2017/10/16.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var moduleExports = {
    // index: path.resolve(__dirname, './index/index.html'),
    //定义输出路径,可自定义
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsSubDirectory: path.resolve(__dirname, './dist/static')
};

module.exports = {
    devtool: 'eval-source-map',

    entry: path.resolve(__dirname, './app/index.js'),
    output: {
        path: path.join(moduleExports.assetsSubDirectory),
        filename: 'js/[name]-[hash].js'
    },
    devServer: {
        contentBase: './dist',
        inline:true
    },
    module: {
        rules: [
            {
                test: /\.jsx|\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'less-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [require('autoprefixer')]
                                }
                            }
                        ]
                    }
                )
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: path.resolve(moduleExports.assetsSubDirectory, 'img/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: path.join(moduleExports.assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([moduleExports.assetsRoot]),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'true',
            // filename: path.join(moduleExports.assetsRoot, 'index.html')
            // 不用再定义绝对路径，否则devServer会找不到
            filename:  'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: path.join(moduleExports.assetsRoot, 'static'),
                ignore: ['.*']
            }
        ]),
        new ExtractTextPlugin('css/[name]-[contenthash].css'),
        new webpack.HotModuleReplacementPlugin()
    ]
};
