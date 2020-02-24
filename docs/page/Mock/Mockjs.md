## 开始/安装

- npm i mockjs

- 使用

```js
// src 建mock文件
// 在mock文件下新建js文件 并在入口文件中导入
const Mock = require("mockjs");

// 定义返回值
let data = Mock.mock({
  "list|1-10": [
    {
      "id|+1": 1
    }
  ]
});

Mock.mock(
  // 参数1 请求路径
  "/request",
  // 参数2 请求方式
  "post",
  // 参数3 处理函数 返回值为相应参数
  (req, res) => {
    return {};
  }
);
```
## 模版

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

## 生成规则  

```js
'name|min-max': value // 重复次数大于等于 min，小于等于 max
'name|count': value // 重复次数等于 count
'name|min-max.dmin-dmax': value //小数部分保留 dmin 到 dmax 位。
'name|min-max.dcount': value //小数部分重复次数等于 dcount。
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value // 步长 step
```

### String

```js
'name|min-max': string

//通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。

'name|count': string

//通过重复 string 生成一个字符串，重复次数等于 count。
```

### Number 

```js
'name|+1': number

//属性值自动加 1，初始值为 number。

'name|min-max': number

//生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。

'name|min-max.dmin-dmax': number

//生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

```

### Boolean

```js
'name|1': boolean

// 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

'name|min-max': value

// 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。
```

### Object 

```js
'name|count': object

//从属性值 object 中随机选取 count 个属性。

'name|min-max': object

//从属性值 object 中随机选取 min 到 max 个属性。

```

### Array

```js
'name|1': array

// 从属性值 array 中随机选取 1 个元素，作为最终值。

'name|+1': array

// 从属性值 array 中顺序选取 1 个元素，作为最终值。

'name|min-max': array

// 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。

'name|count': array

// 通过重复属性值 array 生成一个新数组，重复次数为 count。
```

### Function

```js
'name': function

//执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
```

### RegExp

- 'name': regexp

## Mock.setup

- 配置相应时间 默认 10-200

```js
Mock.setup({
  timeout: "200-600"
});
```

## Mock.Random

- 占位符

```js
var Random = Mock.Random;
Random.email();
// => "n.clark@miller.io"

// 在数据模版中
Mock.mock({ email: "@email" });
// => { email: "v.lewis@hall.gov" }
```

- 占位符扩展

```js
Random.extend({
  constellation: function(date) {
    var constellations = [
      "白羊座",
      "金牛座",
      "双子座",
      "巨蟹座",
      "狮子座",
      "处女座",
      "天秤座",
      "天蝎座",
      "射手座",
      "摩羯座",
      "水瓶座",
      "双鱼座"
    ];
    return this.pick(constellations);
  }
});
Random.constellation();
// => "水瓶座"
Mock.mock("@CONSTELLATION");
// => "天蝎座"
Mock.mock({
  constellation: "@CONSTELLATION"
});
// => { constellation: "射手座" }
```

## 布尔值 Random.boolean( min?, max?, current? )

- 概率计算公式为 max / (min + max)。该参数的默认值为 1，即有 50% 的概率返回参数 !current。

```js
Random.boolean();
// => true
Random.boolean(1, 9, true);
// => false
Random.bool();
// => false
Random.bool(1, 9, false);
// => true
```

## 自然数 Random.natural( min?, max? )

```js
Random.natural();
// => 1002794054057984
Random.natural(10000);
// => 71529071126209
Random.natural(60, 100);
// => 77
```

## 随机整数 Random.integer( min?, max? )

```js
Random.integer();
// => -3815311811805184
Random.integer(10000);
// => 4303764511003750
Random.integer(60, 100);
// => 96
```

## 随机小数 Random.float( min?, max?, dmin?, dmax? )

- dmin 小数部分位数最小值 默认 0
- dmax 小数部分最大值 默认为 17

```js
Random.float();
// => -1766114241544192.8
Random.float(0);
// => 556530504040448.25
Random.float(60, 100);
// => 82.56779679549358
Random.float(60, 100, 3);
// => 61.718533677927894
Random.float(60, 100, 3, 5);
// => 70.6849
```

## 随机字符 Random.character( pool? )

```js
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
//如果传入了 'lower' 或 'upper'、'number'、'symbol'，表示从内置的字符池从选取,没有传参数则从 lower + upper + number + symbol 中随机选取一个字符返回
Random.character()
// => "P"
Random.character('lower')
// => "y"
Random.character('upper')
// => "X"
Random.character('number')
// => "1"
Random.character('symbol')
// => "&"
Random.character('aeiou')
// => "u"
```

## 随机字符串 Random.string( pool?, min?, max? )

```js
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
//如果传入了 'lower' 或 'upper'、'number'、'symbol'，表示从内置的字符池从选取,没有传参数则从 lower + upper + number + symbol 中随机选取一个字符返回
// 如果传入字符串 则在字符串中 随机选
Random.string()
// => "pJjDUe"
Random.string( 5 )
// => "GaadY"
Random.string( 'lower', 5 )
// => "jseqj"
Random.string( 7, 10 )
// => "UuGQgSYk"
Random.string( 'aeiou', 1, 3 )
// => "ea"
Random.string( '壹贰叁肆伍陆柒捌玖拾', 3, 5 )
// => "肆捌伍叁"
```

## 随机整数数组 Random.range( start?, stop, step? )

```js
Random.range(10);
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Random.range(3, 7);
// => [3, 4, 5, 6]
Random.range(1, 10, 2);
// => [1, 3, 5, 7, 9]
Random.range(1, 10, 3);
// => [1, 4, 7]
```

## Date 时间 
```
yyyy  =>  1999 or 2003
yy  =>  99 or 03
y  =>  99 or 03

MM  =>  01 to 12
M  =>  1 to 12

dd  =>  01 to 31
d  =>  1 to 31

HH  =>  00 to 23
H  =>  0 to 23
hh  =>  1 to 12
h  =>  01 to 12

mm  =>  00 to 59
m  =>  0 to 59

ss  =>  00 to 59
s  =>  0 to 59

SS  =>  000 to 999
S  =>  0 to 999

A  =>  AM or PM
a  =>  am or pm

T  =>  759883437303
```

### 随机日期 Random.date( format? )
```js
Random.date()
// => "2002-10-23"
Random.date('yyyy-MM-dd')
// => "1983-01-29"
Random.date('yy-MM-dd')
// => "79-02-14"
Random.date('y-MM-dd')
// => "81-05-17"
Random.date('y-M-d')
// => "84-6-5"
```

### 随机时间 Random.time( format? )
```js
Random.time()
// => "00:14:47"
Random.time('A HH:mm:ss')
// => "PM 20:47:37"
Random.time('a HH:mm:ss')
// => "pm 17:40:00"
Random.time('HH:mm:ss')
// => "03:57:53"
Random.time('H:m:s')
// => "3:5:13"
```

### 随机日期和时间 Random.datetime( format? )
```js
Random.datetime()
// => "1977-11-17 03:50:15"
Random.datetime('yyyy-MM-dd A HH:mm:ss')
// => "1976-04-24 AM 03:48:25"
Random.datetime('yy-MM-dd a HH:mm:ss')
// => "73-01-18 pm 22:12:32"
Random.datetime('y-MM-dd HH:mm:ss')
// => "79-06-24 04:45:16"
Random.datetime('y-M-d H:m:s')
// => "02-4-23 2:49:40"
```

### 当前日期和时间 Random.now( unit?, format? )
```js
Random.now()
// => "2014-04-29 20:08:38 "
Random.now('day', 'yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 00:00:00 000"
Random.now('day')
// => "2014-04-29 00:00:00 "
Random.now('yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 20:08:38 157"

Random.now('year')
// => "2014-01-01 00:00:00"
Random.now('month')
// => "2014-04-01 00:00:00"
Random.now('week')
// => "2014-04-27 00:00:00"
Random.now('day')
// => "2014-04-29 00:00:00"
Random.now('hour')
// => "2014-04-29 20:00:00"
Random.now('minute')
// => "2014-04-29 20:08:00"
Random.now('second')
// => "2014-04-29 20:08:38"
```

## 随机图片地址 Image

### 高度自定义的图片地址 Random.image( size？, background？, foreground？, format？, text？ )
- size 默认
```
[
    '300x250', '250x250', '240x400', '336x280', 
    '180x150', '720x300', '468x60', '234x60', 
    '88x31', '120x90', '120x60', '120x240', 
    '125x125', '728x90', '160x600', '120x600', 
    '300x600'
]
```

```js
Random.image()
// => "http://dummyimage.com/125x125"
Random.image('200x100')
// => "http://dummyimage.com/200x100"
Random.image('200x100', '#fb0a2a')
// => "http://dummyimage.com/200x100/fb0a2a"
Random.image('200x100', '#02adea', 'Hello')
// => "http://dummyimage.com/200x100/02adea&text=Hello"
Random.image('200x100', '#00405d', '#FFF', 'Mock.js')
// => "http://dummyimage.com/200x100/00405d/FFF&text=Mock.js"
Random.image('200x100', '#ffcc33', '#FFF', 'png', '!')
// => "http://dummyimage.com/200x100/ffcc33/FFF.png&text=!"
```

### base64编码图片Random.dataImage( size?, text? )

```js
Random.dataImage()
Random.dataImage('200x100')
Random.dataImage('200x100', 'Hello Mock.js!')
```

## Color 颜色

### 十六进制 Random.color()

```js
Random.color()
// => "#3538B2"
```

### Rgb 颜色 Random.rgb()

```js
Random.rgb()
// => "rgb(242, 198, 121)"
```

### rgba 颜色 Random.rgba()

```js
Random.rgba()
// => "rgba(242, 198, 121, 0.13)"
```

### hsl 颜色 Random.hsl()

```js
Random.hsl()
// => "hsl(345, 82, 71)"
```

## 随机句子 Text

### 英文句子 Random.paragraph( min?, max? )

```js
Random.paragraph()
Random.paragraph( len )  // 长度
Random.paragraph( min, max )
```

- 首字母大写Random.sentence( min?, max? )

```js
Random.sentence( min?, max? )
```

### 中文句子 Random.cparagraph( min?, max? )

```js
Random.cparagraph()
Random.cparagraph( len )
Random.cparagraph( min, max )
```

### 中文文本 Random.csentence( min?, max? )

```js
Random.csentence()
// => "第任人九同段形位第律认得。"
    
Random.csentence(2)
// => "维总。"
    
Random.csentence(1, 3)
// => "厂存。"
```

### 随机单词 Random.word( min?, max? )

```js
Random.word()
// => "fxpocl"
Random.word(5)
// => "xfqjb"
Random.word(3, 5)
// => "kemh"
```

### 随机汉字 Random.cword( pool?, min?, max? )

```js
Random.cword()
// => "干"
Random.cword('零一二三四五六七八九十')
// => "六"
Random.cword(3)
// => "别金提"
Random.cword('零一二三四五六七八九十', 3)
// => ""七七七""
Random.cword(5, 7)
// => "设过证全争听"
Random.cword('零一二三四五六七八九十', 5, 7)
// => "九七七零四"
```

### 随机标题 英文 Random.title( min?, max? )

```js
Random.title()
// => "Rduqzr Muwlmmlg Siekwvo Ktn Nkl Orn"
Random.title(5)
// => "Ahknzf Btpehy Xmpc Gonehbnsm Mecfec"
Random.title(3, 5)
// => "Hvjexiondr Pyickubll Owlorjvzys Xfnfwbfk"
```
### 随机标题 中文 Random.ctitle( min?, max? )

```js
Random.ctitle()
// => "证构动必作"
Random.ctitle(5)
// => "应青次影育"
Random.ctitle(3, 5)
// => "出料阶相"`
```

## 姓名Name 

-  Random.first() 
-  Random.last() 
-  Random.name() 

-  Random.cfirst() 中文 姓
-  Random.clast() 中文 名
-  Random.cname() 中文 全名

## WEB相关

## 随机URL Random.url( protocol?, host? )

```js
Random.url()
// => "mid://axmg.bg/bhyq"
Random.url('http')
// => "http://splap.yu/qxzkyoubp"
Random.url('http', 'nuysoft.com')
// => "http://nuysoft.com/ewacecjhe"
```

### 随机URL协议
- 返回以下值之一：'http'、'ftp'、'gopher'、'mailto'、'mid'、'cid'、'news'、'nntp'、'prospero'、'telnet'、'rlogin'、'tn3270'、'wais'。

```js
Random.protocol()
// => "ftp"
```

### 随机域名 Random.domain()

```js
Random.domain()
// => "kozfnb.org
```

### 随机顶级域名 Random.tld()

```js
Random.tld()
// => "net"
```

## 随机邮箱地址 Random.email( domain? )

```js
Random.email()
// => "x.davis@jackson.edu"
Random.email('nuysoft.com')
// => "h.pqpneix@nuysoft.com"
```

## 随机ip Random.ip()

```js
Random.ip()
// => "34.206.109.169"
```

## 随机地区 

### 大区 

```js
Random.region()
// => "华北"
```

### 省份 Random.province()

```js
Random.province()
// => "黑龙江省"
```

### 市区 Random.city( prefix? )

```js
Random.city()
// => "唐山市"
Random.city(true)
// => "福建省 漳州市"
```

### 县城 Random.county( prefix? )

```js
Random.county()
// => "上杭县"
Random.county(true)
// => "甘肃省 白银市 会宁县"
```

### 邮编 Random.zip()

```js
Random.zip()
// => "908812"
```

## 首字母大写 Random.capitalize( word )
## 字符串转大写 Random.upper( str )
## 字符串转小写 Random.lower( str )
## 随机抽取数组元素 Random.pick( arr )
## 打乱数组顺序并返回 Random.shuffle( arr )

## 随机ID Random.guid()
```js
Random.guid()
// => "662C63B4-FD43-66F4-3328-C54E3FF0D56E"
```
## 身份证 Random.id()


## 全局自增整数 

```js
Random.increment()
// => 1
Random.increment(100)
// => 101
Random.increment(1000)
// => 1101
```

## 校验

- 校验真实数据是否与数据模版匹配
- Mock.valid( template, data )

```js
var template = {
    name: 'value1'
}
var data = {
    name: 'value2'
}
Mock.valid(template, data)
// =>
[
    {
        "path": [
            "data",
            "name"
        ],
        "type": "value",
        "actual": "value2",
        "expected": "value1",
        "action": "equal to",
        "message": "[VALUE] Expect ROOT.name'value is equal to value1, but is value2"
    }
]
```

## 转换规则

- Mock.toJSONSchema( template )

```js
var template = {
    'key|1-10': '★'
}
Mock.toJSONSchema(template)
{
    "name": undefined,
    "path": [
        "ROOT"
    ],
    "type": "object",
    "template": {
        "key|1-10": "★"
    },
    "rule": {},
    "properties": [{
        "name": "key",
        "path": [
            "ROOT",
            "key"
        ],
        "type": "string",
        "template": "★",
        "rule": {
            "parameters": ["key|1-10", "key", null, "1-10", null],
            "range": ["1-10", "1", "10"],
            "min": 1,
            "max": 10,
            "count": 3,
            "decimal": undefined,
            "dmin": undefined,
            "dmax": undefined,
            "dcount": undefined
        }
    }]
}
```