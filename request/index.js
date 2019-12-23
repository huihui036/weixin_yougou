let ajaxtimes = 0
export const request = parms => {
  ajaxtimes++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  var BaseUrl = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((resole, errject) => {
    wx.request({
      ...parms,
      url: BaseUrl + parms.url,

      success: result => {
        resole(result)
      },
      fail: err => {
        errject(err)
      },
      complete: () => {
        ajaxtimes--
        if (ajaxtimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}
