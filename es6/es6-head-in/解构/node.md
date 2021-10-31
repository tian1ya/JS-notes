从数组中提取值、对变量进行赋值

```javascript
let [a,b,c] = [1,2,3]
console.log(a, b, c) // 1，2，3
```
本质上这种写法是属于 `模式匹配`， 只要等号两边得模式相同，左边得变量就会被赋值对应得值。
```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]]
console.log(foo, bar, baz) // 1，2，3

let [,,third] = [1,2,3]
console.log(third) // 3

let [first,...third] = [1,2,3]
console.log(first, third) // 1, [2,3]

let [x,y,...z] = [1]
console.log(x, y, z) // 1, undefined,[]
```

---

不完全解构
```javascript
let [x,y] = [1,2,3]
console.log(x, y) // 1，2

let [a, [b], c] = [1, [2,3], 4]
console.log(a, b, c) // 1， 2， 4
```

解构得本质是，右边得等号具备有 Iterator 接口，以下会报错
```javascript
let [a] = 1 // TypeError: 1 is not iterable, 一下一样均会出错
// let [a] = false
// let [a] = NaN
// let [a] = undefined
// let [a] = null
// let [a] = {}

let [a,y,x] = new Set([1,2,3])
console.log(a, y, x) // 1，2，3
```

只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

可以在解构中设置默认值
```javascript
let [foo = true] = []
console.log(foo) // true
```

对象得解构, 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```javascript
let {foo, bar} = {foo: "aaa", bar: "bbb"}
console.log(foo, bar)

// 变量名与属性名不一致，必须写成下面这样， 指定 对象中得foo 解构到 baz
let {foo:baz} = {foo: "aaa", bar: "bbb"}
console.log(baz)

// 嵌套
let obj = {
  p: [
    'hello', {y: 'world'}
  ]
}
// 这里p 是模式，不是变量，不会赋值
let {p: [x, {y}]} = obj
console.log(x, y)

// 如果 p 也要赋值，那么写为

let obj = {
  p: [
    'hello', {y: 'world'}
  ]
}

let {p, p: [x, {y}]} = obj
console.log(p, x, y)
```

函数参数解构
```javascript
function add ([x, y]) {
  return x + y
}

console.log(add ([1,2]))

console.log([[1,2], [3,4]].map(([a,b]) => a + b))
```

使用解构变换变量值
```javascript
let a = 1;
let b = 2;

[a, b] = [b, a]
console.log(a, b)

// 函数返回值
function example() {
  return [1, 2, 3]
}

let [a, b, c] = example()

console.log(a, b, c)
```

提取JSON 数据
```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [90,80]
}

let {id, status, data} = jsonData
console.log(id, status, data)
```

遍历 Map 解构
```javascript
const map = new Map()
map.set('first', 'hello')
map.set('second', 'world')

for (let [key, value] of map) {
  console.log(key, value)
}

for (let [, value] of map) {
  console.log(value)
}

for (let [key] of map) {
  console.log(key)
}
```