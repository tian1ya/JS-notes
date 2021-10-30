# this
this 总是指向一个对象，而具体指向哪一个对象是在运行时基于函数的执行环境动态绑定的，而不是函数申明的时候

this 的指向可以分为以下几种
1. 作为对象的方法调用
2. 作为普通函数调用
3. 构造器调用
4. Function.prototype.call, Function.prototype.apply 调用

#### 作为对象的方法调用
```javascript
// obj 这里申明一个对象
var obj = {
  a: 1,
  getA: function () {
    alert (this === obj) // true
    alert(this.a) // 1
  }
}

obj.getA()
```
#### 作为普通函数调用
```javascript
window.name = "global Name"
var getName = function() {
  return this.name
}

console.log(getName()) //  global Name
```
或者是
```javascript
window.name = "global Name"

var myObject = {
  name: 'seven',
  getName: function() {
    return this.name
  }
}
// 这里返回的是一个函数，这个函数的 this 是指向全局的
var getName = myObject.getName
console.log(getName()) //  global Name

console.log(myObject.getName()) //  Name
```

例子，this 动态指向对象
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
  <title>Document</title>

</head>
<body>
  
</body>
<div id="div1">点我</div>
<script>
  window.id = 'window'
  document.getElementById("div1").onclick = function () {
    alert(this.id) // div1
    var callback = function () {
      alert(this.id) // window
    }
    
    callback()
  }
</script>

</html>

// 改进
<script>
  window.id = 'window'
  document.getElementById("div1").onclick = function () {

    var that = this

    alert(that.id) // div1
    var callback = function () {
      alert(that.id) // div1
    }
    
    callback()
  }
</script>
```

继续几个例子，当使用 new 函数构造器的时候，构造器中的  this 指向返回的这个对象
```javascript
var MyClass = function () {
  this.name = 'seven'
}

// ----

var obj = new MyClass()
console.log(obj.name) // seven

var MyClass = function () {
  this.name = 'seven'
  return {
    name: 'anne'
  }
}

var obj = new MyClass()
console.log(obj.name) // anne
```

### 丢失的 this
```javascript
var obj = {
  myName: "seven",
  getName: function () {
    return this.myName
  }
}

// getName 作为 obj 的属性调用的，所以this 会指向 obj
console.log(obj.getName()) // seven

// getName2 引用 obj.getName()，在调用 getName2 的时候
// 此时是普通函数调用方式，this 是指向全局的 window
var getName2 = obj.getName
console.log(getName2()) // undefined
```
再来看一个例子
```javascript
var getId = function(id) {
  return document.getElementById(id)
}
// this 还是指向了 document
getId("div1")

// getId 引用 document.getElementById就变成了一个普通函数的调用
// 而getElementById 的调用内部是依赖 document 的，这里 this 就不再指向 document 了
var getId = document.getElementById
getId("div1") // 异常： Uncaught TypeError: Illegal invocation
```

---

### Function.proptotype.call 和 Function.prototype.apply 使用
和普通函数比较，他们可以动态的改变传入的函数的 this
```javascript
var abj1 = {
  name: 'sven',
  getName: function() {
    return this.name
  }
}

var obj2 = {
  name: "anne"
}

console.log(abj1.getName()) // sven
console.log(abj1.getName.call(obj2)) // anne
```
---

apply(this指向对象, 带下标的集合)
apply 方法把这个集合中的元素作为参数传递给被调用的函数
```javascript
var func = function(a,b,c) {
  alert([a,b,c])
}

// 第一个参数指向 this 的指向，第二个数组依次传入函数
// null 指向宿主对象，在浏览器中那么就是 window
func.apply(null, [1,2,3])
```
---

call 是在 apply 上面的语法糖，如果明确知道函数接受多少个参数，而是一目了然表达形参 和实参的对应关系，可以使用 call 传送参数。
```javascript
var func = function(a,b,c) {
  alert( [a, b, c] )
}

console.log(func.call(null, 1,2,3))

// -----

var func = function(a,b,c) {
  alert(this === window)
}

console.log(func.apply(null, [1,2,3])) // true

// ----

var func = function(a,b,c) {
  "use strict"
  alert(this === window) // strict 模式下，this 就是传入的 null
}

console.log(func.apply(null, [1,2,3])) // false

```

### call 和 apply 用途
1. 改变函数内部的 this 指向
```javasrcipt
var obj = {
  name: "sven"
}

var obj2 = {
  name: "anne"
}

window.name = "window"

var getName = function() {
  alert(this.name)
}

console.log(getName()) // 
console.log(getName.call(obj), getName.apply(obj))
console.log(getName.call(obj2), getName.apply(obj2))
```
这里改动下上面提到的 this 丢失的情况
```javascript
document.getElementById = (function(func) {
  return function() {
    return func.apply(document, arguments)
  }
})(document.getElementById)

var getId = document.getElementById
var div = getId("div1")
alert(div.id)
```
---

2. 借助其他对象的方法
```javascript
var A = function(name) {
  this.name = name
}

var B = function() {
  A.apply(this, arguments)
}

B.prototype.getName = function () {
  return this.name
}

var b = new B("sven")
console.log(b.getName()) // sven
```