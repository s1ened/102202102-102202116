Page({
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
