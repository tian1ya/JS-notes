var A = function() {}
A.prototype = {name: 'seven'}

var B = function () {}
B.prototype = new A()

var b = new B()
console.log(b.name) // seven