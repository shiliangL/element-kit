/*
 * @Author: shiliangL
 * @Date: 2022-05-07 09:03:15
 * @LastEditTime: 2022-05-13 11:53:28
 * @LastEditors: Do not edit
 * @Description:
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { getComponentEntries } = require('./build/utils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CssMiniMizerPlugin = require('css-minimizer-webpack-plugin')

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
      '@': path.resolve(__dirname, './src')
    },
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  externals: {
    'vue': {
      amd: 'vue',
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue'
    },
    'element-ui': 'ELEMENT'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMiniMizerPlugin({
        parallel: true
      }),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          },
          compress: true,
          mangle: true,
          toplevel: false,
          keep_classnames: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    })
  ]
}
