// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsdatels: {}
  },
  GoodsIon: {},

  /**
   * 生命周期函数--监听页面加载
   */

  getgoodsDta(goods_id) {
    request({ url: '/goods/detail', data: { goods_id } }).then(res => {
      console.log(res)
      var goodsdea = res.data.message
      this.GoodsIon = goodsdea
      console.log(goodsdea)
      this.setData({
        goodsdatels: {
          pics: goodsdea.pics,
          goods_price: goodsdea.goods_price,
          goods_name: goodsdea.goods_name,
          goods_introduce: goodsdea.goods_introduce
        }
      })
    })
  },
  onLoad: function(options) {
    const { goods_id } = options
    console.log(goods_id)
    this.getgoodsDta(goods_id)
  },
  delataddgoods() {
    console.log('1')
    let cart = wx.getStorageSync('carts') || []
    let inedx = cart.findIndex(v => v.goods_id === this.GoodsIon.goods_id)
    console.log(inedx)
    if (inedx === -1) {
      this.GoodsIon.num = 1
      this.GoodsIon.cheack = true
      cart.push(this.GoodsIon)
      console.log(this.GoodsIon)
    } else {
      cart[inedx].num++
    }
    wx.setStorageSync('carts', cart)
    wx.showToast({
      title: '添加成功',
      icon: 'success',

      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {}

  /**
   * 生命周期函数--监听页面隐藏
   */
})
