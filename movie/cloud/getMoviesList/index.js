// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let num = event.num;
  let sort = event.sort;
  let res 
  if (sort == 0) {
     res =  await db.collection("movies").where({
      sort: sort
      })
      .orderBy('credaTime', "desc")
      .limit(7)
      .skip(num)
      .get();
  }else{
    res =  await db.collection("movies").where({
      sort: sort
      })
      .orderBy('credaTime', "asc")
      .limit(7)
      .skip(num)
      .get();
  }
  

  return res
}