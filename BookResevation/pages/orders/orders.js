Page({
  data: {
    currentTab: 'all',
    showQRCode: false,
    currentQRCode: '',
    orders: [
      {
        id: 1,
        orderNumber: '202403200001',
        status: '待支付',
        amount: 500.00,
        time: '2024-03-20 14:30'
      },
      {
        id: 2,
        orderNumber: '202403190002',
        status: '已完成',
        amount: 500.00,
        time: '2024-03-19 16:45'
      }
    ]
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    // 根据tab筛选订单
    this.filterOrders(tab);
  },

  filterOrders(tab) {
    // 实现订单筛选逻辑
  },

  showQRCode(e) {
    const order = e.currentTarget.dataset.order;
    // 这里应该调用后端API获取二维码
    this.setData({
      showQRCode: true,
      currentQRCode: '临时二维码地址'
    });
  },

  hideQRCode() {
    this.setData({
      showQRCode: false
    });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  saveQRCode() {
    wx.showToast({
      title: '二维码已保存',
      icon: 'success'
    });
  },

  cancelOrder(e) {
    const order = e.currentTarget.dataset.order;
    wx.showModal({
      title: '取消订单',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用取消订单API
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          });
        }
      }
    });
  },

  viewDetails(e) {
    const order = e.currentTarget.dataset.order;
    // 跳转到订单详情页
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${order.id}`
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