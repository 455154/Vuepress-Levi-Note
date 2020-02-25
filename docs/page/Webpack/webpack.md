
## 开始 

- npm i webpack webpack-cli -D

- 设置 package.json 中的"scripts"
    - 'dev' : "webpack --mode production"  线上模式 代码压缩
    - 'dev' : "webpack --mode development"  开发模式 代码不压缩
    - 设置配置文件目录
    - 'dev' : "webpack --mode development --config script/webpack.config.js"
    - 创建服务器 npm i webpack-dev-serve -D
    - 'dev' : "webpack- --mode development --config script/webpack.config.js"

- 创建配置文件 
    - webpack.config.js
```js
const path = require('path');
// 在webpack.config.js 使用以下方式导出
module.exports = {
    // 入口
    // entry:'./src/index.js',
    entry:{
        index:'./src/index.js'
        },
    // 出口
    output:{
        // 出口路径
        path: path.resolve(__dirname, 'dist'),
        // [hash]会带hash值,[hash:8]截断hash值（多个出口文件hash值一样）
        // [chunkhash] 根据模块生成不同hash值 （a文件修改 b文件没修改 则只有a文件hash会变化）（多个出口文件 hash值也不一样）
        // [name] 默认为入口的文件名 
        // 出口文件名 文件名上可以加路径 
        filename: 'js/[name][hash].js'
    }，

}
```

### loader 处理非js文件

- 具体使用的loader 需要去npm下载
```js
module.exports = {
  module: {
      // 规则
      rules:[
          {
              // 匹配文件名
              test:/\.css$/
              // 选取使用的loader 写在数组后面的先运行
              use:['style-loader',
              {
                  // 这种写法 可以在options中配置参数 
                 loader: 'css-loader',
                 options:{

                 }
              }]
          }
          ...
      ]
  }
};
```

### plugins 插件 

- html-webpack-plugin 自动创建html

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
      new HtmlWebpackPlugin({
          title:'Webpacl',
          // 模版文件
          template:'index.html'
      })
  ]
};
```

### 模式 开发/线上

```js
module.exports = {
  mode: 'production' //development
};
```

### devServer 服务器设置

```js
module.exports = {
  devServe: {
      // 服务器端口号
      port: 3000 ,
      // 自动打开 
      open:true,
      // 代理
      proxy:{

      }
  }
};
```