// pages/directory/directory.js
import { fetch } from "../util/util.js"
// Page({

//   data: {
//     directoryId:"",
//     directoryData:[]
//   },

  
//   onLoad: function (options) {
//       console.log(options)
//       this.setData({
//         directoryId:options.id
//       })
//       this.getData()
//   },

//   getData(){
//     fetch.get(`/titles/${this.data.directoryId}`).then(res=>{
//       console.log(res)
//         this.setData({
//           directoryData:res.data
//         })
//     })
//   }
// })

Page({
  data: {
    bookId: "",
    catalogData: []
  },
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  getData() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalogData: res.data
      })
    })
  },
  onShareAppMessage: function () {

  }
})