// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let openId = cloud.getWXContext().OPENID
  let res1 =  await db.collection("movies").doc(id).get()
  let res2 =  await db.collection("see").where({
    moviesid:id
  }).count();
  let res3 =  await db.collection("see").where({
    moviesid:id,
    openId:openId
  }).count()
  let res4 =  await db.collection("buys").where({
    moviesid:id,
    openId:openId
  }).count()
  if (res3.total) {
    res1.data.onSee = true
  }else{
    res1.data.onSee = false
  }
  if (res4.total) {
    res1.data.onBuy = true
  }else{
    res1.data.onBuy = false
  }

  res1.data.seeNum = res2.total;
  return res1

}