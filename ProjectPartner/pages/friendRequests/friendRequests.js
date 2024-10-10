// pages/friendRequests/friendRequests.js
Page({
  data: {
    friendRequests: [] // 存储好友请求列表
  },

  onLoad() {
    this.getFriendRequests();
  },

  getFriendRequests: function() {
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId'); // 获取当前用户ID

    db.collection('users').doc(userId).get().then(res => {
      if (res.data) {
        console.log('好友请求数据:', res.data.friendRequests); // 日志调试
        this.setData({
          friendRequests: res.data.friendRequests || [] // 获取好友请求
        });
      } else {
        console.log('未找到用户信息');
      }
    }).catch(err => {
      console.error('获取好友请求失败:', err);
    });
  },

  acceptRequest: function(e) {
    const requestAccount = e.currentTarget.dataset.account; // 获取请求者账号
    // 处理接受请求的逻辑，例如更新数据库...
  },

  rejectRequest: function(e) {
    const requestAccount = e.currentTarget.dataset.account; // 获取请求者账号
    // 处理拒绝请求的逻辑，例如更新数据库...
  }
});
