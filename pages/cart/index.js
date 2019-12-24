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
    useraddres: {},
    startX: 0,
    startY: 0
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
  // 商品全选
  changechekall() {
    let { catcarts } = this.data
    catcarts.forEach((v, i) => {
      v.cheack = true
      console.log(v.cheack)
      wx.setStorageSync('carts', catcarts)
      this.changecartsafter(catcarts)
    })
  },
  // 选中单个商品
  changechek(e) {
    console.log(e)
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id)
    let { catcarts } = this.data
    let cartindex = catcarts.findIndex(items => items.goods_id === goods_id)
    catcarts[cartindex].cheack = !catcarts[cartindex].cheack
    wx.setStorageSync('carts', catcarts)
    this.changecartsafter(catcarts)
  },
  // 删除商品
  //滑动弧度
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
  },
  // 第一次接触到屏幕的 X Y
  touchstart(e) {
    const { catcarts } = this.data
    catcarts.forEach(element => {
      if (element.isTouchMove) element.isTouchMove = false
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  //用户滑动屏幕
  touchmove(e) {
    //console.log(e)
    var that = this,
      goods_id = e.currentTarget.dataset.id,
      cartindex = that.data.catcarts.findIndex(
        items => items.goods_id === goods_id
      ),
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      angle = that.angle(
        { X: startX, Y: startY },
        { X: touchMoveX, Y: touchMoveY }
      )
    that.data.catcarts.forEach((v, i) => {
      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return console.log('dayu30')
      if (i == cartindex) {
        //右滑
        if (touchMoveX > startX) {
          v.isTouchMove = false
          // console.log('右边')
        } else {
          // 左滑
          v.isTouchMove = true
        }
      }
    })
    //wx.setStorageSync('carts', that.data.catcarts)
    this.changecartsafter(that.data.catcarts)
    //console.log(cartindex, touchMoveX, touchMoveY, Math.abs(angle))
  },
  // 用户点击了删除按钮
  deletegoods(e) {
    var that = this
    console.log(e)
    let goods_id = e.currentTarget.dataset.id
    let cartindex = this.data.catcarts.findIndex(
      items => items.goods_id === goods_id
    )
    wx.showModal({
      title: '提示',
      content: '确定删除这个商品吗？',
      success(res) {
        if (res.confirm) {
          that.data.catcarts.splice(cartindex, 1)
          wx.setStorageSync('carts', that.data.catcarts)
          that.changecartsafter(that.data.catcarts)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 跳转支付页面
  handelPya() {
    let { useraddres } = this.data
    let { goodnubers } = this.data
    let { catcarts } = this.data
    if (!useraddres.userName) {
      wx.showToast({
        title: '没有地址，请添加收获地址',
        icon: 'none',
        mask: true
      })
      return
    }
    if (catcarts.length === 0) {
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
    if (goodnubers === 0) {
      wx.showModal({
        title: '提示',
        content: '你勾选你要购买的商品',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
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
