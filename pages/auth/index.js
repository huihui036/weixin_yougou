import {
  getSetting,
  chooseAddress,
  openSetting,
  Login
} from '../../utils/promerwx.js'
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginparms: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handleGetUserInfo(e) {
    const { encryptedData, iv, rawData, signature } = e.detail
    Login().then(res => {
      let code = res.code
      // 由于没有企业接口 智能随便添加以恶搞tonken值，进行模拟
      wx.setStorageSync('Authorization', code)

      // wx.navigateBack({
      //   delta: 1
      // })
      wx.redirectTo({
        url: '/pages/pay/index'
      })

      this.data.loginparms = { encryptedData, iv, rawData, signature, code }
      //console.log(this.data.loginparms)
      const postres = request({
        url: '/users/wxlogin',
        data: this.data.loginparms,
        method: 'post'
      })
    })
    //console.log(encryptedData, iv, rawData, signature)
  },
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
