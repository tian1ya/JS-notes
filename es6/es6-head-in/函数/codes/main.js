s = 21;

const obj = {
  s: 42,
  m: () => console.log(this.s) // 21
};

console.log(obj.m()) // undefined