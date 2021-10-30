let 申明的变量只在其代码块中有效
```javascript
{
  let a = 1
  var b = 2
}
console.log(a) // 会报错
console.log(b) 

for(let i = 0; i < 10; i++) {
  console.log("i=", i)
}
console.log(i) // 报错

```

---

i 是申明了 var 类型，全局范围内有效，全局只有一个 i，每次循环
i 都会发生变化， 所以i 的值就是最后退出循环时候的值
```javascript
var a = []
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() // 10
```

i 是申明了 let , i只在本次循环中有效，，每次循环i 都是一个新的i

```javascript
var a = []
for(let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]() // 6
```

for 循环变量部分这里是一个父作用域，for 循环体是子作用域
```javascript
var a = []
// for 循环变量部分这里是一个父作用域，for 循环体是子作用域
for(let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i) // 输出3此 abc
}
```

let 申明的变量的使用，必须在申明之后，不能是在之前
```javascript
console.log(a) 
// 不会报错，输出 undefined, var 全局变量，发送变量提升，运行开始运行时候，a 就存在了，只不过没有赋值
var a = 11

console.log(b) // 报错 ReferenceError: Cannot access 'b' before initialization
let b = 22
```

申明 tmp 为 let 的时候，就和这个区域绑定了，
而在这个区域中，tmp 还没有申明的时候，就去使用了。报错
同样的，如果定义为 const， 也是会报错的。
```javascript
var tmp = 134

if (true) {
  tmp = 'abc' // ReferenceError: Cannot access 'tmp' before initialization
  let tmp
}
```
在块中使用 let 或者 const 命令，这个区块申明的变量，从一开始就形成
了封闭的作用域，凡是在申明之前就使用这些变量，报错，
在 let申明变量之前，变量都是不可使用的，称为 `暂时性死区`
这样做主要是减少运行是错误，防止变量申明前就使用这个变量，而导致意料之外的行为。
 `暂时性死区` 的本质就是，只要一进入到当前作用域。所要使用的变量就已经存在，但是不可获取，只有等到申明变量的那一行代码出现，才可以获取和使用变量

 ---

 为什么需要块级作用域
 1. 内层变量可能会覆盖外层变量
 ```javascript
 var tmp = new Date()

function f() {
  console.log(tmp)
  // 内部已经覆盖外面，但是还没有赋值， 所以是 undefined
  if(false) {
    // 内部 tmp 覆盖外面，
    var tmp = "hello word"
  }
}

f() // undefined
 ```
2. 用于计数的循环变量泄露为全局变量
下面变量只是用来控制循环的，但是却变为全局的变量
```javascript
var s = 'hello'
for (var i=0;i<s.length;i++) {
  console.log(s[i])
}
console.log(i) // 5
```
let 实际上为 js 增加了块作用域
```javascript
function f1 () {
  let n = 5
  if (true) {
    let n = 10
  }
  console.log(n) // 5
}

f1()
```

块作用域生命函数， 改变了块级作用域内声明的函数的处理规则
所以在ES6 中规定
1. 允许在块级作用域内声明函数
2. 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
3. 同时，函数声明还会提升到所在的块级作用域的头部

ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
```javascript
function f() {
  console.log("I am outsider")
}

(
  function() {
    if (false) {
      function f() {
        console.log("I am outsider")
      }
    }

    f() // TypeError: f is not a function
  }()
)
```

---

### const
它声明一个只读的常量，一旦申明就不能在改变, 且在申明的时候就初始化，注意对于基本数据，值是不能改变的
但是对于对象，指向对象的地址是不能变得，对象内部值还是可以变化得
```javascript
const PI = 5
PI = 3 // TypeError: Assignment to constant variable.

const PI = {
  a:10
}
PI.a = 3
console.log(PI) {a:3}
```