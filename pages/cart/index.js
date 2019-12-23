// pages/cart/index.js
import { getSetting, chooseAddress, openSetting } from '../../utils/promerwx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    catcarts: [],
    cheackall: false,
    goodnubers: 0,
    useraddres: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getaaddres() {
    chooseAddress().then(
      res2 => {
        this.setData({
          useraddres: res2
        })
        wx.setStorageSync('useraddres', res2)
      },
      err => {
        console.log(err)
      }
    )
  },

  getserAdres() {
    try {
      getSetting().then(res => {
        var getstedatas = res.authSetting['scope.address']
        if (getstedatas == true || getstedatas == undefined) {
          this.getaaddres()
        } else {
          openSetting().then(resg => {
            this.getaaddres()
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */

  changecartsafter(catcarts) {
    const cheackall = catcarts.length ? catcarts.every(v => v.cheack) : false
    let goodnubers = 0
    let goodpric = 0
    catcarts.forEach(element => {
      if (element.cheack) {
        goodnubers += element.num
        goodpric += element.goods_price * element.num
      }
    })
    this.setData({
      catcarts: catcarts,
      cheackall: cheackall,
      goodnubers: goodnubers,
      goodpric: goodpric
    })
  },
  // 商品数量减
  reducegoodsnumer(e) {
    const goods_id = e.currentTarget.dataset.id
    let { catcarts } = this.data
    let cartindex = catcarts.findIndex(items => items.goods_id === goods_id)
    console.log(cartindex)
    console.log(catcarts[cartindex].num)
    catcarts[cartindex].num--
    if (catcarts[cartindex].num < 1) {
      catcarts[cartindex].num = 1
      return wx.showToast({
        title: '商品数不能小于',
        icon: 'loading',
        mask: true
      })
    }
    console.log(catcarts[cartindex].num)
    wx.setStorageSync('carts', catcarts)
    this.changecartsafter(catcarts)
  },
  // 商品数量增
  addgoodsnumer(e) {
    const goods_id = e.currentTarget.dataset.id
    let { catcarts } = this.data
    let cartindex = catcarts.findIndex(items => items.goods_id === goods_id)
    console.log(cartindex)
    console.log(catcarts[cartindex].num)
    catcarts[cartindex].num++
    wx.setStorageSync('carts', catcarts)
    this.changecartsafter(catcarts)
  },

  onShow: function() {
    var carst = wx.getStorageSync('carts') || []

    this.changecartsafter(carst)
  },
  changechekall() {
    let { catcarts } = this.data
    catcarts.forEach((v, i) => {
      v.cheack = true
      console.log(v.cheack)
      wx.setStorageSync('carts', catcarts)
      this.changecartsafter(catcarts)
    })
  },
  changechek(e) {
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id)
    let { catcarts } = this.data
    let cartindex = catcarts.findIndex(items => items.goods_id === goods_id)
    catcarts[cartindex].cheack = !catcarts[cartindex].cheack
    wx.setStorageSync('carts', catcarts)
    this.changecartsafter(catcarts)
  },
  // 跳转支付页面
  handelPya() {
    let { useraddres } = this.data
    let { goodnubers } = this.data
    if (!useraddres.userName) {
      wx.showToast({
        title: '没有地址，请添加收获地址',
        icon: 'none',
        mask: true
      })
      return
    }
    if (goodnubers === 0) {
      wx.showModal({
        title: '提示',
        content: '购物车中还没商品，去首页看看吧',
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.redirectTo({
      url: '/pages/pay/index'
    })
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
