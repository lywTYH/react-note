# react lifecycle

1. componentWillMount:在渲染前调用,在客户端也在服务端。

2. componentDidMount: 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的 DOM 结构，可以通过 this.getDOMNode()来进行访问。 如果你想和其他 JavaScript 框架一起使用，可以在这个方法中调用 setTimeout, setInterval 或者发送 AJAX 请求等操作(防止异步操作阻塞 UI)。

3. componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化 render 时不会被调用。

4. shouldComponentUpdate 返回一个布尔值。在组件接收到新的 props 或者 state 时被调用。在初始化时或者使用 forceUpdate 时不被调用。可以在你确认不需要更新组件时使用。

5. componentWillUpdate 在组件接收到新的 props 或者 state 但还没有 render 时被调用。在初始化时不会被调用。

6. componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

7. componentWillUnmount 在组件从 DOM 中移除之前立刻被调用。

# react

1. React.Fragment
   可做不可见的包裹元素 可用数组代替

asserts 用于存放静态资源，打包时会经过 webpack 处理；
components 用于存放 React 组件，一般是该项目公用的无状态组件；
models 用于存放模型文件
routes 用于存放需要 connect model 的路由组件；
services 用于存放服务文件，一般是网络请求等；
utils 工具类库
router.js 路由文件
index.js 项目的入口文件
index.css 一般是共用的样式

React.createContext 方法用于创建一个 Context 对象。该对象包含 Provider 和 Consumer 两个属性，分别为两个 React 组件。
Provider 组件。用在组件树中更外层的位置。它接受一个名为 value 的 prop，其值可以是任何 JavaScript 中的数据类型。
Consumer 组件。可以在 Provider 组件内部的任何一层使用。它接收一个名为 children 值为一个函数的 prop。这个函数的参数是 Provider 组件接收的那个 value prop 的值，返回值是一个 React 元素（一段 JSX 代码）

# react-router

// exact 严格匹配
<BrowserRouter>

一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。此组件拥有以下属性：

- basename: string
  作用：为所有位置添加一个基准 URL
  使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录

* getUserConfirmation: func
  作用：导航到此页面前执行的函数，默认使用 window.confirm
  使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多

- keyLength: number
  作用：设置它里面路由的 location.key 的长度。默认是 6。（key 的作用：点击同一个链接时，每次该路由下的 location.key 都会改变，可以通过 key 的变化来刷新页面。）
  使用场景：按需设置。
  <Route> 自带三个 render method 和三个 props 。

render methods 分别是：

<Route component>
<Route render>
<Route children>
每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component 。
props 分别是：

match
location
history
所有的 render method 无一例外都将被传入这些 props。

## redux -soga

take 是用来监听 action，返回的是监听到的 action 对象

call 方法调用 fn，参数为 args，返回一个描述对象。不过这里 call 方法传入的函数 fn 可以是普通函数，也可以是 generator。call 方法应用很广泛，在 redux-saga 中使用异步请求等常用 call 方法来实现

put 对应与 redux 中的 dispatch

select 方法对应的是 redux 中的 getState，用户获取 store 中的 state

fork 方法不会阻塞主线程，在非阻塞调用中十分有用。

takeEvery 监听到 login 的动作，就会执行 loginFunc 方法，除此之外，takeEvery 可以同时监听到多个相同的 action。

takeLatest 是会监听执行最近的那个被触发的 action。
