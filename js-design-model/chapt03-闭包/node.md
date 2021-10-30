闭包的形成和变量的作用域以及变量的生成周期密切相关。

函数就像是汽车玻璃一样，函数外面是看不到函数内部的变量的，而函数内部是可以看到函数外面的变量的。

高价函数：
1. 函数可以作为参数被传递
  回调函数
2. 函数可以作为返回值返回

使用高价函数实现 AOP
```javascript
Function.prototype.before = function (beforeFn) {
  var __self = this
  return function () {
    beforeFn.apply(this, arguments)
    // 执行新函数，修正 this
    return __self.apply(this, arguments) // 执行原函数
  }
}

Function.prototype.after = function (afterFn) {
  var __self = this
  return function () {
    var ret = __self.apply(this, arguments) 
    afterFn.apply(this, arguments)
    return ret
  }
}

var func = function() {
  console.log(2)
}

func = func.before( function () {
  console.log(1)
}).after(function () {
  console.log(3)
})

func()
```

3. curring 和 uncurring
  curring： 多个参数一起传入，变为一个一个的传入，最后一起触发函数计算，f(a,b,c) 柯里化 f(a)(b)(c), 反柯里化 f(a)(b)(c)，f(a, b, c)

4. 分时函数
5. 节流函数
6. 惰性加载函数