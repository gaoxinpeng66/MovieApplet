const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.clickLike()
  },
  

  clickLike() {
    if (app.hasUserInfo()) {
    
      this.setData({ 
        userInfo:app.globalData.userInfo
      })
    } else {
      wx.getUserProfile({
        desc: '授权',
        success: res => {
          wx.setStorageSync('userInfo', res.userInfo)
          app.globalData.userInfo = res.userInfo
          this.setData({ 
            userInfo:res.userInfo
          })
        }
      })
    }
  },

  geMovieOrder(){
    wx.navigateTo({
      url: '/pages/movieOrder/movieOrder',
    })
  },
  geMovieCollection(){
    wx.navigateTo({
      url: '/pages/movieCollection/movieCollection',
    })
  },
  geNewsLikes(){
    wx.navigateTo({
      url: '/pages/newsLikes/newsLikes',
    })
  },
  gekefu(){
    wx.navigateTo({
      url: '/pages/kefu/kefu',
    })
  },
  gebangzhu(){
    wx.navigateTo({
      url: '/pages/bangzhu/bangzhu',
    })
  },
  gefankui(){
    wx.navigateTo({
      url: '/pages/fankui/fankui',
    })
  },
  geguanyuwomen(){
    wx.navigateTo({
      url: '/pages/guanyuwomen/guanyuwomen',
    })
  },

})