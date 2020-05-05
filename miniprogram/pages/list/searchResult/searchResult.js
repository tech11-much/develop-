// pages/list/searchResult/searchResult.js
const testImgUrl="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg";
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists_study:[
      
    ],
    search : ''
  },
  getSearchData: function (e) {
    this.data.search = e.detail.value,
      console.log(e),
      console.log(this.data.search)
    //监听输入框内容
  },
  SearchTranslate: function (e) {
    var i = this.data.search   //获取输入框输入内容
      db.collection('goods')
        .where({
          productName: db.RegExp({
            regexp: i,
            //从搜索栏中获取的value作为规则进行匹配。
            options: 'i',
            //大小写不区分
          })    //匹配输入内容
        })
        .get().then( res => {
            this.setData({
              lists_study : res.data
            })
            
        } )          
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

  },

})