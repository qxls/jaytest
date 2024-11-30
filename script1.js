const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audioPlayer = document.getElementById("audio-player");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume");
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const albumCover = document.getElementById("album-cover");

let isPlaying = false;
let currentSongIndex = 0;
let currentAlbumKey = '';

// 数据格式
const musicData = {
    "2000.11.07.Jay": {
        cover: "images/2000.11.07.Jay.jpg", // 专辑封面图片
        songs: [
          "周杰伦-伊斯坦堡.mp3",
          "周杰伦-印第安老斑鸠.mp3",
          "周杰伦-反方向的钟.mp3",
          "周杰伦-可爱女人.mp3",
          "周杰伦-娘子.mp3",
          "周杰伦-完美主义.mp3",
          "周杰伦-斗牛.mp3",
          "周杰伦-星晴.mp3",
          "周杰伦-黑色幽默.mp3",
          "周杰伦-龙卷风.mp3"
        ]
      },
      "2001Fantasy Plus": {
          cover:"images/Fantasy Plus.jpg",
          songs:[
            "周杰伦 - .世界末日 (Live)_20190720_154139.mp3",
            "周杰伦 - .你比从前快乐 (Live).mp3",
            "周杰伦 - .蜗牛 (Live).mp3"
          ]
        },
        "2001范特西": {
        cover: "images/范特西.jpg", // 你可以自己添加封面图片路径
        songs: [
          "周杰伦-上海一九四三.mp3",
          "周杰伦-双截棍.mp3",
          "周杰伦-威廉古堡.mp3",
          "周杰伦-安静.mp3",
          "周杰伦-对不起.mp3",
          "周杰伦-开不了口.mp3",
          "周杰伦-忍者.mp3",
          "周杰伦-爱在西元前.mp3",
          "周杰伦-爸，我回来了.mp3",
          "周杰伦-简单爱.mp3"
        ]
      },
      "2002.7八度空间": {
        cover: "images/八度空间.jpg",
        songs: [
          "周杰伦-分裂.mp3",
          "周杰伦-半兽人.mp3",
          "周杰伦-半岛铁盒.mp3",
          "周杰伦-回到过去.mp3",
          "周杰伦-暗号.mp3",
          "周杰伦-最后的战役.mp3",
          "周杰伦-火车叨位去.mp3",
          "周杰伦-爷爷泡的茶.mp3",
          "周杰伦-米兰的小铁匠.mp3",
          "周杰伦-龙拳.mp3"
        ]
      },
      "2002.9The One 演唱会": {
        cover: "images/2002 The One演唱会.jpg",
        songs: [
          "周杰伦-上海一九四三(Live)_20190720_154145.mp3",
          "周杰伦-你怎么连话都说不清楚(Live).mp3",
          "周杰伦-分裂(Live).mp3",
          "周杰伦-半岛铁盒(Live).mp3",
          "周杰伦-双截棍(Live).mp3",
          "周杰伦-回到过去(Live).mp3",
          "周杰伦-安静(Live).mp3",
          "周杰伦-开不了口(Live).mp3",
          "周杰伦-忍者(Live).mp3",
          "周杰伦-找自己(Live).mp3",
          "周杰伦-斗牛(Live).mp3",
          "周杰伦-星晴(Live).mp3",
          "周杰伦-暗号(Live).mp3",
          "周杰伦-最后的战役(Live).mp3",
          "周杰伦-爱在西元前(Live).mp3",
          "周杰伦-爷爷泡的茶(Live).mp3",
          "周杰伦-简单爱(Live).mp3",
          "周杰伦-黑色幽默(Live).mp3",
          "周杰伦-龙卷风(Live).mp3",
          "周杰伦-龙拳(Live).mp3"
        ]
      },
      "2003叶惠美": {
        cover: "images/叶惠美.jpg",
        songs: [
          "周杰伦-三年二班.mp3",
          "周杰伦-东风破.mp3",
          "周杰伦-以父之名.mp3",
          "周杰伦-你听得到.mp3",
          "周杰伦-双刀.mp3",
          "周杰伦-同一种调调.mp3",
          "周杰伦-她的睫毛.mp3",
          "周杰伦-懦夫.mp3",
          "周杰伦-晴天.mp3",
          "周杰伦-梯田.mp3",
          "周杰伦-爱情悬崖.mp3"
        ]
      }, "2003寻找周杰伦": {
        cover: "images/寻找周杰伦.jpg",
        songs: [
          "周杰伦-断了的弦.mp3",
          "周杰伦-轨迹.mp3"
        ]
      },
      "2004七里香": {
        cover: "images/七里香.jpg",
        songs: [
          "周杰伦-七里香_20190720_154109.mp3",
          "周杰伦-乱舞春秋.mp3",
          "周杰伦-借口.mp3",
          "周杰伦-园游会.mp3",
          "周杰伦-困兽之斗.mp3",
          "周杰伦-外婆.mp3",
          "周杰伦-将军.mp3",
          "周杰伦-我的地盘.mp3",
          "周杰伦-搁浅.mp3",
          "周杰伦-止战之殇.mp3"
        ]
      },
      "2004无与伦比演唱会 Live": {
        cover: "images/2004无与伦比演唱会.jpg",
        songs: [
          "周杰伦-七里香(Live).mp3",
          "周杰伦-东风破(Live).mp3",
          "周杰伦-乱舞春秋(Live).mp3",
          "周杰伦-以父之名(Live).mp3",
          "周杰伦-你听得到(Live).mp3",
          "周杰伦-倒带(Live).mp3",
          "周杰伦-借口(Live).mp3",
          "周杰伦-双刀＋双截棍＋龙拳(Live).mp3",
          "周杰伦-园游会(Live).mp3",
          "周杰伦-困兽之斗(Live).mp3",
          "周杰伦-外婆(Live).mp3",
          "周杰伦-她的睫毛(Live).mp3",
          "周杰伦-将军(Live).mp3",
          "周杰伦-我的地盘(Live).mp3",
          "周杰伦-搁浅(Live).mp3",
          "周杰伦-断了的弦(Live).mp3",
          "周杰伦-晴天(Live).mp3",
          "周杰伦-梯田＋爸，我回来了(Live).mp3",
          "周杰伦-止战之殇(Live).mp3",
          "周杰伦-爱情悬崖(Live).mp3",
          "周杰伦-瓦解(Live).mp3",
          "周杰伦-祝我生日快乐(Live).mp3",
          "周杰伦-简单爱(Live).mp3",
          "周杰伦-轨迹(Live).mp3",
          "周杰伦-龙卷风(Live).mp3",
          "周杰伦-星晴+回到过去+最后的战役+爱我别走(Live).mp3"
        ]
      },
      "2005十一月的萧邦": {
        cover: "images/11月的萧邦.jpg",
        songs: [
          "周杰伦-一路向北.mp3",
          "周杰伦-发如雪.mp3",
          "周杰伦-夜曲.mp3",
          "周杰伦-枫.mp3",
          "周杰伦-蓝色风暴.mp3",
          "周杰伦-逆鳞.mp3",
          "周杰伦-飘移.mp3",
          "周杰伦-麦芽糖.mp3",
          "周杰伦-黑色毛衣.mp3",
          "周杰伦-四面楚歌.mp3",
          "周杰伦-浪漫手机.mp3",
          "周杰伦、梁心颐-珊瑚海.mp3"
        ]
      },
      "2006huang金甲": {
        cover: "images/黄金甲.jpg",
        songs: [
          "周杰伦-huang金甲.mp3"
        ]
      },
      "2006依然范特西": {
        cover: "images/依然范特西.jpg",
        songs: [
          "周杰伦-千里之外.mp3",
          "周杰伦-听妈妈的话_20190720_154126.mp3",
          "周杰伦-夜的第七章.mp3",
          "周杰伦-心雨.mp3",
          "周杰伦-本草纲目.mp3",
          "周杰伦-白色风车.mp3",
          "周杰伦-红模仿.mp3",
          "周杰伦-菊花台.mp3",
          "周杰伦-迷迭香.mp3",
          "周杰伦-退后.mp3"
        ]
      },
      "2006霍元甲": {
        cover: "images/霍元甲.jpg",
        songs: [
          "周杰伦-霍元甲.mp3",
          "周杰伦-献世(Live).mp3"
        ]
      },
      "2007.7不能说的秘密 电影原声带": {
        cover: "images/不能说的秘密.jpg",
        songs: [
          "不能说的秘密-First Kiss.mp3",
          "不能说的秘密-Ride With Me.mp3",
          "不能说的秘密-Secret.mp3",
          "不能说的秘密-The Swan.mp3",
          "不能说的秘密-斗琴.mp3",
          "不能说的秘密-早操.mp3",
          "不能说的秘密-淡水海边.mp3",
          "不能说的秘密-湘伦小雨四手联弹.mp3",
          "不能说的秘密-父与子.mp3",
          "不能说的秘密-阿郎与阿宝.mp3",
          "周杰伦-Angel.mp3",
          "周杰伦-Ending.mp3",
          "周杰伦-Flash Back.mp3",
          "周杰伦-Opening.mp3",
          "周杰伦-Secret.mp3",
          "周杰伦-不能说的秘密.mp3",
          "周杰伦-与父共舞.mp3",
          "周杰伦-小雨写立可白Ⅰ.mp3",
          "周杰伦-小雨写立可白Ⅱ.mp3",
          "周杰伦-琴房.mp3",
          "周杰伦-脚踏车.mp3",
          "周杰伦-路小雨.mp3",
          "姚苏蓉-情人的眼泪.mp3",
          "江语晨-晴天娃娃.mp3",
          "黄俊郎-女孩别为我哭泣.mp3"
        ]
      },
      "2007世界巡回演唱会": {
        cover: "images/2007世界巡回演唱会.jpg",
        songs: [
          "周杰伦-不能说的秘密.mp3",
          "周杰伦-双截棍.mp3",
          "周杰伦-发如雪.mp3",
          "周杰伦-周大侠.mp3",
          "周杰伦-夜曲.mp3",
          "周杰伦-无双.mp3",
          "周杰伦-最长的电影.mp3",
          "周杰伦-本草纲目.mp3",
          "周杰伦-牛仔很忙.mp3",
          "周杰伦-甜甜的.mp3",
          "周杰伦-白色风车.mp3",
          "周杰伦-菊花台.mp3",
          "周杰伦-蒲公英的约定.mp3",
          "周杰伦-迷迭香.mp3",
          "周杰伦-退后.mp3",
          "周杰伦-阳光宅男.mp3",
          "周杰伦-霍元甲.mp3",
          "周杰伦-麦芽糖.mp3",
          "周杰伦-黄金甲.mp3",
          "周杰伦_潘玮柏_张学友-听妈妈的话.mp3",
          "周杰伦_费玉清-千里之外.mp3"
        ]
      },
      "2007我很忙": {
        cover: "images/我很忙.jpg",
        songs: [
          "周杰伦 - .彩虹.mp3",
          "周杰伦 - .我不配.mp3",
          "周杰伦 - .扯.mp3",
          "周杰伦 - .无双.mp3",
          "周杰伦 - .最长的电影.mp3",
          "周杰伦 - .牛仔很忙.mp3",
          "周杰伦 - .甜甜的.mp3",
          "周杰伦 - .蒲公英的约定.mp3",
          "周杰伦 - .阳光宅男.mp3",
          "周杰伦 - .青花瓷.mp3"
        ]
      },
      "2008魔杰座": {
        cover: "images/魔杰座.jpg",
        songs: [
          "周杰伦 - .乔克叔叔.mp3",
          "周杰伦 - .兰亭序.mp3",
          "周杰伦 - .时光机.mp3",
          "周杰伦 - .流浪诗人.mp3",
          "周杰伦 - .稻香.mp3",
          "周杰伦 - .给我一首歌的时间.mp3",
          "周杰伦 - .花海.mp3",
          "周杰伦 - .蛇舞.mp3",
          "周杰伦 - .说好的幸福呢.mp3",
          "周杰伦 - .魔术先生.mp3",
          "周杰伦 - .龙战骑士.mp3"
        ]
      },
      "2010超时代演唱会": {
        cover: "images/2010超时代演唱会.jpg",
        songs: [
          "周杰伦 - .东风破 (Live).mp3",
          "周杰伦 - .以父之名 (Live)_20190720_154059.mp3",
          "周杰伦 - .你是我的OK绷 (Live).mp3",
          "周杰伦 - .免费教学录影带 (Live).mp3",
          "周杰伦 - .双截棍 (Live).mp3",
          "周杰伦 - .嘻哈空姐 (Live).mp3",
          "周杰伦 - .威廉古堡 (Live).mp3",
          "周杰伦 - .开不了口 (Live).mp3",
          "周杰伦 - .我不配 (Live).mp3",
          "周杰伦 - .时光机 (Live).mp3",
          "周杰伦 - .爱在西元前 (Live).mp3",
          "周杰伦 - .爸，我回来了＋心事谁人知 (Live).mp3",
          "周杰伦 - .稻香 (Live).mp3",
          "周杰伦 - .蛇舞 (Live).mp3",
          "周杰伦 - .说好的幸福呢＋淘汰＋青花瓷 (Live).mp3",
          "周杰伦 - .跨时代 (Live).mp3",
          "周杰伦 - .阳光宅男 (Live).mp3",
          "周杰伦 - .雨下一整晚 (Live).mp3",
          "周杰伦 - .魔术先生 (Live).mp3",
          "周杰伦 - .黑色幽默 (Live).mp3",
          "周杰伦 - .龙卷风 (Live).mp3",
          "周杰伦 - .龙战骑士 (Live).mp3",
          "周杰伦;蔡依林 - 给我一首歌的时间(live).mp3",
          "周杰伦_杨瑞代-爱的飞行日记(Live).mp3",
          "浪花兄弟 - .想你就写信 (Live).mp3"
        ]
      },
      "2010跨时代": {
        cover: "images/跨时代.jpg",
        songs: [
          "周杰伦 - 免费教学录影带.mp3",
          "周杰伦 - 嘻哈空姐.mp3",
          "周杰伦 - 好久不见.mp3",
          "周杰伦 - 我落泪情绪零碎.mp3",
          "周杰伦 - 烟花易冷.mp3",
          "周杰伦 - 爱的飞行日记.mp3",
          "周杰伦 - 自导自演.mp3",
          "周杰伦 - 说了再见.mp3",
          "周杰伦 - 超人不会飞.mp3",
          "周杰伦 - 跨时代.mp3",
          "周杰伦 - 雨下一整晚.mp3"
        ]
      },
      "2011惊叹号!": {
        cover: "images/惊叹号.jpg",
        songs: [
          "周杰伦 - Mine Mine.mp3",
          "周杰伦 - 世界未末日.mp3",
          "周杰伦 - 你好吗.mp3",
          "周杰伦 - 公主病.mp3",
          "周杰伦 - 惊叹号.mp3",
          "周杰伦 - 水手怕水.mp3",
          "周杰伦 - 琴伤.mp3",
          "周杰伦 - 疗伤烧肉粽.mp3",
          "周杰伦 - 皮影戏.mp3",
          "周杰伦 - 超跑女神.mp3",
          "周杰伦 - 迷魂曲.mp3"
        ]
      },
      "2013十二新作": {
        cover: "images/十二新作.jpg",
        songs: [
          "周杰伦 - 乌克丽丽.mp3",
          "周杰伦 - 傻笑.mp3",
          "周杰伦 - 公公偏头痛.mp3",
          "周杰伦 - 哪里都是你.mp3",
          "周杰伦 - 四季列车.mp3",
          "周杰伦 - 大笨钟.mp3",
          "周杰伦 - 手语.mp3",
          "周杰伦 - 明明就.mp3",
          "周杰伦 - 梦想启动.mp3",
          "周杰伦 - 比较大的大提琴.mp3",
          "周杰伦 - 爱你没差.mp3",
          "周杰伦 - 红尘客栈.mp3"
        ]
      },
      "2013天台电影原声带": {
        cover: "images/2013天台电影原声带.jpg",
        songs: [
          "周杰伦 - 哪里都是你.mp3",
          "周杰伦 - 天台的月光.mp3",
          "周杰伦 - 狗仔舞.mp3",
          "周杰伦、柯有伦、宋健彰、于冠华、罗文裕、蔡朝华 - 大明星.mp3",
          "周杰伦、柯有伦、宋健彰、黄俊郎 - 打架舞.mp3",
          "曾志伟、周杰伦、小麦、雪糕、袁咏琳 - 波爷.mp3"
        ]
      },
      "2014哎哟,不错哦": {
        cover: "images/哎呦，不错哦.jpg",
        songs: [
          "周杰伦 - 一口气全念对.mp3",
          "周杰伦 - 听爸爸的话.mp3",
          "周杰伦 - 听见下雨的声音.mp3",
          "周杰伦 - 天涯过客.mp3",
          "周杰伦 - 怎么了.mp3",
          "周杰伦 - 我要夏天.mp3",
          "周杰伦 - 手写的从前.mp3",
          "周杰伦 - 窃爱.mp3",
          "周杰伦 - 算什么男人.mp3",
          "周杰伦 - 美人鱼.mp3",
          "周杰伦 - 阳明山.mp3",
          "周杰伦 - 鞋子特大号.mp3"
        ]
      },
      "2016.6周杰伦的床边故事": {
        cover: "images/周杰伦的床边故事.jpg",
        songs: [
          "周杰伦 - Now You See Me_20190720_154129.mp3",
          "周杰伦 - 一点点.mp3",
          "周杰伦 - 不该 (with aMEI).mp3",
          "周杰伦 - 前世情人.mp3",
          "周杰伦 - 告白气球.mp3",
          "周杰伦 - 土耳其冰淇淋.mp3",
          "周杰伦 - 床边故事.mp3",
          "周杰伦 - 爱情废柴.mp3",
          "周杰伦 - 英雄.mp3",
          "周杰伦 - 说走就走.mp3"
        ]
      },
      "2018.1等你下课": {
        cover: "images/2018.1等你下课.jpg",
        songs: [
          "周杰伦 - 等你下课(with 杨瑞代).mp3"
        ]
      },
      "2019.12.15我是如此相信": {
        cover: "images/2019.12.15我是如此相信.jpg",
        songs: [
          "周杰伦-我是如此相信-《天火》电影主题曲.mp3"
        ]
      },
      "2019.9.16说好不哭 送蓝光MV": {
        cover: "images/2019.9.16说好不哭 送蓝光MV.jpg",
        songs: [
          "周杰伦-说好不哭 (with 五月天阿信).mp3"
        ]
      },
      "2019周杰伦地表最强世界巡回演唱会": {
        cover: "images/2019周杰伦地表最强世界巡回演唱会.jpg",
        songs: [
          "周杰伦-NOW YOU SEE ME.mp3",
          "周杰伦-七里香.mp3",
          "周杰伦-以父之名.mp3",
          "周杰伦-半岛铁盒.mp3",
          "周杰伦-印地安老斑鸠.mp3",
          "周杰伦-双截棍.mp3",
          "周杰伦-告白气球.mp3",
          "周杰伦-土耳其冰淇淋.mp3",
          "周杰伦-夜曲 + 窃爱.mp3",
          "周杰伦-大笨钟 + 暗号 + 彩虹 + 龙卷风.mp3",
          "周杰伦-床边故事.mp3",
          "周杰伦-开不了口.mp3",
          "周杰伦-我要夏天 (with派伟俊).mp3",
          "周杰伦-晴天.mp3",
          "周杰伦-爷爷泡的茶.mp3",
          "周杰伦-爸 我回来了.mp3",
          "周杰伦-稻香.mp3",
          "周杰伦-美人鱼.mp3",
          "周杰伦-英雄.mp3",
          "周杰伦-说走就走.mp3",
          "周杰伦-青花瓷.mp3",
          "周杰伦-鞋子特大号.mp3",
          "宋健彰-枫 + 退后 + 搁浅.mp3",
          "杨瑞代-爱的飞行日记.mp3",
          "派伟俊-我的时代.mp3"
        ]
      },
      "2020.06.12 Mojito": {
        cover: "images/2020.06.12 Mojito.jpg",
        songs: [
          "周杰伦-Mojito.mp3"
        ]
      },
      "单曲及未收录发行": {
        cover: "images/单曲及未收录发行.jpg",
        songs: [
          "周杰伦 - 默 （LIVE）.mp3",
          "周杰伦 - 千山万水.mp3",
          "周杰伦 - 大头贴.mp3",
          "周杰伦 - 天地一斗.mp3",
          "周杰伦 - 秘密花园-(电影《功夫灌篮》插曲).mp3",
          "周杰伦 - 英雄.mp3",
          "周杰伦 - 这所有的一切.mp3",
          "周杰伦 - 麦烝玮.mp3",
          "周杰伦&温岚 - 屋顶.mp3",
          "周杰伦-不爱我就拉倒.mp3",
          "周杰伦;陈建州 - 二手烟.mp3",
          "周杰伦_林俊杰-Stay With You.mp3",
          "周杰伦_林俊杰-稻香.mp3",
          "周杰伦婚礼进行曲.mp3",
          "宋祖英 - 黄浦江深.mp3",
          "洪荣宏、周杰伦 - 阿爸.mp3",
          "派伟俊_周杰伦-Try-《功夫熊猫3》电影全球主题曲.mp3",
          "浪花兄弟&周杰伦 - 你是我的Ok绷.mp3",
          "袁咏琳&周杰伦 - 画沙.mp3"
        ]
      },
      "最伟大的作品": {
        cover: "images/最伟大的作品.jpg",
        songs: [
          "Intro - 周杰伦.mp3",
          "Mojito - 周杰伦.mp3",
          "不爱我就拉倒 - 周杰伦.mp3",
          "倒影 - 周杰伦.mp3",
          "我是如此相信 - 周杰伦.mp3",
          "最伟大的作品 - 周杰伦.mp3",
          "等你下课 (with 杨瑞代) - 周杰伦.mp3",
          "粉色海洋 - 周杰伦.mp3",
          "红颜如霜 - 周杰伦.mp3",
          "说好不哭 (with 五月天阿信) - 周杰伦.mp3",
          "还在流浪 - 周杰伦.mp3",
          "错过的烟火 - 周杰伦.mp3"
        ]
      }
      
      // 更多专辑...
};

// 根据专辑和歌曲加载音频
function loadSong(album, song) {
  const songUrl = `jay/${album}/${song}`;
  audioPlayer.src = songUrl;
  songName.textContent = song;
  artistName.textContent = "Jay Chou"; // 可替换为实际歌手
  albumCover.src = `images/${album}-cover.jpg`; // 根据专辑设置封面图片
}

// 播放/暂停
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "▶";
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

// 更新进度条
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

// 设置歌曲进度
progressBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
});

// 调整音量
volumeBar.addEventListener("input", (e) => {
  audioPlayer.volume = e.target.value / 100;
});

// 播放下一首歌
nextButton.addEventListener("click", () => {
  currentSongIndex++;
  if (currentSongIndex >= musicData[currentAlbumKey].songs.length) {
    currentSongIndex = 0; // 如果到了最后一首，回到第一首
  }
  loadSong(currentAlbumKey, musicData[currentAlbumKey].songs[currentSongIndex]);
  audioPlayer.play();
  playPauseButton.textContent = "⏸";
  isPlaying = true;
});

// 播放上一首歌
prevButton.addEventListener("click", () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = musicData[currentAlbumKey].songs.length - 1; // 如果是第一首，回到最后一首
  }
  loadSong(currentAlbumKey, musicData[currentAlbumKey].songs[currentSongIndex]);
  audioPlayer.play();
  playPauseButton.textContent = "⏸";
  isPlaying = true;
});

// 加载专辑
function loadAlbum(albumKey, albumData) {
  const albumElement = document.createElement('div');
  albumElement.classList.add('album');
  albumElement.innerHTML = `
    <img src="${albumData.cover}" alt="${albumKey}">
    <div class="album-name">${albumKey}</div>
  `;
  albumElement.addEventListener('click', () => {
    currentAlbumKey = albumKey;
    currentSongIndex = 0; // 默认播放专辑的第一首歌
    loadSong(albumKey, albumData.songs[currentSongIndex]);
    audioPlayer.play();
    playPauseButton.textContent = "⏸";
    isPlaying = true;
  });
  return albumElement;
}

// 自动播放下一首歌（实现连续播放）
audioPlayer.addEventListener("ended", () => {
  currentSongIndex++;
  if (currentSongIndex >= musicData[currentAlbumKey].songs.length) {
    currentSongIndex = 0; // 如果到了最后一首，回到第一首
  }
  loadSong(currentAlbumKey, musicData[currentAlbumKey].songs[currentSongIndex]);
  audioPlayer.play();
  playPauseButton.textContent = "⏸";
  isPlaying = true;
});

// 渲染所有专辑
Object.keys(musicData).forEach(albumKey => {
  const albumData = musicData[albumKey];
  document.getElementById('albumList').appendChild(loadAlbum(albumKey, albumData));
});
