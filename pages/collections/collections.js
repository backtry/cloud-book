// pages/collections/collections.js
import { fetch } from "../util/util.js"
Page({
  data: {
   
    bookData:[],
    progressNum:0,
    
   

  },
  onShow:function(){},
  onLoad: function (options) {
     
      this.getUserread()
     

  },
 
  getUserread(){
    fetch.get('/readList').then(res=>{
      console.log(res)
      let arr = [...res.data]

      arr = arr.map(item => {
        item.title.percent = ((item.title.index/item.title.total) * 100).toFixed(2)
        return item
      })
      this.setData({
        bookData: arr,
      })
    })  
  },
  readContinue(e){
   console.log(e)
    let bookId = e.currentTarget.dataset.bookid;
    let textId = e.currentTarget.dataset.textid
    wx.navigateTo({
      url: `/pages/text/text?id=${textId}&bookId=${bookId}`,
    })


  },
  readMassage(e){
    console.log(e)
    let bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${bookId}`,
    })
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