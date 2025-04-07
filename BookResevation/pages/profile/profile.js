const app = getApp();

Page({
  data: {
    userInfo: null,
    qrCodeUrl: ''
  },

  onLoad() {
    // 获取用户信息
    this.getUserInfo();
    // 获取用户二维码
    this.getQRCode();
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    } else {
      // 如果未登录，获取用户信息
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const userInfo = res.userInfo;
          wx.setStorageSync('userInfo', userInfo);
          this.setData({
            userInfo: userInfo
          });
        },
        fail: (err) => {
          console.error('获取用户信息失败：', err);
        }
      });
    }
  },

  getQRCode() {
    // 这里应该调用后端API获取用户二维码
    // 临时使用占位图
    this.setData({
      qrCodeUrl: '/assets/qr-placeholder.png'
    });
  },

  navigateTo(e) {
    const page = e.currentTarget.dataset.page;
    if (page === 'address' || page === 'settings') {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/${page}/${page}`
    });
  },

  saveQRCode() {
    wx.showToast({
      title: '二维码已保存',
      icon: 'success'
    });
  },

  goBack() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        // If there's no page to go back to, navigate to the home page
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    });
  }
}); 