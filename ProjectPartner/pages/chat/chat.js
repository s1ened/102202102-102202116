Page({
  data: {
    friendNickname: '',
    messages: [],
    newMessage: ''
  },

  onLoad: function(options) {
    const friendId = options.id;
    // 根据 friendId 获取好友昵称和其他信息
    this.setData({
      friendNickname: '同学A' // 这里可以根据好友ID获取昵称
    });
  },

  onInput: function(e) {
    this.setData({
      newMessage: e.detail.value
    });
  },

  sendMessage: function() {
    if (!this.data.newMessage) return;

    const newMessage = {
      id: Date.now(),
      text: this.data.newMessage,
      avatar: '/images/my-avatar.png',
      isMine: true
    };

    this.setData({
      messages: [...this.data.messages, newMessage],
      newMessage: ''
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
});
