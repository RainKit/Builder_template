const resolveApp = require('./paths')
// const { merge } = require('webpack-merge')
// const prodConfig = require('./webpack.prod')
// const devConfig = require('./webpack.dev')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const commonConfig = (isProduction) => {
  return  {
    entry: './src/main.js',
    output: {
      path: resolveApp("./dist"),
      filename: 'js/[name].bundle.[hash:6].js',
      chunkFilename: "js/[name].[hash:6].chunk.js",
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
          test: /\.css$/i,
          use: [
            !isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
            !isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '/images/[name][hash:8].[ext]',
                limit: 100 * 1024,
                esModule: false
              }
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
          // type: 'asset',
          // generator: {
          //   filename: 'img/[name].[hash:8][ext]'
          // },
          // parser: {
          //   dataUrlCondition: {
          //     maxSize: 100 * 1024
          //   }
          // }
        },
        {
          test: /\.(ttf|eot|woff2?)$/i,
          use: [{
            loader: 'file-loader'
          }]
          // type: 'asset/resource',
          // generator: {
          //   filename: 'font/[name][hash:8][ext]'
          // }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Template',
        template: './public/index.html'
      }),
      new VueLoaderPlugin(),
      new DefinePlugin({
        BASE_URL: '"/"'
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: 'public',
          to: 'public',
          globOptions: {
            ignore: [
              "**/index.html",
            ]
          }
        }]
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:6].css",
        chunkFilename: "css/[name].[contenthash:6].chunk.css"
      }),
    ]
  }
  
}
module.exports = commonConfig

// module.exports = function(env) {
//   const isProduction = env.production
//   process.env.NODE_ENV = isProduction ? "production" : "development"
//   const config = isProduction ? prodConfig : devConfig
//   const mergeConfig = merge(commonConfig, config)
//   return mergeConfig
// }