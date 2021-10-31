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