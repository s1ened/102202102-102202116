// pages/login/login.js
Page({
  data: {
    account: '', // 修改为 account
    password: ''
  },

  handleUsernameInput(e) {
    this.setData({ account: e.detail.value }); // 修改为 account
  },

  handlePasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  // 登录功能
  handleLogin() {
    const db = wx.cloud.database();
    const { account, password } = this.data; // 修改为 account

    db.collection('users').where({
      account: account, // 使用 account 字段
      password: password // 实际项目中应对密码进行加密验证
    }).get({
      success: res => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          wx.redirectTo({
            url: '/pages/home/home', // 登录成功后跳转主页
          });
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  }
});
