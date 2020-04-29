// miniprogram/pages/list/list.js
//const testImgUrl="https://7a7a-zz-11c835-1257008454.tcb.qcloud.la/gray.png";
const db = wx.cloud.database()
const app = getApp()
const testImgUrl="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [
      {url:testImgUrl} ,  
      {url:testImgUrl}
    ],
    lists_study:[]
  },

  onSearch(){
    console.log("search");
    wx.navigateTo({ 
      url: 'searchResult/searchResult?id=1', 
      events: { 
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据 
        acceptDataFromOpenedPage: function(data) { 
          console.log(data) 
        }, 
        someEvent: function(data) { 
          console.log(data) 
        } 
      }, 
      success: function(res) { 
        // 通过eventChannel向被打开页面传送数据 
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' }) 
      } 
    });
  },
  toDetail(e){
    // console.log(e);
    // console.log(this);
    console.log("toDetail");
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './detail/detail?id='+id,
    })
  },
  onCancel() {
    console.log("search");
  },
  onClick() {
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
      wx.navigateTo({
      url: 'searchResult/searchResult?id=1',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData();
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
  getListData() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
    })
      .then(res => {
        console.log(res);
        this.setData({
          lists_study: res.result.data
        });
      })
      .catch(console.error)
    
  },
})