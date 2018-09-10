// pages/my-collection/my-collection.js
import { fetch } from "../../util/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data:{
    bookData:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getData()
    
  },
  
  getData() {
    fetch.get('/collection').then(res => {
      console.log(res)
      this.setData({
        bookData: res.data
      })
    })
  },
  readMassage: function (e) {
    let _self = this;
    console.log(e)
    let bookId = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${bookId}`,
    })
  },
  delete(e){
    let _self = this;
    let bookId = e.currentTarget.dataset.bookid;
    fetch.delete(`/collection/${bookId}`).then(res=>{
      _self.getData()
    })
  },

  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },
bindTap(e) {
    let _self = this;
    if (this.endTime - this.startTime < 500) {
      console.log("点击")
      _self.readMassage(e)  
    }
  },
 
bingLongTap: function (e) {
   let _self=this;
    console.log("长按");
    wx.showModal({
      title: '提示',
      content: '确定要删除这个收藏吗？喵~~~',
      showCancel:'true',
      confirmText: '确定',
      cancelText:'取消',
     
      success:function(res){
        if(res.confirm){
          _self.delete(e),
          wx.showToast({
            title: '删除成功，喵~~~',
            duration: 500,
            mask: true,
          })
        }else {
          wx.showToast({
            title: '取消删除，喵~~~',
            duration: 500,
            mask: true,
          })
        }
      },
    })
  },
})
