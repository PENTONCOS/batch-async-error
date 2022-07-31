const batchAsyncError = (tasks) => {
  const action = {
    step: null, // 生成器执行节点
    finishFn: null, // 结束请求时的函数
    times: 0, // 执行次数
    data: { // 最终返回的数据
      result: [], // 储存的结果
      status: false, // 是否全部成功返回
    }
  }

  // 整合try catch捕获错误的能力
  const catchAwait = async (callback) => {
    try {
      const res = await callback();
      action.data.result.push({ flag: true, data: res });
      action.step.next();
    } catch (err) {
      action.data.result.push({ flag: false, data: err });
      action.finishFn(action.data);
    }
  }

  const handler = res => {
    action.finishFn = res;

    // 预先定义好生成器
    action.step = (function* () {
      const { finishFn, data } = action;
      const len = tasks.length;
      while (action.times < len) {
        yield catchAwait(tasks[action.times++]);
      }
      // 全部请求成功时，返回数据
      action.data.status = true;
      finishFn(data);
    })();

    // 启动生成器
    action.step.next();
  }

  // 将resolve包装返回（只有resolve/reject才能给出pending结果）
  return new Promise(resolve => handler(resolve));
}

export default batchAsyncError;