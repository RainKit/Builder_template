const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')


const prodConfig = {
  mode: 'production',
  optimization: {
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
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({})
  ]
}
module.exports = merge(commonConfig, prodConfig)