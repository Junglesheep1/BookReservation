Page({
  data: {
    currentFilter: 'all',
    hasMore: true,
    transactions: [
      {
        id: 1,
        date: '2024-03-20',
        items: [
          {
            id: 1,
            type: '定金支付',
            amount: 500.00,
            time: '14:30'
          }
        ]
      },
      {
        id: 2,
        date: '2024-03-19',
        items: [
          {
            id: 2,
            type: '定金退款',
            amount: -500.00,
            time: '16:45'
          }
        ]
      }
    ]
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  switchFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    // 根据筛选条件重新加载数据
    this.loadTransactions(filter);
  },

  loadTransactions(filter) {
    // 这里应该调用后端API获取交易记录
    // 临时使用模拟数据
  },

  loadMore() {
    // 加载更多交易记录
    wx.showToast({
      title: '没有更多数据了',
      icon: 'none'
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