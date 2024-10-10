// pages/chat/chat.js
Page({
  data: {
    friendId: '', // 好友ID
    friendNickname: '',
    messages: [],
    newMessage: ''
  },

  onLoad: function(options) {
    const friendId = options.id; // 获取好友ID
    this.setData({ friendId }); // 保存好友ID

    // 根据 friendId 获取好友昵称和聊天记录
    this.getFriendInfo(friendId);
    this.getChatMessages(friendId);
  },

  // 获取好友信息
  getFriendInfo: function(friendId) {
    const db = wx.cloud.database();

    db.collection('users').doc(friendId).get().then(res => {
      if (res.data) {
        this.setData({
          friendNickname: res.data.nickname // 获取好友昵称
        });
      } else {
        console.log('未找到好友信息');
      }
    }).catch(err => {
      console.error('获取好友信息失败:', err);
    });
  },

  // 获取聊天记录
  getChatMessages: function(friendId) {
    const db = wx.cloud.database();
    const userId = wx.getStorageSync('userId'); // 获取当前用户ID

    // 假设聊天记录存储在一个名为 'chatMessages' 的集合中
    db.collection('chatMessages').where({
      users: db.command.in([userId, friendId]) // 查找与好友的聊天记录
    }).get().then(res => {
      this.setData({
        messages: res.data // 设置聊天记录
      });
    }).catch(err => {
      console.error('获取聊天记录失败:', err);
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
      isMine: true,
      friendId: this.data.friendId // 保存好友ID
    };

    // 将新消息添加到聊天记录中
    this.setData({
      messages: [...this.data.messages, newMessage],
      newMessage: ''
    });

    // 将新消息写入数据库
    const db = wx.cloud.database();
    db.collection('chatMessages').add({
      data: {
        text: newMessage.text,
        avatar: newMessage.avatar,
        isMine: newMessage.isMine,
        users: [wx.getStorageSync('userId'), this.data.friendId], // 保存参与聊天的用户
        createdAt: new Date()
      }
    }).then(() => {
      console.log('消息发送成功');
    }).catch(err => {
      console.error('发送消息失败:', err);
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
});
