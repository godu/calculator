const {join} = require('path');

const isProduction = process.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: join(__dirname, 'src/index')
  },

  output: {
    filename: '[name].js'
  },

  mode: isProduction ? 'production' : 'development',

  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-1', 'react'],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        loader: 'file-loader'
      }
    ]
  }
};
