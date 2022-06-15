import common from '../../utils/common'
import time from '../../utils/util'
const app = getApp()
let id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    if_hide: false, //是否折叠，true为折叠
    list: [],
  },

  change: function (e) {
    this.setData({
      if_hide: !this.data.if_hide
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    this.getMovies()
    this.change()
  },

  getMovies() {
    wx.cloud.callFunction({
      name: "getMoviesDetails",
      data: {
        id: id
      }
    }).then(res => {
        res.result.data.credaTime = time.formatTime(res.result.data.credaTime, 'Y-M-D ')
  
      this.setData({
        list: res.result.data
      })
    }).catch(res => {
      console.log('失败', res);
    })
  },


  clickSee() {
    if (app.hasUserInfo()) {
      this.setSee();
    } else {
      wx.getUserProfile({
        desc: '授权',
        success: res => {
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  setSee() {
    let onSee = this.data.list.onSee
    let seeNum = this.data.list.seeNum
    if (onSee) {
      seeNum--
    } else {
      seeNum++
    }
    this.setData({
      "list.onSee": !onSee,
      "list.seeNum": seeNum
    })
    let newTime = Date.now()
    wx.cloud.callFunction({
      name: 'setSee',
      data: {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.avatarUrl,
        newTime,
        moviesid: id
      }
    }).then(res => {
      console.log(res);
    })
  },

  clickBuy() {
    if (app.hasUserInfo()) {
      this.setBuy();
    } else {
      wx.getUserProfile({
        desc: '授权',
        success: res => {
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  setBuy() {
    let onBuy = this.data.list.onBuy
    console.log(this.data.list);
    this.setData({
      "list.onBuy": !onBuy,
    })
    let newTime = Date.now()
    wx.cloud.callFunction({
      name: 'setBuy',
      data: {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.avatarUrl,
        newTime,
        moviesid: id
      }
    }).then(res => {
      console.log(res);
    })
  },

})