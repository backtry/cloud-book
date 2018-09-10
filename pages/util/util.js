const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http (url,method,data) {
    return new Promise((resolve,reject)=>{
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token){
        header.token = token
      }
      

    wx.request({
      url:baseUrl + url,
      data,
      method,
      header,


      success(res){
        if(res.header.Token){
           wx.setStorageSync('token', res.header.Token)
        }
        resolve(res.data)
      },
      fail(err){
        reject(err) 
      }
    })
    })
  },
  get(url,data){
   return this.http(url,'GET',data) 
  },
  post(url, data) {
    return this.http(url,'post',data)
  },
  delete(url, data) {
    return this.http(url, 'DELETE', data)
  },
}

const login = () => {
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wx21f04ec492a8b8de",
        secret:"d7176d0d67844bdb4b0e9da0159e75d8"
      }).then(res=>{
      })
    } 
  }) 
}

const timecut = (data,i,m) => {
  let newTime = data.substring(i,m);
  return newTime;
}

exports.login = login;  
exports.fetch = fetch;
