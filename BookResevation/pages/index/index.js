// index.js
const app = getApp()

Page({
  data: {
    deposit: '',
    orders: [],
    transactions: [
      {
        id: 1,
        type: '定金支付',
        amount: 500.00,
        time: '2024-03-20 14:30'
      },
      {
        id: 2,
        type: '定金退款',
        amount: -500.00,
        time: '2024-03-19 16:45'
      }
    ]
  },

  onLoad() {
    // 页面加载时获取最近交易记录
    this.getRecentTransactions();
  },

  onDepositInput(e) {
    this.setData({
      deposit: e.detail.value
    })
  },

  createOrder() {
    const deposit = parseFloat(this.data.deposit)
    
    if (!deposit || deposit <= 0) {
      wx.showToast({
        title: '请输入有效金额',
        icon: 'none'
      })
      return
    }

    // 跳转到订单页面
    wx.navigateTo({
      url: `/pages/order/order?deposit=${deposit}`
    })
  },

  goToOrderDetail(e) {
    const order = e.currentTarget.dataset.order
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${order.orderId}`
    })
  },

  onShow() {
    // 每次显示页面时刷新订单列表
    const orders = wx.getStorageSync('orders') || []
    this.setData({ orders })
  },

  navigateTo(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/${page}/${page}`
    });
  },

  scanPayment() {
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果：', res);
        // 处理扫码支付逻辑
        wx.navigateTo({
          url: `/pages/payment/payment?code=${res.result}`
        });
      },
      fail: (error) => {
        console.error('扫码失败：', error);
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        });
      }
    });
  },

  showQRCode() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  getRecentTransactions() {
    // 这里应该调用后端API获取最近交易记录
    // 目前使用模拟数据
  }
})
