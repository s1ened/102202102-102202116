// pages/profile/profile.js
Page({
  data: {
    avatarUrl: '/images/default_avatar.jpg', // 默认头像
    nickname: '',  // 昵称
    account: '',  // 账号
    major: '',  // 专业
    bio: '',  // 个人简介
  },

  onShow: function() {
    this.getUserProfile(); // 在页面显示时获取用户信息
  },

  getUserProfile: function() {
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId'); // 假设你存储了用户ID

    db.collection('users').doc(userId).get().then(res => {
      if (res.data) {
        this.setData({
          avatarUrl: res.data.avatarUrl,
          nickname: res.data.nickname,
          account: res.data.account,
          major: res.data.major,
          bio: res.data.bio,
        });
      }else {
        console.log('未找到用户信息');
      }
    }).catch(err => {
      console.error('获取用户信息失败:', err);
    });
  },

  editProfile: function() {
    const { avatarUrl, nickname, account, major, bio } = this.data;
    wx.navigateTo({
      url: `../editProfile/editProfile?avatarUrl=${avatarUrl}&nickname=${nickname}&account=${account}&major=${major}&bio=${bio}`
    });
  }
});
