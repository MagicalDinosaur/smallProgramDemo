/**
 * 
 * 封装微信接口请求
 * 支持 promise
 * 
 */

// 封装 post 请求
function netPost(url, headers, params, app) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'POST',
      success: function (res) {
        //自行处理返回结果
        console.log('返回结果：')
        console.log(res.data)
        resolve(res.data);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  });
  return promise;
}

//get请求
function netGet(url, headers, params, app) {
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'GET',
      success: function (res) {
        //返回结果自行处理
        console.log('返回结果：')
        console.log(res.data)
        resolve(res.data);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  });
  return promise;
}

module.exports = {
  $get: netGet,
  $post: netPost
}