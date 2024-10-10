Page({
  data: {
    projects: [], // 存储项目列表
    searchQuery: '', // 存储搜索内容
    isLoading: false, // 加载状态
  },

  onLoad: function () {
    this.getProjects(); // 页面加载时获取项目列表
  },

  // 获取所有项目
  getProjects: function () {
    const db = wx.cloud.database();
    this.setData({ isLoading: true }); // 设置加载状态

    db.collection('projects').get().then(res => {
      console.log('数据库项目:', res.data); // 打印数据库中的项目
      this.setData({
        projects: res.data,
        isLoading: false // 获取项目成功，取消加载状态
      });
    }).catch(err => {
      console.error('获取项目列表失败:', err);
      wx.showToast({
        title: '加载项目列表失败',
        icon: 'none'
      });
      this.setData({ isLoading: false }); // 获取项目失败，取消加载状态
    });
  },

  // 查看单个项目详情
  viewProject: function (event) {
    const projectId = event.currentTarget.dataset.id; // 获取项目 ID
    wx.navigateTo({
      url: `../project/project?id=${projectId}` // 跳转到项目详情页面
    });
  },

  // 处理搜索输入框的值
  handleSearchInput: function (e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  // 搜索项目
  searchProject: function () {
    const db = wx.cloud.database();
    const searchQuery = this.data.searchQuery.trim(); // 去掉空格

    if (!searchQuery) {
      wx.showToast({
        title: '请输入项目名称',
        icon: 'none'
      });
      return;
    }

    this.setData({ isLoading: true }); // 设置加载状态

    // 输出搜索查询的内容
    console.log('搜索项目:', searchQuery);

    // 确保使用项目名称字段作为查询条件（假设字段名为 `projectName`）
    db.collection('projects').where({
      projectName: db.RegExp({
        regexp: searchQuery, // 使用普通匹配
        options: 'i', // 不区分大小写
      })
    }).get().then(res => {
      this.setData({ isLoading: false }); // 取消加载状态

      console.log('搜索结果:', res.data); // 输出搜索结果

      if (res.data.length === 1) {
        // 如果找到一个匹配的项目，直接跳转
        wx.navigateTo({
          url: `../project/project?id=${res.data[0]._id}` // 跳转到项目详情页面
        });
      } else if (res.data.length > 1) {
        // 如果找到多个匹配的项目，更新项目列表
        this.setData({
          projects: res.data // 更新项目列表
        });
      } else {
        wx.showToast({
          title: '未找到该项目',
          icon: 'none'
        });
      }
    }).catch(err => {
      console.error('搜索项目失败:', err);
      wx.showToast({
        title: '搜索失败，请稍后再试',
        icon: 'none'
      });
      this.setData({ isLoading: false }); // 搜索失败，取消加载状态
    });
  },

  // 发起新项目
  navigateToCreateProject: function () {
    wx.navigateTo({
      url: '../createProject/createProject' // 跳转到发起项目页面
    });
  }
});
