var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  staffwork: function (e) {
    var worker_id = e.currentTarget.dataset.worker_id
    if (!worker_id || worker_id==wx.getStorageSync('worker_id')){
      wx.navigateTo({
        url: '/pages/staff-work/staff-work?id=' + e.currentTarget.dataset.id + "&number=" + e.currentTarget.dataset.number
      })
    }else{
      wx.showToast({
        title:'您无法定件',
        icon:'none'
      })
    }
    // wx.navigateTo({
    //   url: '/pages/staff-work/staff-work?id=' + e.currentTarget.dataset.id + "&number=" + e.currentTarget.dataset.number
    // })
    
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
      url: api +'FixingsList',
      success:function(res){
        
        that.setData({
          FixingsList:res.data.data
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
    this.onShow()
    wx.stopPullDownRefresh()

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