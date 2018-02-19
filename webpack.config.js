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
  devtool: isProduction ? false : 'cheap-module-source-map',

  entry: {
    app: join(__dirname, 'src/web/index.js')
  },

  output: {
    filename: '[name].js'
  },

  devServer: {
    compress: true,
    port: 9000,
    hot: !isProduction,
    before: app => {
      app.get('/', (req, res, next) => {
        readFileP(join(__dirname, 'src/web/index.html'), {encoding: 'utf8'})
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

  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.web.wasm', '.web.mjs', '.web.js', '.web.json', '.wasm', '.mjs', '.js', '.json']
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
