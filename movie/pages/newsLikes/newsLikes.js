// pages/newsLikes/newsLikes.js
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
    this.getNewsLikeLists()
  },


  getNewsLikeLists() {
    wx.cloud.callFunction({
      name: "getNewsLikeList",

    }).then(res => {
      console.log(res);
      this.setData({
        list: res.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  geNewsDetails(e){
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/newsDetails/newsDetails?id='+id,
    })
  },

  onShow(){
    this.onLoad()
  }
})