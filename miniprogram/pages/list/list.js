// miniprogram/pages/list/list.js
//const testImgUrl="https://7a7a-zz-11c835-1257008454.tcb.qcloud.la/gray.png";
const db = wx.cloud.database()
const app = getApp()
const testImgUrl = "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg";
const onePageNumber =30;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [{
      url: testImgUrl
    }, {
      url: testImgUrl
    }],
    lists_study: [],
    lists_show: [],
    pageNumber: 50,

  },

  onSearch() {
    console.log("go to search");
    wx.navigateTo({
      url: 'searchResult/searchResult',
    });
  },
  toDetail(e) {
    console.log('去往详情页面，携带数据id：', e.currentTarget.id);
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: './detail/detail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListAll();

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
    //this.getListData();
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
    console.log('refresh');
    this.setData({
      lists_study: [],
      lists_show: []
    });
    this.getListAll();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getNewPage();
  },
  test() {
    console.log("test");
  },
  getNewPage() {
    var onePageNumber = 30
    console.log("上拉刷新获取更多列表");
    this.setData({
      lists_study: this.data.lists_show.slice(0, this.data.pageNumber-1),
      pageNumber: this.data.pageNumber + onePageNumber
    });
  },
  onChange(){
    this.setData({
      pageNumber : 30,
    })
    this.getListAll()
    console.log('ddddd')
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // getListData() {
  //   wx.cloud.callFunction({
  //       // 云函数名称
  //       name: 'getData',
  //     })
  //     .then(res => {
  //       console.log(res);
  //       this.setData({
  //         lists_study: res.result.data,
  //         lists_show: res.result.data.slice(0, onePageNumber - 1)
  //       });
  //     })
  //     .catch(console.error);
  //   console.log("刷新列表");
  // },
  getListAll() {
    var onePageNumber = 30
    wx.cloud.callFunction({
        // 云函数名称
        name: 'getallData',
      })
      .then(res => {
        console.log('商品个数：',res.result.data.length);
        for (var i = 0, j = res.result.data.length - 1; i < res.result.data.length; i++, j--) {
          this.data.lists_show[j] = res.result.data[i];
        }
        this.setData({
          lists_study: this.data.lists_show.slice(0, this.data.pageNumber - 1),
          pageNumber: this.data.pageNumber + onePageNumber
        });
      })
      .catch(console.error)

  }
})