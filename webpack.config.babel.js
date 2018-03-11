const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

export default {
  entry: './src/index.js',
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    alias:{
      assets:path.resolve(__dirname, 'src/assets')
    },
    modules: [
      'assets/sprite' //css在哪里能找到sprite图
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/icons'), //准备合并成sprit的图片存放文件夹
        glob: '*.png' //哪类图片
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/sprite/sprites-[hash:4].png'), // sprite图片保存路径
        css: path.resolve(__dirname, 'src/styles/_sprites.css') // 生成的sass保存在哪里
      },
      spritesmithOptions:{
        // algorithm: 'alt-diagonal',
        padding: 10,
      },
      apiOptions: {
        cssImageRef: "~sprite-[hash:4].png" //css根据该指引找到sprite图
      }
    })
  ]
};
