const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
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
        title: 'Yamcha Facts: random fun for Dragon Ball fans',
        description:
          "This is a casual and fun website for Dragon Ball and Yamcha fans. It's a parody website similar to Chuck Norris fact lists, with humorously impossible feats. But this is Yamcha we're talking about, so these impossible feats are nothing to be proud of!",
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
