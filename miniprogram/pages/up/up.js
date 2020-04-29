// miniprogram/pages/up/up.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphoto : '/images/up/addPic.png',
    nickName : '我的昵称',
    goodsName : " ",
    goodsPrice : '',
    disabled : true,
    array: ['学习', '娱乐', '生活'],
    objectArray: [
      {
        id: 0,
        name: '学习'
      },
      {
        id: 1,
        name: '娱乐'
      },
      {
        id: 2,
        name: '生活'
      }
    ],
    index: 0,
    _id : "",
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
    this.setData({
      index : this.data.index,
      nickName: app.userInfo.nickName
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    wx.cloud.callFunction({
      name: 'addGoods',
      data: {}
    }).then((res) => {
      //console.log(res);
      db.collection('goods').add({
        data : {
          _openid : res.result._openid,
          productMore: e.detail.value.productMore,
          productName: e.detail.value.productName,
          productPrice: e.detail.value.productPrice,
          productType: e.detail.value.productType,
          weixinNumber:e.detail.value.weixinNumber,
          qqNumber:e.detail.value.qqNumber,
          userphoto : '',
          
        }
      }).then((res) => {
        console.log(res);
        this.setData({
          _id : res._id,
        });
        let cloudPath = 'userphoto/' + app.userInfo._openid + Date.now() + '.jpg';
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: this.data.userphoto, // 文件路径
        }).then((res) => {
          
          //console.log(res);
          let fileID = res.fileID;
          if (fileID) {
            db.collection('goods').doc(this.data._id).update({
              data: {
                userphoto: fileID
              }
            }).then((res) => {
              wx.hideLoading();
              wx.showToast({
                title: '发布成功'
              });
              wx.hideLoading();
              this.data.userphoto = fileID
            });
          }
        });

      });

    });
    
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  handleUpdateImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        this.setData({
          userphoto: tempFilePaths,
          disabled: false,
        });
      }
    })
  },

})