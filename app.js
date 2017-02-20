App({
    onLaunch: function () {
        // Do something initial when launch.
    },
    onShow: function () {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {
        console.log(msg)
    },
    globalData: {
        url: "http://route.showapi.com/213-4",
        appid: "30695",
        secret: "8aa12ab5fe134936a39c37b62e74133f",
        topid: {
            oumei:3,
            neidi:5,
            gangtai:6,
            hanguo:16,
            riben:17,
            minyao:18,
            yaogun:19,
            xiaoliang:23,
            rege:26,
        }
    },
    http: function (url,appid,sign,topid,keyword,callback) {
        wx.request({
            url: url,
            data: {
                showapi_appid:appid,
                showapi_sign:sign,
                topid:topid,
                keyword:keyword,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                callback(res.data.showapi_res_body.pagebean);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})