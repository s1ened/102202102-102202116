Page({
  data: {
    backgroundUrl: '' // 用于存放云存储的背景图片 URL
  },

  onLoad: function () {
    this.loadBackgroundImage(); // 页面加载时获取背景图片
  },

  // 获取云存储中的背景图片
  loadBackgroundImage: function () {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/background.jpg'],
      success: res => {
        // 将获取到的图片 URL 设置到 data 中
        this.setData({
          backgroundUrl: res.fileList[0].tempFileURL
        });
      },
      fail: err => {
        console.error('获取背景图片失败:', err);
      }
    });
  },

  navigateToLogin: function () {
    console.log('登录按钮被点击');
    wx.navigateTo({
      url: '../login/login' // 确保路径正确
    });
  },

  navigateToRegister: function () {
    console.log('注册按钮被点击');
    wx.navigateTo({
      url: '../register/register' // 确保路径正确
    });
  },

  navigateToChangePassword: function () {
    console.log('更改密码按钮被点击');
    wx.navigateTo({
      url: '../changePassword/changePassword' // 确保路径正确
    });
  }
});
