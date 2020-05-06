// miniprogram/pages/myPublication/myPublication.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '',
    goodsMine : []
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
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      console.log(res);
      wx.cloud.callFunction({
        name: 'getMine',
        data: {
          openid : res.result.openid
        }
      }).then((res) => {
        console.log(res)
        this.setData({
          goodsMine: res.result.data
        });
      });
    });
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
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      console.log(res);
      wx.cloud.callFunction({
        name: 'getMine',
        data: {
          openid: res.result.openid
        }
      }).then((res) => {
        console.log(res)
        this.setData({
          goodsMine: res.result.data
        });
      });
    });
    wx.stopPullDownRefresh();
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

  },
  deleteGoods : function(e){
    console.log(e);
    let id = e.target.id
    // db.collection('goods').where({
    //   _id: id
    // }).then(res => {
    //   console.log(res)
      // wx.cloud.deleteFile({
      //   fileList: ['res.userphoto']
      // }).then(res => {
      //   // handle success
      //   console.log(res.fileList)
      // }).catch(error => {
      //   // handle error
      // })

    // })
    //   .catch(console.error)
    wx.cloud.callFunction({
      name: 'deleteImg',
      data : {
        id : id
      }
    }).then((res) => {
      console.log(res)
      
    });
    db.collection('goods').where({
      _id : id
    }).remove().then(res => {
      wx.showToast({
        title: '已成功删除信息',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      
    })
      .catch(console.error)


  }
})