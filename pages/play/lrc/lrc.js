var app = getApp();
var url = "http://route.showapi.com/213-2";
var appid = app.globalData.appid;
var secret = app.globalData.secret;
Page({
  data:{},
  onLoad:function(options){
    var songId=wx.getStorageSync('music').songId;
    var that=this;
    wx.request({
      url:url,
      data: {
        showapi_appid:appid,
        showapi_sign:secret,
        musicid:songId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.processLrc(res.data.showapi_res_body.lyric_txt)
      }
    })
    var imgSrc=wx.getStorageSync('music').coverImgUrl;
    this.setData({
      imgSrc:imgSrc
    })
  },
  processLrc:function(lrc){
    var index=lrc.split(" ");
    this.setData({
      lrc:index
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})