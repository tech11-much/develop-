// pages/list/detail/detail.js
const db = wx.cloud.database()
const testImgUrl="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qq: '',
    weixin: '',
    price: "",
    desc: "",
    title: "",
    thumb: '',
    id: 1,
    _id : '',
    _openid : '',
    userName : '',
    userPhoto : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    console.log(id)
    db.collection('goods').doc(id).field({
      userphoto: true,
      productPrice: true,
      productMore: true,
      productName: true,
      productType: true,
      _openid : true,
      qqNumber : true,
      weixinNumber : true
    })
      .get().then(res => {
        this.setData({
          thumb: res.data.userphoto,
          name: res.data.productName,
          price: res.data.productPrice,
          desc: res.data.productMore,
          _openid: res.data._openid,
          qq : res.data.qqNumber,
          weixin : res.data.weixinNumber
        });
        console.log(res.data._openid)
        
        
        
      })
      .catch(console.error)
      console.log(this.data._openid)
    

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