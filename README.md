# 壁纸爬虫1.0.2

### 1.概述：
> 自动爬取壁纸并定时发送至你的邮箱。    
> 运行环境：nodejs

### 2.如何使用：
> 1.cd到项目目录执行命令` npm install `   
> 2.在项目根目录下新建名称为.env的文件   
> 3.打开.env文件进行配置

### 3.如何配置：
> 你需要在.env文件中以键值对的形式编写配置；   
> 例如：
> ``` 
> SENDER_EMAIL=xxxxxxx@qq.com
> SENDER_PASS=123456789abcd
> SENDER_HOST=smtp.qq.com
> SENDER_NAME=通知
> RECIPIENT_EMAIL=xxxxxxx@163.com
> EMAIL_SUBJECT=今日壁纸抓取结果
> RECURRENCE_RULE=0 0 9 * * * 
> RESOLUTION=1920x1080
> DIR_PATH=imgData
> RATIOS=9x16
> ```


### 4.配置属性说明：
> SENDER_EMAIL：发送方邮件地址（若不配置发送方邮件或发送方邮件授权码，则不会发送邮件，文件将保存至本地，可通过配置DIR_PATH属性，来决定文件存放位置，若两项都配，则开启发送邮件模式，文件不会保存至本地，文件可在邮件内的下载链接进行下载。）    
> 
> SENDER_PASS：发送方邮件授权码，即IMAP/SMTP服务授权码，需登录至邮箱官网自行开启该服务，开启后自动生成该密码。
>  
> SENDER_HOST：发送邮件服务器；qq邮箱为smtp.qq.com；163邮箱为smtp.163.com    
> 
> SENDER_NAME：发送者名称    
> 
> RECIPIENT_EMAIL：接收方邮箱    
> 
> EMAIL_SUBJECT=：邮件标题    
> 
> RECURRENCE_RULE：定时任务规则    
> 
> RESOLUTION：分辨率（格式：1920x1080）
> 
> DIR_PATH：文件存储目录：默认存储至src/imgData下   
> 
> RATIOS：比例（格式：16x9 16x10 21x9 32x9 48x9 9x16 10x16 9x18 1x1 3x2 4x3 5x4）；比例和分辨率二选其一即可，若都配，则两项都生效，若都不配，则包含所有分辨率和比例    
> 

### 5.直接运行：
> 在项目根目录下执行 ` npm run send `直接运行，将直接执行爬虫任务

### 6.开启定时任务：
> 在项目根目录下执行命令：` npm start `；将会根据配置中定时任务规则定时执行。       



### 7.如何配置定时任务规则：
> 该项目使用的是 Cron 风格的定时器：  
```  
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

> 6个占位符分别表示 ：秒 分 时 日 月 周几
> 
> ` * ` 表示通配符，匹配该域的任意值，假如在 Minutes 域使用 * 表示每分钟都会触发事件    
> 
> ` ? ` 字符仅被用于天（月）和天（星期）两个子表达式，表示不指定值，当2个子表达式其中之一被指定了值以后，为了避免冲突，需要将另一个子表达式的值设为' ? '   
>   
> ` - ` 表示范围，例如 在 Minutes 域使用 5-20，表示从5分到20分钟每分钟触发一次    
> 
> ` / ` 表示起始时间开始触发，然后每隔固定时间触发一次，如在 Minutes 域使用 5/20 表示第5分钟触发一次，随后每隔20分钟出发一次，也就是在25分、45分各触发一次。    
>  
> ` , ` 表示枚举值，如在 Minutes 域使用 5, 20，表示在 5和20分各触发一次    
> 


> 下面是一些简单的示例：   
> 
> 每分钟的第30秒触发： '30 * * * * *'    
> 
> 每小时的1分30秒触发 ：'30 1 * * * *'    
> 
> 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'    
> 
> 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'    
> 
> 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'    
> 
> 每周1的1点1分30秒触发 ：'30 1 1 * * 1' 
>     

### 8.日志
> 执行过程中日志将自动保存至src/logs文件夹中，日志文件名加入时间戳每天写入单独的文件，以供后台运行时方便查看当天打印的日志信息
