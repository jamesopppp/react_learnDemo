学习react基础的记录

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

### 使用花括号

可以在花括号内写表达式,变量,甚至函数等


### 使用prop传值

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

#### 添加事件
组件内添加函数,但是绑定时注意几点

1.比如onClick,绑定时不需要添加(),因为添加了会立刻执行,我们需要的是一个函数.

2.但是后面需要跟上bind(this),因为this的指向不正确,要手动绑定.

3.使用onClick后使用箭头函数调用函数方法,可以不用绑定this.

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

满足以下条件可以使用此方法创建组件:

>不用state,不处理用户输入,组件数据使用props传入

>不用到生命周期函数

可以有以下好处:

>不需要声明类了,避免大量extends(继承)或constructor(构造函数)等代码

>不需要显式声明this关键字,ES6类声明需要将函数的this指向绑定到当前作用域，函数式声明特效可以不用再强制绑定