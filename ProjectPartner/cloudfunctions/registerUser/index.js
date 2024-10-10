// 云函数：registerUser/index.js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const { username, password, email } = event;
  
  // 检查用户是否已存在
  const userCheck = await db.collection('users').where({
    username: username
  }).get();
  
  if (userCheck.data.length > 0) {
    return {
      code: 400,
      message: '用户已存在'
    };
  }
  
  // 插入用户信息
  try {
    await db.collection('users').add({
      data: {
        username: username,
        password: password,  // 实际开发中应使用加密
        email: email,
        createTime: new Date()
      }
    });
    return {
      code: 200,
      message: '注册成功'
    };
  } catch (error) {
    return {
      code: 500,
      message: '注册失败',
      error: error
    };
  }
};
