Page({
  data: {
    searchQuery: '',
    projects: [
      { id: 1, name: '项目A', image: '/images/project1.jpg' },
      { id: 2, name: '项目B', image: '/images/project2.jpg' },
      { id: 3, name: '项目C', image: '/images/project3.jpg' },
      // 添加更多项目数据...
    ]
  },

  onSearchInput: function(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  goToProjectDetail: function(e) {
    const projectId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/project/project?id=${projectId}` // 跳转到对应项目页面
    });
  },

  goToMyProjects: function() {
    wx.navigateTo({
      url: '/pages/myProjects/myProjects' // 跳转到我的项目页面
    });
  }
});
