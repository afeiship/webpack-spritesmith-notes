const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.export = {
  // entry: 'src/index.js',
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          name: 'images/[name]-[hash:4].[ext]',
          limit: 8192
        }
      },
    ]
  },
  resolve: {
    alias:{
      assets:path.resolve(__dirname, 'src/assets')
    },
    modules: [
      'node_modules',
      'assets/sprite' //css在哪里能找到sprite图
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/icons'), //准备合并成sprit的图片存放文件夹
        glob: '*.png' //哪类图片
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/sprite/sprites.png'), // sprite图片保存路径
        css: path.resolve(__dirname, 'src/assets/sprite/_sprites.scss') // 生成的sass保存在哪里
      },
      apiOptions: {
        cssImageRef: "~sprite.png" //css根据该指引找到sprite图
      }
    })
  ]
};
