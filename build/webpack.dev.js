const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const resolveApp = require('./paths')

 const devConfig= {
  mode: 'development',
  target: "web",
  devtool: 'source-map',
  devServer: {
    hot: true,
    hotOnly: true,
    port: 8086,
    contentBase: resolveApp("./dist")
  }
}

module.exports = merge(commonConfig(false), devConfig)