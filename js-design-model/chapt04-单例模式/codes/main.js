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

alert(a === b)