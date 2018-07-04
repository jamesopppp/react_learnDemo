## 前言
在此记录下本萌新学习React的心路历程,加油!

### 使用create-react-app脚手架搭建项目

```
npm install -g creare-react-app

安装脚手架


<script type="text/babel">react代码</script>
使用babel

基础写法:
ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById("app")
)
```
使用jsx语法写html时记得,class要写成className,驼峰写法.

---
### 创建控件

引入基础
```
import React,{Component} from 'react';
class name extends Component {
  render(){
    return(
      content
    )
  }
}
```
---
### 多组件开发
```
mkdir src/components
创建组件文件夹,并新建组件js

mv src/Home.js src/components
移动文件
```
>Header.js
```
import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Header</h1>
          </div>
        </div>
      </div>
    );
  }
}
```

可将export default 写在class前也而可以后置导出

>app.js
将组件引入
```
import Header from './components/Header';

然后直接使用

<Header/>
```
---
### 使用花括号

可以在花括号内写表达式,变量,甚至函数等

---
### 使用prop传值(父传子)

使用props来传递父子值,父组件直接对子组件传值
>App.js
```
class App extends Component {
  render() {
    const user = {
      name: 'James',
      hobbies: ['Sports','Reading']
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <Home name={"Max"} age={12} user={user}/>            
          </div>
        </div>
      </div>
    );
  }
}
```

然后在Home.js中使用props接收
>Home.js

```
export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <div>your name is {this.props.name},your age is {this.props.age}</div>
            <div>
              <h4>hobbies</h4>
              <ul>
                {this.props.user.hobbies.map((hobby,i)=><li key={i}>{hobby}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

如果想进行类型检查可在子组件中进行操作:

>Home.js

```
首先引入proptypes

import PropTypes from 'prop-types';

然后尾部限定类型:

...

Home.propTypes = {
  name: PropTypes.string,  //限定传入值必须为string
  age: PropTypes.number,
  user: PropTypes.object,
  xxx: PropTypes.any.isRequired, // 必须传入props值
}
```

设置默认prop值

```
Home.defaultProps = {
  name: 'james'
};

更多用法参考文档
```

prop传入子组件:

用组件包裹元素,然后子组件中用props接收
>App.js
```
<div className="col-xs-1 col-xs-offset-11">
  <Home name={"Max"} age={12} user={user}>
    <h4>i am child</h4>
  </Home>            
</div>
```
>Home.js
```
{this.props.children}
```
即便有多个也会一并插入
---
#### 添加事件
组件内添加函数,但是绑定时注意几点

1.比如onClick,绑定时不需要添加(),因为添加了会立刻执行,我们需要的是一个函数.

2.但是后面需要跟上bind(this),因为this的指向不正确,要手动绑定.

3.使用onClick后使用箭头函数调用函数方法,可以不用绑定this.
---
#### 使用state与事件配合
props传进来的数值怎么跟事件配合实现单击按钮增加数值的操作
>Home.js

组件类下有个函数叫constructor,每次初始化都会调用这个构造函数,传props进去,然后super()继承父类,react提供了state这个参数,可以放置组件的状态,相当于状态机
```
  constructor(props) {
    super(props);
    this.state = {
      age: props.initialAge
    }
  }
```
使用state接收props传过来的值初始化,然后事件就能使用state参数改变组件状态,state提供了setState方法修改参数
```
  onMakeOlder() {
    this.setState({
      age: this.state.age + 3
    })
  }
```
然后组件内在使用state就能达到更新视图的目的
```
<div>your name is {this.props.name},your age is {this.state.age}</div>
```
---
#### 无状态组件
react无状态组件顾名思义就是没有用到任何状态,所以可以重构简化代码:
>Header.js
```
import React from 'react';

const Header = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-1 col-xs-offset-11">
          <h1>Header</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
```
React创建组件有3种方法:

1. 使用React.createClass()
```
const xx = React.createClass({
  render(){
    return (
      ...
    )
  }
})
```
此方法存在一定缺陷,会自动绑定函数方法,导致不必要的性能开销,会自动处理this指针.

2. 使用class继承组件
```
export default class Home extends Component {
  render(){
    return (
      ...
    )
  }
}
```

3. 无状态组件
```
import React from 'react';

const Header = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-1 col-xs-offset-11">
          <h1>Header</h1>
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
```

满足以下条件可以使用此方法创建组件:

>不用state,不处理用户输入,组件数据使用props传入

>不用到生命周期函数

可以有以下好处:

>不需要声明类了,避免大量extends(继承)或constructor(构造函数)等代码

>不需要显式声明this关键字,ES6类声明需要将函数的this指向绑定到当前作用域，函数式声明特效可以不用再强制绑定

>反正就是能提升性能,更加方便简洁
---
#### 子组件向父组件通信
利用prop传递函数,定义一个alert方法

>App.js
```
  onGreet() {
    alert(greet);
  }
```

然后传入子组件:
```
greet={this.onGreet}
```

在子组件接收使用:

>Home.js

记得先规定传入类型:
```
Home.propTypes = {
  greet: PropTypes.func
}
```
这样就可以子组件触发父组件的操作了
```
<button className="btn btn-primary" onClick={this.props.greet}>Greet</button>
```

如果我要传参数到父组件呢.可以在子组件定义一个方法,向父传子的方法里传递参数:

>Home.js
```
  handleGreet() {
    this.props.greet(this.state.age)
  }
```
调用时调用此方法:
```
onClick={this.handleGreet.bind(this)}
使用到this指向的参数方法记得绑定this
```
然后修改父组件方法接收参数:
```
onGreet(age) {
  alert('age: '+age);
}
```
这样就可以简单获取到子组件传过来的参数了

---
#### 兄弟组件通信(prop)
兄弟组件通信可以利用父组件prop传递来进行
>App.js

创建state参数
```
constructor(){
  super();
  this.state = {
    homeLink: "Home"
  }
}
...
//利用prop传入state
<Header homeLink={this.state.homeLink}/>
```
>Header.js

子组件接收参数
```
const Header = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-1 col-xs-offset-11">
          <h1>{props.homeLink}</h1>
        </div>
      </div>
    </div>
  );
}
```
>App.js

然后父组件传一个函数方法进入通信发起组件
```
//接收参数,并把参数设置覆盖state(即是被通信组件要使用的参数)
onChangeLinkName(newName){
  this.setState({
    homeLink: newName
  })
}
...
//利用prop传入通信发起组件
<Home changeLink={this.onChangeLinkName.bind(this)}/>
```
>Home.js

通信发起的兄弟组件
```
//创建一个需要传递的state
constructor(props) {
  super(props);
  this.state = {
    homeLink: "Change Link"
  }
}
...
//然后创建一个函数方法调用prop传进来的父组件方法
onChangeLink() {
  this.props.changeLink(this.state.homeLink);
  //传入state
}
...
//按钮调用通信
<button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>
注意绑定this,因为用到了this指向参数.(具体还是有点模糊,反正用到this就绑定就是了)
```

这样就完成了简单的兄弟组件通信,利用了父组件做中转.不过如果组件嵌套复杂可能就不能这样了。

---
#### 双向绑定
如何在兄弟组件中进行双向绑定,一边输入数据,另一边展示数据随之改变.

>App.js
```
//传入输入框初始值 initialName
<Home 
changeLink={this.onChangeLinkName.bind(this)}
initialName={this.state.homeLink}/>  
```

然后在改变数据的组件中进行操作:
>Home.js
```
// 接收值初始化为组件内状态
constructor(props) {
  super(props);
  this.state = {
    homeLink: props.initialName
  }
}
...
// 创建函数方法监听onChange并将每次input改变的值更新至组件状态以及传递给prop方法
onHandleChange(event){
  this.setState({
    homeLink: event.target.value
  })
  this.props.changeLink(event.target.value)
}

// 新建输入框监听onChange事件并传入event,并绑定默认参数
<input  defaultValue={this.props.initialName} onChange={(event)=>this.onHandleChange(event)} type=""/>
```
这样每次输入字符都能更新到另外一个组件那了~