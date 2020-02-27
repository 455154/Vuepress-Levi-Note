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
            <Prop edit={()=>this.edit("Hi")}>
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
    super();
    this.state = {};
    this.inputDom = React.createRef();
    // 首先创建ref
  }
  add = () => {
    console.log(this.inputDom);
  };
  render() {
    return (
      <div>
        <input onChange={this.add} ref={this.inputDom} />
      </div>
    );
  }
}
```

## 生命周期

- 挂载

  - constructor
  - static getDerivedStateFromProps() 得到状态 该函数没有 this
  - render 生成虚拟 Dom
  - componentDidMount 组件挂载（发起请求）

- 更新

  - static getDerivedStateFromProps() 得到状态 该函数没有 this
  - shouldComponentUpdate(nextProps, nextState) 是否确认更新
  - render() 开始生成虚拟 Dom
  - componentDidUpdate 组件更新

- 卸载
  - componentWillUnmount() 组件将卸载

## ajax

- 要在 componentDidMount() 内部发送请求
- 创建 services

  - 创建 apis.js 导出默认地址。以及每个路径
  - 创建 index.js 写拦截器 并导出各种请求方法

  ```js
  //apis.js
  export default {
    baseURL: "https://jsonplaceholder.typicode.com",
    // 获取 todos 的接口
    todos: "/todos"
  };
  //inde.js
  import axios from "axios";
  import apis from "./apis";

  const ajax = axios.create({
    baseURL: apis.baseURL
  });

  // 在这里还会去做一些全局的拦截器处理

  export const getTodos = () => {
    return ajax.get(apis.todos);
  };
  ```

## react-hooks

- 让函数组件 也可以向类组件一样 使用生命周期 等

```js
import { useState, useEffect } from "React";
const App = () => {
  const [con, setCon] = useState(1);
  // 参数1 相当于 state值 ，参数2 相当于 setState方法
  useEffect(() => {
    console.log("更新");
  });
  // 数据更新生命周期
  return (
    <div
      onClick={() => {
        setCon(con + 1);
      }}
    >
      {con}
    </div>
  );
};
```

## 组件通讯(非父子) Context

- React.createContext
- 类似 Vue 事件中心 不常用 也不太好用

## HOC 高阶组件

- 函数返回组件 （同样也可以接收组件为参数 并在返回值中使用）

```js
import React from "react";

class App extends React.Component {
  render() {
    return <div>App</div>;
  }
}
// 高阶函数
const WithCopyright = (App) => {
  return (
    class App extends React.Component {
        render() {
        return (
            <div>
                <div>App</div>
                <App />
            </div>
            )
        }
    };
  )
};
// 调用 并导出
export default WithCopyright(App);
```

## 添加配置 插件 react-app-rwired

- 创建 config-overrides.js

- 通过插件 customize-cra 进行配置 config-overrides.js

```js
// 使用addDecoratorsLegacy 需要安装插件 @babel/plugin-proposal-decorators
const { override, addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
  // 配置装饰器模式（可以配置很多）
  addDecoratorsLegacy()
);
```

- 修改命令

```
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",

    // 修改为
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
```

- 使用装饰器

```js
@WithCopyright
class App extends React.Component {
  render() {
    return (
      <div>
        <div>App</div>
        <App />
      </div>
    );
  }
}

// 等同于WithCopyright（App）
```

## 状态管理 Redux

- 基于 flux 架构实现

- Redux 使用原则

  - 唯一数据源 (getState 单例设计模式)
  - 状态是只读的 ==> 更改则先复制一遍 修改的是复制的值 原来的值不动
  - 数据改变必须通过纯函数完成 (reducer)
    - 没有副作用
    - 什么样的输入 得到什么样的输出
    - 函数体内部不可以调用函数体以外的东西，除了参数
    - 不能使用 Date，Random 这样的随机数

- 项目中使用 Redux
  - Redux 插件
  - npm install --save redux

```js
// 1.创建store.js
        import { createStore } from "redux";
    // 导出reducer 并创建导出store
        // 在需要用的store的组件内部进行导入即可使用store
        import rootRedcuer from './reducers'
        export default createStore(rootRedcuer);

// 2.创建 reducers
    // index.js
        // 合并 reducers的方法
            import { combineReducers } from 'redux'
        // 引入具体reducer
            import cart from './cart'

            export default combineReducers({
                cart
            })
    // 具体reducer
        // 设置默认state
            const initState = [
            { id: 1, title: "apple", nprice: "888", amount: 10 }
            ];
        // 默认导出一个state ，action判断还没有做
            export default (state,action)=>{
                swith(action.type){
                    default:
                        return state
                }
            }
// 3. 创建action
        // actionType.js 创建action的类型
            export default {
                INCERMENT_CART_ITEM:'INCERMENT_CART_ITEM',
            }
        // 创建具体action文件
        //这个导出值会在具体的组件内使用 在store.dispatch()分发动作的函数中作为动作参数使用
            // 导入action类型
            import actionType from "./actionType";
            // 创建action 并导出 在具体的组件内部会进行使用
                //由于需要传递具体的参数 所以使用函数返回值的方式
            export const incement = (id) => {
                console.log(id)
                return {
                    type: actionType.INCERMENT_CART_ITEM,
                    // payload 为约定俗成的id方式
                    payload : {
                        id
                    }
                }
            }
// 4.在reducers文件夹中具体的reduer中处理actionType
    // 引入 actionType
    import actionType from "./actionType";
    ...
    // 在switch中进行处理
    swith(action.type){
        case actionType.INCERMENT_CART_ITEM:
            return state.map(item=>{
                if(item.id === action.payload.id) {
                    ....
                    return item
                }
            })
        default:
            return state
    }
    ...
// 5 .在组件中 创建修改组件内部数据的方法
    // 并讲这个方法挂载导 store.subscribe 自执行中（当store中的state的数据改变 就会自动触发）
    // get 为修改组件内部数据方法
    store.subscribe(get)

```

- React 项目中使用 React-Redux

  - npm i react-redux redux (两个插件都需要)

  - 与上面唯一的区别 在于 数据的半自动传递 底层通过 context

```js
// 提供两个最核心Api
//Provider 将它包裹在App外面 并传递store（必须传递）
import { Provider } from "react-redux";
<Provider store={store}>
  <App />
</Provider>;

// connect 在哪里需要用导store 则在这个组件内引入
// connect 是一个函数 返回值也是一个高阶组件 在最后导出 一般常用装饰器模式
import { connect } from "react-redux";
class cart extends React.Component {
  render() {
    return <div></div>;
  }
}
// connect的参数1 是一个函数 其参数能拿到state 其返回值 可以被直接注入到该组件的props中
// 实际上 state就是 getState()的返回值
const mapStateToProps = state => {
  return {
    cartList: state.cart
  };
};

// connect的参数2 也是一个函数 其参数能拿到state.dispatch 其返回值 可以被直接注入到该组件的props中
// 所以在 返回值中 可以自定义函数
// const mapDispatchToProps = dispatch => {
//   return {
//     add: () => dispatch(increment(id)),
//     reduce: () => dispatch(decrement(id))
//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(cart);

// 对于dispatch 的修改 有更好的方法 在action中 直接导出action 并当作第二个参数使用
import { increment, decrement } from "../../action/cart";
export default connect(mapStateToProps, { increment, decrement })(cart);
// 在使用时 就可以 this.props.increment.bind(this,id)  使用bind 是因为需要传递参数

// console.log( this.props )
```

- 异步操作 在 action 中操作

```js
// 因为本来的action会直接调用dispatch 如果要异步操作 则需要暂停函数 或者手动dispatch
// 所以在这里 需要使用redux˙中间件 Middleware 提供action 发起 到dispatch 的中间点

// 常用 Thunk Middleware 安装 redux-thunk -S
// store.js 文件
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import rootReducers from './reducers'

// 在第二个参数中调用 并传入 中间件 可以传入多个中间件
export default createStore(
    rootReaducers,
    applyMiddleware(thunk)
)

// 在action中 如果是异步 返回值需要设置为一个函数 函数形参为 dispatch 函数 可以手动调用
// action/cart.js
export const decement = (id) => {
  return (dispatch)=>{
      setTimeout(()={
          dispatch({
            type: actionType.DECERMENT_CART_ITEM,
            payload : {
                id
            }
        })
      },2000)
   }
};
```

## React-Router

- web 页面 插件 npm i react-router-dom -S

```js
// ./src/index.js
// 导入 模式选择 带#或者不带#
import { HashRouter , Browser , Route } from 'reat-router-dom'
import App from './App'

//包裹在App外层
//使用Route组件进行渲染App 在this.props里面会有对应route数据
//使用path 选择 App页面的路径
<HashRouter>
    <Route component={App} path='/' />
<HashRouter />
```

```js
// 对应App.js文件
        // NacLink 区别在于 会给被点击的添加一个class=‘active’
        //Redirect  重定向 需要配合 Switch进行使用 因为所有的Route子页面其实都会被渲染 那么每次都会重定向 所以会报错
            // from 从哪个页面进行跳转
import  {Route,Link ,NavLink ,Redirect, Switch }  from 'reat-router-dom'
import User from './User'
import User from './User/usercon'

// 子路由在这里渲染 一样需要Route进行包裹
    // 通过Link进行跳转 to属性对应页面的path
// switch 在匹配到一个路径之后 不会继续匹配 前缀相同的路径 需要在添加exact属性 （必须完全匹配） 
（<div>
    <div><Link to='/user'>User</Link></div>
    <Switch>
        <Route compoent={User} path='/user' exact>
        <Route compoent={UserCon} path='/user/:id'>
        <Redirect to='/user' from='/' />
    <Switch />
</div>）
```
- Api
```js
// Route其他渲染方式
    // 与Component想斥 如果有Component 则不渲染render
    // 区别在于 render可以传递一些参数进去 (默认有一个形参是route的信息) 同时在函数内部 可以进行验证 避免无限请求
<Route path='/abc' render={(routeProps)=><User {...routeProps} /> } />

// Link的to属性 
    //可以进行传递参数 
<Link to="/user?active=1" />
    // 隐式传参
<Link to={{
    pathname:'/user/active',
    state:{
        id:1
    }
}} />

//埋点 。用隐式传参进行埋点 一般用于数据统计 
    // 发送数据
        // 1.ajax (成功率最低)
        // 2.img （请求一张图片 带上一些参数）
        //     const img = new Image()
        //     img.src = "www.baidu.com/button.gif?x=1&y=1'
        // 让后端返回一个很小的图片 1x1 2x1 根据 像素比进行判断status状态 
        // 3.sendBeacon() (支持发送了数据之后在进行跳转，兼容性比较差。移动端可以使用)

// 高阶组件 withRouter
// 页面内的组件没有对应的routeProps 使用之后就挂载到了props上
import {withRouter} from 'react-router-dom'
export default withRouter(BackHome)
```

## React全家桶 

- react react-router redux

## ui框架 ant design 
