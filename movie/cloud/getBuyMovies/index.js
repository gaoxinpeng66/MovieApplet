// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const openId = cloud.getWXContext().OPENID
  let res2 = []
  let res1 = await db.collection("buys")
    .where({
      openId
    })
    .orderBy('newTime', "desc")
    .get();

  for (let i = 0; i < res1.data.length; i++) {
    let res = await db.collection("movies").where({
      _id: res1.data[i].moviesid
    }).get()
    res2 = res2.concat(res.data)
  }

  return res2
}