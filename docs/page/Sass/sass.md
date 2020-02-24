## 命令行

- //单文件转换命令
- sass input.scss output.css
- 
- //单文件监听命令
- sass --watch input.scss:output.css
- 
- //如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
- sass --watch app/sass:public/stylesheets

### 配置项

- //编译格式
- sass --watch input.scss:output.css --style compact
- 
- //编译添加调试map
- sass --watch input.scss:output.css --sourcemap
- 
- //选择编译格式并添加调试map
- sass --watch input.scss:output.css --style expanded --sourcemap
- 
- //开启debug信息
- sass --watch input.scss:output.css --debug-info