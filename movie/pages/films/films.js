// pages/films/films.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let index = app.globalData.moviesIndex
    this.setData({
      active: index
    })
    this.getMovies(0,this.data.active)
  },

  onHide: function () {
    this.setData({
      list:[],
      loading: true,
    })
    app.globalData.moviesIndex = 0
  },


  getMovies(num = 0, index) {
    wx.cloud.callFunction({
      name: "getMoviesList",
      data: {
        num,
        sort: index
      }
    }).then(res => {
      if (res.result.data <= 0) {
        this.setData({
          loading: false
        })
      }
      let oldData = this.data.list
      let newData = oldData.concat(res.result.data)
      this.setData({
        list: newData
      })
    })

  },

  geDetail(e) {
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  },

  change(e) {
    let index = e.currentTarget.dataset.index
    console.log(index);
    this.setData({
      list: [],
      active: index,
      loading: true,
    })
    this.getMovies(0, this.data.active)
  },



  onReachBottom: function () {
    this.getMovies(this.data.list.length, this.data.active);
  },
})