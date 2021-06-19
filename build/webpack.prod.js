const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')


const prodConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          mangle: true,
          toplevel: true,
          format: {
            comments: false
          },
          compress: {
            arguments: true,
            dead_code: true
          },
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new CssMinimizerWebpackPlugin()
  ]
}
module.exports = merge(commonConfig, prodConfig)