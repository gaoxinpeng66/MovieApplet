// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let state = event.state;
  let res = await db.collection("movies").where({
    state: state
  }).orderBy('sc', "desc").limit(5).get();

  return res
}