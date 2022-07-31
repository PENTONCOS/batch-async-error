# batch-async-error
批量操作同步请求，并可捕获报错信息

## 安装
```js
npm install batch-async-error
```

## 使用方法
```js
import batchAsyncError from "batch-async-error";

const tasks = [requestA, requestB, requestC];

batchAsyncError(tasks).then(data => console.log(data));
```

## 参数说明
接受一个参数
- `tasks`: 异步任务队列

**tasks**

必须是一个数组，该数组中每一项为一个`函数`，返回`promise`对象
