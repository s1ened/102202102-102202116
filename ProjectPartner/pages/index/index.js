Page({
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
