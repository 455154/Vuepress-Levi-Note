# sitemap 配置(SEO 优化)

## sitemap.json

- 微信开放小程序内搜索 开发者可以通过 sitemap.json 配置===>(SEO 优化)

- 当用户的搜索词条触发该索引时，小程序的页面将可能展示在搜索结果中。 爬虫访问小程序内页面时，会携带特定的 user-agent：mpcrawler 及场景值：1129。

```js
{
  "rules":[
    {
      "action":'',//	string	否	"allow"	"allow"、"disallow"	命中该规则的页面是否能被索引
      "page":'',//	string	是		"*"、页面的路径	* 表示所有页面，不能作为通配符使用
      "params":[],//	string[]	否	[]		当 page 字段指定的页面在被本规则匹配时可能使用的页面参数名称的列表（不含参数值）
      "matching":'',//	string	否	"inclusive"	参考 matching 取值说明	当 page 字段指定的页面在被本规则匹配时，此参数说明 params 匹配方式
      "priority":1//	Number	否	优先级，值越大则规则越早被匹配，否则默认从上到下匹配
    }
  ]
}
```

- {"action": "allow", "page": "\*"} 是优先级最低的默认规则，未显式指明 "disallow" 的都默认被索引

### matching 取值规则

- exact 当小程序页面的参数列表等于 params 时，规则命中
- inclusive 当小程序页面的参数列表包含 params 时，规则命中
- exclusive 当小程序页面的参数列表与 params 交集为空时，规则命中
- partial 当小程序页面的参数列表与 params 交集不为空时，规则命中
