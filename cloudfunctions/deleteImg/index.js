// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('goods').where({
      _id: event.id
    }).get().then(res => {
      console.log(res)
      wx.cloud.deleteFile({
        fileList: ['res.userphoto']
      }).then(res => {
        // handle success
        console.log(res)
      }).catch(error => {
        // handle error
      })

    })
      .catch(console.error)

}