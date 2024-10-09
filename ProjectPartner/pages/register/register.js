// pages/register/register.js
Page({
  data: {
    avatarUrl: '/images/default_avatar.jpg', // 默认头像
    nickname: '',
    account: '',
    major: '',
    bio: '',
    password: '' // 添加 password 字段
  },

  handleInputChange: function(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: event.detail.value
    });
  },

  submitRegister: function() {
    const { avatarUrl, nickname, account, major, bio, password } = this.data; // 添加 password

    // 检查必填字段是否为空
    if (!nickname || !password || !account || !major || !bio) {
      wx.showToast({
        title: '请填写所有信息',
        icon: 'none'
      });
      return;
    }

    // 存储用户信息到数据库
    const db = wx.cloud.database();
    db.collection('users').add({
      data: {
        avatarUrl,
        nickname,
        account,
        major,
        bio,
        password // 确保将密码存储到数据库中
      }
    }).then(res => {
      // 注册成功，保存用户ID
      wx.setStorageSync('userId', res._id);
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });
      // 可以跳转到个人主页
      wx.navigateTo({
        url: '../login/login'
      });
    }).catch(err => {
      console.error('注册失败:', err);
      wx.showToast({
        title: '注册失败，请重试',
        icon: 'none'
      });
    });
  }
});
