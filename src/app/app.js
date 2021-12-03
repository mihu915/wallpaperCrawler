const randomString = require('random-string')
const schedule = require('node-schedule')
const config = require('./config')

const { sendEmail, send_config } = require('./send-email')
const { wallpaperCrawler } = require('./wallpaperCrawler')
const { becomingHtml, logger } = require('../utils')

const startCrawler = async () => {
  const resolution = config.RESOLUTION || ''
  const ratios = config.RATIOS || ''
  const dirPath = config.DIR_PATH || 'imgData'
  const start_time = Math.round(new Date())
  logger.info('开始抓取壁纸...')
  await wallpaperCrawler({
    page: 1,
    resolution,
    dirPath,
    ratios,
    seed: randomString({ length: 6 })
  }).then(async res => {
    const end_time = Math.round(new Date())

    logger.info(
      `本次共抓取${res.wallData.length}张壁纸，耗时${
        (end_time - start_time) / 1000
      }s`
    )

    if (config.SENDER_EMAIL && config.SENDER_PASS) {
      const html = becomingHtml(res.wallData)
      // send_config.attachments = emailAttachmentMap(dirPath)
      send_config.html = `
      <div>
        <span>本次共抓取${res.wallData.length}张壁纸</span><br/>
        <span>下载方式：点击预览图下方跳转链接，跳转后手动另存为即可</span><br/>
        ${html}
      </div>`

      await sendEmail().then(() => {
        logger.info(`邮件发送成功`)
        // delDir(path.resolve(path.join(__dirname, '..'), dirPath))
        // logger.info('壁纸文件已被清除！')
      })
    }
  })
}

const scheduleCron = cronRule => {
  if (!cronRule) {
    logger.error('未设置定时任务，将自动退出程序')
    return
  }

  logger.info('定时任务已开启...')
  // const rule = new schedule.RecurrenceRule()
  // rule.second = [0, 20, 40, 59] // 秒
  // rule.minute = 0 //分
  // rule.hour = 0 // 时
  // rule.date = 0 // 几号
  // rule.dayOfWeek = 0 // 星期几

  schedule.scheduleJob(cronRule, async () => {
    await startCrawler()
  })
}

module.exports = { startCrawler, scheduleCron }
