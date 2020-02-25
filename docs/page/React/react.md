## 创建项目

- npx create-react-app demo

## 开始

```js
// index.js
// 引入
import React from 'react'
import ReactDOM from 'react-dom'

// jsx渲染

ReactDOM.render(
    <h1>Hello</h1>,
    document.querySelector('#root')
)

// 或者
// jsx中加入js代码需要在花括号内 注释也一样
const createApp = (props) => {
    return (
        {/*注释*/}
        <h1>{props.title}</h1>
    )
}
ReactDOM.render(
    createApp({
        title:'Hello'
    }),
    document.querySelector('#root')
)

// 或者
const App = (props) => {
    return (
        {/*注释*/}
        <h1 title={props.title}>{props.title}</h1>
    )
}
ReactDOM.render(
    //  需要写自闭合标签 相当于属性传参进去
    <App title="Hello" />,
    document.querySelector('#root')
)
```

## 类组件创建

```js
// 引入
import React from "react";
import { render } from "react-dom";

const Header = () => <h1>Header</h1>
// 创建类组件 ==> 继承 React.Component
class App extends React.Component {
  // 渲染函数
  render() {
      // 渲染时候传入的属性值 在这里通过this.props进行接收
    console.log(this.props)
    return (
        <Header / >
        <h1>{this.props.title}</h1>
    )
  }
}
render(
    <App title="Hello"/>,
     document.querySelector("#root")
);

```

## JSX 实现远离(虚拟 DOM 树创建方式)

```js
// 引入
import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  render() {
    //参数1 标签名，参数2 标签属性。其他参数为子元素
    return React.createElement(
      "div",
      {
        id: "root",
        className: "app"
      },
      React.createElement(
        "h1",
        {
          id: "h1",
          className: "h1"
        },
        "Hello"
      )
    );
  }
}
```

## 组件的样式

```js

class App extends React.Component {
  // 渲染函数
  render() {
      const style = {
          color : 'red'
      }
    return (
        // 方式一
        <h1 style={style}>Hello</h1>
        //方式二
        <h1 className="text-red">Hello</h1>
        // 方式三 classnames 插件
            // npm i classnames -S
            // import classNames from 'calssnames'
            // 动态添加不同的classname
        <h1 className={
            classNames(
                'a',
                {
                    'b':true
                    'c':false
                }
            )
        }>
        只有a，b 没有c
        </h1>
    )
  }
}

// 方式三 插件 styled-
// 样式会分开书写
    // npm i styled-components -S
import styles from 'styled-components '
const Title = sytled.h1`
    color:red
`
class App extends React.Component {
    render(){
        return (
            <Title>Hello</Title>
        )
    }
}
```

## 常见 目录结构

```
- src
    - components
        - Header
            - index.js 路径写导Header 会默认寻找index
            - item.js 子组件
        - index.js  负责导出所有组件
    - App.js 根组件
    - index.js 项目入口文件
```

## 空标签

```js
import { Fragment } from 'react'
<Fragment></Fragment>
// 或者
<></>
```

## 组件数据挂载

- 函数组件

```js
// peops接收
// 组件内部的内容是props.children
function App(props) {
  return <h1>{props.title}</h1>;
}

// prop-types 插件 检查 传入值的类型
import PropTypes from "prop-types";
// 注意小写
App.propTypes = {
  // title属性指定为string 且为 必传属性
  title: PropTypes.string.isRequired
};
App.defaultProps = {
  // title属性默认值
  title: "Title"
};
```

- 类组件

```js
// this.props进行接收
// 组件内部的内容是this.props.children
class App extends React.Component {
  // propType 类组件使用方式 static 静态
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  //  默认值
  static defaultProps = {
    title: "Title"
  };
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
```

## 类 组件 内部状态（属性）

```js
class App extends React.Component {
    constructor () {
        super()
        this.state = {
            title : 'Hello',
        }
    },
    render(){
        return (
            <h1>{this.state.title}<h1>
        )
    }
}
// 方式一 （受控组件【只有props】和半受控组件和非受控组件【只有state】）
class App extends React.Component {
    state = {
        title : 'Hello',
        list:[
            {id:1,con:false},
            {id:1,con:true}
        ]，
        tag:'<div>text<div>'
    }
    render(){
        return (
            <ul
            {
                // 传递参数技巧
            }
            {...this.state}
            {   // 得到的结果<ul title="Hello" list="[object Object],[object Object]" tag="<div>text<div>">
            }
            >
                <li>{this.state.title}</li>
                {
                    // 循环渲染列表 注意加key
                }
                { this.state.list.map(item=>{
                    return (
                        <li key={item.id}>{item.con ? '1':'0'}</li>
                    )
                }) }
                <li>
                    {
                        // 渲染html代码
                    }
                    <div dangerouslySetInnerHTML={{__html:this.state.tag}} />
                </li>
            </ul>
        )
    }
}
//
```

## 修改 State

- setState 是异步的

```js
// 不能可以直接修改
this.setState({
    title:'Hi'
})
// 方式2
this.setState((prevStat,props)=>{
    console.log(prevStat,props)
    // 打印结果为上一次的state,以及上一次的props
    return
        title:'Hi'
    }
})
// 由于是异步的 所以 在获取最新state值的时候 应该在回调函数中获取
this.setState((prevStat,props)=>{
    console.log(prevStat,props)
    // 打印结果为上一次的state,以及上一次的props
    return
        title:'Hi'
    }
},()=>{
    // 只可以在这里获取最新状态
    console.log(this.state.title)
})
```

### 数据绑定 需要自己进行绑定

## 事件

- 小 bug

```js
hand(){
    // 这种方式会报错 this指向有问题
    console.log(this.state)
}
// 推荐
hand = ()=>{
    console.log(this.state)
}
```

- 传参修改数据

```js
// 通过props传递方法 在组件内接受方法并调用
// App 父组件
class App extends React.Component{
    constructor () {
        super()
        this.state = {
            title : 'Hello',
        }
    },
    // 修改自己组件内的数据
    edit = (val)=>{
        console.log(title)
        this.setState({
            title:val
        })
    }
    render(){
        return (
            <Prop edit={this.edit}>
            </Prop>
        )
    }
}
// prop 子组件
class Prop extends React.Component{
    click = (title)=>{
        // 调用传递的方法 修改父组件数据
        this.props.edit()
    }
    render(){
        return (
            <div onClick={this.click}>
            </div>
        )
    }
}
```

## ref 获取原生 Dom/组件

```js
class App extends React.Components {
  constructor() {
    super()
    this.state={}
    this.inputDom = React.createRef();
    // 首先创建ref
  }
  add = ()=>{
      console.log(this.inputDom)
  }
  render(){
      return (
          <div>
          <input onChange={this.add} ref={this.inputDom} />
          </div>
      )
  }
}

```
