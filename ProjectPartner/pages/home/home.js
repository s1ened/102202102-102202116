Page({
  data: {
    backgroundUrl: '' // 用于存储从云端获取的背景图片 URL
  },

  onLoad() {
    // 下载云存储中的背景图片
    wx.cloud.downloadFile({
      fileID: 'cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/background7.jpg', // 你的背景图片 file ID
      success: res => {
        this.setData({
          backgroundUrl: res.tempFilePath // 将下载的图片路径设置到 data
        });
      },
      fail: err => {
        console.error('背景图片下载失败:', err);
      }
    });
  },

  navigateToProjects: function () {
    wx.navigateTo({
      url: '../projects/projects'
    });
  },
  navigateToChat: function () {
    wx.navigateTo({
      url: '../chatList/chatList'
    });
  },
  navigateToProfile: function () {
    wx.navigateTo({
      url: '../profile/profile'
    });
  }
});
