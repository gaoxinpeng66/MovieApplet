// pages/search/search.js
import common from '../../utils/common'
import time from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onInput(e) {
    console.log(e.detail.value);
    this.setData({
      key: e.detail.value
    })
  },

  goSearch() {
    if (this.data.key == '' || !this.data.key) {
      wx.showToast({
        icon: 'error',
        title: '请正确输入内容',
      })
    } else {
      wx.cloud.callFunction({
        name: "getSearch",
        data: {
          title: this.data.key
        }
      }).then(res => {
        res.result.data.forEach(item => {
          item.credaTime = time.formatTime(item.credaTime, 'Y-M-D ')
        });
        console.log(res.result.data);
        this.setData({
          list: res.result.data
        })
      })
    }
    
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})