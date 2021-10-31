在 ES6 之前， 函数参数没有默认值，如果实现和默认值相同得功能
```javascript
function log(x,y) {
  y = y || 'world'
  console.log(x, y)
}

log('hello') // hello world
log('hello', 'china')
log('hello', '')  // hello world, 这里应该显示 hello 得

// 使用 es6 带有默认值
function log(x,y = 'world') {
  console.log(x, y)
}

log('hello') // hello world
log('hello', 'china')
log('hello', '')

function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

rest 参数
```javascript
function add(...values) {
  let sum = 0
  for (var val of values) {
    sum += val
  }
  return sum
}

console.log(add(1,2,3))

// 使用 rest 参数之后，不能再使用其他得参数
function add(b, ...values, c) {
  let sum = 0
  for (var val of values) {
    sum += val
  }
  return sum + b + c
}

console.log(add(1,2,3, 4))
```
ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。     
```javascript
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

函数的name属性，返回该函数的函数名

---
箭头函数
```javascript
var f = v => v+v
console.log(f(12))

var f = () => 5
console.log(f())

const full = ({first, second}) => first + " " + second
console.log(full({first: 'hello', second: 'world'}))

// 箭头函数的一个用处是简化回调函数。
// 普通函数写法
[1,2,3].map(function (x) {
  return x * x;
});

console.log([1, 2, 3].map( x => x * x))

// rest
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5)
```

---

箭头函数注意点：
1. 箭头函数没有 `this` 对象
   它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。
2. 不可作为构造函数，也就是箭头函数不能使用 new
3. 不可以使用 `arguments` 对象，该对象再函数体内不存在
4. 不能使用 `yield` 对象
```javascript
function foo() {
  setTimeout(() => {
    console.log('id', this.id) // 42
  }, 1000)
}

var id = 12
foo.call({id: 42})
```
，setTimeout()的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是， `箭头函数导致this总是指向函数定义生效时所在的对象`（本例是{id: 42}），所以打印出来的是42。
```javascript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```
答案是this的指向只有一个，就是函数foo的this，`这是因为所有的内层函数都是箭头函数，都没有自己的this`，它们的this其实都是最外层foo函数的this。所以不管怎么嵌套，t1、t2、t3都输出同样的结果。如果这个例子的所有内层函数都写成普通函数，那么每个函数的this都指向运行时所在的不同对象。

`长期以来，JavaScript 语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰`

---

不适合使用箭头函数场景
第一个场合是定义对象的方法，且该方法内部包括this。
```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}

console.log(cat.jumps()) // undefined
```
因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域向上找，找到了全局作用域。
```javascript
s = 21;

const obj = {
  s: 42,
  m: () => console.log(this.s) // 21
};

console.log(obj.m()) // undefined
```

---

属性得简洁表示
```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};

function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

// 方法也可以简写
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};

let ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};

```

新增得方法
1. 判断2个值是否相等，等同于  ===
    Object.is('foo', 'foo')

export default 得使用
https://es6.ruanyifeng.com/#docs/module
