// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {},

  onLoad() {
    this.getMovies('hot')
    this.getMovies('coming')
    this.getMovies('soon')
    this.getMovies('hot')

    this.getMoviesSwips()
  },

  getMovies(state) {
    if (state === 'hot') {
      wx.cloud.callFunction({
        name: "getMoviesIndex",
        data: {
          state: state
        }
      }).then(res => {
        this.setData({
          hotList: res.result.data
        })
      })
    } else if (state === 'coming') {
      wx.cloud.callFunction({
        name: "getMoviesIndex",
        data: {
          state: state
        }
      }).then(res => {
        this.setData({
          comingList: res.result.data
        })
      })
    }else {
      wx.cloud.callFunction({
        name: "getMoviesIndex",
        data: {
          state: state
        }
      }).then(res => {
        this.setData({
          soonList: res.result.data
        })
      })
    }
  },

  getMoviesSwips() {
    let state = 'hot'
    wx.cloud.callFunction({
      name: "getMoviesSwip",
      data: {
        state: state
      }
    }).then(res => {
      // console.log('Swipslist', res.result.data);
      this.setData({
        Swipslist: res.result.data
      })
    })

  },

  geSearch(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  geDetail(e) {
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  },

  geMovieList(e) {
    let index = parseInt(e.currentTarget.dataset.index)
    console.log(index);
    app.globalData.moviesIndex = index
    wx.switchTab({
      url: '/pages/films/films?index',
    })
  }
})