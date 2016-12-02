import {
  HTML_METADATA,
  IS_DEV,
  IS_PROD,
  HOST,
  PORT,
  root,
  src
} from './config';

// Webpack Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

// PostCSS Plugins
import autoprefixer from 'autoprefixer';
import assets from 'postcss-assets';

export default (() => {
  const config = {};

  config.metadata = HTML_METADATA;

  config.devtool = IS_PROD ? 'source-map' : 'cheap-eval-source-map';

  config.cache = IS_DEV;

  config.entry = {
    main: src('main.js')
  };

  config.output = {
    path: root('dist'),
    filename: IS_PROD ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: IS_PROD ? '[id].[chunkhash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    extensions: ['', '.js', '.json'],
    root: src()
  };

  config.plugins = (() => {
    const plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: src('index.html'),
        inject: 'body'
      }),
      new ExtractTextPlugin('css/[name].[hash].css', { disable: IS_DEV })
    ];

    if (IS_PROD) {
      plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          compressor: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            keep_fnames: true,
            screw_ie8: true
          }
        })
      );
    }

    return plugins;
  })();

  config.module = {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: IS_DEV
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        exclude: src('app')
      },
      {
        test: /\.css$/,
        loader: 'raw!postcss',
        exclude: src('assets/css')
      },
      // All scss in assets will be bundled in an external css file.
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        exclude: src('app')
      },
      // All scss required in app folder will be merged in js files.
      {
        test: /\.scss$/,
        loader: 'raw!postcss!sass',
        exclude: src('assets/css')
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: src('index.html')
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.(?:ttf|eot|svg|woff2?|png|jpe?g)(?:\?.*)?$/,
        loader: IS_PROD ? 'file?name=/[sha1:hash:hex:32].[ext]' : 'url'
      }
    ]
  };

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    assets({
      basePath: src(),
      loadPaths: [
        src('assets/images'),
        src('assets/fonts')
      ]
    })
  ];

  if (IS_DEV) {
    config.devServer = {
      host: HOST,
      port: PORT,
      historyApiFallback: true
    };
  }

  return config;
})();
