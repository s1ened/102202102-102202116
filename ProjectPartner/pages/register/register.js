// pages/register/register.js
Page({
  data: {
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
    const { nickname, account, major, bio, password } = this.data; // 添加 password

    // 检查必填字段是否为空
    if (!nickname || !password || !account || !major || !bio) {
      wx.showToast({
        title: '请填写所有信息',
        icon: 'none'
      });
      return;
    }

    // 检查账号是否已存在
    const db = wx.cloud.database();
    db.collection('users').where({
      account: account // 根据账号查询
    }).get().then(res => {
      if (res.data.length > 0) {
        // 账号已存在
        wx.showToast({
          title: '该账号已被注册，请更换账号',
          icon: 'none'
        });
      } else {
        // 账号不存在，进行注册
        return db.collection('users').add({
          data: {
            nickname,
            account,
            major,
            bio,
            password // 确保将密码存储到数据库中
          }
        });
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
        title: '该账号已被注册，请更换账号',
        icon: 'none'
      });
    });
  }
});
