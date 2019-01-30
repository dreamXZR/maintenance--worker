// pages/staff-index/staff-index.js
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOrder:[],
    statusType: ["拆", "加工","装","检测"],
    currentTpye: 0,
  },
  //订件入口
  staffworklist: function () {
    if (wx.getStorageSync('worker_id')) {
      wx.request({
        url: api + 'isAppoint/' + wx.getStorageSync('worker_id'),
        success: function (res) {
          if (res.data.status==1) {
            wx.navigateTo({
              url: '/pages/staff-work-list/staff-work-list'
            })
          } else if (res.data.status == 2) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/staff-myinfo/staff-myinfo',
                  })
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
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    
    
  },
  //首页
  staffindex: function () {
    wx.navigateTo({
      url: '/pages/staff-index/staff-index'
    })
  },
  //个人中心
  staffmy: function () {
    if (wx.getStorageSync('worker_id')) {
      wx.navigateTo({
        url: '/pages/staff-my/staff-my'
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    
  },
  //接取工作提示
  receiveWork:function(e){
    if (wx.getStorageSync('worker_id')) {
      wx.request({
        url: api + 'isPass/' + wx.getStorageSync('worker_id'),
        success: function (res) {
          if (res.data.status==1) {
            wx.navigateTo({
              url: '/pages/staff-order-list/staff-order-list?id=' + e.currentTarget.dataset.id,
            })
          } else if (res.data.status == 2){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              success:function(){
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/staff-myinfo/staff-myinfo',
                  })
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
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    
    
  },
  
  //完成工作提示
  accomplishWork:function(e) {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定已完成工作?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api +'finished',
            method:'POST',
            data:{
              worker_id: wx.getStorageSync('worker_id'),
              id: e.currentTarget.dataset.id
            },
            success:function(res){
              if(res.data.status){
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  success:function(){
                    that.myOrder()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    if (!wx.getStorageSync('worker_id')) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      //获取用户信息
      wx.getUserInfo({
        success: function (res) {
          getApp().globalData.userInfo = res.userInfo
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    that.myOrder()
    that.orderList(0)
    that.setData({
      currentTpye: 0,
    })
    
  },
  //维修工作列表
  orderList:function(select){
    var that=this
    wx.request({
      url: api + 'OrderList',
      data:{
        select:select
      },
      success: function (res) {
        that.setData({
          orderList: res.data
        })

      }
    })
  },
  //我的维修任务
  myOrder:function(){
    var that=this
    wx.request({
      url: api + 'taked',
      method: 'POST',
      data: {
        worker_id: wx.getStorageSync('worker_id')
      },
      success: function (res) {
        that.setData({
          myOrder: res.data.data
        })
      }
    })
  },
  detail: function (e){
    var index = e.currentTarget.dataset.index
    var that = this
    var data = that.data.myOrder[index]
    wx.showModal({
      title: '详细信息',
      content: '编号：' + data.order+' '+data.p_name+data.name+' '+'数量:'+data.number,
      showCancel: false
    })
  },
  //放弃工作
  abandon:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否放弃该工作?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api + 'abandon',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data.status) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  success: function () {
                    that.myOrder()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //选择标签
  statusTap: function (e) {
    var that = this
    var curType = e.currentTarget.dataset.index
    this.setData({
      currentTpye: curType
    });
    that.orderList(curType)
  },
  message_detail:function(e){
    var index = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      title: '消息',
      content: '编号：' + that.data.orderList[index].number + ' ' + that.data.orderList[index].type + '_' + that.data.orderList[index].servicing,
      showCancel: false
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