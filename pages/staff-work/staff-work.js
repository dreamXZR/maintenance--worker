var api = getApp().globalData.api;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    step:[],
    stepList:[]
  },
  setModalStatus: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //步骤全部显示
    var that=this
    that.setData({
      order_id: options.id
    })
    wx.request({
      url: api +'TemRoStepList/'+1,
      success:function(res){
        var arr = that.data.step.concat(res.data.data)
        that.setData({
          step: arr
        })
        wx.request({
          url: api + 'TemRoStepList/' + 2,
          success: function (res) {
            var arr = that.data.step.concat(res.data.data)
            that.setData({
              step: arr
            })
          }
        })
      }
    })
    //已添加的步骤
    
  },
  //选择维修步骤
  select:function(e){
    var that=this;
    wx.showModal({
      title:'提示',
      content:'是否添加该步骤/维修包？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api +'stepShow',
            method:'POST',
            data:{
              id: e.currentTarget.dataset.id,
              type: e.currentTarget.dataset.type
            },
            success:function(res){
              
              var arr=that.data.stepList.concat(res.data)
              
              that.setData({
                stepList: arr
              })
              that.setModalStatus()
             
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },  
  //删除维修步骤
  dropStep:function(e){
    var that=this;
    var arrs=that.data.stepList;
    arrs.splice(e.currentTarget.dataset.index,1)
    that.setData({
      stepList:arrs
    })
  },
  //提交维修步骤
  formSubmit: function (e){
    var that = this;
    var form_data = e.detail.value; //提交信息
    wx.showModal({
      title:'提示',
      content:'是否提交该定件？',
      success:function(res){
        if (res.confirm) {
            wx.request({
              url: api +'steps',
              method:'POST',
              data:{
                step_json: form_data,
                order_id:that.data.order_id
              },
              success:function(res){
                if(res.data.status){
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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