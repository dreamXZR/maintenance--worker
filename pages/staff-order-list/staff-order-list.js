// pages/staff-index/staff-index.js
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  
  //接取工作提示
  receiveWork:function(e){
    wx.showModal({
      title: '提示',
      content: '是否接取工作?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api +'isTaking',
            method:'POST',
            data:{
                worker_id:wx.getStorageSync('worker_id')
            },
            success:function(res){
              console.log(res.data)
              if(res.data.status){
                wx.request({
                  url: api +'taking',
                  method:'POST',
                  data:{
                    worker_id: wx.getStorageSync('worker_id'),
                    id: e.currentTarget.dataset.id
                  },
                  success:function(res){
                    if (res.data.status) {
                      wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        success:function(){
                          setTimeout(function(){
                            wx.navigateBack({})
                          },2000)
                        }
                      })
                    }else{
                      wx.showToast({
                        title: res.data.message,
                        icon: 'none'
                      })
                    }
                  }
                })
              }else{
                wx.showToast({
                  title:res.data.message,
                  icon:'none'
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //已经接取工作提示
  hint:function(){
    wx.showModal({
      title: '提示',
      content: '您已经接取一个工作，请先完成手头工作',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //完成工作提示
  accomplishWork:function() {
    wx.showModal({
      title: '提示',
      content: '确定已完成工作?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //维修工作列表
    wx.request({
      url: api + 'OrderShow/'+options.id,
      success: function (res) {
        
        that.setData({
          stepList: res.data.data
        })

      }
    })
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
    var that=this
    //公司信息
    wx.request({
      url: api + 'compayInfo',
      success: function (res) {
        that.setData({
          name: res.data.compay_info.name,
        })
      }
    })
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