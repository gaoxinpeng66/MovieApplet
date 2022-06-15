// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let num = event.num;
  // let time = event.time
  let res1 = await db.collection("news")
    .orderBy('createTime', "desc")
    .limit(7)
    .skip(num)
    .get();



  for (let i = 0; i < res1.data.length; i++) {
    let count = await db.collection("likes").where({
      artid: res1.data[i]._id
    }).count();
    res1.data[i].praise = count.total
  }




  return res1
}