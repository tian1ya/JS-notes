### 最简单的 单例
```javascript
var Singleton = function ( name ) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getName = function () {
  alert( this.name )
}

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

var a= Singleton.getInstance("11")
var b= Singleton.getInstance("22")

alert(a === b) // true
```
这里获取单例只能通过 Singleton.getInstance("11") 方式拿到，对用户而言是不透明的。

### 透明的单例
