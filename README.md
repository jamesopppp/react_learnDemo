学习react基础的记录

###使用create-react-app脚手架搭建项目

```
npm install -g creare-react-app
安装脚手架
<script type="text/babel"></script>
使用babel
基础写法:
ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById("app")
)
```


1.使用jsx语法写html时记得,class要写成className,驼峰写法.
基础写法:
```



###.创建控件
```
import React,{Component} from 'react';
```
记得引入

```
class name extends Component {
  render(){
    return(
      content
    )
  }
}
```

