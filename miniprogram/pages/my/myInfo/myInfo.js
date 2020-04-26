// miniprogram/pages/my/myInfo/myInfo.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: '',
    updated: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userPhoto: app.userInfo.userPhoto
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
  }  
})