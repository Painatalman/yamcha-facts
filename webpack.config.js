const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const distPath = path.resolve(__dirname, './dist');
const srcPath = path.resolve(__dirname, './src');

module.exports = (env) => {
  const mode = env.NODE_ENV;

  return {
    mode,
    entry: {
      main: path.resolve(__dirname, './src/scripts/app.ts')
    },
    output: {
      path: distPath,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: srcPath
        },
        {
          test: /\.js$/,
          include: srcPath,
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
            }
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
      new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: true,
        template: 'src/templates/index.html',
        title: 'Yamcha Facts',
        description:
          "Truths about the life of Dragon Ball's exact opposite of Chuck Norris",
        inject: false,
        minify:
          mode === 'production'
            ? {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
                collapseWhitespace: true
              }
            : false
      }),
      new CopyPlugin({
        patterns: [
          {
            from: `${srcPath}/scripts/data/data.json`,
            to: `${distPath}/data.json`
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': srcPath
      },
      extensions: ['.js', '.ts', '.json']
    }
  };
};
