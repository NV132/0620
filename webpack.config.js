const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      main: './assets/js/app.js',
      calculator: './assets/js/calculator.js',
      chatbot: './assets/js/chatbot.js'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      clean: true
    },
    ignoreWarnings: [
      /Deprecation The legacy JS API is deprecated/,
      /legacy JS API is deprecated/,
      /Dart Sass 2.0.0/
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern-compiler',
                implementation: require('sass')
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/products.html',
        filename: 'products.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/consultation.html',
        filename: 'consultation.html',
        chunks: ['main', 'calculator']
      }),
      new HtmlWebpackPlugin({
        template: './src/html/faq.html',
        filename: 'faq.html',
        chunks: ['main', 'chatbot']
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      })] : [])
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    resolve: {
      extensions: ['.js', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'assets'),
        '@js': path.resolve(__dirname, 'assets/js'),
        '@scss': path.resolve(__dirname, 'scss'),
        '@images': path.resolve(__dirname, 'assets/images')
      }
    }
  };
}; 