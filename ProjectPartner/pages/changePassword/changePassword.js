// pages/changePassword/changePassword.js
Page({
  data: {
    account: '',
    oldPassword: '',
    newPassword: ''
  },

  onInputAccount(event) {
    this.setData({
      account: event.detail.value
    });
  },

  onInputOldPassword(event) {
    this.setData({
      oldPassword: event.detail.value
    });
  },

  onInputNewPassword(event) {
    this.setData({
      newPassword: event.detail.value
    });
  },

  changePassword() {
    const { account, oldPassword, newPassword } = this.data;

    if (!account || !oldPassword || !newPassword) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }

    const db = wx.cloud.database();
    const usersCollection = db.collection('users');

    // 验证账号和旧密码
    usersCollection.where({
      username: account, // 假设用户名字段为 username
      password: oldPassword // 假设这里是正确的密码字段
    }).get().then(res => {
      if (res.data.length > 0) {
        // 旧密码正确，更新新密码
        return usersCollection.doc(res.data[0]._id).update({
          data: {
            password: newPassword // 更新密码字段
          }
        });
      } else {
        wx.showToast({
          title: '账号或旧密码错误',
          icon: 'none'
        });
        throw new Error('账号或旧密码错误');
      }
    }).then(() => {
      wx.showToast({
        title: '密码更改成功',
        icon: 'success'
      });
      // 可选择重定向到某个页面，比如登录页面
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '密码更改失败',
        icon: 'none'
      });
    });
  }
});
