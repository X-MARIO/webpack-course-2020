const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const optimization = () => {

    const config = {
        splitChunks: {
            chunks: "all",
        }
    }

    if (isProduction) {
        config.minimizer = [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    }

    return config;
}

const filename = (ext) => {
    return isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`;
}

console.log('isDevelopment', isDevelopment);
console.log('isProduction', isProduction);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.png',
        ],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDevelopment,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProduction,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hrm: isDevelopment,
                            // reloadAll: true,
                        },
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hrm: isDevelopment,
                            // reloadAll: true,
                        },
                    },
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hrm: isDevelopment,
                            // reloadAll: true,
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.csv/,
                use: ['csv-loader'],
            }
        ]
    }
}