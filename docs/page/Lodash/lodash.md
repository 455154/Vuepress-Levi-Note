## 开始

- npm i lodash

- 引入并挂载 一般使用 \_

## for 循环

- \_.tiems(number,function(){})

```js
//js原生的循环方法
for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log("------- lodash -------");
//ladash的times方法
_.times(5, function(a) {
  console.log(a);
});
```

## 深层查找属性值

- \_.map(Arr, '属性名')

```js
var ownerArr = [
  {
    owner: "Colin",
    pets: [{ name: "dog1" }, { name: "dog2" }]
  },
  {
    owner: "John",
    pets: [{ name: "dog3" }, { name: "dog4" }]
  }
];
var jsMap = ownerArr.map(function(owner) {
  return owner.pets[0].name;
});
// lodash 方法
var lodashMap = _.map(ownerArr, "pets[0].name");
```

## 深克隆对象

- \_.cloneDeep(Object)

## 获取指定范围内随机值

- \_.random(MinNumber, MaxNumber,bool)
- 参数 3 true 为浮点数 false 为整数

## 合并/扩展对象

- \_.assign(objA, objB)
- 相同属性 objB 覆盖 objA

## 获取随机元素组成新数组

- \_.sampleSize(Arr,Number）
- 参数 2 为随机选取的个数 （不会重复）

## 判读啊对象/数组 有无某元素/某值

- \_.includes(Arr, '戈德斯文')
- \_.includes(Object, value)

## 遍历循环

- \_.forEach(Arr , function(value, key) {
  console.log(key,value);
  });

## 循环执行函数

```js
function square(n) {
  return n * n;
}
console.log(_.map([4, 8], square));
// => [16, 64]

var users = [{ user: "barney" }, { user: "fred" }];

// The `_.property` iteratee shorthand.
console.log(_.map(users, "user"));
// => ['barney', 'fred']
```

## 检验值是否为空

```js
_.isEmpty(null);
// => true

_.isEmpty(true);
// => true

_.isEmpty(1);
// => true

_.isEmpty([1, 2, 3]);
// => false

_.isEmpty({ a: 1 });
// => false
```

## 查找属性

- 根据具体键值对 或者 数组元素形式 或者 函数筛选 进行查询
- 查询一个
- \_.find(arr, {'age': 1, 'active': true})
- 查询所有满足条件的
- \_.filter(arr, {'age': 1, 'active': true})
- filter 的反向方法
- \_.reject()

```js
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
  { user: "pebbles", age: 1, active: true }
];
// 选择筛选到的第一个
console.log(
  _.find(users, function(o) {
    return o.age < 40;
  })
);
// 选择全部满足条件的
console.log(
  _.filter(users, function(o) {
    return o.age < 40;
  })
);
console.log(_.find(users, { age: 1, active: true }));
console.log(_.filter(users, { age: 1, active: true }));
console.log(_.find(users, ["active", false]));
console.log(_.filter(users, ["active", false]));
console.log(_.find(users, "active"));
console.log(_.filter(users, "active"));
```

## 数组去重

- \_.uniq(array)

- 先执行迭代函数 后去重 最终返回值为最开始的数值
- \_.uniqBy(array,Math.floor）

```js
var array = [1.1,1,1.2,2]
// 先向下取整 再去重 最后找到对应原数组的值 并返回
 _.uniqBy(array,Math.floor）
 // [ 1.1 , 2 ] 
```
