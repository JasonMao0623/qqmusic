// pages/musiclist/musiclist.j
var app = getApp();
var url = app.globalData.url;
var appid = app.globalData.appid;
var secret = app.globalData.secret;
var topid = app.globalData.topid;
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.http(url, appid, secret, topid.rege,"", this.callback);
    wx.setStorageSync('music',{});
  },
  callback: function (data) {
    var songlist = data.songlist;
    this.processData(songlist);
  },
  processData: function (songlist) {
    var list = [];
    for (var idx in songlist) {
      var song = songlist[idx];
      var name = song.songname;
      if (name.length > 6) {
        name = name.substring(0, 6) + "..."
      }
      var tem = {
        songId: song.songid,
        songImg: song.albumpic_big,
        singer: song.singername,
        song: name,
        src: song.url,
        songFullName:song.songname,
        second:song.seconds
      };
      list.push(tem);
    }
    this.setData({
      songList: list,
    })
    wx.hideNavigationBarLoading();
  },
  onSongTap: function (event) {
    wx.clearStorageSync();
    var src=event.currentTarget.dataset.src;
    var name = event.currentTarget.dataset.name;
    var img=event.currentTarget.dataset.img;
    var songId=event.currentTarget.dataset.songid;
    var singer=event.currentTarget.dataset.singer;
    var second=event.currentTarget.dataset.second;
    wx.playBackgroundAudio({
      dataUrl: src,
      title: name,
      coverImgUrl: img,
    })
    var temMusicInfor={
      dataUrl: src,
      title: name,
      coverImgUrl: img,
      songId:songId.toString(),
      singer:singer,
      second:second
    }
    wx.setStorageSync('music',temMusicInfor)
    wx.switchTab({
      url: "../play/play?name="
    })
  },
  onHotTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.rege,"",this.callback);
  },
  onHkTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.gangtai,"",this.callback);
  },
  onMyTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.minyao,"",this.callback);
  },
  onRockTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.yaogun,"",this.callback);
  },
  onSaleTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.xiaoliang,"",this.callback);
  },
  onOumeiTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.oumei,"",this.callback);
  },
  onNeidiTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.neidi,"",this.callback);
  },
  onHanguoTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.hanguo,"",this.callback);
  },
  onRibenTap: function () {
    wx.showNavigationBarLoading();
    app.http(url, appid, secret, topid.riben,"",this.callback);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})