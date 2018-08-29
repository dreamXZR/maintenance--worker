const app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    var that = this;
    wx.request({
      url: api + 'worker/' + wx.getStorageSync('worker_id'),
      success: function (res) {
        that.setData({
          name: res.data.name,
          phone: res.data.phone
        })
      }
    })
  },
  
  //提交员工信息
  formSubmit: function (e) {
    var that = this;
    var form_data = e.detail.value; //提交信息
    if (form_data.name != '' || form_data.phone != '') {
      var name_reg = /^[\u4E00-\u9FA5]{2,4}$/;
      if (!name_reg.test(form_data.name)) {
        wx.showToast({
          title: '姓名2-4中文字符！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(form_data.phone)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      form_data.worker_id = wx.getStorageSync('worker_id');

      wx.request({
        url: api + 'setInfo',
        method: 'post',
        data: form_data,
        success: function (res) {
          if (res.data.status) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              success: function () {
                
                setTimeout(function () {
                  wx.navigateBack({})
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return false;
    }
   

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