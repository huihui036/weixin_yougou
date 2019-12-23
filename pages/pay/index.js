// pages/cart/index.js
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
    catcarts: [],
    goodnubers: 0,
    useraddres: {},
    useraddresall: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    let usera = wx.getStorageSync('useraddres')
    console.log(usera)
    this.data.useraddresall = usera.cityName + usera.countyName
    this.setData({
      useraddres: usera
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */

  changecartsafter(catcarts) {
    let num = 0
    let goods_price = 0
    catcarts.forEach(element => {
      num += element.num
      goods_price += element.goods_price * element.num
    })
    wx.setStorageSync('allprice', goods_price)
    this.setData({
      catcarts: catcarts,
      goodnubers: num,
      goodpric: goods_price
    })
  },

  onShow: function() {
    var carst = wx.getStorageSync('carts') || []

    this.changecartsafter(carst)
  },

  // 跳转支付页面
  handelPya_prece() {
    var token = wx.getStorageSync('Authorization')
    if (!token) {
      wx.redirectTo({
        url: '/pages/auth/index'
      })
    } else {
      let Headers = token
      console.log(Headers)
      let consignee_addr = this.data.useraddresall
      let goods = []
      let order_price = wx.getStorageSync('allprice')
      this.data.catcarts.forEach(elem =>
        goods.push({
          goods_price: elem.goods_price,
          goods_id: elem.goods_id,
          goods_number: elem.goods_price
        })
      )
      let orderparmas = { order_price, consignee_addr, goods }
      const res = request({
        url: '/my/orders/create',
        method: 'POST',
        data: orderparmas,
        heaer: Headers
      })
      // 由于没有企业接口 无法真正发送支付 智能随便添加以tonken值，进行模拟
      if (res) {
        wx.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success(res) {
            console(res)
          },
          fail(err) {
            console.log(err)
          }
        })
      }
      // console.log(goods)
      // console.log(order_price)
      // console.log(consignee_addr)
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {}
})
