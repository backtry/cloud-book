//index.js
//获取应用实例
const app = getApp()
import {fetch,login} from "../util/util.js"

Page({
  data: {
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    isLoading:false,
    pn:1,
    hasMore:true
  },
 
  onLoad() {
    login(),
    this.getData(),
    this.getMain()
  },
  getData(){ //获取轮播图数据
    new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        resolve();
        this.setData({
          swiperData: res.data,
          isLoading: false,
        })
      }).catch(err => {
        reject();
        this.setData({
          isLoading: false
        })
      })
    })
  },
  getMain() { //获取书籍列表
    new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/category/books').then(res => {
        resolve();
        this.setData({
          mainContent: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject();
        this.setData({
          isLoading: false
        })
      })
    })
  },

  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  onPullDownRefresh: function () {
    Promise.all([this.getData(),this.getMain()]).then(()=>{
      wx.stopPullDownRefresh();
    })
  },
  getMoreMian(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
        let newArr=[...this.data.mainContent,...res.data]
        this.setData({
          mainContent:newArr,
        })
        resolve(res)
      }) 
    })
  },
  onReachBottom(){
   if(this.data.hasMore){
     this.setData({
       pn:this.data.pn+1
     })
     this.getMoreMian().then(res=>{
       if(res.data.length<2){
         this.setData({
           hasMore:false
         })
       }
     })
   }
  } 
})
