// pages/otherUserProfile/otherUserProfile.js
Page({
  data: {
    user: {}, // 其他用户的信息
    isFriend: false, // 是否为好友
    isSelf: false, // 是否为自己
  },

  onLoad: function (options) {
    const otherUserId = options.id; // 从页面传递过来的用户ID
    const currentUserId = wx.getStorageSync('userId'); // 获取当前用户的ID

    // 判断是否是自己的主页
    if (otherUserId === currentUserId) {
      this.setData({
        isSelf: true
      });
    }

    this.getUserProfile(otherUserId, currentUserId);
  },

  // 获取其他用户的个人信息
  getUserProfile: function (otherUserId, currentUserId) {
    const db = wx.cloud.database();
    const _ = db.command;

    db.collection('users').doc(otherUserId).get().then(res => {
      const userData = res.data;
      this.setData({
        user: userData
      });

      // 判断是否已经是好友
      if (userData.friends && userData.friends.includes(currentUserId)) {
        this.setData({
          isFriend: true
        });
      }
    }).catch(err => {
      console.error('获取用户信息失败:', err);
      wx.showToast({
        title: '加载用户信息失败',
        icon: 'none'
      });
    });
  },

  // 发送好友请求
  sendFriendRequest: function () {
    const db = wx.cloud.database();
    const currentUserId = wx.getStorageSync('userId'); // 获取当前用户ID
    const otherUserId = this.data.user._id; // 获取当前查看的用户ID

    // 1. 将请求添加到对方的 friendRequests 字段
    db.collection('users').doc(otherUserId).update({
      data: {
        friendRequests: db.command.push(currentUserId)
      }
    }).then(() => {
      wx.showToast({
        title: '好友请求已发送',
        icon: 'success'
      });

      // 2. 在当前用户的 sentRequests 字段中添加记录
      return db.collection('users').doc(currentUserId).update({
        data: {
          sentRequests: db.command.push(otherUserId)
        }
      });
    }).catch(err => {
      console.error('发送好友请求失败:', err);
      wx.showToast({
        title: '发送好友请求失败，请稍后再试',
        icon: 'none'
      });
    });
  }
});
