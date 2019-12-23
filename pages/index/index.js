import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    imageslist: [],
    CatList: [],
    Floordatalist: []
  },
  getimages() {
    request({ url: '/home/swiperdata' }).then(result => {
      this.setData({
        imageslist: result.data.message
      })
    })
  },
  getcatit() {
    request({ url: '/home/catitems' }).then(result => {
      this.setData({
        CatList: result.data.message
      })
    })
  },
  getfloor() {
    request({ url: '/home/floordata' }).then(datas => {
      this.setData({
        Floordatalist: datas.data.message
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getimages(), this.getcatit(), this.getfloor()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
