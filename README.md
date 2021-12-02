# 壁纸爬虫

### 1.概述：
> 自动爬取壁纸并定时发送至你的邮箱。
> 

### 2.如何使用：
> 1.cd到项目目录执行命令` npm install `   
> 2.在项目根目录下新建名称为.env的文件   
> 3.打开.env文件进行配置

### 3.如何配置：
> 你需要在.env文件中以键值对的形式编写配置；   
> 例如：
``` 
SENDER_EMAIL=xxxxxxx@qq.com
SENDER_PASS=123456789abcd
SENDER_HOST=smtp.qq.com
SENDER_NAME=通知
RECIPIENT_EMAIL=xxxxxxx@163.com
EMAIL_SUBJECT=今日壁纸抓取结果
RECURRENCE_RULE=0 0 9 * * * 
RESOLUTION=1920x1080
DIR_PATH=imgData
```
### 4.配置属性说明：
> SENDER_EMAIL：发送方邮件地址    
> SENDER_PASS：发送方邮件授权码，即IMAP/SMTP服务授权码，需登录至邮箱官网自行开启该服务，开启后自动生成该密码；
> SENDER_EMAIL与SENDER_PASS若有其中一个没有设置，则不开启邮件模式，文件存入本地后不会被删除。若邮箱配置均设置，则开启邮件发送模式，邮件发送完毕后将自动删除本地文件。   
> SENDER_HOST：发送邮件服务器；qq邮箱为smtp.qq.com；163邮箱为smtp.163.com    
> SENDER_NAME：发送者名称    
> RECIPIENT_EMAIL：接收方邮箱    
> EMAIL_SUBJECT=：邮件标题    
> RECURRENCE_RULE：定时任务规则    
> RESOLUTION：分辨率；pc端可填1920x1080 移动端可填1242x2688；默认为1920x1080   
> DIR_PATH：文件存储目录：默认存储至src/imgData下   

### 5.开启定时任务：
> 在项目根目录下执行命令：` npm start `；将会根据配置中定时任务规则定时执行。       

### 6.直接运行：
> ` npm run send ` 将直接执行爬虫任务

### 6.如何配置定时任务规则：
> 该项目使用的是 Cron 风格的定时器：  
```  
*     *     *    *     *     *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

6个占位符分别表示 ：秒 分 时 日 月 周几

> ` * ` 表示通配符，匹配该域的任意值，假如在 Minutes 域使用 * 表示每分钟都会触发事件    
> ` ? ` 只能用在 DayofMonth 和 DayofWeek 两个域，它也匹配域的任意值，但实际不会。因为DayofMonth和DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用 * 表示不管星期几都会触发，实际上并不是这样。    
> ` - ` 表示范围，例如 在 Minutes 域使用 5-20，表示从5分到20分钟每分钟触发一次    
> ` / ` 表示起始时间开始触发，然后每隔固定时间触发一次，如在 Minutes 域使用 5/20 表示第5分钟触发一次，随后每隔20分钟出发一次，也就是在25分、45分各触发一次。     
> ` , ` 表示枚举值，如在 Minutes 域使用 5, 20，表示在 5和20分各触发一次    
> 由于月份中的日期和星期中的日期这两个元素互斥，必须要对其中一个设置 ?    
> 下面是一些简单的示例：
> 每分钟的第30秒触发： '30 * * * * *'    
> 每小时的1分30秒触发 ：'30 1 * * * *'    
> 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'    
> 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'    
> 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'    
> 每周1的1点1分30秒触发 ：'30 1 1 * * 1' 
>     
>    
