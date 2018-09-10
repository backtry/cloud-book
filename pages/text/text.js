// pages/text/text.js
import {fetch} from "../util/util.js";
const app = getApp();
Page({

  data: {
    bookId:"",
    textId:"",
    article:{},
    catalogData:[],
    font: 40,
    index:"" ,
    isLoading:false,
    isShow:false
  },

  onLoad: function (options) {

    console.log(options)

  this.setData({
    bookId:options.bookId,
    textId:options.id
  })
  this.getData()
  this.getCatalog()
  },
  
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/article/${this.data.textId}`).then(res=>{
      console.log(res)
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        index: res.data.article.index,
        isLoading: false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalogData: res.data,
      })
    })
  },
  toggleCatalog(){
    let isShow=!this.data.isShow;
    this.setData({
      isShow
    })
  },
  handleGet(event){
    const id = event.currentTarget.dataset.id;
    this.setData({
      textId:id
    })
    this.getData();
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  zitifangda(){
   this.setData({
     font:this.data.font+2
   })
  },
  zitisuoxiao() {
    if(this.data.font<30){
      wx.showModal({
        title: '提示',
        content: '字体太小影响视力，喵~~~',
        showCancel: false
      })
    }else{
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  prev(){
    let catalogData = this.data.catalogData
    if (catalogData[this.data.index-1]){
      this.setData({
        textId: catalogData[this.data.index-1]._id
      })
      this.getData()
    } else {
      wx.showModal({
        title: '提示',
        content: '第一章了，喵~~~',
        showCancel: false
      })
    }
  },
  next(){
    let catalogData=this.data.catalogData
    if(catalogData[this.data.index+1]){
      this.setData({
        textId: catalogData[this.data.index + 1]._id
      })
      this.getData()
    }else{
       wx.showModal({
        title: '提示',
        content: '最后一章了，喵~~~',
        showCancel: false
      })
    }
  }
 
})