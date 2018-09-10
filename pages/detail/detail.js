// pages/detail/detail.js
import {fetch} from "../util/util.js"
Page({
  data: {
  bookId:"",
  bookData:{},
  isLoading:false,
  updatetime:""
  },
  onLoad: function (options) {
  this.setData({
    bookId:options.id
  })
  this.getData()
  
  },
  getData(){
    
    this.setData({
      isLoading:true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        bookData:res,
        updatetime:res.data.updateTime,
        isLoading:false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  jumpDirectory(){
    const id = this.data.bookId;
    wx.navigateTo({
      url: `/pages/directory/directory?id=${id}`,
    })
  },

  bookCollect() {
    fetch.post('/collection', {
      bookId: this.data.bookId
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '收藏成功',
          type: 'success',
          duration: 1000
        })
      }
      let bookData = { ...this.data.bookData }
      bookData.isCollect = 1
      this.setData({
        bookData: bookData
      })
    })
  },
  

  onShareAppMessage: function(){
    return{
      title:this.data.bookData.data.title,
      path: `pages/detail/detail?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }
  
}) 