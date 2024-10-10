// pages/createProject/createProject.js
Page({
  data: {
    projectName: '',
    projectDescription: '',
    projectInitiator: '',
    projectMembers: '',
    projectImage: ''
  },

  handleInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        this.setData({
          projectImage: res.tempFilePaths[0]
        });
      }
    });
  },

  // 提交项目
  submitProject() {
    const { projectName, projectDescription, projectInitiator, projectMembers, projectImage } = this.data;
    if (!projectName || !projectDescription || !projectInitiator || !projectMembers || !projectImage) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 上传图片并保存项目信息到数据库
    wx.cloud.uploadFile({
      cloudPath: `projects/${Date.now()}-${Math.random()}.png`,
      filePath: projectImage,
      success: res => {
        const db = wx.cloud.database();
        db.collection('projects').add({
          data: {
            projectName,
            projectDescription,
            projectInitiator,
            projectMembers,
            projectImage: res.fileID,
            createTime: new Date()
          }
        }).then(addRes => {
          wx.showToast({
            title: '项目发布成功',
            icon: 'success'
          });
          
          // 跳转到新项目详情页面
          wx.navigateTo({
            url: `../project/project?id=${addRes._id}` // 跳转到项目详情页
          });
        }).catch(err => {
          console.error('发布项目失败:', err);
          wx.showToast({
            title: '发布项目失败',
            icon: 'none'
          });
        });
      }
    });
  }
});
