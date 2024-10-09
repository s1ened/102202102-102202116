// pages/editProfile/editProfile.js
Page({
  data: {
    avatarUrl: '',
    nickname: '',
    account: '',
    major: '',
    bio: '',
  },

  onLoad: function(options) {
    this.setData({
      avatarUrl: options.avatarUrl,
      nickname: options.nickname,
      account: options.account,
      major: options.major,
      bio: options.bio,
    });
  },

  handleInputChange: function(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: event.detail.value
    });
  },

  saveProfile: function() {
    const { avatarUrl, nickname, account, major, bio } = this.data;
    const userId = wx.getStorageSync('userId');
    const db = wx.cloud.database();

    // 确保必填字段不为空
    if (!nickname || !account || !major || !bio) {
      wx.showToast({
        title: '请填写所有信息',
        icon: 'none'
      });
      return;
    }

    // 更新用户信息到数据库
    db.collection('users').doc(userId).update({
      data: {
        avatarUrl,
        nickname,
        account,
        major,
        bio,
      }
    }).then(res => {
      wx.showToast({
        title: '更新成功',
        icon: 'success'
      });
      // 更新成功后返回个人主页
      wx.navigateBack();
    }).catch(err => {
      console.error('更新失败:', err);
      wx.showToast({
        title: '更新失败，请重试',
        icon: 'none'
      });
    });
  }
});
