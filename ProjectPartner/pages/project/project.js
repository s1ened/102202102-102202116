// pages/project/project.js
Page({
  data: {
    project: {}, // 用于存储项目数据
    isLoading: true, // 加载状态
    backgroundUrl: '', // 背景图 URL
  },

  onLoad: function (options) {
    const projectId = options.id; // 获取项目 ID
    this.getProjectDetails(projectId); // 获取项目详情
    this.loadBackgroundImage(); // 加载背景图
  },

  // 获取项目详情并实时更新
  getProjectDetails: function (projectId) {
    const db = wx.cloud.database();

    // 监听实时数据库更新
    const watcher = db.collection('projects').doc(projectId).watch({
      onChange: snapshot => {
        if (snapshot.docs.length > 0) {
          this.setData({
            project: snapshot.docs[0],
            isLoading: false // 数据加载完成
          });
        } else {
          wx.showToast({
            title: '未找到该项目',
            icon: 'none'
          });
        }
      },
      onError: err => {
        console.error('监听项目详情失败:', err);
        wx.showToast({
          title: '项目详情加载失败',
          icon: 'none'
        });
        this.setData({ isLoading: false }); // 取消加载状态
      }
    });

    // 页面卸载时关闭监听
    this.watcher = watcher;
  },

  // 加载背景图
  loadBackgroundImage: function () {
    const backgroundFileId = 'cloud://projectpartner-5ghyuxo33c4f47d1.7072-projectpartner-5ghyuxo33c4f47d1-1330270979/background6.jpg';
    
    wx.cloud.downloadFile({
      fileID: backgroundFileId,
      success: res => {
        this.setData({
          backgroundUrl: res.tempFilePath // 将下载的背景图路径设置到 data
        });
      },
      fail: err => {
        console.error('背景图下载失败:', err);
      }
    });
  },

  onUnload: function () {
    if (this.watcher) {
      this.watcher.close(); // 关闭监听
    }
  }
});
