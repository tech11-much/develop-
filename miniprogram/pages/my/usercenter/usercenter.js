// miniprogram/pages/my/usercenter/usercenter.js
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "",
    userName: "",
    openid: "",
    isHide: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      //console.log(res);
      db.collection('user').where({
        _openid: res.result.openid
      }).get().then((res) => {
        if (res.data.length) {
          app.userInfo = Object.assign(app.userInfo, res.data[0]);
          console.log(app.userInfo);
          console.log(res.data),
            this.setData({
              userPhoto: app.userInfo.userPhoto,
              nickName: app.userInfo.nickName,
              isHide: false
            });
        }
        else {
          _this.setData({
            isHide : true
          });
        };

      });

    });
  },

  
  getUserInfoClick: function getUserInfoClick(ev) {
    var _this2 = this;
    let userInfo = ev.detail.userInfo;
    if (!this.data.logged && userInfo) {
      db.collection('user').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          phoneNumber: '',
          weixinNumber: '',
          time: new Date(),
          isLocation: true,
          longitude: this.latitude,
          latitude: this.latitude
        }
      }).then((res) => {
        db.collection('user').doc(res._id).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo, res.data);
          console.log(app.userInfo);
          _this2.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            isHide: false

          });
        });
      });
    }
  },
  generate(){
    this.setData({
      userPhoto: app.userInfo.userPhoto,
    });
  }
})