// pages/newsLikes/newsLikes.js
import common from '../../utils/common'
import time from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMoviesSeeLists()
  },


  getMoviesSeeLists() {
    wx.cloud.callFunction({
      name: "getSeeMovies",

    }).then(res => {
      res.result.forEach(item => {
        item.credaTime = time.formatTime(item.credaTime,'Y-M-D ')
      });
      this.setData({
        list: res.result
      })
    }).catch(res => {
      console.log('失败', res);
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  geMoviesDetails(e){
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  },

  onShow(){
    this.onLoad()
  }
})