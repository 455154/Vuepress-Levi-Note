# Axios

## 安装

- npm install axios

## Get 方法

```js
axios({
    method: 'get',
    url: '',
    params: {}
}).then(res => { do something })
// 或者
axios.get(url, params).then(res => { do something })
```

## Post 方法

```js
axios({
    method: 'post',
    url: '',
    data: {}
}).then(res => { do something })
// 或者
axios.post(url, data).then(res => { do something })
```

## 并发请求

```js
axios.all([  // 这里的参数是一个数组，里面包含了axios请求
  axios.get('url1'), // 请求的先后顺序就是代码中的顺序
  axios.get('url2')
]).then(
  axios.spread((res1, res2) => { // spread用来分割返回值
    console.log(res1, res2)
  }
)
```

## 请求拦截器

```js
axios.interceptors.request.use(
  config => {}, // 在发送请求前的一些处理逻辑
  err => {} // 在请求错误后的处理
);
```

## 响应拦截器

```js
axios.interceptors.response.use(
  res => {
    return res;
  }, // 请求成功后对响应数据做一定的处理
  err => {
    return Promis.reject(err);
  } // 在响应错误后的处理，可以用catch捕捉
);
```

## 全局默认配置

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
```

## 取消请求

```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios
  .get('/user/12345', {
    cancelToken: source.token
  })
  .catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
//或者
var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```
