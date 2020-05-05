// components/copytext/copytext.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },

  properties: {
    text : String ,
  }, 

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCopy(){
      wx.setClipboardData({
        data: this.data.text,
        success(res) {
          wx.getClipboardData({
            success(res) {
              wx.showToast({
                title: '复制成功',
              })
            }
          })
        }
      })
    }
  }
})
