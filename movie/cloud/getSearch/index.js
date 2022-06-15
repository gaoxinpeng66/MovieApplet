// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let title = event.title;
  let res = await db.collection("movies").where({
    nm: db.RegExp({
      regexp:title,
      options:'i'
    })
  }).get()

  return res
}