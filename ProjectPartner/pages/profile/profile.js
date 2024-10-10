// pages/profile/profile.js
Page({
  data: {
    avatarUrl: '', // 用于存储从云端获取的头像 URL
    nickname: '',  // 昵称
    account: '',   // 账号
    major: '',     // 专业
    bio: '',       // 个人简介
    backgroundUrl: '', // 用于存储从云端获取的背景图片 URL
  },

  onLoad() {
    this.loadImages(); // 加载头像和背景图片
  },

  onShow() {
    this.getUserProfile(); // 在页面显示时获取用户信息
  },

  loadImages() {
    const avatarFileId = 'cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/default_avatar.jpg';
    const backgroundFileId = 'cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/background9.jpg';

    // 下载头像
    wx.cloud.downloadFile({
      fileID: avatarFileId,
      success: res => {
        this.setData({
          avatarUrl: res.tempFilePath // 将下载的头像路径设置到 data
        });
      },
      fail: err => {
        console.error('头像下载失败:', err);
        this.setData({ avatarUrl: '/images/default_avatar.jpg' }); // 使用默认头像
      }
    });

    // 下载背景图片
    wx.cloud.downloadFile({
      fileID: backgroundFileId,
      success: res => {
        this.setData({
          backgroundUrl: res.tempFilePath // 将下载的背景图片路径设置到 data
        });
      },
      fail: err => {
        console.error('背景图片下载失败:', err);
      }
    });
  },

  getUserProfile: function() {
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId'); // 假设你存储了用户ID

    db.collection('users').doc(userId).get().then(res => {
      if (res.data) {
        this.setData({
          avatarUrl: res.data.avatar || this.data.avatarUrl, // 使用最新头像
          nickname: res.data.nickname,
          account: res.data.account,
          major: res.data.major,
          bio: res.data.bio,
        });
      } else {
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
  },

  // 处理好友请求的跳转方法
  goToFriendRequests: function() {
    wx.navigateTo({
      url: '../friendRequests/friendRequests' // 替换为好友请求页面的路径
    });
  },
});
