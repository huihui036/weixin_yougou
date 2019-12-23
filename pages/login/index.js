// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  handlegetuserinfo(e) {
    console.log(e)
    const { userInfo } = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1
    })
  }
})
