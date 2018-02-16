const {join} = require('path');
const {readFile} = require('fs');
const {promisify} = require('util');
const {template} = require('lodash/fp');
const {DefinePlugin, NamedModulesPlugin, HotModuleReplacementPlugin} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const readFileP = promisify(readFile);

const isProduction = process.env.NODE_ENV === 'production';

const styleLoader = {
  loader: 'style-loader',
  options: {
    hmr: !isProduction
  }
};
const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: 1,
    minimize: isProduction,
    sourceMap: true
  }
};
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss'
  }
};

module.exports = {
  devtool: isProduction ? null : 'cheap-module-source-map',

  entry: {
    app: join(__dirname, 'src/index.js')
  },

  output: {
    filename: '[name].js'
  },

  mode: isProduction ? 'production' : 'development',

  devServer: {
    compress: true,
    port: 9000,
    before: app => {
      app.get('/', (req, res, next) => {
        readFileP(join(__dirname, 'src/index.html'), {encoding: 'utf8'})
          .then(index => {
            return template(index)(
              Object.assign(
                {
                  isProduction
                },
                process.env
              )
            );
          })
          .then(index => res.send(index))
          .catch(next);
      });
    }
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
      isProduction
        ? {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
              fallback: styleLoader,
              use: [cssLoader, postcssLoader]
            })
          }
        : {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [styleLoader, cssLoader, postcssLoader]
          },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name(file) {
            if (isProduction) {
              return '[hash].[ext]';
            }

            return '[path][name].[ext]';
          }
        }
      }
    ]
  },
  plugins: [
    isProduction ? null : new NamedModulesPlugin(),
    isProduction ? null : new HotModuleReplacementPlugin(),
    new DefinePlugin(process.env),
    isProduction
      ? new ExtractTextPlugin({
          filename: '[name].css'
        })
      : null
  ].filter(p => p),

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
