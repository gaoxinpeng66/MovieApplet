// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {avatarUrl,nickName,newTime,artid} = event
  const openId = cloud.getWXContext().OPENID

  
  let count =  await db.collection("likes").where({
    artid,
    openId
  }).count()

  if (count.total) {
    return await db.collection("likes").where({
      artid,
      openId
    }).remove()
  }else{
    return await db.collection("likes").add({
      data:{
        avatarUrl,nickName,newTime,artid,openId
      }
    })
  }
}