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
  let res1 =  await db.collection("news").doc(id).get()
  let res2 =  await db.collection("likes").where({
    artid:id
  }).count();
  let res3 =  await db.collection("likes").where({
    artid:id,
    openId:openId
  }).count()
  if (res3.total) {
    res1.data.onlike = true
  }else{
    res1.data.onlike = false
  }

  res1.data.praise = res2.total;
  return res1

}