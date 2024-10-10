// pages/userProfile/userProfile.js
Page({
  data: {
    user: null, // 存储用户信息
    isLoading: true, // 加载状态
  },

  onLoad: function (options) {
    const account = options.account; // 从页面参数中获取账户
    this.getUserProfile(account); // 获取用户信息
  },

  // 从数据库获取用户详细信息
  getUserProfile: function (account) {
    const db = wx.cloud.database();

    db.collection('users').where({
      account: account // 使用 account 查询用户
    }).get().then(res => {
      if (res.data.length > 0) {
        this.setData({
          user: res.data[0], // 将查询到的用户信息设置到数据中
          isLoading: false // 取消加载状态
        });
      } else {
        wx.showToast({
          title: '用户不存在',
          icon: 'none'
        });
        this.setData({ isLoading: false }); // 取消加载状态
      }
    }).catch(err => {
      console.error('获取用户信息失败:', err);
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      });
      this.setData({ isLoading: false }); // 取消加载状态
    });
  },

  // 加好友的功能
  addFriend: function () {
    // 这里可以添加发送好友请求的逻辑
    wx.showToast({
      title: '已发送好友请求',
      icon: 'success'
    });
  }
});
