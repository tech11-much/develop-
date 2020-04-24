// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [
      {url:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'} ,  
      {url:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'}
    ],
    lists_study:[
      {
        num:1,
        price:"1",
        desc:"描述信息",
        title:"商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      },{
        num:2,
        price:"2",
        desc:"描述信息描述信息",
        title:"商品标题商品标题",
        thumb:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500 
  },

  onSearch(){
    console.log("search");
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
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