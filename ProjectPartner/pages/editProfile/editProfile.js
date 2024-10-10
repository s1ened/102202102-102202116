// pages/editProfile/editProfile.js
Page({
  data: {
    avatarUrl: '',
    nickname: '',
    account: '',
    major: '',
    bio: ''
  },

  onLoad: function(options) {
    this.setData({
      avatarUrl: options.avatarUrl,
      nickname: options.nickname,
      account: options.account,
      major: options.major,
      bio: options.bio
    });
  },

  changeAvatar: function() {
    // 选择头像的逻辑
    wx.chooseImage({
      count: 1,
      success: res => {
        const filePath = res.tempFilePaths[0];
        
        // 上传头像到云存储
        const cloudPath = `avatars/${Date.now()}_${Math.random().toString(36).slice(2)}.png`;
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath,
          success: uploadRes => {
            // 获取上传后的文件 ID
            const fileID = uploadRes.fileID;

            // 更新用户头像 URL
            this.updateUserProfile(fileID);
          },
          fail: err => {
            console.error('头像上传失败:', err);
          }
        });
      }
    });
  },

  updateUserProfile: function(fileID) {
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId');

    // 更新用户信息
    db.collection('users').doc(userId).update({
      data: {
        avatar: fileID // 更新头像字段
      },
      success: res => {
        console.log('用户信息更新成功:', res);
        // 更新本地头像 URL
        this.setData({
          avatarUrl: fileID
        });
      },
      fail: err => {
        console.error('更新用户信息失败:', err);
      }
    });
  },

  handleInputChange: function(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  saveProfile: function() {
    // 此处可以保存其他字段
    const { nickname, account, major, bio } = this.data;
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId');

    db.collection('users').doc(userId).update({
      data: {
        nickname,
        account,
        major,
        bio
      },
      success: res => {
        console.log('用户信息更新成功:', res);
        wx.navigateBack(); // 返回到个人资料页
      },
      fail: err => {
        console.error('更新用户信息失败:', err);
      }
    });
  }
});
