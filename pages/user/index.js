// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handlegetuserinfo(e) {
    console.log(e)
    const { userInfo } = e.detail
    wx.setStorageSync('userInfo', userInfo)
    this.getusrdatainfo()
  },
  getusrdatainfo() {
    let userinfo = wx.getStorageSync('userInfo')
    console.log(userinfo)
    this.setData({
      userinfo: userinfo
    })
  },
  onLoad: function(options) {
    this.getusrdatainfo()
  }
})
