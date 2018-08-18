const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const distPath = path.resolve(__dirname, './dist')

module.exports = env => {
  const mode = env.NODE_ENV

  return {
    mode,
    entry: path.resolve(__dirname, './src/scripts/app.js'),
    output: {
      path: distPath,
      filename: '[name].js'
    },
    devServer: {
      contentBase: distPath
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([`${distPath}/*.*`], {}),
      new HtmlWebpackPlugin(
        {
          filename: 'index.html',
          hash: true,
          template: 'src/templates/index.html',
          title: 'Yamcha Facts',
          description: 'Truths about the life of Dragon Ball\'s exact opposite of Chuck Norris',
          inject: false,
          minify: true
        }
      )
    ],
    resolve: {
      alias: {
        // source base path
        "@": path.resolve(__dirname, 'src'),
      }
    }
  }
}
