// 云函数入口文件
const cloud = require('wx-server-sdk')
const MAX_LIMIT = 100
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('goods').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('goods').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
      _openid: event.openid
    }).field({
      productName: true,
      _id: true,
      productPrice: true
    }).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}