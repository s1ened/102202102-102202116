// pages/login/login.js
Page({
  data: {
    account: '', // 修改为 account
    password: '',
    backgroundUrl: '' // 用于存储从云端获取的背景图片 URL
  },

  onLoad() {
    // 下载云存储中的背景图片
    wx.cloud.downloadFile({
      fileID: 'cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/background1.jpg', // 你的图片 file ID
      success: res => {
        this.setData({
          backgroundUrl: res.tempFilePath // 将下载的图片路径设置到 data
        });
      },
      fail: err => {
        console.error('图片下载失败:', err);
      }
    });
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

    // 检查账号和密码是否为空
    if (!account || !password) {
      wx.showToast({
        title: '请填写账号和密码',
        icon: 'none'
      });
      return; // 如果为空，则终止执行
    }

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
