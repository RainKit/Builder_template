const resolveApp = require('./paths')
const { merge } = require('webpack-merge')
// const prodConfig = require('./webpack.prod')
// const devConfig = require('./webpack.dev')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')

const commonConfig = {
  entry: './src/main.js',
  output: {
    path: resolveApp("./dist"),
    filename: '[name].bundle.js',
    chunkFilename: "[name].[hash:6].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }, 
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          }, 
          'postcss-loader', 
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][hash:8][ext]'
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new VueLoaderPlugin()
    ]
}

module.exports = commonConfig

// module.exports = function(env) {
//   const isProduction = env.production
//   process.env.NODE_ENV = isProduction ? "production" : "development"
//   const config = isProduction ? prodConfig : devConfig
//   const mergeConfig = merge(commonConfig, config)
//   return mergeConfig
// }