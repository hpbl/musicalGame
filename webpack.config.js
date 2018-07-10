const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/index.html'),
        to: path.resolve(__dirname, 'docs')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'docs')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'production-dependencies',
      filename: 'production-dependencies.bundle.js'
    }),
  ],

  devtool: 'inline-source-map'
}