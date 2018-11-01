var app = getApp();
var api = getApp().globalData.api;
var servsers = getApp().globalData.servsers;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  getUserInfo: function (e) {

    var that=this;
    if (e.detail.userInfo){
      //用户信息
      app.globalData.userInfo = e.detail.userInfo;
      if (app.globalData.share_user_id) {
        var share_user_id = app.globalData.share_user_id
      }
      //获取code
      wx.login({
        success: function (res) {
          var code = res.code;//返回code
          var share_user_id = app.globalData.share_user_id;
          wx.request({
            url: api + 'worker',
            method: 'POST',
            data: { code: code, userInfo: e.detail.userInfo},
            success: function (res) {
              wx.setStorageSync('worker_id', res.data.worker_id);
              that.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
              });
              app.globalData.userInfo = e.detail.userInfo;
              wx.navigateBack({})
            }
          })

        }
      })
      
    }else{
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
    
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      servsers: servsers,

    })
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()

  },

})