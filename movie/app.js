// app.js
App({
  onLaunch() {
   wx.cloud.init({
     env:"cloud1-7g2u95z353261fa8",
     traceUser:true
   })
  },

  globalData: {
    userInfo: {},
    openid:null,
    moviesIndex:0
  },
  hasUserInfo(){
    if (this.globalData.userInfo && this.globalData.userInfo.nickName) {
      return true
    }
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.nickName) {
      this.globalData.userInfo = userInfo;
      return true
    }else {
      return false
    }
  }
})
