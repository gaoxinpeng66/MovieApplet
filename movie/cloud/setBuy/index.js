// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {avatarUrl,nickName,newTime,moviesid} = event
  const openId = cloud.getWXContext().OPENID

  
  let count =  await db.collection("buys").where({
    moviesid,
    openId
  }).count()

  if (count.total) {
    return await db.collection("buys").where({
      moviesid,
      openId
    }).remove()
  }else{
    return await db.collection("buys").add({
      data:{
        avatarUrl,nickName,newTime,moviesid,openId
      }
    })
  }
}