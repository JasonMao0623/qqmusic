var currentTime = 0;
Page({
  onLoad: function (options) {
    this.setMusicData();
    var that = this;
    clearInterval(this.start);
    that.setData({
      currentTime: "00:00",
      percent: 0,
      isPlaying: false
    })
  },
  onShow: function (options) {
    this.setMusicData();
    this.getTotalTime();
    if (this.data.oldSongId != this.data.songId) {
      clearInterval(this.start);
      currentTime = 0;
      this.start = setInterval(this.getCurrentTime, 1000);
      this.setData({
        isPlaying: true
      })
    };
    wx.createAnimation({
      duration:this.data.totaltime*1000,
      timingFunction: 'linear',
    })
  },
  setMusicData: function () {
    var musicInfor = wx.getStorageSync('music');
    var title = musicInfor.title;
    var index = title.indexOf("(")
    if (index >= 0) {
      title = title.substring(0, index - 1)
    } else {
      title = title;
    }
    this.setData({
      songImg: musicInfor.coverImgUrl,
      singer: musicInfor.coverImgUrl,
      song: title,
      src: musicInfor.dataUrl,
      singer: musicInfor.singer,
      totaltime: musicInfor.second,
      songId: musicInfor.songId,
    })
  },
  getCurrentTime: function () {
    currentTime++;
    var percent = currentTime / this.data.totaltime;
    if (percent >= 1) {
      clearInterval(this.start);
      this.setData({
        currentTime: "00:00",
        percent: 0,
        isPlaying: false
      })
    }
    this.setData({
      percent: percent * 100
    })
    this.processTime(currentTime, this.setCurrentTime);
  },
  getTotalTime: function () {
    this.processTime(this.data.totaltime, this.setTotalTime);
  },
  setCurrentTime: function (time) {
    this.setData({
      currentTime: time,
    })
  },
  setTotalTime: function (time) {
    this.setData({
      totalTime: time
    })
  },
  processTime: function (time, callback) {
    var sec = time % 60;
    var min = parseInt(time / 60);
    if (sec < 10) {
      sec = "0" + sec;
    } else {
      sec = sec;
    };
    if (min < 10) {
      min = "0" + min;
    } else {
      min = min;
    }
    var Time = min + ":" + sec;
    callback(Time);
  },
  onPlayTap: function (event) {
    if (this.data.isPlaying) {
      wx.pauseBackgroundAudio();
      clearInterval(this.start);
      var isPlaying = !this.data.isPlaying;
      this.setData({
        isPlaying: isPlaying
      })
    } else {
      this.start = setInterval(this.getCurrentTime, 1000);
      wx.playBackgroundAudio({
        dataUrl: this.data.src,
      })
      var isPlaying = !this.data.isPlaying;
      this.setData({
        isPlaying: isPlaying
      })
    }
  },
  onLrcTap:function(){
    wx.navigateTo({
      url: 'lrc/lrc',
    })
  },
  onHide: function () {
    var oldSongId = this.data.songId;
    this.setData({
      oldSongId: oldSongId
    })
  },
  data: {
    isPlaying: true,
    currentTime: "00:00",
    totalTime: "00:00",
    percent: 0,
    animationData: {}
  },
})


