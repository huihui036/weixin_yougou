// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftmenulist: [],
    rigthmaindata: [],
    setmeuindex: 0,
    scrollTop: 0
  },
  cater: [],
  getcategories() {
    console.log('1')
    request({ url: '/categories' }).then(res => {
      console.log(res)
      this.cater = res.data.message
      let seroncates = wx.setStorageSync('seroncates', {
        datas: this.cater,
        time: Date.now()
      })
      let leftmenulist = this.cater.map(v => v.cat_name)
      let rigthmaindata = this.cater[0].children
      this.setData({
        leftmenulist,
        rigthmaindata
      })
    })
  },
  tapNamegorup: function(e) {
    let setid = e.currentTarget.dataset.index
    let rigthmaindata = this.cater[setid].children
    this.setData({
      setmeuindex: setid,
      rigthmaindata,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getcategories()
    let seroncates = wx.getStorageSync('seroncates')
    console.log(seroncates)
    if (!seroncates) {
      this.getcategories()
    } else {
      if (Date.now() - seroncates.time > 1000 * 5) {
        this.cater = seroncates.datas
        let leftmenulist = this.cater.map(v => v.cat_name)
        let rigthmaindata = this.cater[0].children
        this.setData({
          leftmenulist,
          rigthmaindata
        })
      }
    }
  },

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
