
var app = getApp()    
Page({  
    modalcnt1:function(){  
        wx.showModal({  
            title: '提示',  
            content: '抱歉！暂未开始服务，请耐心等待，谢谢。',  
            success: function(res) {  
                if (res.confirm) {  
                console.log('用户点击确定')  
                } else if (res.cancel) {  
                console.log('用户点击取消')  
                }  
            }  
        })  
    },

    modalcnt2:function(){  
      wx.showModal({  
          title: '提示',  
          content: '抱歉！暂未开始服务，请耐心等待，谢谢。',  
          success: function(res) {  
              if (res.confirm) {  
              console.log('用户点击确定')  
              } else if (res.cancel) {  
              console.log('用户点击取消')  
              }  
          }  
      })  
  },
  
  modalcnt3:function(){  
    wx.showModal({  
        title: '提示',  
        content: '请拨打055-11111',  
        success: function(res) {  
            if (res.confirm) {  
            console.log('用户点击确定')  
            } else if (res.cancel) {  
            console.log('用户点击取消')  
            }  
        }  
    })  
}  
})