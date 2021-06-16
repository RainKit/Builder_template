const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

 const devConfig= {
  mode: 'development',
  target: "web",
  devServer: {
    hot: true,
    hotOnly: true,
    port: 8086
  }
}

module.exports = merge(commonConfig, devConfig)