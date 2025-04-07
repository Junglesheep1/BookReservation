const app = getApp()

Page({
  data: {
    orderId: '',
    deposit: 0,
    createTime: '',
    qrCodeUrl: ''
  },

  onLoad(options) {
    // 生成订单ID
    const orderId = this.generateOrderId()
    const now = new Date()
    
    this.setData({
      orderId,
      deposit: 100, // 默认定金金额，实际应该从配置或参数中获取
      createTime: this.formatDate(now),
      qrCodeUrl: '' // 初始为空，支付后生成
    })
  },

  // 生成订单ID
  generateOrderId() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `ORDER${year}${month}${day}${random}`
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 处理支付
  handlePayment() {
    wx.showLoading({
      title: '正在支付...',
    })

    // 调用微信支付接口
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success: (res) => {
        console.log('支付成功', res)
        this.generateQRCode()
      },
      fail: (err) => {
        console.error('支付失败', err)
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 生成二维码
  generateQRCode() {
    // 这里应该调用后端接口生成二维码
    // 示例中使用一个假的二维码URL
    this.setData({
      qrCodeUrl: 'https://example.com/qr/' + this.data.orderId
    })

    wx.showToast({
      title: '支付成功',
      icon: 'success'
    })
  }
}) 