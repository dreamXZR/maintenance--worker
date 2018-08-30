var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'请选择'
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
    var that=this
    wx.request({
      url: api +'record',
      method:'POST',
      data:{
        worker_id:wx.getStorageSync('worker_id')
      },
      success:function(res){
        that.setData({
          recordList:res.data.data
        })
        
      }
    })
  },
  bindDateChange:function(e){
    var that=this
    that.setData({
      data: e.detail.value
    })
    wx.request({
      url: api + 'record',
      method: 'POST',
      data: {
        worker_id: wx.getStorageSync('worker_id'),
        time: e.detail.value
      },
      success: function (res) {
        that.setData({
          recordList: res.data.data
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