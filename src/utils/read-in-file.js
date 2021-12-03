const asyncFn = require('async')
const Bagpipe = require('bagpipe')

const { downloadImg } = require('./download-img')

const readInImg = (wallData, dirPath) => {
  const bagpipe = new Bagpipe(5)
  let count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < wallData.length; i++) {
      bagpipe.push(
        downloadImg,
        dirPath,
        wallData[i].downloadUrl,
        wallData[i].name,
        (err, data) => {
          count++
          console.log(`已写入${count}张`)
          if (count === wallData.length) resolve()
        }
      )
    }
  })
}

const saveImg = (wallData, dirPath) => {
  let index = 0
  return new Promise((resolve, reject) => {
    // 开始按顺序写入文件流
    asyncFn.mapSeries(
      wallData,
      (item, callback) => {
        setTimeout(async () => {
          index++
          await downloadImg(dirPath, item.downloadUrl, item.name, index)
          callback(null, item)
        }, 0)
      },
      function (err, results) {
        resolve()
      }
    )
  })
}

module.exports = {
  saveImg,
  readInImg
}
