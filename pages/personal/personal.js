// pages/personal/personal.js
import { fetch } from "../util/util.js"; 
Page({

  data: {
    bookData:[],
    userInfo:{}
  },

  onLoad: function (options) {


  //  wx.getUserInfo({
  //    withCredentials: true,
  //    lang: '',
  //    success: function(res) {},
  //    fail: function(res) {},
  //    complete: function(res) {},
  //  }) 

    wx.getUserInfo({
      success: (data)=>{
        console.log(data.userInfo)
        this.setData({
          userInfo:data.userInfo
        })
        
      }
    })


  this.getData()
  },
  getData(){
    fetch.get('/collection').then(res=>{
      console.log(res)
      this.setData({
        bookData:res.data
      })
    })
  },
  collection(){
    wx.navigateTo({
      url: '/pages/personal/my-collection/my-collection',
    })
  },

})