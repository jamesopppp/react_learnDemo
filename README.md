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

1.可以在花括号内写数值运算字符串还有三元运算,不能多语句

2.在return上可以写逻辑语句及变量,然后花括号使用

### 给组件传值

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