/*
 * @Author: shiliangL
 * @Date: 2022-05-07 09:03:15
 * @LastEditTime: 2022-05-07 23:14:54
 * @LastEditors: Do not edit
 * @Description:
 */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const { getComponentEntries } = require('./build/utils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    ...getComponentEntries('src/packages')
  },
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name]/index.js',
    libraryExport: 'default',
    library: 'element-kit',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: ['node_modules'],
  },
  externals: {
    vue: {
      amd: 'vue',
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
    }),
  ],
};
