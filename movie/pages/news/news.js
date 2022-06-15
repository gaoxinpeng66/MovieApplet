import common from '../../utils/common'
import time from '../../utils/util'
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    list: [],
    loading:true
  },
  onLoad: function (options) {
    this.getNews();
  },

  //获取列表数据
  getNews(num = 0) {
    wx.cloud.callFunction({
      name: "getNews",
      data: {
        num,
      }
    }).then(res => {
      res.result.data.forEach(item => {
        item.browse = common.getNumber(item.browse)
        item.praise = common.getNumber(item.praise)
        item.createTime = time.formatTime(item.createTime,'Y-M-D ')
      });

      if (res.result.data<=0) {
        this.setData({
          loading:false
        })
      }
      let oldData = this.data.list
      let newData = oldData.concat(res.result.data)
      this.setData({
        list: newData
      })
    }).catch(res => {
      console.log('失败', res);
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getNews(this.data.list.length);
  },

})