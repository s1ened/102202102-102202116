// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化云开发
    wx.cloud.init({
      env: 'projectpartner-5ghyuxo33c4f47d1', // 使用你的云开发环境 ID
      traceUser: true // 可选，是否追踪用户
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
  },
  globalData: {
    userInfo: null
  }
});
