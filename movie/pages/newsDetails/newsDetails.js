// pages/newsDetails/newsDetails.js
const app = getApp()
let index
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.getNewsDetail()
    index = options.index
  },

  getNewsDetail() {
    wx.cloud.callFunction({
      name: "getNewsDetails",
      data: {
        id: this.data.id
      }
    }).then(res => {
      console.log(res.result.data);
      res.result.data.wenben =
        res.result.data.wenben.replace(/<img/ig, "<img style='max-width:100%'")
      this.setData({
        list: res.result.data
      })
    }).catch(res => {
      console.log('失败', res);
    })
  },

  clickLike() {
    if (app.hasUserInfo()) {
      this.setLike();
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

  setLike() {

    let onlike = this.data.list.onlike
    let praise = this.data.list.praise
    console.log(this.data.list);
    if (onlike) {
      praise--
    } else {
      praise++
    }
    this.setData({
      "list.onlike": !onlike,
      "list.praise": praise
    })
    let newTime = Date.now()
    wx.cloud.callFunction({
      name: 'setLikes',
      data: {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.avatarUrl,
        newTime,
        artid: this.data.id
      }
    }).then(res => {
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let pages = getCurrentPages()[getCurrentPages().length - 2];
    if (pages.route == 'pages/news/news') {
      let list = pages.data.list;
      list[index].praise = this.data.list.praise;
      pages.setData({
        list
      })
    }else{
      let list = pages.data.list;
      console.log(list );
     
    }
  },
})