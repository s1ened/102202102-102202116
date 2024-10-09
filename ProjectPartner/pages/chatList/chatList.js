Page({
  data: {
    friends: [
      { id: 1, avatar: '/images/avatar1.png', nickname: '同学A', lastMessage: '你好，今天怎么样？' },
      { id: 2, avatar: '/images/avatar2.png', nickname: '同学A', lastMessage: '明天见！' },
      // 添加更多好友数据...
    ]
  },

  openChat: function(e) {
    const friendId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/chat/chat?id=${friendId}` // 跳转到对应好友的聊天页面
    });
  }
});
