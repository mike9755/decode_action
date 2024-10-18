//Fri Oct 18 2024 15:14:40 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let mode = __dirname.includes("Work");
const axios = require("axios"),
  Redis = require("ioredis"),
  cheerio = require("cheerio"),
  notify = require("./sendNotify");
let jdCookieNode = require("./jdCookie.js");
const CryptoJS = require("crypto-js");
let base64 = require("base-64");
try {
  base64 = require("base-64");
} catch (iiIiilII) {
  console.error("请安装base-64依赖");
}
let NodeRSA;
try {
  NodeRSA = require("node-rsa");
} catch (il1il1li) {
  console.error("请安装node-rsa依赖");
}
const v2_key = "Hd5W5ONsYKmGm9QA",
  v2_iv = "2JjUvJEAsA2Yog==",
  machineId = require("node-machine-id"),
  h5sts = require("./h5sts.js"),
  fs = require("fs");
let wxJcTypes = [0, 1, 8, 17],
  wx100JcTypes = [2, 102],
  jinggengJcTypes = ["COUPON", "JD_D_COUPON", "JD_COUPON"],
  blackLuckDrawRule = (process.env.M_WX_BLACK_LUCK_DRAW_RULE || "FITURE|FITURE").split(/[@,&|]/).join("|"),
  openCardTypes = ["10033", "10006", "10043", "10052", "10068"];
process.env.M_WX_OPEN_CARD_TYPES ? process.env.M_WX_OPEN_CARD_TYPES.split(/[@,&|]/).forEach(i11lIliI => openCardTypes.push(i11lIliI)) : "";
const redisUrl = process.env.M_REDIS_URL || "redis://:.T]x;M!()G^-0ckrBPoWCNln3@@172.17.0.1:6379/0",
  redis = new Redis(redisUrl, {
    "keyPrefix": "magic:"
  });
let proxyRegx = process.env.M_WX_PROXY_ENABLE_REGEXP ? process.env.M_WX_PROXY_ENABLE_REGEXP : "(EAI_AGAIN|Request failed with status code 504)|(Request failed with status code 403)|disconnected|(Request failed with status code 493)|certificate|timeout|ECONNREFUSED|ETIMEDOUT|(tunneling socket could not be established)";
const hdbTypes = ["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"],
  jinggengTypes = ["jinggeng-isv.isvjcloud.com"],
  jinggengcjTypes = ["jinggengjcq-isv.isvjcloud.com", "mpdz-act-dz.isvjcloud.com"],
  keywords = ["pps", "utm_campaign", "utm_term", "utm_source", "utm_medium", "teamId", "mpin", "shareUuid", "signUuid", "inviterNick", "inviter", "InviteUuid", "inviterNickName", "sharer", "inviterImg", "nickName", "nick", "friendUuid", "helpUuid", "shareuserid4minipg", "bizExtString", "invitePin", "pps", "cookie", "friendid", "bizExtString", "bizExtString", "koikey", "jd_env_info", "inviter_id", "invitePin", "portrait", "sid", "shareUserId", "_ts", "tttparams", "pps", "pps", "DEBUG", "shareOpenId", "jxsid", "ad_od", "token", "pps", "encryptOpenId", "gx", "gxd", "accessToken"],
  modeMinutesMap = {
    1: 60,
    2: 30,
    3: 15,
    4: 10
  };
let ckms = new Map();
Object.keys(jdCookieNode).length > 0 && Object.keys(jdCookieNode).forEach(illi11l => {
  let l1illli = jdCookieNode[illi11l]?.["match"](/pt_pin=([\w\-\%]+)/)[1];
  ckms.set(l1illli, jdCookieNode[illi11l]);
});
try {
  let paths = process.env?.["M_COOKIE_FILE_PATHS"]?.["split"](/[@,&|]/) || "/home/magic/Work/wools/magic/cks.txt".split(/[@,&|]/);
  for (let path of paths) {
    if (!fs.existsSync(path)) continue;
    let cks = fs.readFileSync(path).toString().split("\n");
    for (let ck of cks) {
      try {
        if (ck.includes("pt_key")) {
          ck = ck.trim().replace("\n", "");
          let _pt_key = ck.match(/pt_key=([\w\-]+)/)?.[1],
            _pt_pin = ck.match(/pt_pin=([\w\-\%]+)/)?.[1];
          if (!_pt_key || !_pt_pin) continue;
          ckms.set(_pt_pin, "pt_key=" + _pt_key + ";pt_pin=" + _pt_pin + ";");
        }
      } catch (il1iil) {}
    }
  }
  console.log("files " + ckms.size);
} catch (IlIi1) {}
let cookies = Array.from(ckms.values()).filter(I1lliiIl => I1lliiIl.includes("pt_pin") && I1lliiIl.includes("pt_key")),
  proxies = [];
for (let i = 0; i < 20; i++) {
  try {
    if (!process.env["M_WX_PROXY_POOL_URL" + (i || "")]) continue;
    proxies.push({
      "index": i + 1,
      "url": process.env["M_WX_PROXY_POOL_URL" + (i || "")],
      "type": process.env["M_WX_PROXY_POOL_TYPE" + (i || "")],
      "close": process.env["M_WX_PROXY_POOL_CLOSE" + (i || "")] || ""
    });
  } catch (li1liII1) {
    console.log("读取代理配置 出错", li1liII1);
  }
}
const {
    format
  } = require("date-fns"),
  tunnel = require("tunnel");
let disableActivityType = ["10999", "10101", "10102", "10100", "10099", "10098", "10097", "10088", "10083", "10077", "10048", "10030", "10015"];
const urlPrefixes = {
    "/prod/cc/interactsaas": /interactsaas/,
    "/crm-proya/apps/interact": /crm-proya/,
    "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc/,
    "prod/cc/cjwx": /lorealjdcampaign-rc.isvjcloud.com\/prod\/cc\/cjwx/,
    "/apps/interact": /lorealjdcampaign-rc.isvjcloud.com\/interact/,
    "/prod/cc/interaction/v1": /interaction\/v1/,
    "/prod/cc/interaction/v2": /interaction\/v2/
  },
  isvTokenRetryCount = parseInt(process.env?.["M_WX_TOKEN_RETRY_COUNT"] || 2),
  isvObfuscatorRetryWait = parseInt(process.env?.["M_WX_ISVOBFUSCATOR_RETRY_WAIT"] || 2);
let wxTeamInitUrl = "(lzdz1|showPartition|/lzclient/|/wxTeam/|wxAssemblePage|wxUnPackingActivity|microDz)",
  apiSignUrl = process.env.M_API_SIGN_URL ? process.env.M_API_SIGN_URL : "http://api.nolanstore.cc/sign",
  tokenCacheMin = parseInt(process.env?.["M_WX_TOKEN_CACHE_MIN"] || 10),
  tokenCacheMax = parseInt(process.env?.["M_WX_TOKEN_CACHE_MAX"] || 15);
class CustomError extends Error {
  constructor(IlIi1i, IiIl11ii) {
    super(IlIi1i);
    this.name = this.constructor.name;
    this.ptpin = IiIl11ii;
    Error.captureStackTrace(this, this.constructor);
  }
}
let reTryRegx = "(哎呀活动火爆，请稍后再试|活动太火爆了|服务器数据忙|奖品与您擦肩而过了哟)",
  blockPinRegx = process.env.M_WX_BLOCK_PIN_REGX || "";
const notInitPinTokenRegex = /lorealjdcampaign-rc.isvjcloud.com|interaction\/v1/;
let stopKeywords = ["来晚了", "已发完", "参数缺失或无效", "超出活动计划时间", "奖品发送失败", "发放完", "全部被领取", "余额不足", "已结束", "活动已经结束", "未开始"];
process.env.M_WX_STOP_KEYWORD ? process.env.M_WX_STOP_KEYWORD.split(/[@,&|]/).forEach(iiIl1lli => stopKeywords.push(iiIl1lli)) : "";
let M_WX_ADDRESS_RANGE = process.env?.["M_WX_ADDRESS_RANGE"] || "1-7",
  M_WX_ADDRESS_MODE = process.env?.["M_WX_ADDRESS_MODE"] || "RANDOM",
  M_WX_ADDRESS_MODE_LOWER = parseInt(process.env?.["M_WX_ADDRESS_MODE_LOWER"] || 0),
  addressStopKeywords = ["京豆", "红包", "券", "再来一次", "客服"],
  addressStopKeywordsRule = ["下单满", "签收后", "收到货后", "成功购买任意", "必须购买店铺内"];
process.env.M_WX_ADDRESS_STOP_KEYWORD ? process.env.M_WX_ADDRESS_STOP_KEYWORD.split(/[@,&|]/).forEach(llliili1 => addressStopKeywords.push(llliili1)) : "";
process.env.M_WX_ADDRESS_STOP_KEYWORD_RULE ? process.env.M_WX_ADDRESS_STOP_KEYWORD_RULE.split(/[@,&|]/).forEach(Iil1lIii => addressStopKeywordsRule.push(Iil1lIii)) : "";
let apiToken = process.env.M_API_TOKEN ? process.env.M_API_TOKEN : "",
  leaders = [],
  blackPinConfig = {
    "cjhy-isv.isvjcloud.com": process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : "",
    "cjhydz-isv.isvjcloud.com": process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : "",
    "lzkj-isv.isvjcloud.com": process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : "",
    "lzkjdz-isv.isvjcloud.com": process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : "",
    "*": process.env.M_WX_BLACK_COOKIE_PIN ? process.env.M_WX_BLACK_COOKIE_PIN : ""
  },
  _currentTime = Date.now();
class Env {
  constructor(iI11IIiI) {
    this.buildAxios();
    if (this.constructor === Env) {
      {
        this.name = iI11IIiI + "并发版";
        this.desensitize = false;
        this.filename = process.argv[1];
        this.log(this.name + " " + this.filename);
        this.concurrencyLimit = process.env.M_CONC_LIMIT || 10;
        this.currentRunning = 0;
        this.taskQueue = [];
        this.exit = false;
        this.domain = "";
        this.runMode = "default";
        this.activityId = "";
        this.activityUrl = "";
        this.activityType = "99";
        this.templateId = "";
        this.templateCode = "";
        this.is100V2Type = false;
        this.defenseUrls = "";
        this.urlPrefix = "";
        this.shopName = "";
        this.venderId = "";
        this.shopId = "";
        this.userEnv = new Map();
        this.superVersion = "v1.0.0";
        this.superVersionNum = this.superVersion.replace(/\D/g, "");
        this.hdbTypes = hdbTypes;
        this.jinggengcjTypes = jinggengcjTypes;
        this.jinggengTypes = jinggengTypes;
        this.prizeList = [];
        this.accounts = [];
        this.currAddressPtpin = "";
        this.shareUserId = "";
        this.currentLeader = {};
        this.leaders = [];
        this.addressIndex = 1;
        this.masterPins = (process.env.M_MASTER_PIN || "").split(/[@,&|]/) || [];
        this.masterNum = 0;
        this.msg = [];
        return;
      }
    }
    this.isMember = false;
    this.isNewMember = false;
    this.isAuthFailed = false;
    this.forBreak = false;
    this.cookie = "";
    this.ptpin = "";
    this.version = "";
    this.ticket = "";
    this.isvToken = "";
    this.tickets = new Map();
    this.message = [];
  }
  async ["pushLeader"](Iii1ill) {
    Object.assign(Iii1ill, {
      "ptpin": this.ptpin,
      "teamId": this.teamId,
      "Token": this.Token,
      "isvToken": this.isvToken
    });
    leaders.push(Iii1ill);
  }
  async ["successLeader"](lIl1lIIl) {
    leaders.filter(IiI11Iil => IiI11Iil.shareUserId === lIl1lIIl.shareUserId)[0].finish = true;
  }
  async ["selectLeader"]() {
    while (leaders.filter(lll11l1l => !lll11l1l.finish).length === 0 && leaders.filter(l1ili1II => l1ili1II.finish).length !== this.masterNum && !this.isMaster() && !this.super.exit) {
      await this.wait(200, 300);
    }
    !this.isMaster() && leaders.filter(I11Ili1I => I11Ili1I.finish === true).length === this.masterNum && (this.putMsg("全部完成"), this.super.exit = true);
    this.super.currentLeader = leaders.filter(i1lI1IiI => i1lI1IiI.finish === false)?.[0] || {};
    this.super.shareUserId = this.super.currentLeader?.["shareUserId"] || "";
    !this.super.shareUserId && (this.putMsg("已无车头"), this.super.exit = true);
    if (this.super.exit) throw new CustomError("逻辑退出");
  }
  async ["countdown"](ili1l11i = 1, liilI1ii = 200) {
    let ll1iilIi = new Date();
    if (ili1l11i === 1 && ll1iilIi.getMinutes() < 50 || ili1l11i === 2 && ll1iilIi.getMinutes() < 25 || ili1l11i === 3 && ll1iilIi.getMinutes() < 10 || ili1l11i === 4 && ll1iilIi.getMinutes() < 5) return;
    let i1II1iii = liilI1ii;
    if (ili1l11i !== 9) {
      {
        switch (ili1l11i) {
          case 1:
            ll1iilIi.setHours(ll1iilIi.getHours() + 1);
            ll1iilIi.setMinutes(0);
            break;
          case 2:
            ll1iilIi.setMinutes(30);
            break;
          case 3:
            ll1iilIi.setMinutes(15);
            break;
          case 4:
            ll1iilIi.setMinutes(10);
            break;
          default:
            console.log("不支持");
        }
        ll1iilIi.setSeconds(0);
        ll1iilIi.setMilliseconds(0);
        i1II1iii = ll1iilIi.getTime() - Date.now() - liilI1ii;
      }
    }
    i1II1iii > 0 && (console.log("需要等待时间" + i1II1iii / 1000 + " 秒"), await this.wait(i1II1iii));
  }
  ["buildAxios"]() {
    this.axios = axios.create({
      "timeout": 10000
    });
    this.axios.defaults.retry = 1;
    this.axios.defaults.retryDelay = 0;
    this.axios.defaults.proxy = false;
    this.axios.defaults.shouldRetry = async liii1Iil => {
      let II1ilIIl = liii1Iil.response?.["status"];
      if ([403, 404, 407].includes(II1ilIIl)) return false;
      return false;
    };
    this.axios.interceptors.response.use(function (lliI1iii) {
      return lliI1iii;
    }, function (Ii1liIIi) {
      {
        let iiIIllIl = Ii1liIIi.config;
        if (!iiIIllIl || !iiIIllIl.retry) return Promise.reject(Ii1liIIi);
        if (!iiIIllIl.shouldRetry || typeof iiIIllIl.shouldRetry != "function") return Promise.reject(Ii1liIIi);
        if (!iiIIllIl.shouldRetry(Ii1liIIi)) {
          return Promise.reject(Ii1liIIi);
        }
        iiIIllIl.__retryCount = iiIIllIl.__retryCount || 0;
        if (iiIIllIl.__retryCount >= iiIIllIl.retry) return Promise.reject(Ii1liIIi);
        iiIIllIl.__retryCount += 1;
        let lil1iIlI = new Promise(function (ll1iIlI) {
          setTimeout(function () {
            ll1iIlI();
          }, iiIIllIl.retryDelay || 1);
        });
        return lil1iIlI.then(function () {
          return axios(iiIIllIl);
        });
      }
    });
    this.axios.defaults.headers.tk = machineId.machineIdSync();
  }
  async ["rcache"](I1i11il1, iiI111l, i11iil1) {
    i11iil1 ? (await redis.del(I1i11il1), await redis.set(I1i11il1, iiI111l, "NX", "PX", i11iil1)) : await redis.set(I1i11il1, iiI111l);
  }
  async ["rdel"](IIil11Ii) {
    await redis.del(IIil11Ii);
  }
  async ["rget"](IliIi11l) {
    return await redis.get(IliIi11l);
  }
  async ["filterCookie"]() {
    try {
      let Ilillll = [],
        ii1IIl1I = true;
      this.log(blockPinRegx);
      l11111l: for (let IIIl1l1 = 0; IIIl1l1 < cookies.length; IIIl1l1++) {
        let iI1iiiii = cookies[IIIl1l1],
          iiiilIli = iI1iiiii.match(/pt_pin=(.+?);/) && iI1iiiii.match(/pt_pin=(.+?);/)[1];
        if (this.activityUrl.includes("isvjcloud") && blockPinRegx && ii1IIl1I) {
          for (let lIlil1Ii of blockPinRegx.split(";")) {
            let I1iiIl1i = lIlil1Ii.split("@"),
              ilill1II = this.activityUrl.match(new RegExp(I1iiIl1i[0]));
            if (ilill1II && I1iiIl1i[1].split("|").includes(iiiilIli)) {
              {
                this.log("匹配到黑名单 " + lIlil1Ii + " " + iiiilIli);
                continue l11111l;
              }
            }
          }
        }
        if (this.activityUrl.includes("isvjcloud")) {
          {
            if (blackPinConfig[this.domain]?.["includes"](iiiilIli)) continue;
            if (blackPinConfig["*"]?.["includes"](iiiilIli)) continue;
          }
        }
        this.masterPins.includes(iiiilIli) && this.masterNum++;
        Ilillll.push(iI1iiiii);
      }
      cookies = Ilillll;
    } catch (lI1l1IIl) {
      console.log("ck过滤异常");
      console.log(lI1l1IIl);
    }
  }
  async ["acquireLock"](liii1l1i, illiiiii, l1ii1iII) {
    const ili1iI = await redis.set(liii1l1i, illiiiii, "NX", "PX", l1ii1iII);
    return ili1iI === "OK";
  }
  async ["releaseLock"](llIi1ill, I1IillI1) {
    const iII1IllI = await redis.get(llIi1ill);
    return iII1IllI === I1IillI1 ? (await redis.del(llIi1ill), true) : false;
  }
  ["putMsg"](IlIiIiI1) {
    this.log(IlIiIiI1);
    this.message.push(IlIiIiI1);
  }
  ["addTask"](I1Illil1) {
    this.taskQueue.push(I1Illil1);
    this.runTasks();
  }
  ["uuid"](l111l11I = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    return l111l11I.replace(/[xy]/g, function (ii1lIli) {
      const i1llli = 16 * Math.random() | 0,
        IlI1i1I1 = "x" === ii1lIli ? i1llli : 3 & i1llli | 8;
      return IlI1i1I1.toString(36);
    });
  }
  ["now"](i1i11IIl) {
    return format(Date.now(), i1i11IIl || "yyyy-MM-dd HH:mm:ss.SSS");
  }
  ["formatDate"](llI1ll1l, lIlIl11l) {
    return format(typeof llI1ll1l === "object" ? llI1ll1l : new Date(typeof llI1ll1l === "string" ? llI1ll1l * 1 : llI1ll1l), lIlIl11l || "yyyy-MM-dd");
  }
  ["formatDateTime"](liilIlIi, IilliIll) {
    return format(typeof liilIlIi === "object" ? liilIlIi : new Date(typeof liilIlIi === "string" ? liilIlIi * 1 : liilIlIi), IilliIll || "yyyy-MM-dd HH:mm:ss");
  }
  ["parseDate"](Ii1il1II) {
    return new Date(Date.parse(Ii1il1II.replace(/-/g, "/")));
  }
  ["timestamp"]() {
    return new Date().getTime();
  }
  ["__lt"](i1li1iII) {
    if (this.is100V2Type) return;
    let IIilliiI = i1li1iII?.["headers"]["set-cookie"] || i1li1iII?.["headers"]["Set-Cookie"] || [],
      l1llil1l = typeof IIilliiI != "object" ? IIilliiI.split(",") : IIilliiI;
    l1llil1l.forEach(ilIiliI1 => {
      let iiIllliI = ilIiliI1.split(";")[0].match(/^(.*?)=(.*)$/);
      iiIllliI && this.tickets.set(iiIllliI[1].trim(), iiIllliI[2].trim());
    });
    this.tickets && (this.ticket = Array.from(this.tickets, ([iIiii11I, iIIIi11i]) => iIiii11I + "=" + iIIIi11i).join(";") + ";");
  }
  async ["request"](I1llI1, lIiI1ll, I1I1iIl) {
    return new Promise((ll1iiiII, l1liilll) => {
      const Il1lI1ll = lIiI1ll?.["headers"] ? lIiI1ll : {
        "headers": lIiI1ll
      };
      (I1I1iIl ? this.axios.post(I1llI1, I1I1iIl, Il1lI1ll) : this.axios.get(I1llI1, Il1lI1ll)).then(i1llIl11 => {
        this.__lt(i1llIl11);
        ll1iiiII(i1llIl11);
      }).catch(i1lI1lIi => {
        l1liilll(i1lI1lIi);
      });
    });
  }
  async ["sign"](IiIIiilI, l1liiIII = {}) {
    let ill1Ii1,
      iliII1li = {
        "fn": IiIIiilI,
        "body": l1liiIII
      },
      ililIli = {
        "Cookie": 123
      };
    const lli1il1I = this.axios.defaults.httpsAgent;
    try {
      this.axios.defaults.httpsAgent = false;
      let {
        data: IiiIl
      } = await this.request(apiSignUrl, {
        "Content-Type": "application/json",
        "Cookie": "-"
      }, iliII1li);
      if (IiiIl.fn && IiiIl.body) {
        return {
          "fn": IiiIl.fn,
          "sign": IiiIl.body
        };
      }
    } catch (Ii1li1ll) {
      Ii1li1ll.message.includes("timeout") ? console.log("sign 超时") : console.log("sign" + Ii1li1ll);
    } finally {
      this.axios.defaults.httpsAgent = lli1il1I;
    }
    return {};
  }
  async ["carRmv"]() {}
  async ["initPinToken"]() {
    try {
      if (this.activityUrl.includes("activityType")) {
        if (!notInitPinTokenRegex.test(this.activityUrl)) {
          if (!this.super.defenseUrls && this.super?.["defenseUrls"]?.["length"] === 0) {
            const {
              data: I1iiiIi
            } = await this.api("api/user-info/getDefenseUrls", "");
            this.super.defenseUrls = I1iiiIi.map(I11Illl => I11Illl.interfaceName);
          }
        }
        await this.api("api/user-info/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&shopId=" + this.super.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      } else {
        if (!this.super.defenseUrls && this.super?.["defenseUrls"]?.["length"] === 0) {
          const {
            data: Ill1lli
          } = await this.api("customer/getDefenseUrls", "");
          this.super.defenseUrls = Ill1lli;
        }
        await this.api("customer/initPinToken?source=01&status=1&activityId=" + this.activityId + "&uuid=" + this.uuid() + "&jdToken=" + this.isvToken + "&venderId=" + this.super.venderId + "&shopId=" + this.super.shopId + "&clientTime=" + Date.now() + "&shareUserId=" + (this.shareUserId || ""), "");
      }
    } catch (i1li1il) {
      this.log("initPinToken" + i1li1il);
    }
  }
  async ["wx100V2Login"]() {}
  async ["login"](IIiliIi = {}) {
    if (this.super.ext) return;
    await this.routerProxy();
    await this.isvObfuscator();
    if (this.is100V2Type) await this.wx100V2Login();else {
      if (hdbTypes.includes(this.domain)) await this.hdbLogin();else {
        if (new RegExp("activityType=").test(this.activityUrl)) await this.wx100Login();else {
          if (new RegExp("(lzkj|cjhy)").test(this.activityUrl)) await this.wxLogin();else {
            if (this.activityUrl.includes("gzsl-isv.isvjcloud.com")) return await this.gzslLogin(IIiliIi);else {
              if (jinggengTypes.includes(this.domain)) {
                return await this.jinggengLogin(IIiliIi);
              } else /lzdz4-isv/.test(this.activityUrl) ? await this.lzdz4Login() : this.log("传统无线");
            }
          }
        }
      }
    }
  }
  async ["lzdz4Login"]() {
    await this.api("wxCommonInfo/token?t=" + Date.now(), "");
    await this.getMyPing("customer/getMyCidPing");
    this.tickets.set("AUTH_CUSER", this.Pin);
    await this.accessLog();
  }
  async ["wxLogin"]() {
    await this.wxJC();
    await this._algo();
    await this.getSimpleActInfoVo();
    await this.getShopInfo();
    await this.isBlackShop();
    await this.getMyPing();
    await this.accessLog();
  }
  async ["wxJC"]() {
    let lliI111l = (this.super.prizeList || []).length;
    if (this.isTeamRunMode() || this.isMaster() || lliI111l === 0) return;
    let i1IIIlI1 = false;
    if (hdbTypes.includes(this.domain)) {} else {
      if (new RegExp("activityType=").test(this.activityUrl)) {
        i1IIIlI1 = this.super.prizeList?.["filter"](llIliIIl => wx100JcTypes.includes(llIliIIl.prizeType))["length"] === lliI111l;
      } else {
        if (new RegExp("(lzkj|cjhy)").test(this.activityUrl)) i1IIIlI1 = this.super.prizeList?.["filter"](ii1i11ii => wxJcTypes.includes((ii1i11ii.type || ii1i11ii.giftType) * 1))["length"] === lliI111l;else {
          if (this.activityUrl.includes("gzsl-isv.isvjcloud.com")) {} else jinggengTypes.includes(this.domain) ? i1IIIlI1 = this.super.prizeList?.["filter"](l1i1li11 => jinggengJcTypes.includes(l1i1li11.equityType))["length"] === lliI111l : this.log("传统无线");
        }
      }
    }
    if (i1IIIlI1) {
      this.putMsg("韭菜不跑");
      throw new CustomError("韭菜不跑");
    }
  }
  ["randomPattern"](lll1li, iIi1IiI = "abcdef0123456789") {
    let III1iiI1 = "";
    for (let i11l1l1I of lll1li) {
      {
        if (i11l1l1I == "x") III1iiI1 += iIi1IiI.charAt(Math.floor(Math.random() * iIi1IiI.length));else i11l1l1I == "X" ? III1iiI1 += iIi1IiI.charAt(Math.floor(Math.random() * iIi1IiI.length)).toUpperCase() : III1iiI1 += i11l1l1I;
      }
    }
    return III1iiI1;
  }
  async ["jinggengLogin"](l1llIli1) {
    let iIii111I = await this.api("front/setMixNick", "strTMMixNick=" + this.isvToken + "&userId=" + this.super.userId + "&source=01");
    if (!iIii111I.succ) {
      this.log(iIii111I);
      this.putMsg("setMixNick失败");
      throw new CustomError("登录失败");
    }
    const I1lI11Ii = await this.api(l1llIli1.fn, "id=" + this.activityId + "&user_id=" + this.super.userId + "&sid=" + this.uuid() + "&un_area=" + this.randomPattern("xx_xxxx_xxxx_xxxxx"));
    if (I1lI11Ii.match(/活动已结束/)) {
      {
        this.putMsg("活动已结束");
        this.super.exit = true;
        throw new CustomError("活动已结束");
      }
    }
    const l11IlIlI = cheerio.load(cheerio.load(I1lI11Ii).html());
    this.super.shopId = l11IlIlI("#shop_sid").val();
    this.super.venderId = l11IlIlI("#vender_id").val();
    this.super.actName = l11IlIlI("#actName").val();
    this.super.shopName = l11IlIlI("#shop_title").val();
    this.super.rule = l11IlIlI("#description").text();
    this.super.activityType = l11IlIlI("#actType").val();
    let i1I1iIll = l11IlIlI("#error", "body").attr("value");
    this.log(i1I1iIll);
    await this.isBlackShop(this.super.shopName);
    await this.actTimeParser(this.super.rule);
    this.super.prizeList.length === 0 && (await this.getPrizeList(l11IlIlI));
    this.super.actStartTime > this.timestamp() && (this.putMsg("活动未开始"), this.super.exit = true);
    this.super.actEndTime < this.timestamp() && (this.putMsg("活动已结束"), this.super.exit = true);
    const lI1i1Iii = this.super.prizeList.filter(IIlil1li => !["JD_COUPON", "JD_D_COUPON", "COUPON"].includes(IIlil1li.equityType) && IIlil1li.availableQuantity > 0);
    lI1i1Iii.length === 0 && (this.putMsg("垃圾或领完"), this.super.exit = true);
    this.super.blackLuckDrawRule && new RegExp("(" + this.blackLuckDrawRule + ")").test(this.super.shopName) && (this.super.exit = true, this.putMsg("垃圾或领完"));
    await this.wxJC();
    if (this.super.exit) throw new CustomError("垃圾或领完");
    return l11IlIlI;
  }
  async ["gzslLogin"](III1Iill) {
    let lIlilli = await this.api(III1Iill.fn, {
      "id": this.activityId,
      "token": this.isvToken,
      "source": "01"
    });
    if (lIlilli.status !== "1") {
      this.putMsg("活动已结束" + lIlilli.msg);
      this.super.exit = true;
      await this.wxStop(lIlilli.msg);
      throw new CustomError("；逻辑退出");
    }
    this.super.shopName = lIlilli.activity.shopName;
    this.super.venderId = lIlilli.activity.venderId || lIlilli.activity.shopId;
    this.super.shopId = lIlilli.activity.shopId;
    this.super.activityType = lIlilli.activity.activityType;
    this.super.prizeList = lIlilli.activity.prizes || lIlilli.activity.prizeSettings;
    this.super.actStartTime = lIlilli.activity.startTime;
    this.super.actEndTime = lIlilli.activity.endTime;
    await this.isBlackShop(this.super.shopName);
    this.super.actStartTime > this.timestamp() && (this.putMsg("活动未开始"), this.super.exit = true);
    this.super.actEndTime < this.timestamp() && (this.putMsg("活动已结束"), this.super.exit = true);
    let lIIi1Ill = this.super.prizeList.filter(lil1ll1 => ["1", "3", "4"].includes(lil1ll1.source));
    lIIi1Ill.length === 0 && (this.putMsg("垃圾或领完"), this.super.exit = true);
    if (this.super.exit) {
      throw new CustomError("逻辑退出");
    }
    return lIlilli;
  }
  async ["getAwardText"](i1iI1Iil) {
    let IIil11li = "";
    if (i1iI1Iil.awardType == "JD_GOODS") IIil11li = i1iI1Iil.awardName + " " + i1iI1Iil.awardDenomination * 1 + "元";else {
      if (i1iI1Iil.awardType == "JD_POINT") IIil11li = i1iI1Iil.awardDenomination * 1 + "积分";else {
        if (i1iI1Iil.awardType == "JD_COUPON" || i1iI1Iil.awardType == "JD_D_COUPON") IIil11li = i1iI1Iil.awardDenomination * 1 + "元券";else {
          if (i1iI1Iil.awardType == "JD_BEAN" || i1iI1Iil.awardType == "JD_MARKET") IIil11li = i1iI1Iil.awardDenomination * 1 + "豆";else {
            if (i1iI1Iil.awardType == "JD_E_CARD") IIil11li = i1iI1Iil.assetsName;else {
              if (i1iI1Iil.awardType == "JD_AIQIYI") IIil11li = i1iI1Iil.assetsName;else {
                if (i1iI1Iil.awardType == "JD_REDBAG" || i1iI1Iil.awardType == "JD_RED_BAG") IIil11li = i1iI1Iil.awardDenomination * 1 + "元红包";else {
                  IIil11li = i1iI1Iil.awardName;
                  debugger;
                }
              }
            }
          }
        }
      }
    }
    return IIil11li;
  }
  async ["isBlackShop"](IlI1iI11 = this.super.shopName) {
    if (!IlI1iI11) return;
    if (IlI1iI11 && blackLuckDrawRule && new RegExp("(" + blackLuckDrawRule + ")").test(IlI1iI11)) {
      {
        this.super.exit = true;
        this.putMsg("命中店铺黑名单,垃圾或领完");
        throw new CustomError("命中店铺黑名单");
      }
    }
  }
  async ["getSimpleActInfoVo"](IIIll1ll = "customer/getSimpleActInfoVo", ililI1i = 1) {
    if (this.super.venderId && this.super.shopId && this.activityType) {
      {
        await this.initPinToken();
        return;
      }
    }
    let Ilil1ll1 = await this.api(IIIll1ll, ililI1i === 1 ? "activityId=" + this.activityId : ililI1i);
    if (!Ilil1ll1?.["result"] || !Ilil1ll1?.["data"]) {
      {
        this.putMsg("手动确认");
        this.super.expire = true;
        throw new CustomError("手动确认");
      }
    }
    this.super.venderId = Ilil1ll1.data?.["venderId"] || this.venderId;
    this.super.shopId = Ilil1ll1.data?.["shopId"] || this.shopId;
    this.super.activityType = Ilil1ll1.data?.["activityType"] || this.activityType;
    await this.initPinToken();
  }
  async ["complete"]() {}
  ["formatDateString"](ilIIIl) {
    if (ilIIIl.match(/\d{4}年\d{1,2}月\d{1,2}日\d{2}:\d{2}:\d{2}/)) return ilIIIl.replace(/(\d{4})年(\d{1,2})月(\d{1,2})日(\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
    return ilIIIl;
  }
  async ["checkActivity"](ll11lIi1) {
    this.super.prizeList.length === 0 && (await this.getPrizeList(ll11lIi1));
    await this.actTimeParser(this.super.rule);
    this.super.prizeList.filter(ilIilI1I => [6, 7, 9, 13, 14, 15, 16].includes((ilIilI1I.type || ilIilI1I.giftType) * 1)).length === 0 && (this.putMsg("垃圾或领完"), this.super.exit = true);
    if (this.super.actStartTime && this.super.actStartTime > this.timestamp()) {
      this.super.exit = true;
      this.putMsg("活动未开始");
    }
    this.super.actEndTime && this.super.actEndTime < this.timestamp() && (this.super.exit = true, this.putMsg("活动已结束"));
    if (this.super.exit) throw new CustomError("垃圾或领完");
    await this.wxJC();
    if (this.super.prizeList.filter(I1IliI11 => [7].includes((I1IliI11.type || I1IliI11.giftType) * 1)).length >= 1) {
      let liilillI = await this.openCard();
      !liilillI && this.log("开卡失败");
    }
    if (this.isMaster() && this.super.prizeList.filter(i1llIIiI => [6, 7, 13, 14, 15, 16].includes((i1llIIiI.type || i1llIIiI.giftType) * 1)).length >= 1) {
      let IIi1iIi1 = await this.openCard();
      !IIi1iIi1 && this.log("开卡失败");
    }
    debugger;
  }
  async ["actTimeParser"](iIliiIi = this.super.rule) {
    try {
      {
        if (!iIliiIi) return;
        if (this.super.actStartTime) {
          return;
        }
        const Ii1il1l1 = /(\d{4}[-/年]\d{1,2}[-/月]\d{1,2}(日)?(\s\d{2}:\d{2}(:\d{2})?)?|即日起至\s\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/g,
          iII1IlI1 = iIliiIi.match(Ii1il1l1);
        if (iII1IlI1) {
          let ll1IliiI, lIl1iiil;
          iII1IlI1.length === 1 && /即日起至/.test(iII1IlI1[0]) ? (ll1IliiI = this.now("yyyy-MM-dd HH:mm:ss"), lIl1iiil = this.formatDateString(iII1IlI1[0].replace(/即日起至\s/, "")), lIl1iiil.length === 16 && (lIl1iiil += ":59")) : (ll1IliiI = this.formatDateString(iII1IlI1[0]), lIl1iiil = this.formatDateString(iII1IlI1[1]));
          this.super.actStartTime = new Date(ll1IliiI).getTime();
          this.super.actEndTime = new Date(lIl1iiil).getTime();
        } else {
          debugger;
          this.log("未找到活动时间！");
        }
      }
    } catch (iiIl11ii) {
      this.putMsg("时间格式解析出错");
    }
  }
  async ["wxStop"](i1i1iI1l) {
    this.super.exit = i1i1iI1l && new RegExp("(" + stopKeywords.join("|") + ")").test(i1i1iI1l);
    if (this.super.exit) {
      {
        this.putMsg(i1i1iI1l);
        throw new CustomError("关键字逻辑退出");
      }
    }
    return this.super.exit;
  }
  async ["wxAddressStop"](iI11I1Il) {
    return iI11I1Il && new RegExp("(" + addressStopKeywords.join("|") + ")").test(iI11I1Il);
  }
  async ["wxAddressStopRule"](ii1I1i1l = this.super.rule) {
    return ii1I1i1l && new RegExp("(" + addressStopKeywordsRule.join("|") + ")").test(ii1I1i1l);
  }
  async ["selectAddress"](IIilII1i) {
    let liIlIll1,
      l1ilII = M_WX_ADDRESS_MODE.toUpperCase();
    this.log("当前填地址模式: " + M_WX_ADDRESS_MODE.toUpperCase());
    ["PIN"].includes(l1ilII) && (liIlIll1 = this.super.accounts[IIilII1i]?.["address"] || this.super.accounts[encodeURIComponent(IIilII1i)]?.["address"]);
    if (liIlIll1) {
      return liIlIll1;
    }
    if (["CC", "CCWAV"].includes(l1ilII)) {
      liIlIll1 = this.super.accounts["默认地址" + this.super.addressIndex]?.["address"];
    }
    if (liIlIll1) return liIlIll1;
    let IiIlIlli = [];
    for (let IIllIili in this.super.accounts) {
      if (this.super.accounts[IIllIili]?.["address"]) {
        IiIlIlli.push(this.super.accounts[IIllIili].address);
      }
    }
    if (["RANGE"].includes(l1ilII)) {
      let lii11llI = parseInt(M_WX_ADDRESS_RANGE?.["split"]("-")?.[0] || 1),
        Illlll1I = Math.min(parseInt(M_WX_ADDRESS_RANGE?.["split"]("-")?.[1] || IiIlIlli.length), IiIlIlli.length);
      this.super.addressIndex > Illlll1I && (this.super.addressIndex = 1);
      liIlIll1 = IiIlIlli[this.super.addressIndex - 1];
    }
    if (liIlIll1) return liIlIll1;
    if (M_WX_ADDRESS_MODE_LOWER || ["RANDOM"].includes(l1ilII)) {
      return IiIlIlli[this.random(1, IiIlIlli.length) - 1];
    }
  }
  async ["saveAddress"](lIi1lii1 = this.addressId, ii1IIIll = this.prizeName, Il1il1 = this.Pin, l1I1llIi = this.ptpin, il1iIIil = "") {
    this.log("addressId=" + lIi1lii1 + " prizeName=" + ii1IIIll);
    if (!this.super.filename.includes("m_jd_wx_address") && (await this.wxAddressStop(ii1IIIll))) {
      this.putMsg("命中关键词，不填写地址！");
      return;
    }
    let iii1iIi1 = this.super.shopName;
    if (iii1iIi1?.["includes"]("专卖店")) {
      {
        this.putMsg("专卖店，不填写地址！");
        return;
      }
    }
    if (!this.super.filename.includes("m_jd_wx_address") && (await this.wxAddressStopRule())) {
      this.putMsg("命中规则，不填地址beta！");
      this.super.exit = true;
      return;
    }
    this.super.currAddressPtpin && this.super.currAddressPtpin !== l1I1llIi && this.super.addressIndex++;
    this.super.currAddressPtpin = l1I1llIi;
    let Iii1lii1 = il1iIIil || (await this.selectAddress(l1I1llIi));
    if (!Iii1lii1) {
      {
        this.putMsg("没有找到地址信息");
        return;
      }
    }
    this.log("当前地址详情" + JSON.stringify(Iii1lii1));
    let l1lI1111 = false;
    try {
      {
        if (jinggengcjTypes.includes(this.domain)) {
          let IiIil1ll = await this.api("/dm/front/jdBigAlliance/awards/updateAddress?open_id=&mix_nick=" + (this.buyerNick || "") + "&user_id=10299171", {
            "receiverName": Iii1lii1.receiver,
            "receiverMobile": Iii1lii1.phone,
            "receiverProvince": Iii1lii1.province,
            "receiverCity": Iii1lii1.city,
            "receiverDistrict": Iii1lii1.county,
            "receiverAddress": Iii1lii1.address,
            "logId": lIi1lii1
          });
          console.log(IiIil1ll);
        } else {
          if (hdbTypes.includes(this.domain)) {
            let illllI1l = await this.api("/front/activity/postDeliveryInfo", {
              "mobile": Iii1lii1.phone,
              "province": Iii1lii1.province,
              "area": Iii1lii1.county,
              "receiveName": Iii1lii1.receiver,
              "detailAddress": Iii1lii1.address,
              "activityLogId": lIi1lii1,
              "city": Iii1lii1.city
            });
            if (illllI1l.succ) this.putMsg("已填地址"), l1lI1111 = true;else {
              this.putMsg(illllI1l.message);
            }
          } else {
            if (jinggengTypes.includes(this.domain)) {
              let i1IIiI1 = Iii1lii1.province.replace("市", "").replace("省", "") + " " + Iii1lii1.city.replace("市", "") + " " + Iii1lii1.county + Iii1lii1.address,
                IllIl = await this.api("/ql/front/postBuyerInfo", "receiverName=" + encodeURIComponent(Iii1lii1.receiver) + "&mobile=" + Iii1lii1.phone + "&address=" + encodeURIComponent(i1IIiI1) + "&log_id=" + lIi1lii1 + "&user_id=" + this.super.userId);
              console.log(IllIl);
              if (IllIl.succ) {
                this.putMsg("已填地址");
                l1lI1111 = true;
              } else {
                this.putMsg(IllIl.msg);
              }
            } else {
              if (this.activityUrl.includes("activityType")) {
                let l1iIii1l = await this.api("/api/my/prize/update", {
                  "realName": Iii1lii1.receiver,
                  "mobile": Iii1lii1.phone,
                  "address": Iii1lii1.address,
                  "orderCode": lIi1lii1,
                  "province": Iii1lii1.province,
                  "city": Iii1lii1.city,
                  "county": Iii1lii1.county
                });
                console.log(l1iIii1l);
                if (l1iIii1l?.["data"] !== "2") {
                  this.putMsg("已填地址");
                  l1lI1111 = true;
                }
              } else {
                {
                  let iiiIlI = await this.api("wxAddress/save", "venderId=" + this.super.venderId + "&pin=" + Il1il1 + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(ii1IIIll) + "&receiver=" + encodeURIComponent(Iii1lii1.receiver) + "&phone=" + Iii1lii1.phone + "&province=" + encodeURIComponent(Iii1lii1.province) + "&city=" + encodeURIComponent(Iii1lii1.city) + "&address=" + encodeURIComponent(Iii1lii1.address) + "&generateId=" + lIi1lii1 + "&postalCode=" + Iii1lii1.postalCode + "&areaCode=" + encodeURIComponent(Iii1lii1.areaCode) + "&county=" + encodeURIComponent(Iii1lii1.county));
                  if (!iiiIlI?.["result"]) {
                    if (iiiIlI.errorMessage.includes("您必须在中奖一小时内填写中奖地址")) {
                      return;
                    }
                    this.putMsg(iiiIlI.errorMessage);
                  }
                  if (iiiIlI?.["result"]) this.putMsg("已填地址"), l1lI1111 = true;else {
                    {
                      this.putMsg("venderId填地址失败");
                      iiiIlI = await this.api("wxAddress/save", "venderId=" + this.super.shopId + "&pin=" + Il1il1 + "&activityId=" + this.activityId + "&actType=" + this.activityType + "&prizeName=" + encodeURIComponent(ii1IIIll) + "&receiver=" + encodeURIComponent(Iii1lii1.receiver) + "&phone=" + Iii1lii1.phone + "&province=" + encodeURIComponent(Iii1lii1.province) + "&city=" + encodeURIComponent(Iii1lii1.city) + "&address=" + encodeURIComponent(Iii1lii1.address) + "&generateId=" + lIi1lii1 + "&postalCode=" + Iii1lii1.postalCode + "&areaCode=" + encodeURIComponent(Iii1lii1.areaCode) + "&county=" + encodeURIComponent(Iii1lii1.county));
                      if (iiiIlI?.["result"]) {
                        this.putMsg("已填地址");
                        l1lI1111 = true;
                      } else this.putMsg("" + iiiIlI?.["errorMessage"]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (liilliIi) {
      console.log(liilliIi);
    }
    l1lI1111 && (await fs.appendFileSync("gifts.csv", this.now() + "," + ii1IIIll + "," + l1I1llIi + "," + Iii1lii1.phone + "," + Iii1lii1.address + "," + this.super.name + "," + iii1iIi1 + "," + this.activityUrl + "\n"));
    return l1lI1111;
  }
  async ["getMyPing"](lll1ll11 = "customer/getMyPing", lII111i = 0) {
    try {
      let iI1llil = await this.api(lll1ll11, "userId=" + this.super.venderId + "&token=" + this.isvToken + "&pin=&fromType=APP&riskType=0");
      this.Pin = "";
      if (!iI1llil.result) {
        if (iI1llil.errorMessage.includes("请联系商家")) {
          this.super.exit = true;
          this.putMsg("商家token过期");
          throw new CustomError(iI1llil.errorMessage);
        }
        if (lII111i < 3 && !iI1llil.errorMessage?.["includes"]("活动太火爆")) this.log("重试pin获取"), await this.getMyPing(lll1ll11, ++lII111i);else {
          {
            this.putMsg(iI1llil.result.errorMessage);
            return;
          }
        }
      }
      let ilIiI11 = iI1llil.data.secretPin;
      this.nickname = iI1llil.data.nickname;
      this.Pin = this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(ilIiI11)) : encodeURIComponent(ilIiI11);
    } catch (I1ilIIlI) {
      {
        if (I1ilIIlI instanceof CustomError) {
          throw new CustomError(I1ilIIlI.message);
        }
        this.putMsg(I1ilIIlI?.["message"]);
        this.nickname = this.ptpin;
        let ii1i1lII = this.tickets.get("AUTH_C_USER");
        this.Pin = ii1i1lII || encodeURIComponent(ii1i1lII) || this.domain.includes("cjhy") ? encodeURIComponent(encodeURIComponent(ii1i1lII)) : encodeURIComponent(ii1i1lII);
      }
    }
  }
  async ["accessLog"](iIlIi1iI = "" + (this.domain.includes("cjhy") ? "common/accessLog" : "common/accessLogWithAD")) {
    await this.api(iIlIi1iI, "venderId=" + this.super.venderId + "&code=" + this.activityType + "&pin=" + this.Pin + "&activityId=" + this.activityId + "&pageUrl=" + encodeURIComponent(this.activityUrl) + "&subType=app&adSource=");
  }
  ["log"](...l1IIiii1) {
    _currentTime = Date.now();
    console.log(this.now("HH:mm:ss.SSS") + "|" + this.desensitizeString(this.ptpin) + "|" + (this.index || "") + "|", ...l1IIiii1);
  }
  async ["isOpenCard"](llilIli1 = this.super.venderId) {
    return await redis.sismember("M_OPEN:" + llilIli1, this.ptpin);
  }
  async ["setOpenCardCache"](llIllil1 = this.super.venderId) {
    await redis.sadd("M_OPEN:" + llIllil1, this.ptpin);
  }
  async ["openCard"](iII11IIi = this.super.venderId, I111I1II = 406, il1iilIl = "", i111Ii1I = 0) {
    try {
      let li111i1l = await this.isOpenCard(iII11IIi);
      if (li111i1l) return this.log("已经开过卡了"), li111i1l;
      if (i111Ii1I > 3) {
        return false;
      }
      let lI1l1IiI = {
        "venderId": iII11IIi,
        "shopId": this.super.shopId || iII11IIi,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": I111I1II,
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com"
      };
      if (il1iilIl) {
        Object.assign(lI1l1IiI, {
          "activityId": il1iilIl
        });
      }
      let liiIIiII = "https://api.m.jd.com/client.action",
        l1llI1I1 = {
          "authority": "api.m.jd.com",
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://shopmember.m.jd.com",
          "referer": "https://shopmember.m.jd.com/",
          "user-agent": this.UA,
          "Cookie": this.cookie
        };
      lI1l1IiI = "appid=shopmember_m_jd_com&functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify(lI1l1IiI)) + "&client=H5&clientVersion=9.2.0&" + (await this.h5st());
      let {
        data: II1l1Ii
      } = await this.request(liiIIiII, l1llI1I1, lI1l1IiI);
      this.log("开卡结果: " + II1l1Ii.message);
      if (["508", "510", "201", "9002"].includes(II1l1Ii.busiCode)) return await this.setOpenCardCache(iII11IIi), false;
      if ((II1l1Ii?.["message"]?.["includes"]("火爆") || II1l1Ii?.["message"]?.["includes"]("失败")) && i111Ii1I < 3) {
        return await this.openCard(iII11IIi, I111I1II, il1iilIl, ++i111Ii1I);
      }
      II1l1Ii?.["code"] * 1 === 0 && II1l1Ii?.["busiCode"] * 1 === 0 && (await this.setOpenCardCache(iII11IIi));
      return true;
    } catch (Illl1lii) {
      if ([403].includes(Illl1lii.response?.["status"]) && i111Ii1I < 3) return await this.routerProxy(0), await this.wait(1000, 2000), await this.openCard(iII11IIi, I111I1II, il1iilIl, ++i111Ii1I);
    }
  }
  ["isProxy"](I1iiilI = "493") {
    const iiIllII1 = new RegExp(proxyRegx);
    return iiIllII1.test(I1iiilI) && this.domain.includes("isvjcloud");
  }
  async ["h5st"](lilII1, iIlIIill = "bindWithVender", I1ilIlIi = 0) {
    return h5sts.random();
  }
  async ["getProxyByUrl"](Il1IIII) {
    let llliIiIl = Il1IIII.url;
    var I1ii1ill = false;
    try {
      {
        this.axios.defaults.httpsAgent = false;
        let iIiiiil = await this.axios.get(llliIiIl);
        if (llliIiIl.includes("=json")) {
          let lIiIlI = JSON.stringify(iIiiiil.data),
            IIIIlIil = iIiiiil.data.data;
          iIiiiil.data.data?.["list"] && (IIIIlIil = iIiiiil.data.data.list);
          if (IIIIlIil) {
            {
              if (IIIIlIil[0]?.["port"]) I1ii1ill = true, this.log("获取到的IP:" + IIIIlIil[0].ip + ":" + IIIIlIil[0].port), await this.setProxy(IIIIlIil[0].ip + ":" + IIIIlIil[0].port);else {
                const IIlI1iIi = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
                  iIilli11 = lIiIlI.match(IIlI1iIi);
                iIilli11 ? (this.log("获取到的IP:" + iIilli11[0]), I1ii1ill = true, await this.setProxy(iIilli11[0])) : (proxies.filter(III1l1lI => III1l1lI.index = Il1IIII.index)[0].close = true, this.log(JSON.stringify(lIiIlI)));
              }
            }
          } else this.log("M_WX_PROXY_URL" + (Il1IIII.index - 1 || "") + "代理获取异常，切换下一个"), proxies.filter(ilIll => ilIll.index = Il1IIII.index)[0].close = true, this.log(JSON.stringify(lIiIlI));
        } else {
          {
            let IlIIIliI = iIiiiil.data.toString().replace("\r\n", "").replace("\n", ""),
              li1IIiil = IlIIIliI?.["includes"]("@") ? IlIIIliI.split("@")[0] : "";
            const ll1IIIli = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|[a-zA-Z0-9.-]+:\d+)/,
              l111iil = IlIIIliI.match(ll1IIIli);
            l111iil ? (this.log("获取到的IP:" + l111iil[0]), I1ii1ill = true, await this.setProxy(l111iil[0], li1IIiil)) : (this.log("M_WX_PROXY_URL" + (Il1IIII.index - 1 || "") + "代理获取异常，切换下一个"), proxies.filter(liIilli => liIilli.index = Il1IIII.index)[0].close = true, this.log(JSON.stringify(IlIIIliI)));
          }
        }
      }
    } catch (iil111ii) {
      this.log("M_WX_PROXY_URL" + (Il1IIII.index - 1 || "") + "代理获取异常，切换下一个");
      proxies.filter(Iil1iill => Iil1iill.index = Il1IIII.index)[0].close = true;
    }
    return I1ii1ill;
  }
  async ["setProxy"](li11li1I, ilIiIIiI = "") {
    this.curProxyIP = li11li1I;
    let i1ii1II = li11li1I.split(":"),
      Il1I1li1 = {
        "host": i1ii1II[0],
        "port": i1ii1II[1]
      };
    if (ilIiIIiI) {
      Il1I1li1.proxyAuth = ilIiIIiI;
    }
    this.axios.defaults.httpsAgent = tunnel.httpsOverHttp({
      "proxy": Il1I1li1,
      "rejectUnauthorized": false
    });
  }
  async ["routerProxy"](iilil11 = 0) {
    if (!proxies.find(iilIIlll => !iilIIlll.close)) {
      this.log("所有代理已关闭");
      this.exit = true;
      this.proxy = null;
      return;
    }
    this.proxy = proxies.filter(lIIlil1i => !lIIlil1i.close)[0];
    if (this.proxy.type && this.proxy.type * 1 === 2) {
      let IiIl11lI = this.getQueryString(this.proxy.url, "username"),
        Ii111i1 = this.getQueryString(this.proxy.url, "password"),
        il1lIll = IiIl11lI + ":" + Ii111i1;
      await this.setProxy(this.match(/https?:\/\/([^/]+)/, this.proxy.url), il1lIll);
      return;
    }
    if (this.proxy.type && this.proxy.type * 1 === 3) {
      {
        let liIIll11 = "IPS:GET",
          II1Ii1Ii = "X";
        try {
          {
            let IlI1iIl = await this.acquireLock(liIIll11, II1Ii1Ii, 10000);
            if (IlI1iIl) {
              let iilIi1Ii = await redis.llen("IPS");
              this.log("开始提取IP " + iilIi1Ii);
              try {
                {
                  this.proxy = proxies.filter(Il1l1IIi => !Il1l1IIi.close)[0];
                  let {
                    data: l1Ii11ii
                  } = await this.axios.get(this.proxy.url);
                  const iliII1i = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+)/g;
                  let llillIIl,
                    l1li1iII = [];
                  while ((llillIIl = iliII1i.exec(l1Ii11ii)) !== null) {
                    l1li1iII.push(llillIIl[1]);
                  }
                  if (l1li1iII.length > 0) {
                    await redis.lpush("IPS", l1li1iII);
                    await redis.expire("IPS", 3600);
                  }
                }
              } catch (ilIiIII) {
                this.log(ilIiIII.message);
              }
            }
          }
        } catch (IIII11) {
          this.log("acquireLock " + IIII11.message);
        } finally {
          try {
            await this.releaseLock(liIIll11, II1Ii1Ii);
          } catch (Ilil11l1) {
            this.log("releaseLock " + Ilil11l1.message);
          }
        }
        if (type === 0) {
          {
            let iIlIiI1i = await redis.lpop("IPS");
            !iIlIiI1i && (await this.routerProxy(type));
            await this.setProxy(iIlIiI1i);
          }
        }
        return;
      }
    }
    this.log("开始从M_WX_PROXY_URL" + (this.proxy.index - 1 || "") + "获取代理");
    let I1iI1I1l = await this.getProxyByUrl(this.proxy);
    !I1iI1I1l && (await this.routerProxy());
  }
  async ["checkCookie"](i1Il11ll) {
    let {
      data: I1l1lIlI
    } = await this.request("https://plogin.m.jd.com/cgi-bin/ml/islogin", {
      "Content-Type": "application/json",
      "User-Agent": this.ua(),
      "Referer": "https://happy.m.jd.com/",
      "Cookie": i1Il11ll
    });
    return I1l1lIlI.islogin === "1";
  }
  ["desensitizeString"](liII11I) {
    if (!liII11I) return "";
    if (!this.desensitize) return liII11I || "";
    if (liII11I.length <= 4) {
      return liII11I;
    }
    const IIi11Il1 = liII11I,
      l1Illl11 = IIi11Il1.substring(0, 2),
      II1iii11 = IIi11Il1.substring(IIi11Il1.length - 2),
      IiI111ii = Math.max(0, 8 - l1Illl11.length - II1iii11.length),
      ill1llll = "*".repeat(IiI111ii),
      Iil1Ilil = (l1Illl11 + ill1llll + II1iii11).padEnd(6, "*");
    return Iil1Ilil;
  }
  ["randomPattern"](l1IIIliI, lIl1liIi = "abcdef0123456789") {
    let i1lliii = "";
    for (let l111iIlI of l1IIIliI) {
      if (l111iIlI == "x") {
        i1lliii += lIl1liIi.charAt(Math.floor(Math.random() * lIl1liIi.length));
      } else {
        if (l111iIlI == "X") {
          i1lliii += lIl1liIi.charAt(Math.floor(Math.random() * lIl1liIi.length)).toUpperCase();
        } else i1lliii += l111iIlI;
      }
    }
    return i1lliii;
  }
  async ["getPrizeList"](ili1Il) {
    if (hdbTypes.includes(this.domain)) {
      let li1I111l = await this.api("/front/activity/loadFrontAward", {});
      if (li1I111l.succ) {
        this.super.prizeList = li1I111l.result || [];
      } else this.log(li1I111l.message);
    } else {
      {
        let I11lIl1I = await this.api("/api/prize/drawPrize", {});
        if (I11lIl1I.resp_code !== 0) {
          this.log("获取奖品是失败");
          return;
        }
        !this.super.prizeList && this.log(I11lIl1I.data?.["prizeInfo"]);
        this.super.prizeList = I11lIl1I.data?.["prizeInfo"] || [];
      }
    }
  }
  async ["api"](lIi1lII, lI1I11II, Il1lIll = this.Token || this.isvToken, i1IIl11I = this.ticket, iIiiI111 = 0) {
    let IiIliIll = lI1I11II,
      il1ii1l = iIiiI111;
    if (this.isAuthFailed || this.forBreak || this.super.exit) {
      throw new CustomError("逻辑终止 API");
    }
    iIiiI111 > 0 && this.log("重试 " + iIiiI111 + " " + lIi1lII);
    try {
      lIi1lII = ("/" + lIi1lII).replace("//", "/");
      const iiIli1li = this.super.urlPrefix ? ("/" + this.super.urlPrefix).replace("//", "/") : "";
      let l11liIIi = "https://" + this.domain + iiIli1li + lIi1lII,
        iIllll1 = {
          "Host": this.domain,
          "Accept": "application/json, text/plain, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": lI1I11II ? typeof lI1I11II == "string" ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=utf-8" : "application/x-www-form-urlencoded;charset=utf-8",
          "Origin": "https://" + this.domain,
          "Cookie": this.activityUrl.match(new RegExp(["prod/cc", "interact", "crm-proya", ...hdbTypes, ...jinggengcjTypes].join("|"))) ? "" : "IsvToken=" + Il1lIll + ";" + i1IIl11I,
          "Referer": this.activityUrl + "&sid=" + this.uuid() + "&un_area=" + this.randomPattern("xx_xxxx_xxxx_xxxxx"),
          "User-Agent": this.UA
        };
      Il1lIll?.["startsWith"]("ey") && (iIllll1.token = Il1lIll);
      hdbTypes.includes(this.domain) && (lI1I11II = this.hdbBody(lIi1lII, lI1I11II, iIllll1));
      jinggengcjTypes.includes(this.domain) && (lI1I11II = this.jinggengjcqBody(lIi1lII, lI1I11II));
      if (this.super.defenseUrls && this.super.defenseUrls.includes(lIi1lII)) {
        if (this.activityUrl.includes("interactsaas")) lI1I11II.nowTime = this.timestamp(), lI1I11II.actId = this.activityId, lI1I11II.consumePoints = lI1I11II.consumePoints || 0;else {
          const l1i1lIi1 = new URLSearchParams(lI1I11II);
          lI1I11II = {};
          for (const [Iii1IIII, iIll1l11] of l1i1lIi1.entries()) {
            lI1I11II[Iii1IIII] = iIll1l11;
          }
          lI1I11II.nowTime = this.timestamp();
          lI1I11II.actId = this.activityId;
        }
        iIllll1.Cookie = "IsvToken=" + this.isvToken + ";" + this.ticket + "isBasicJson=true;";
        let li11IliI = this.v(lI1I11II);
        lI1I11II = {
          "ecyText": li11IliI
        };
      }
      if (this.is100V2Type) {
        if (this.pinToken) {
          {
            iIllll1["Activity-Type"] = this.activityType;
            iIllll1["Pin-Token"] = this.pinToken;
            iIllll1["Shop-Id"] = this.shopId;
            iIllll1["Template-Code"] = this.templateCode;
            iIllll1["Activity-Id"] = this.activityId;
            delete iIllll1.Cookie;
          }
        }
        if (lI1I11II) {
          let liIliiI = {};
          liIliiI[this.encryptCrypto("AES", "CBC", "Pkcs7", lI1I11II, v2_key, v2_iv)] = "";
          lI1I11II = JSON.stringify(liIliiI);
        }
      }
      if (/lzdz4-isv/.test(this.activityUrl)) for (let Ili111ii of Object.keys(this.tickets)) {
        iIllll1[Ili111ii.replace("_", "").toLowerCase()] = this.tickets.get(Ili111ii);
      }
      let {
        data: ilII1Ili
      } = await this.request(l11liIIi, iIllll1, lI1I11II);
      if (this.is100V2Type) {
        {
          if (this.pinToken) {
            {
              iIllll1["Activity-Type"] = this.activityType;
              iIllll1["Pin-Token"] = this.pinToken;
              iIllll1["Shop-Id"] = this.shopId;
              iIllll1["Template-Code"] = this.templateCode;
              iIllll1["Activity-Id"] = this.activityId;
              delete iIllll1.Cookie;
            }
          }
          if (lI1I11II) {
            {
              let Iil1Iili = {};
              Iil1Iili[this.encryptCrypto("AES", "CBC", "Pkcs7", lI1I11II, v2_key, v2_iv)] = "";
              lI1I11II = JSON.stringify(Iil1Iili);
            }
          }
        }
      }
      if (this.super.defenseUrls && this.super.defenseUrls.includes(lIi1lII) && (!ilII1Ili || typeof ilII1Ili === "string" && ilII1Ili.length === 0) && iIiiI111 < 5) {
        await this.initPinToken();
        this.log("ecy重试");
        return await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
      }
      if (!ilII1Ili) {
        return ilII1Ili;
      }
      let Iliil1 = JSON.stringify(ilII1Ili);
      if (/还是去买买买吧/.test(Iliil1)) {
        this.putMsg("火爆账号[" + this.ptpin + "]");
        throw new CustomError("还是去买买买吧");
      }
      if (ilII1Ili?.["data"] === "AUTH.FAILED.VALID") {
        {
          this.putMsg("AUTH.FAILED.VALID");
          throw new CustomError("AUTH.FAILED.VALID");
        }
      }
      if (ilII1Ili?.["data"] === "AUTH.FAILED.BLACK") {
        {
          this.putMsg("AUTH.FAILED.BLACK");
          throw new CustomError("AUTH.FAILED.BLACK");
        }
      }
      if (jinggengcjTypes.includes(this.domain) && Iliil1?.["includes"]("请稍后重试")) return ilII1Ili;
      if (new RegExp(reTryRegx).test(Iliil1) && iIiiI111 < 5) {
        return await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
      }
      if (/(您点的太快了|操作过于频繁)/.test(Iliil1) && iIiiI111 < 5) {
        await this.wait(5000, 6000);
        return await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
      }
      if (/(请求的数字签名不匹配|请求的数字签名已失效)/.test(Iliil1) && iIiiI111 < 5) {
        await this.login(this.isvToken);
        this.log("签名重试");
        return await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
      }
      if (Iliil1.includes("商家token过期") || Iliil1.includes("商家订购过期")) {
        this.putMsg("商家token过期");
        this.super.exit = true;
        throw new CustomError("商家token过期");
      }
      if (iIiiI111 === 0 && /(您尚未开卡，请开卡后再来参与活动吧|活动仅限店铺会员参与哦)/.test(Iliil1)) return await this.openCard(), await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
      return ilII1Ili;
    } catch (Il1Iil1l) {
      {
        if (Il1Iil1l instanceof CustomError) throw new CustomError(Il1Iil1l.message);
        this.log("api " + lIi1lII + " " + iIiiI111 + " " + (Il1Iil1l.response?.["status"] || "") + " " + Il1Iil1l.message);
        if (iIiiI111 > 3) throw new CustomError(Il1Iil1l.message);
        if (this.super.defenseUrls && this.super.defenseUrls.includes(lIi1lII) && [500].includes(Il1Iil1l.response?.["status"])) {
          this.log("ecy重试");
          await this.initPinToken();
          return await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);
        }
        if (this.isProxy(Il1Iil1l.message)) return await this.routerProxy(), await this.api(lIi1lII, IiIliIll, Il1lIll, i1IIl11I, ++iIiiI111);else throw new CustomError(Il1Iil1l.message);
      }
    }
  }
  ["isMaster"](II1II1ll = this.ptpin) {
    return this.super.masterPins.includes(II1II1ll);
  }
  async ["hdbLogin"]() {
    let Ili1l1iI = await this.api("/front/fans/login", {
      "source": "01",
      "token": this.isvToken
    });
    if (Ili1l1iI.code !== "200") {
      {
        this.putMsg(Ili1l1iI.message);
        throw new CustomError(Ili1l1iI.message);
      }
    }
    this.isMember = ![-1].includes(Ili1l1iI.result.grade);
    this.log("登录成功 " + this.isMember);
    this.aesBuyerNick = Ili1l1iI.result.aesBuyerNick;
    !this.isMember && /partitionTeam/.test(this.activityUrl) && (await this.openCard(), this.isMember = true);
    if (!this.isMaster(this.ptpin) && this.isMember && /inviteJoin/.test(this.activityUrl)) throw new CustomError("已经是会员无法助力");
    await this.api("/front/activity/reportPVUV", {
      "source": "01",
      "token": this.isvToken
    });
    let il1i1iiI = await this.api("/front/activity/loadFrontAct", {});
    if (il1i1iiI.code !== "200") {
      {
        this.putMsg("loadFrontAct失败");
        throw new CustomError(il1i1iiI.message);
      }
    }
    this.super.actStartTime = il1i1iiI.result.activity.startTime;
    this.super.actEndTime = il1i1iiI.result.activity.endTime;
    this.super.rule = il1i1iiI.result.activity.remark;
    this.super.shopName = il1i1iiI.result.activity.shopTitle;
    this.super.shopId = il1i1iiI.result.user.shopId;
    this.super.venderId = il1i1iiI.result.user.venderId;
    this.memberStatus = il1i1iiI.result.user.memberStatus;
    this.super.actName = il1i1iiI.result.activity.actName;
    let l1llilll = il1i1iiI.result.isFavouriteShop;
    await this.isBlackShop();
    try {
      !l1llilll && (await this.reportActionLog({
        "actionType": "favouriteShop"
      }));
    } catch (ilill1li) {
      this.log(ilill1li);
    }
    this.super.prizeList.length <= 0 && (await this.getPrizeList());
    let IlIIIli = this.actStartTime - Date.now();
    if (IlIIIli > 0 && IlIIIli < 180000) {
      await this.wait(IlIIIli + 10);
    } else {
      if (this.super.actStartTime > this.timestamp()) {
        {
          this.putMsg("活动未开始");
          this.super.exit = true;
          throw new CustomError("活动未开始");
        }
      }
    }
    if (this.super.actEndTime < this.timestamp()) {
      this.putMsg("活动已结束");
      this.super.exit = true;
      throw new CustomError("活动已结束");
    }
    if (this.super.exit) throw new CustomError("垃圾活动");
    this.super.prizeList && this.super.prizeList.length > 0 && this.super.prizeList.some(I1il111l => ["JD_GOODS", "JD_MARKET"].includes(I1il111l.awardType)) && (this.isMember = await this.openCard(), !this.isMember && this.log("开卡失败"));
    if (!this.isMember && !/inviteJoin/.test(this.activityUrl)) {
      {
        this.putMsg("等级不足");
        throw new CustomError("等级不足");
      }
    }
  }
  async ["reportActionLog"](IIilIl1i) {
    await this.wait(3000, 5000);
    let liil1Ili = await this.api("/front/activity/reportActionLog", IIilIl1i);
    if (liil1Ili.code == "200") {
      this.log(IIilIl1i?.["actionType"] + "操作成功");
    } else {
      !liil1Ili.message.includes("已经关注过") && this.putMsg(liil1Ili.message);
    }
  }
  async ["wx100Login"]() {
    await this.wxJC();
    let ilI1I1I1 = this.UA,
      ii1lIIi1 = ilI1I1I1.split(";"),
      IiIiiI1i = ii1lIIi1[1] == "iPhone" ? true : false,
      IillllI1 = ilI1I1I1.match(/iPhone OS (.+?) /) ? ilI1I1I1.match(/iPhone OS (.+?) /)[1].replace(/_/g, ".") : "-1",
      lII1lIII = this.uuid(),
      iliilIlI = await this.api("/api/user-info/login", {
        "status": "0",
        "activityId": this.activityId,
        "tokenPin": this.isvToken,
        "source": "01",
        "shareUserId": this.super.shareUserId || "",
        "uuid": lII1lIII,
        "client": IiIiiI1i ? "iOS" : ii1lIIi1[1],
        "clientVersion": IiIiiI1i ? ii1lIIi1[2] : "-1",
        "osVersion": IillllI1,
        "model": IiIiiI1i ? "iPhone11,8" : "-1",
        "userAgent": ilI1I1I1
      });
    if (iliilIlI.resp_code !== 0) {
      this.putMsg("登录失败");
      throw new CustomError(iliilIlI.message);
    }
    this.Token = iliilIlI.data.token;
    this.super.venderId = iliilIlI.data.venderId || this.getQueryString(iliilIlI.data.joinInfo.openCardUrl || "", "venderId") || iliilIlI.data.shopId;
    this.super.shopId = iliilIlI.data.shopId;
    this.super.shopName = iliilIlI.data.shopName;
    let i1l1Ilii = iliilIlI.data.joinInfo.joinCodeInfo.joinCode,
      i1lIili1 = iliilIlI.data.joinInfo.joinCodeInfo.joinDes;
    !this.basicInfo && (this.basicInfo = await this.api("/api/active/basicInfo", {
      "activityId": this.activityId
    }));
    this.super.actStartTime = this.basicInfo.data.startTime;
    this.super.actEndTime = this.basicInfo.data.endTime;
    this.super.actName = this.basicInfo.data.actName;
    await this.isBlackShop();
    this.super.prizeList.length === 0 && (await this.getPrizeList());
    if (!this.super.rule) try {
      {
        let {
          data: IlIilI11
        } = await this.api("/api/active/getRule", {});
        this.super.rule = IlIilI11;
      }
    } catch (ilI1li1l) {
      this.log("getRule" + ilI1li1l);
    }
    this.super.prizeList?.["length"] > 0 && this.super.prizeList?.["filter"](iilli1l1 => ![2, 102, /积分抽奖/.test(this.super.actName) ? 4 : 99999].includes(iilli1l1.prizeType) && iilli1l1.leftNum !== 0)["length"] === 0 && (this.putMsg("垃圾活动，积分"), this.super.ext = true);
    await this.wxJC();
    let IIiIII1i = this.super.actStartTime - Date.now();
    if (IIiIII1i > 0 && IIiIII1i < 180000) await this.wait(IIiIII1i + 10);else {
      if (this.super.actStartTime > this.timestamp()) {
        this.putMsg("活动未开始");
        this.super.exit = true;
      }
    }
    this.timestamp() > this.super.actEndTime && (this.putMsg("活动已结束"), this.super.exit = true);
    if (this.super.exit) {
      throw new CustomError("逻辑退出");
    }
    await this.initPinToken();
    try {
      await this.api("/api/task/followShop/follow", {});
    } catch (ll1l1l1) {
      console.log("follow" + ll1l1l1);
    }
    this.isMember = ["1001", "1004"].includes(i1l1Ilii);
    if (["10070"].includes(this.activityType) && !["1005", "1006"].includes(i1l1Ilii) && !this.isMaster()) throw new CustomError("已是会员无法助力，退出");
    if (!this.isMember) {
      {
        if (this.super.prizeList?.["length"] > 0 && this.super.prizeList?.["filter"](lIl11ii => [1, 3, 6, 8, 9, 10].includes(lIl11ii.prizeType) && lIl11ii.leftNum > 0)["length"] > 0) {
          {
            this.isMember = await this.openCard();
            if (!this.isMember) {
              this.log("开卡失败");
            }
          }
        }
      }
    }
    !this.isMember && openCardTypes.includes(this.activityType) && (this.isMember = await this.openCard(), !this.isMember && this.log("开卡失败"));
    iliilIlI = await this.api("/api/user-info/login", {
      "status": "0",
      "activityId": this.activityId,
      "tokenPin": this.isvToken,
      "source": "01",
      "shareUserId": this.shareUserId || "",
      "uuid": lII1lIII,
      "client": IiIiiI1i ? "iOS" : ii1lIIi1[1],
      "clientVersion": IiIiiI1i ? ii1lIIi1[2] : "-1",
      "osVersion": IillllI1,
      "model": IiIiiI1i ? "iPhone11,8" : "-1",
      "userAgent": ilI1I1I1
    });
    this.Token = iliilIlI.data.token;
    i1l1Ilii = iliilIlI.data.joinInfo.joinCodeInfo.joinCode;
    i1lIili1 = iliilIlI.data.joinInfo.joinCodeInfo.joinDes;
    this.log("登录成功 " + i1l1Ilii + " " + i1lIili1);
    if (!["1001"].includes(i1l1Ilii) && !["10070"].includes(this.activityType)) {
      {
        this.putMsg("" + i1lIili1);
        throw Error(i1lIili1);
      }
    }
    await this.initPinToken();
  }
  async ["taskToDo"](lIlllIi1) {
    lIlllIi1.data.taskList.filter(lIl1il1i => ![8, 15, 13].includes(lIl1il1i.taskType * 1)).length === 0 && this.log("没有任务");
    let i11ii1l = lIlllIi1.data.taskList;
    debugger;
    for (let iIli11i of i11ii1l.filter(l1liIlI => l1liIlI.status === 0 && (l1liIlI.completeCount < l1liIlI.finishNum || l1liIlI.completeCount < l1liIlI.maxNum)) || []) {
      try {
        if ([1, 2, 4, 10, 12, 14].includes(iIli11i.taskType)) await this.api("/api/basic/task/toDo", {
          "skuId": "",
          "taskId": iIli11i.taskId
        });else {
          if ([3, 5, 6, 7, 9].includes(iIli11i.taskType)) {
            {
              let liIii1II = iIli11i.skuInfoVO.filter(iIIlIili => iIIlIili.status === 0);
              for (let iIll1ill = 0; iIll1ill < liIii1II.length && (iIll1ill < iIli11i.finishNum || iIll1ill < iIli11i.maxNum); iIll1ill++) {
                await this.api("/api/basic/task/toDo", {
                  "skuId": liIii1II[iIll1ill].skuId,
                  "taskId": iIli11i.taskId
                });
              }
            }
          }
        }
      } catch (ilIilI1) {
        this.log(ilIilI1.message, JSON.stringify(iIli11i));
      }
    }
  }
  async ["send"](lIl1l1i1) {
    await notify.sendNotify(this.name, lIl1l1i1);
  }
  async ["sendMessage"](IIliiiII, lIIIi1li = 0, I11l11ii = process.env.TG_USER_ID, l1Ill1I1 = process.env.TG_BOT_TOKEN) {}
  async ["isvObfuscator"](illili1l = isvTokenRetryCount, iiIiIi1I = this.cookie) {
    let ii1Ii1i = "isvObfuscator:" + this.ptpin;
    if (illili1l === isvTokenRetryCount) {
      {
        let I1il1ll1 = await this.rget(ii1Ii1i);
        if (I1il1ll1) {
          {
            this.isvToken = I1il1ll1;
            return;
          }
        }
      }
    }
    let lI1Iilil = "";
    try {
      let l1liIliI = await this.sign("isvObfuscator", {
        "id": "",
        "url": "https://" + this.domain
      });
      if (l1liIliI.sign) {
        lI1Iilil = l1liIliI.sign;
      }
      let IilIi1i = "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        lll11IIl = {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-cn",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Host": "api.m.jd.com",
          "Cookie": iiIiIi1I,
          "User-Agent": "JD4iPhone/168069 (iPhone; iOS 13.7; Scale/3.00)"
        },
        {
          status: li1llill,
          data: llI1Iill
        } = await this.request(IilIi1i, lll11IIl, lI1Iilil);
      if (llI1Iill?.["token"]) await this.rcache(ii1Ii1i, llI1Iill.token, this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000);else {
        if (llI1Iill?.["code"] === "3" && llI1Iill?.["errcode"] === 264) {
          {
            this.putMsg("ck失效");
            throw new CustomError("ck失效");
          }
        } else this.log("实时获取token " + illili1l + ", " + JSON.stringify(llI1Iill));
      }
      this.isvToken = llI1Iill.token;
      return;
    } catch (Illi1Ii1) {
      if (Illi1Ii1 instanceof CustomError) {} else {
        if (illili1l > 0 && this.isProxy(Illi1Ii1.message)) return this.log("第" + (isvTokenRetryCount - illili1l) + "去重试isvObfuscator接口,等待" + isvObfuscatorRetryWait + "秒"), await this.routerProxy(), await this.isvObfuscator(--illili1l);
      }
    }
    throw new CustomError("isvToken获取失败");
  }
  ["ua"](iiIiI1lI = "jd") {
    return this.UARAM();
  }
  ["_ruas"](ll11Ii11) {
    let iiil1lII = "0123456789abcdef",
      il111l1I = "";
    for (let lI1llii = 0; lI1llii < ll11Ii11; lI1llii++) {
      il111l1I += iiil1lII[Math.ceil(100000000 * Math.random()) % iiil1lII.length];
    }
    return il111l1I;
  }
  ["_ruaa"](IiilIlIl, il1lIlI) {
    let illil1li = [];
    for (let ll111I1i in IiilIlIl) {
      illil1li.push(IiilIlIl[ll111I1i]);
    }
    let l111l11i = [];
    for (let IiiiiiI1 = 0; IiiiiiI1 < il1lIlI; IiiiiiI1++) {
      {
        if (illil1li.length > 0) {
          {
            let i1iliil1 = Math.floor(Math.random() * illil1li.length);
            l111l11i[IiiiiiI1] = illil1li[i1iliil1];
            illil1li.splice(i1iliil1, 1);
          }
        } else {
          break;
        }
      }
    }
    return l111l11i;
  }
  ["UARAM"](IiIiIii = "jd") {
    const IIlliIl = {
      "A": "K",
      "B": "L",
      "C": "M",
      "D": "N",
      "E": "O",
      "F": "P",
      "G": "Q",
      "H": "R",
      "I": "S",
      "J": "T",
      "K": "A",
      "L": "B",
      "M": "C",
      "N": "D",
      "O": "E",
      "P": "F",
      "Q": "G",
      "R": "H",
      "S": "I",
      "T": "J",
      "e": "o",
      "f": "p",
      "g": "q",
      "h": "r",
      "i": "s",
      "j": "t",
      "k": "u",
      "l": "v",
      "m": "w",
      "n": "x",
      "o": "e",
      "p": "f",
      "q": "g",
      "r": "h",
      "s": "i",
      "t": "j",
      "u": "k",
      "v": "l",
      "w": "m",
      "x": "n"
    };
    let I1lIiI1I = this._ruaa([12, 13, 14, 15, 16], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1),
      iliIiII = {
        "ciphertype": 5,
        "cipher": {
          "ud": "",
          "sv": "",
          "iad": ""
        },
        "ts": parseInt(new Date().getTime() / 1000),
        "hdid": "",
        "version": "1.0.3",
        "appname": "",
        "ridx": -1
      };
    iliIiII.cipher.sv = new Buffer.from(I1lIiI1I).toString("base64").split("").map(IIIIlll1 => IIlliIl[IIIIlll1] || IIIIlll1).join("");
    iliIiII.cipher.ud = new Buffer.from(this._ruas(40)).toString("base64").split("").map(IIiIl1i1 => IIlliIl[IIiIl1i1] || IIiIl1i1).join("");
    iliIiII.appname = "com.360buy.jdmobile";
    iliIiII.hdid = "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=";
    iliIiII.appname = "com.jd.jdmobilelite";
    iliIiII.hdid = "ViZLFbOc+bY6wW3m9/8iSFjgglIbmHPOGSM9aXIoBes=";
    iliIiII.ridx = 1;
    return IiIiIii === "jd" ? "jdapp;iPhone;" + (this._ruaa([9, 10, 11], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5], 1)) + ";;;M/5.0;appBuild/168341;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(iliIiII)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + I1lIiI1I.replace(/\./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;" : "jdltapp;iPhone;" + (this._ruaa([4, 5, 6], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + "." + this._ruaa([0, 1, 2, 3, 4, 5], 1)) + ";;;M/5.0;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;hasOCPay/0;appBuild/1338;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/" + encodeURIComponent(JSON.stringify(iliIiII)) + ";Mozilla/5.0 (iPhone; CPU iPhone OS " + I1lIiI1I.replace(/./g, "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  }
  ["_tk"]() {
    let iIiIl1I1 = function (iiIi1iI1) {
        {
          let i1illlI1 = "abcdefghijklmnopqrstuvwxyz1234567890",
            Il1iIl1i = "";
          for (let lll1IIII = 0; lll1IIII < iiIi1iI1; lll1IIII++) {
            Il1iIl1i += i1illlI1[Math.floor(i1illlI1.length * Math.random())];
          }
          return Il1iIl1i;
        }
      }(40),
      IiillilI = Date.now().toString(),
      l1iIi1 = this.md5("" + decodeURIComponent(this.username) + IiillilI + iIiIl1I1 + "tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy");
    return {
      "ts": IiillilI,
      "id": iIiIl1I1,
      "tk": l1iIi1
    };
  }
  ["v"](li11IiI) {
    let iIl1ii1 = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
    var llI1IIlI = li11IiI.nowTime + parseInt(this.tickets.get("te"));
    let iliiII1 = this.tickets.get("pToken");
    li11IiI.nowTime = llI1IIlI;
    for (var IliIiiI = iliiII1 + llI1IIlI, I11I1il1 = IliIiiI.substring(0, IliIiiI.length - 5), II1llIl1 = "", ilIli11 = 0; ilIli11 < I11I1il1.length; ilIli11++) {
      var lI1IliiI = I11I1il1.charCodeAt(ilIli11);
      II1llIl1 += iIl1ii1[lI1IliiI % 10][ilIli11];
    }
    for (var liiiliI = II1llIl1.length, lIllIl1 = Math.floor(liiiliI / 24), iIilli = "", ll1llI1l = 0; ll1llI1l < 24; ll1llI1l++) {
      var i111IIiI = (ll1llI1l + 1) * lIllIl1;
      23 === ll1llI1l && (i111IIiI = liiiliI);
      for (var il1lliI = II1llIl1.substring(ll1llI1l * lIllIl1, i111IIiI), lllIIi1l = [], ii1li1i1 = 0; ii1li1i1 < il1lliI.length; ii1li1i1++) {
        lllIIi1l.push(il1lliI.charCodeAt(ii1li1i1));
      }
      var i1l1lii1 = lllIIi1l.reduce(function (ll1i11I, lllil1iI) {
          return ll1i11I + lllil1iI;
        }, 0),
        lilli1I1 = Math.floor(i1l1lii1 / lllIIi1l.length);
      iIilli += String.fromCharCode(lilli1I1);
    }
    var IiIllII = function (i1Iili11) {
        i1Iili11 = i1Iili11.split("").reverse().join("");
        for (var ililIIIl = new Uint8Array(12), llIIiIii = new TextEncoder().encode(i1Iili11), l1llllI = 0; l1llllI < llIIiIii.length; l1llllI += 2) {
          {
            var lI1i1ll1 = llIIiIii[l1llllI] << 5 | 255 & llIIiIii[l1llllI + 1];
            lI1i1ll1 %= 63;
            ililIIIl[l1llllI >> 1] = lI1i1ll1;
          }
        }
        for (var IliIlili = "", IIiIlI = 0; IIiIlI < ililIIIl.length; IIiIlI++) {
          IliIlili += (ililIIIl[IIiIlI] + 256).toString(2).slice(1);
        }
        for (var i1l1I1i1 = "", IiIIi1Ii = "", iI11ill = 0; iI11ill < 16; iI11ill++) {
          if (0 !== iI11ill) {
            {
              for (var Il1i11l = 6 * iI11ill, l1I1iiIl = IliIlili.substring(Il1i11l, Il1i11l + 6), iiil1Iii = parseInt(l1I1iiIl, 2), iiI1Il = IiIIi1Ii.split(""), l11liI1 = 0; l11liI1 < iiI1Il.length; l11liI1++) {
                "1" === iiI1Il[l11liI1] && (iiil1Iii = 63 & (iiil1Iii >> 6 - l11liI1 | iiil1Iii << l11liI1));
              }
              IiIIi1Ii = (63 & iiil1Iii).toString(2).padStart(6, "0");
            }
          } else IiIIi1Ii = IliIlili.substring(0, 6);
          i1l1I1i1 += IiIIi1Ii;
        }
        for (var IIiiIlii = 0; IIiiIlii < 12; IIiiIlii++) {
          {
            var lI1lI = 8 * IIiiIlii;
            ililIIIl[IIiiIlii] = parseInt(i1l1I1i1.substring(lI1lI, lI1lI + 8), 2);
          }
        }
        return base64.encode(String.fromCharCode.apply(null, ililIIIl));
      }(II1llIl1 = iIilli),
      iIlIliII = CryptoJS.enc.Utf8.parse(IiIllII),
      II1I1lI = CryptoJS.enc.Utf8.parse("");
    return CryptoJS.AES.encrypt(JSON.stringify(li11IiI), iIlIliII, {
      "iv": II1I1lI,
      "mode": CryptoJS.mode.ECB,
      "padding": CryptoJS.pad.Pkcs7
    }).toString();
  }
  ["encryptCrypto"](i1i1li1l, i11IIiiI, illlI1Il, I1l1IllI, I1ilil11, Illllii, IiiIiiii = "Utf8", II1iIIiI = "Base64") {
    return CryptoJS[i1i1li1l].encrypt(CryptoJS.enc[IiiIiiii].parse(typeof I1l1IllI === "string" ? I1l1IllI : JSON.stringify(I1l1IllI)), CryptoJS.enc.Utf8.parse(I1ilil11), {
      "mode": CryptoJS.mode[i11IIiiI],
      "padding": CryptoJS.pad[illlI1Il],
      "iv": CryptoJS.enc.Utf8.parse(Illllii)
    }).ciphertext.toString(CryptoJS.enc[II1iIIiI]);
  }
  ["decryptCrypto"](IIll1il1, iiiIIil, lli11ili, iiiilli1, I11iIlil, llIiIiiI, lIlIlI1I = "Base64", IIIl1i1l = "Utf8") {
    const II1iIIl1 = CryptoJS[IIll1il1].decrypt({
      "ciphertext": CryptoJS.enc[lIlIlI1I].parse(iiiilli1)
    }, CryptoJS.enc.Utf8.parse(I11iIlil), {
      "mode": CryptoJS.mode[iiiIIil],
      "padding": CryptoJS.pad[lli11ili],
      "iv": CryptoJS.enc.Utf8.parse(llIiIiiI)
    }).toString(CryptoJS.enc[IIIl1i1l]);
    return II1iIIl1.startsWith("{") && II1iIIl1.endsWith("}") || II1iIIl1.startsWith("[") && II1iIIl1.endsWith("]") ? JSON.parse(II1iIIl1) : II1iIIl1;
  }
  ["jinggengjcqBody"](li1iil11, llI11lli) {
    let I1IIl1Il = li1iil11.match(/dm\/front(.+)\?/)[1];
    delete llI11lli.method;
    let i1Ill1iI = {
        "actId": this.activityId,
        ...llI11lli,
        "method": I1IIl1Il,
        "userId": this.userId,
        "buyerNick": this.buyerNick || ""
      },
      il1IiIII = this.mpdzSign(i1Ill1iI),
      IliIi1i1 = "94854284";
    const i1l1IlI1 = {
      "jsonRpc": "2.0",
      "params": {
        "commonParameter": {
          "appkey": IliIi1i1,
          "m": "POST",
          "oba": il1IiIII.sign,
          "timestamp": il1IiIII.timeStamp,
          "userId": this.userId
        },
        "admJson": {
          "actId": this.activityId,
          ...llI11lli,
          "method": I1IIl1Il,
          "userId": this.userId,
          "buyerNick": this.buyerNick || ""
        }
      }
    };
    I1IIl1Il?.["indexOf"]("missionInviteList") > -1 && delete i1l1IlI1.params.admJson.actId;
    return JSON.stringify(i1l1IlI1);
  }
  ["mpdzSign"](i1IIlil) {
    let iiI1Iil1 = "6cc5dbd8900e434b94c4bdb0c16348ed",
      Ili11Iii = "c1614da9ac68",
      lIlili1 = new Date().valueOf(),
      iIiil11l = encodeURIComponent(JSON.stringify(i1IIlil)),
      i1lIiiII = new RegExp("'", "g"),
      iIl11ili = new RegExp("~", "g");
    iIiil11l = iIiil11l.replace(i1lIiiII, "%27");
    iIiil11l = iIiil11l.replace(iIl11ili, "%7E");
    let Illil11i = "f" + Ili11Iii + "D" + iIiil11l + "c" + lIlili1 + iiI1Iil1,
      iI1iliI = CryptoJS.MD5(Illil11i.toLowerCase()).toString();
    return {
      "sign": iI1iliI,
      "timeStamp": lIlili1
    };
  }
  ["hdbBody"](iliIi1ii, lIi1li, iI1I111) {
    let lii1ilI = this.aesBuyerNick,
      iil1ili = Date.now(),
      llliI11 = {
        "appJsonParams": {
          "id": this.activityId,
          "userId": this.super.venderId,
          "shopId": this.super.shopId || this.super.venderId,
          ...lIi1li,
          "buyerNick": lii1ilI,
          "method": iliIi1ii
        },
        "sysParams": {
          "sysmethod": JSON.stringify(iliIi1ii).replace(/[^\u4e00-\u9fa5\w]/g, ""),
          "timestamp": iil1ili,
          "actid": this.activityId
        }
      };
    lIi1li && (lIi1li = llliI11);
    !lii1ilI && (delete lIi1li.appJsonParams.buyerNick, delete lIi1li.sysParams.buyernick);
    this.tickets.get("_sk") ? iI1I111._sk = this.tickets.get("_sk") : "";
    this.tickets.get("zxhd_aes_buyer_nick") ? iI1I111._dzf = this.tickets.get("zxhd_aes_buyer_nick") : "";
    let liIi1i1i = "actid" + this.activityId + "buyernick" + (lii1ilI || "undefined") + "sysmethod" + JSON.stringify(iliIi1ii).replace(/[^\u4e00-\u9fa5\w]/g, "") + "timestamp" + iil1ili,
      iI1lii1i = iI1I111._sk || "1111";
    lIi1li.sysParams.sign = CryptoJS.HmacSHA256(liIi1i1i, iI1lii1i).toString(CryptoJS.enc.Hex);
    return lIi1li;
  }
  ["filterUrl"](I1illl1I) {
    if (I1illl1I === null) {
      return null;
    }
    const l11l11ii = new URLSearchParams(new URL(I1illl1I).search),
      II1l1I1 = [];
    for (const [Ii1ilI1, i1iliIil] of l11l11ii.entries()) {
      {
        if (keywords.includes(Ii1ilI1)) continue;
        II1l1I1.push(Ii1ilI1 + "=" + i1iliIil);
      }
    }
    if (II1l1I1.length > 0) {
      return I1illl1I.split("?")[0] + "?" + II1l1I1.join("&");
    }
    return I1illl1I;
  }
  ["match"](lilIl1, IIlIili) {
    lilIl1 = lilIl1 instanceof Array ? lilIl1 : [lilIl1];
    for (let iII1i1lI of lilIl1) {
      const I111l1I = iII1i1lI.exec(IIlIili);
      if (I111l1I) {
        {
          const I1I1lilI = I111l1I.length;
          if (I1I1lilI === 1) return I111l1I;else {
            if (I1I1lilI === 2) return I111l1I[1];else {
              {
                const iiI1l1l1 = [];
                for (let lilili1i = 1; lilili1i < I1I1lilI; lilili1i++) {
                  iiI1l1l1.push(I111l1I[lilili1i]);
                }
                return iiI1l1l1;
              }
            }
          }
        }
      }
    }
    return "";
  }
  async ["buildActInfo"]() {
    if (!this.activityUrl) {
      return;
    }
    this.activityUrl = this.filterUrl(this.activityUrl);
    this.activityUrl = this.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, this.activityUrl);
    this.activityUrl = this?.["activityUrl"]?.["replace"](/(isvjd|lzkjdz|cjhydz|lzkjdzisv|cjhydzisv)/g, iI11iilI => {
      switch (iI11iilI) {
        case "isvjd":
          return "isvjcloud";
        case "lzkjdz":
          return "lzkj";
        case "cjhydz":
          return "cjhy";
        case "lzkjdzisv":
          return "lzkj-isv";
        case "cjhydzisv":
          return "cjhy-isv";
        default:
          return iI11iilI;
      }
    }) || "";
    this.domain = this.match(/https?:\/\/([^/]+)/, this.activityUrl);
    this.activityId = this.getActivityId(this.activityUrl);
    while (this.activityId.startsWith("https")) {
      this.activityUrl = this.activityId;
      this.activityId = this.getActivityId(this.activityUrl);
    }
    this.activityType = this.getQueryString(this.activityUrl, "activityType");
    disableActivityType.includes(this.activityType) && this.putMsg("垃圾活动");
    this.venderId = this.getQueryString(this.activityUrl, "user_id") || this.getQueryString(this.activityUrl, "userId") || this.match(/\/m\/(\d+)\//, this.activityUrl) || this.getQueryString(this.activityUrl, "venderId");
    this.userId = this.venderId;
    this.shopId = this.getQueryString(this.activityUrl, "shop_id") || this.getQueryString(this.activityUrl, "shopid") || this.getQueryString(this.activityUrl, "shopId") || this.shopId;
    this.templateId = this.getQueryString(this.activityUrl, "templateId");
    this.is100V2Type = /\/interaction\/v2\//.test(this.activityUrl);
    if (this.is100V2Type) {
      let Iilill1 = this.activityUrl.match(/interaction\/v2\/(\d+)\/(\d+)/);
      this.activityType = Iilill1?.[1];
      this.templateCode = Iilill1?.[2];
    }
    this.activityUrl && (this.urlPrefix = Object.keys(urlPrefixes).find(l1lI11ii => this.activityUrl.match(urlPrefixes[l1lI11ii])) || "");
  }
  ["rsaEncrypt"](iIIil1i, II11i1i, lII1iI1i) {
    iIIil1i = "-----BEGIN PUBLIC KEY-----\n" + iIIil1i + "\n-----END PUBLIC KEY-----";
    let il1iill = new NodeRSA(iIIil1i);
    il1iill.setOptions(II11i1i);
    return il1iill.encrypt(lII1iI1i, "base64");
  }
  ["getQueryString"](ii1iliiI, i11IIlIl) {
    let IiiiiIli = new RegExp("(^|[&?])" + i11IIlIl + "=([^&]*)(&|$)"),
      IliIiIii = ii1iliiI.match(IiiiiIli);
    if (IliIiIii != null && IliIiIii[2] !== "undefined") return decodeURIComponent(IliIiIii[2]);
    return "";
  }
  ["getActivityId"](i1ilI1 = this.activityUrl) {
    const IIil111I = new URLSearchParams(new URL(i1ilI1).search),
      lIi1ll = ["activityId", "giftId", "actId", "token", "code", "a", "id"];
    let Il1lI1I = "";
    for (let iiiiillI of lIi1ll) {
      Il1lI1I = IIil111I.get(iiiiillI);
      if (Il1lI1I) {
        break;
      }
    }
    !Il1lI1I && (Il1lI1I = this.match(/\/(dz[a-zA-Z0-9]{28,32})/, i1ilI1));
    this.activityId = Il1lI1I;
    return this.activityId;
  }
  ["runTasks"]() {
    while (this.currentRunning < this.concurrencyLimit && !this.exit && this.taskQueue.length > 0) {
      try {
        const iIi1lIIl = this.taskQueue.shift();
        this.currentRunning++;
        iIi1lIIl().then(() => {
          this.currentRunning--;
          this.runTasks();
        }).catch(iIllI1II => {
          this.log("异常退出 " + iIllI1II.message);
          this.currentRunning--;
          this.runTasks();
        });
      } catch (lliI1I1) {
        console.log("runtask" + lliI1I1);
      }
    }
  }
  ["randomArray"](IIiliiiI, iilII1lI) {
    iilII1lI = iilII1lI || IIiliiiI.length;
    let IiIIli1I = IIiliiiI.slice(0),
      iliIliI = IIiliiiI.length,
      IiliIlI = iliIliI - iilII1lI,
      IiiIiiil,
      Iii1IIll;
    while (iliIliI-- > IiliIlI) {
      Iii1IIll = Math.floor((iliIliI + 1) * Math.random());
      IiiIiiil = IiIIli1I[Iii1IIll];
      IiIIli1I[Iii1IIll] = IiIIli1I[iliIliI];
      IiIIli1I[iliIliI] = IiiIiiil;
    }
    return IiIIli1I.slice(IiliIlI);
  }
  async ["unfollow"](l1i1l11I = this.super.shopId) {
    let ll11illi = {
        "authority": "api.m.jd.com",
        "accept": "*/*",
        "origin": "https://shop.m.jd.com",
        "referer": "https://shop.m.jd.com/",
        "user-agent": this.UA,
        "Cookie": this.cookie
      },
      lIlilI1I = {
        "shopId": l1i1l11I,
        "follow": false
      },
      iI1ii1Il = "https://api.m.jd.com/client.action?functionId=whx_followShop&appid=shop_view&body=" + encodeURIComponent(JSON.stringify(lIlilI1I)),
      {
        data: ii1llIiI
      } = await this.request(iI1ii1Il, ll11illi);
    return ii1llIiI;
  }
  async ["getShopInfo"](I1lIIi = this.super.venderId, ll1111li = this.super.shopId) {
    try {
      {
        if (this.super.shopName) {
          return {
            "shopId": ll1111li,
            "venderId": I1lIIi,
            "shopName": this.super.shopName
          };
        }
        let iill1l1I = "";
        if (I1lIIi) iill1l1I = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&venderId=" + I1lIIi + "&_=" + this.timestamp();else ll1111li && (iill1l1I = "https://chat1.jd.com/api/checkChat?callback=jQuery7749929&shopId=" + ll1111li + "&_=" + this.timestamp());
        let i1l11lIl = await this.request(iill1l1I, {
          "authority": "chat1.jd.com",
          "Accept": "*/*",
          "Connection": "keep-alive",
          "Cookie": this.cookie,
          "User-Agent": this.ua(),
          "Accept-Language": "zh-cn",
          "Accept-Encoding": "gzip, deflate",
          "referer": "https://mall.jd.com/shopBrandMember-" + (I1lIIi || ll1111li) + ".html"
        });
        const lII1Ii1i = JSON.parse(i1l11lIl?.["data"]?.["replace"](/^jQuery\d+\(/, "")?.["replace"](/\);$/, "") || "{}");
        this.super.shopName = lII1Ii1i.seller;
        this.super.shopId = lII1Ii1i.shopId;
        this.super.venderId = lII1Ii1i.venderId;
        return {
          "shopId": lII1Ii1i.shopId,
          "venderId": lII1Ii1i.venderId,
          "shopName": lII1Ii1i.seller
        };
      }
    } catch (lIII1I1l) {
      console.log("getShopInfo" + lIII1I1l);
    }
  }
  ["readFileSync"](IIll1l1) {
    try {
      return fs.readFileSync(IIll1l1).toString();
    } catch (iilil1i) {
      console.log(IIll1l1, "文件不存在进行创建");
      this.writeFileSync(IIll1l1, "");
      return "";
    }
  }
  ["writeFileSync"](iilIiiil, l1i1I1Ii) {
    fs.writeFileSync(iilIiiil, l1i1I1Ii);
  }
  async ["auth"]() {
    if (this.activityUrl) try {
      let {
        data: i11lilil
      } = await this.request("http://43.138.16.15:7706/auth", {
        "Cookie": "authority",
        "auth": apiToken,
        "_vs": this.superVersion,
        "_cs": cookies?.["length"] || 0
      }, {
        "data": this.activityUrl,
        "_ph": this.filename
      });
      this.log(Object.keys(i11lilil.data.fn).length);
      this.fn = i11lilil.data.fn;
      this.log(Object.keys(i11lilil.data.fn).length);
    } catch (Il11liii) {}
  }
  async ["calculateAndWait"](illIIIli) {
    const il11lIiI = new Date(illIIIli),
      iili1li1 = new Date(),
      I1IllIll = il11lIiI - iili1li1,
      IilliiI = Math.floor(I1IllIll / 1000);
    if (IilliiI > 60) {
      const i11i1i = IilliiI - 60;
      this.log("超过1分钟，还差 " + i11i1i + " 秒");
    } else this.log("计算距离下一分钟的等待时间 " + IilliiI + "秒"), await this.wait(I1IllIll);
  }
  ["isMasterRunMode"]() {
    return this.runMode === "master" || this.super?.["runMode"] === "master";
  }
  ["isTeamRunMode"]() {
    return this.runMode === "team" || this.super?.["runMode"] === "team";
  }
  async ["start"](II1llll) {
    try {
      this._start = Date.now();
      await this.buildActInfo();
      this.log("活动链接 " + this.activityUrl + " " + this.activityType + " " + this.venderId);
      await this.auth();
      Promise.resolve().then(() => this.forceQuit());
      if (this.filename.includes("_wx_")) {
        await this.releaseLock("IPS:GET", "X");
        Promise.resolve().then(() => this.extractIp());
      }
      await this.buildAccount();
      try {
        if (process.env.M_WX_WHITELIST) {
          {
            let ill11IlI = process.env.M_WX_WHITELIST.split("-"),
              I1ii11lI = cookies.slice(ill11IlI[0] - 1, ill11IlI[1] * 1),
              li1I1Iii = this.randomArray(cookies.slice(ill11IlI[1] * 1, cookies.length));
            this.log("固定车位：" + I1ii11lI.length);
            this.log("随机车位：" + li1I1Iii.length);
            cookies = I1ii11lI.concat(li1I1Iii);
          }
        }
      } catch (iil111I) {
        this.log("rck " + iil111I);
      }
      await this.filterCookie();
      this.log("动态设置车头,预设数量:" + this.masterPins.length + " 纠正数量:" + this.masterNum);
      this.isMasterRunMode() && (this.concurrencyLimit = this.masterNum, cookies = cookies.slice(0, this.masterNum));
      this.cookies = cookies;
      this.log("当前并发量:" + this.concurrencyLimit + " 车头数:" + this.masterNum + " 总任务数:" + this.cookies.length);
      for (let il1IilI1 = 0; il1IilI1 < this.cookies.length; il1IilI1++) {
        const lIIIllIl = new II1llll();
        lIIIllIl.cookie = this.cookies[il1IilI1];
        lIIIllIl.ptpin = lIIIllIl.cookie.match(/pt_pin=(.+?);/) && lIIIllIl.cookie.match(/pt_pin=(.+?);/)[1];
        lIIIllIl.index = il1IilI1 + 1;
        lIIIllIl.super = this;
        lIIIllIl.domain = this.domain;
        lIIIllIl.activityUrl = this.activityUrl;
        lIIIllIl.activityId = this.activityId;
        lIIIllIl.activityType = this.activityType;
        lIIIllIl.UA = this.ua();
        this.userEnv.set(lIIIllIl.ptpin, lIIIllIl);
        if (this.exit) {
          break;
        }
        this.addTask(() => lIIIllIl.exec());
      }
      await this.wait(500);
      while (this.currentRunning > 0 && !this.exit) {
        await this.wait(100);
      }
      let IIi1lli = Date.now();
      const lI1l1i = this.msg;
      for (let ili11II of this.userEnv.values()) {
        {
          if (ili11II.message.length > 0) {
            let lliilll = ili11II.index + "【" + this.desensitizeString(ili11II.ptpin) + "】" + ili11II.message.join(",");
            this.log(lliilll);
            lI1l1i.push(lliilll);
          }
        }
      }
      try {
        this.rule && this.log(this.rule);
        lI1l1i.length > 0 && lI1l1i.push("");
        this.actName && lI1l1i.push("活动名称:" + this.actName);
        this.shopName && lI1l1i.push("#" + this.shopName);
        this.shopId && this.venderId && lI1l1i.push("店铺信息:" + this.shopId + "_" + this.venderId);
        if (this.actStartTime || this.actEndTime) {
          {
            if (this.actStartTime && !("" + this.actStartTime).includes("-")) {
              this.actStartTime = this.formatDate(this.actStartTime, "yyyy-MM-dd HH:mm:ss");
            }
            if (this.actEndTime && !("" + this.actEndTime).includes("-")) {
              this.actEndTime = this.formatDate(this.actEndTime, "yyyy-MM-dd HH:mm:ss");
            }
            lI1l1i.push("活动时间:" + (this.actStartTime || "") + "至" + (this.actEndTime || ""));
          }
        }
        try {
          await this.after();
        } catch (lIllIIil) {
          console.log(lIllIIil);
        }
        (this.shopId || this.userId || this.venderId) && (lI1l1i.push(""), lI1l1i.push("https://shop.m.jd.com/shop/home?shopId=" + (this.shopId || this.userId || this.venderId || "")));
      } catch (lIiilill) {
        console.log("after error" + lIiilill.message);
      }
      let iIlilII = "时间：" + this.now() + " 时长：" + ((IIi1lli - this._start) / 1000).toFixed(2) + "s";
      this.log(iIlilII);
      lI1l1i.push("\n" + iIlilII);
      await this.send(lI1l1i.join("\n"));
      console.log(this.currentRunning);
      this.log("All tasks completed");
      await this.wait(2000);
      process.exit(0);
    } catch (i1l1II1I) {
      console.log(i1l1II1I);
    } finally {
      {
        console.log("quit");
        try {
          await redis.quit();
        } catch (III1li1i) {}
      }
    }
  }
  async ["after"]() {}
  async ["buildAccount"]() {
    let l1lliiII = "";
    try {
      if (mode) l1lliiII = this.readFileSync("/home/magic/Work/wools/doc/account.json");else {
        if (fs.existsSync("utils/account.json")) l1lliiII = this.readFileSync("utils/account.json");else fs.existsSync("/jd/config/account.json") ? l1lliiII = this.readFileSync("/jd/config/account.json") : l1lliiII = this.readFileSync("account.json");
      }
      l1lliiII && JSON.parse(l1lliiII).forEach(i1IlIll => {
        this.accounts[i1IlIll.pt_pin] = i1IlIll;
      });
    } catch (I1llii11) {
      console.log("account.json读取异常", I1llii11);
    }
  }
  async ["_algo"](iiiillll = 0) {
    if (/(activityType|jinggeng|hdb-isv|jingyun-rc)/.test(this.activityUrl)) return;
    let lII1lIIl = {
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Cookie": "pt_key=AAJjTLJMADBWEqzvHb5nGrz1wdG6JbtoJQLyH6mpJr3gewZEo0gxnbrW7gHn0r_-0tG4oRM8PO0;pt_pin=jd_578f2e5ca172b;"
    };
    try {
      if (this.domain.includes("lzkj") || this.domain.includes("lzdz") || this.domain.includes("cjhy")) {
        if (this.activityUrl.match(wxTeamInitUrl)) {
          let {
            status: lI1lil11,
            data: ll1liil
          } = await this.request("https://" + this.domain + "/wxTeam/activity?activityId=" + this.activityId, lII1lIIl);
        } else {
          {
            let {
              status: l1iil1l1,
              data: I1liIllI
            } = await this.request("" + this.activityUrl, lII1lIIl);
          }
        }
      } else {
        let {
          status: IilI1II1,
          data: IlI1iiI
        } = await this.request(this.activityUrl, lII1lIIl);
      }
    } catch (ii1IIli) {
      this.log("_algo " + ii1IIli.message);
      iiiillll < 3 && this.isProxy(ii1IIli.message) && (await this.routerProxy(0), this.log("493去重试，第" + iiiillll + "次重试..."), await this._algo(++iiiillll));
    }
  }
  async ["wait"](I1liIili, llI1iil) {
    if (I1liIili <= 0) return;
    return llI1iil ? new Promise(i1iII1I => setTimeout(i1iII1I, this.random(I1liIili, llI1iil))) : new Promise(iIII1l1 => setTimeout(iIII1l1, I1liIili));
  }
  async ["forceQuit"](IIiili = parseInt(process.env?.["M_TIMEOUT"] || 3)) {
    while ((Date.now() - _currentTime) / 1000 / 60 < IIiili) {
      console.log("进程监控中...");
      await this.wait(30000);
    }
    console.log("进程超时，强制退出");
    process.exit(0);
  }
  ["random"](i1llI1I1, Ii1Iii11) {
    return Math.min(Math.floor(i1llI1I1 + Math.random() * (Ii1Iii11 - i1llI1I1)), Ii1Iii11);
  }
  async ["extractIp"]() {
    while (true) {
      await this.routerProxy(1);
      await this.wait(10000);
    }
  }
}
module.exports = {
  "Env": Env,
  "cheerio": cheerio
};