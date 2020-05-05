// miniprogram/pages/up/up.js
const db = wx.cloud.database()
const app = getApp()
const testImgSet = [
  "https://ae01.alicdn.com/kf/Hc25fd910e3874a98aac9cb1ae33f3ed5A.jpg",
  "https://ae01.alicdn.com/kf/Hb8d0daf6d747407caa6744903cab212bt.jpg",
  "https://ae01.alicdn.com/kf/H9afc48f3c6c24800a07d92d4e7607e2fI.jpg",
  "https://ae01.alicdn.com/kf/H649b4c6713ac4cbcb363d6482bdf2f04Z.jpg",
  "https://ae01.alicdn.com/kf/H9890f7175bc749fcb0128a3c25e66734E.jpg",
  "https://ae01.alicdn.com/kf/H55d2822c7d52482cbbe754ae94477df3p.jpg",
  "https://ae01.alicdn.com/kf/H84e59cd7cbb24802b3b16a2cc40deac3i.jpg",
  "https://ae01.alicdn.com/kf/Hf5740a4972864ed697c7a628342873b8M.jpg",
  "https://ae01.alicdn.com/kf/H8565f42b4b1644f3b60ed9fe7a1279c8r.jpg",
  "https://ae01.alicdn.com/kf/H8d02dadf3bc44a27affff1ad063cb4e8r.jpg",
  "https://ae01.alicdn.com/kf/Hcc619a5d962e42938bb29793266f2bbcr.jpg",
  "https://ae01.alicdn.com/kf/Hb7779772645a45e296fc45e2b97694520.jpg",
  "https://ae01.alicdn.com/kf/Hba1aba89e65d4b36ac3b7785f3dbafe3T.jpg",
  "https://ae01.alicdn.com/kf/Hc4636390d870498489833977832a4b9aJ.jpg",
  "https://ae01.alicdn.com/kf/H61d11f9b2861473984ed846af2b3613dS.jpg",
  "https://ae01.alicdn.com/kf/H0bc49d04e0164d21b3518128f412dffcF.jpg",
  "https://ae01.alicdn.com/kf/H2ac813d595e64515990d721ede4b29b97.jpg",
  "https://ae01.alicdn.com/kf/H0a7a5334cbce4d7eac92fb2042af6948q.jpg"
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphoto: '/images/up/addPic.png',
    nickName: '我的昵称',
    goodsName: " ",
    goodsPrice: '',
    disabled: true,
    array: ['学习', '娱乐', '生活'],
    objectArray: [{
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
    _id: "",
    qqNumber : '',
    weixinNumber : '',
    productMore : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: this.data.index,
      nickName: app.userInfo.nickName,
      qqNumber : app.userInfo.qqNumber,
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
    this.setData({
      index: this.data.index,
      nickName: app.userInfo.nickName,
      qqNumber: app.userInfo.qqNumber,
      weixinNumber: app.userInfo.weixinNumber
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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
      console.log(res);
      db.collection('goods').add({
        data: {
          _openid: res.result._openid,
          productMore: e.detail.value.productMore,
          productName: e.detail.value.productName,
          productPrice: e.detail.value.productPrice,
          productType: e.detail.value.productType,
          weixinNumber: e.detail.value.weixinNumber,
          qqNumber: e.detail.value.qqNumber,
          userphoto: '',

        }
      }).then((res) => {
        console.log(res);
        this.setData({
          _id: res._id,
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
              wx.showToast({
                title: '发布成功'
              });
            });
          }
        });

      });

    });

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  // test() {
  //   console.log("test");
  //   db.collection('goods').count().then(resu => {
  //     console.log('total:', resu.total);
  //     wx.cloud.callFunction({
  //       name: 'addGoods',
  //       data: {}
  //     }).then((res) => {
  //       //console.log(res);
  //       db.collection('goods').add({
  //         data: {
  //           _openid: res.result._openid,
  //           productMore: '这是第' + resu.total + '条记录' + this.randChar("", this.randNum(2, 30)),
  //           productName: this.randChar("zh", this.randNum(1, 10)),
  //           productPrice: (Math.random() * 1000).toFixed(2),
  //           productType: this.randNum(0, 2),
  //           weixinNumber: this.randChar("wx", this.randNum(1, 18)),
  //           qqNumber: this.randChar("qq", this.randNum(6, 11)),
  //           userphoto: testImgSet[this.randNum(0, 18)],
  //         }
  //       }).then((res) => {
  //         console.log(res);
  //       });
  //     });
  //   });
  // },
  // randChar(type, num) {
  //   var s = "";
  //   while (num--) {
  //     switch (type) {
  //       case "zh":
  //         s += String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
  //         break;
  //       case "wx":
  //         s += String.fromCodePoint(Math.round(Math.random() * 25) + 65);
  //       case "qq":
  //         s += String.fromCodePoint(Math.round(Math.random() * 9) + 48);
  //         break;
  //       default:
  //         s += String.fromCodePoint(Math.round(Math.random() * 10000) + 32);
  //         break;
  //     }
  //   };
  //   return s;
  // },
  // randNum(a, b) {
  //   return Math.round(Math.random() * (b - a)) + a;
  // },

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