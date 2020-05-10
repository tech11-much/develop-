// miniprogram/pages/my/myInfo/myInfo.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: '',
    updated: false,
    nickName: '',
    qqNumber : '',
    weixinNumber : '',
    phoneNumber : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userPhoto: app.userInfo.userPhoto,
      nickName: app.userInfo.nickName,
      qqNumber: app.userInfo.qqNumber,
      weixinNumber : app.userInfo.weixinNumber
    });
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

  },
  handleUploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        this.setData({
          userPhoto: tempFilePaths,
          updated:true
        });
      }
    });
  },
  handleBtn(){
    db.collection('user').doc(app.userInfo._id).get().then((res) => {
      console.log(res.data.userPhoto)
      wx.cloud.deleteFile({
        fileList: [res.data.userPhoto]
      }).then(res => {
        // handle success
        console.log(res.fileList)
      }).catch(error => {
        // handle error
      })
    });
    wx.showLoading({
      title: '上传中',
    });
    let cloudPath = 'userPhoto/' + app.userInfo._openid + Date.now() + '.jpg';
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: this.data.userPhoto, // 文件路径
    }).then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '上传成功'
      });
      //console.log(res);
      let fileID = res.fileID;
      if (fileID) {
        db.collection('user').doc(app.userInfo._id).update({
          data: {
            userPhoto: fileID
          }
        }).then((res) => {
          wx.hideLoading();
          wx.showToast({
            title: '上传并更新成功'
          });
          app.userInfo.userPhoto = fileID
        });
      }
    });
  },
  handleText(ev) {
    let value = ev.detail.value;
    this.setData({
      nickName: value
    });
  },  
  handleBtnName(ev) {
    this.updatenickName();
  },
  updatenickName() {
    wx.showLoading({
      title: '更新中'
    })
    db.collection('user').doc(app.userInfo._id).update({
      data: {
        nickName: this.data.nickName
      }
    }).then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
      app.userInfo.nickName = this.data.nickName;
    });
  },
  handleQq(ev) {
    let value = ev.detail.value;
    this.setData({
      qqNumber : value
    });
  },
  handleWeixin(ev) {
    let value = ev.detail.value;
    this.setData({
      weixinNumber: value
    });
  },
  handleBtnName(ev) {
    this.updatenickName();
  },
  handleBtnQq(ev) {
    this.updateQq();
  },
  handleBtnWeixin(ev) {
    this.updateWeixin();
  },
  updateQq() {
    wx.showLoading({
      title: '更新中'
    })
    db.collection('user').doc(app.userInfo._id).update({
      data: {
        qqNumber : this.data.qqNumber
      }
    }).then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
      app.userInfo.qqNumber = this.data.qqNumber;
    });
  },
  updateWeixin() {
    wx.showLoading({
      title: '更新中'
    })
    db.collection('user').doc(app.userInfo._id).update({
      data: {
        weixinNumber: this.data.weixinNumber
      }
    }).then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功'
      });
      app.userInfo.weixinNumber = this.data.weixinNumber;
    });
  },
})