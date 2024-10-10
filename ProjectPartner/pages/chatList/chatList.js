// pages/chatList/chatList.js
Page({
  data: {
    friends: [], // 存储好友列表
    searchQuery: '', // 存储搜索内容
    isLoading: false, // 加载状态
  },

  onLoad: function () {
    this.getFriends(); // 页面加载时获取好友列表
  },

  // 获取好友列表
  getFriends: function () {
    const db = wx.cloud.database();
    this.setData({ isLoading: true }); // 设置加载状态

    // 假设我们有一个获取当前用户好友的逻辑
    const currentUserAccount = 'currentUserAccount'; // 当前用户的账户
    db.collection('users').where({
      // 这里可以根据好友关系来查询
    }).get().then(res => {
      this.setData({
        friends: res.data,
        isLoading: false // 获取好友成功，取消加载状态
      });
    }).catch(err => {
      console.error('获取好友列表失败:', err);
      wx.showToast({
        title: '加载好友列表失败',
        icon: 'none'
      });
      this.setData({ isLoading: false }); // 获取好友失败，取消加载状态
    });
  },

  // 处理搜索输入框的值
  handleSearchInput: function (e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  // 搜索好友
  searchFriend: function () {
    const db = wx.cloud.database();
    const searchQuery = this.data.searchQuery.trim(); // 去掉空格

    if (!searchQuery) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    this.setData({ isLoading: true }); // 设置加载状态

    // 输出搜索查询的内容
    console.log('搜索好友:', searchQuery);

    db.collection('users').where({
      nickname: db.RegExp({
        regexp: searchQuery,
        options: 'i', // 不区分大小写
      })
    }).get().then(res => {
      this.setData({ isLoading: false }); // 取消加载状态

      console.log('搜索结果:', res.data); // 输出搜索结果

      if (res.data.length === 1) {
        // 如果找到一个匹配的用户，跳转到用户个人主页
        wx.navigateTo({
          url: `../userProfile/userProfile?account=${res.data[0].account}` // 使用account跳转
        });
      } else if (res.data.length > 1) {
        // 如果找到多个匹配的用户，更新好友列表
        this.setData({
          friends: res.data // 更新好友列表
        });
      } else {
        wx.showToast({
          title: '未找到该用户',
          icon: 'none'
        });
      }
    }).catch(err => {
      console.error('搜索好友失败:', err);
      wx.showToast({
        title: '搜索失败，请稍后再试',
        icon: 'none'
      });
      this.setData({ isLoading: false }); // 搜索失败，取消加载状态
    });
  },

  // 打开聊天界面
  openChat: function (e) {
    const friendAccount = e.currentTarget.dataset.account; // 获取好友账户
    wx.navigateTo({
      url: `/pages/chat/chat?account=${friendAccount}` // 跳转到对应好友的聊天页面
    });
  }
});
