动态语言：
鸭子类型： 走起路来像鸭子，叫着也像鸭子，那么他就是鸭子
  只关注对象的行为，而不关注对象本身，也就是 HAS-A, 而不是 IS-A

```javascript
var duck = {
  duckSinging: function() {
    console.log("嘎嘎嘎。。。")
  }
}

var chicken = {
  duckSinging: function () {
    console.log("嘎嘎嘎。。。")
  }
}

var choirs = []
var joinChoirs = function (animal) {
  // 鸭子类型，不关注 anumal 的类型，只关注它有 duckSinging 方法
  if (animal && typeof animal.duckSinging == 'function') {
    choirs.push(animal)
    console.log("恭喜加入合唱团")
    console.log("合唱团人员数量：", choirs.length)
  }
}

joinChoirs(duck)
joinChoirs(chicken)
```

---

多态
做什么和谁去做以及如何做分离，一下的例子中：
动物都会叫这是不变的，但是如何叫是每个动物都不同的
```javascript
var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎")
  } else if (animal instanceof Chicken) {
    console.log("格格恶...")
  }
}

var Duck = function() {}
var Chicken = function () {}

// makeSound( new Duck)
// makeSound( new Chicken)
var makeSound = function (animal) {
  animal.sound()
}
Duck.prototype.sound = function () {
  console.log("嘎嘎嘎")
}
Chicken.prototype.sound = function () {
  console.log("格格恶")
}
makeSound ( new Duck )
makeSound ( new Chicken )
```

---

封装
信息的隐藏，包括数据，以及更广义的函数的封装
应该理解封装为任何形式的封装，设计细节、对象类型等
使得对象内部的变化对外部是不可见的，对象对自己的行为负责，使用方不关心细节

---

原型模式和基于原型继承的JS 对象系统
JS 是一门基于原型的面向对象系统，原型变成的思想中，类不是必须的，对象未必需要从类中创建出来，一个对象是通过克隆另外一个对象所得到的。

```javascript
var Plane = function () {
  this.blood = 100
  this.attackLevel = 1
  this.defenseLevel = 1
}

var plane = new Plane();
plane.blood = 500
plane.attackLevel = 10
plane.defenseLevel = 7

// 克隆对象
var clonePlane = Object.create( plane )
console.log(clonePlane.blood) // 500
console.log(clonePlane.attackLevel) // 10
console.log(clonePlane.defenseLevel) // 7
```

JS 语言中原型模式并不仅仅是一种设计模式，而是一种变成范式，JS 中不存在类的概念，对象也不是从类中创建出来的。

原型模式重要的一个特性：当当前对象没有某个方法，会将方法的调用委托给它自己的原型。

* 都有的数据都是对象
* 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型
* 对象会记住它的类型
* 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型

JS 有2套类型机制，基本类型和对象类型
基本类型：
> undefined、number、boolean、string、function、object

JS 的根对象是 Object.prototype 对象，Object.prototype 是一个空的对象，JS 中的每个对象实际上都是从它克隆来的。

JS 中没有类的概念，可以使用 new Dunk，这里 Dunck 是一个函数构造器，而不是类。

JS 有一个  __proto__ 的隐藏属性，它会默认指向它的构造器的原型对象，{Constructor}.prototype
```javascript
var A = function() {}
A.prototype = {name: 'seven'}

var B = function () {}
B.prototype = new A()

var b = new B()
console.log(b.name) // seven
```
以上的代码完成的事情：
1. 尝试遍历对象 b 中的所有属性，但是没有找到 name 属性
2. 查找 name 属性的请求被委托给对象 b 的构造器的原型，b的原型通过 new A() 对象
3. 该对象中依然没有找到 name 属性，于是请求委托给了这个对象的对象构造器 A.prototype
4. 在 A.prototype 中找到了 name 属性，并返回它的值。