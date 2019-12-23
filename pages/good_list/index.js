// pages/good_list/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isAcive: true
      },
      {
        id: 1,
        value: '销量',
        isAcive: false
      },
      {
        id: 2,
        value: '价格',
        isAcive: false
      }
    ],
    goodlist: []
  },
  queryData: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totals: 1,
  getgoodItiem() {
    var that = this
    request({ url: '/goods/search', data: this.queryData }).then(res => {
      console.log(res)

      this.totals = Math.ceil(res.data.message.total / this.queryData.pagesize)

      that.setData({
        goodlist: [...this.data.goodlist, ...res.data.message.goods]
      })
      // 关闭下拉样式
      if (this.data.goodlist) {
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryData.cid = options.cid
    this.getgoodItiem()
  },
  handletabsitemchange(e) {
    //var that = this
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((element, i) => {
      if (i === index) {
        element.isAcive = true
      } else {
        element.isAcive = false
      }
    })
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.totals - this.queryData.pagenum)
    if (this.queryData.pagenum === this.totals) {
      console.log('123')
      wx.showToast({
        title: '数据加载完成'
      })
    } else {
      this.queryData.pagenum++
      this.getgoodItiem()
    }

    console.log('到底了')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      goodlist: []
    })
    this.queryData.pagenum = 1
    this.getgoodItiem()
  },

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
