//Sun Jul 07 2024 15:59:41 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let tokensList = (process.env.jd_dpqd_tokens || "").split(",") || [],
  taskThreads = process.env.jd_dpqd_task_threads || "1",
  accountThreads = process.env.jd_dpqd_account_threads || "1";
const runInterval = process.env.jd_dpqd_account_interval || "";
let signHotMaxRetryTimes = process.env.jd_dpqd_max_retry || "0";
const isNotify = process.env.jd_dpqd_prize_notify === "true";
let TokensMap = new Map();
const signStatusMessages = {
    403030023: "今日已签",
    404130026: "已达到签到上限",
    407100001: "活动尚未开始",
    407100002: "活动已经结束",
    407000007: "账号无效",
    402: "活动无效",
    "-1": "服务器繁忙"
  },
  invalidTokensMap = new Map(),
  CacheFile = __dirname + "/dpqd_tokens.json",
  cookiesArr = Object.keys(jdCookie).map(l1lllI1i => jdCookie[l1lllI1i]).filter(l11llii1 => l11llii1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  try {
    notify.config({
      "title": $.name
    });
    if (tokensList.length > 0) tokensList = [...new Set(tokensList.filter(i11IlIil => i11IlIil !== ""))];
    if (tokensList.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }
    const I1IlII = require("fs");
    if (I1IlII.existsSync(CacheFile)) {
      const lIl1i11l = I1IlII.readFileSync(CacheFile, "utf-8"),
        illIiII1 = JSON.parse(lIl1i11l);
      for (const l1illIiI in illIiII1) {
        TokensMap.set(l1illIiI, illIiII1[l1illIiI]);
      }
    }
    $.waitTime = null;
    if (runInterval) try {
      const li1111I = parseInt(runInterval);
      li1111I >= 0 && ($.waitTime = li1111I);
    } catch {
      console.log("⚠ 自定义运行间隔时长设置错误");
    }
    try {
      const liillil1 = parseInt(signHotMaxRetryTimes);
      signHotMaxRetryTimes = liillil1 > 0 ? liillil1 : 0;
    } catch {
      signHotMaxRetryTimes = 3;
    }
    try {
      const llIilili = parseInt(taskThreads);
      llIilili > 0 && llIilili !== 1 && (taskThreads = llIilili);
    } catch {
      taskThreads = 1;
    }
    try {
      const IllIlIlI = parseInt(accountThreads);
      IllIlIlI > 0 && IllIlIlI !== 1 && (accountThreads = IllIlIlI);
    } catch {
      accountThreads = 1;
    }
    await common.concTask(accountThreads, cookiesArr, async (iiiI1iIi, Il1l1Ili) => {
      await concMain(taskThreads, tokensList, iiiI1iIi, Il1l1Ili, Main);
      if ($.waitTime) await $.wait($.waitTime);
    });
    isNotify && notify.getMessage() && (await notify.push());
  } catch (l11i1Iii) {
    console.log("❌ 脚本运行遇到了错误\n" + l11i1Iii);
  }
})().catch(i1iii1Ii => $.logErr(i1iii1Ii)).finally(() => $.done());
async function Main(Iil1lIlI, II1Ii1ii) {
  const {
    title: ii11ii1,
    UA: ii11l1II,
    cookie: I111ili,
    message: li1i11lI
  } = II1Ii1ii;
  if (invalidTokensMap.get(Iil1lIlI)) return;
  let i1l11iII = "",
    iII11II1 = "";
  const lIl1ii = TokensMap.get(Iil1lIlI);
  if (lIl1ii) i1l11iII = lIl1ii.venderId, iII11II1 = lIl1ii.activityId;else try {
    if (Iil1lIlI.includes(":") && Iil1lIlI.split(":").length === 3) {
      const lllillI = Iil1lIlI.split(":");
      if (!lllillI[0] || !lllillI[1] || !lllillI[2]) return;
      Iil1lIlI = lllillI[0];
      if (Iil1lIlI.length !== 32 || !/^[A-Z0-9]*$/.test(Iil1lIlI)) return;
      iII11II1 = lllillI[1];
      i1l11iII = lllillI[2];
      lllillI[2].startsWith("123") && lllillI[2].length === 8 && !lllillI[1].startsWith("123") && (iII11II1 = lllillI[2], i1l11iII = lllillI[1]);
      TokensMap.set(Iil1lIlI, {
        "index": null,
        "venderId": i1l11iII,
        "shopName": "",
        "activityId": iII11II1,
        "startTime": "",
        "endTime": "",
        "isValid": true,
        "rules": [],
        "minLevel": null,
        "maxLevel": null
      });
    }
  } catch (ilI1II) {
    return;
  }
  if (!i1l11iII || !iII11II1) return;
  const iiiIii1i = Math.floor(Date.now() / 1000) + "000";
  if (invalidTokensMap.get(Iil1lIlI)) return;
  let Ill1I11l = false,
    iIil1Ii;
  await lilIilI1("signCollectGift");
  if ($.waitTime) await $.wait($.waitTime);
  if (Ill1I11l && signHotMaxRetryTimes > 0) {
    let lliiil1i = 0;
    while (lliiil1i < signHotMaxRetryTimes) {
      if (invalidTokensMap.get(Iil1lIlI)) return;
      await lilIilI1("signCollectGift");
      if ($.waitTime) await $.wait($.waitTime);
      if (!Ill1I11l) break;
      lliiil1i++;
    }
  }
  function iIiIiliI(iil1ll1I, IlliiIl1) {
    try {
      switch (iil1ll1I) {
        case "signCollectGift":
          if (IlliiIl1.code === 200 && IlliiIl1.success === true) {
            const IIlll1ii = [];
            if (IlliiIl1.data && IlliiIl1.data.length > 0) for (const iI1i1IiI of IlliiIl1.data) {
              const iiI1IliI = iI1i1IiI?.["prizeList"] || [];
              for (const ilI1I1iI of iiI1IliI) {
                const II1IilI = ilI1I1iI?.["type"],
                  IilI1Iil = ilI1I1iI?.["discount"];
                let illilil1 = "";
                switch (II1IilI) {
                  case 1:
                    illilil1 = "优惠券🗑️";
                    break;
                  case 4:
                    illilil1 = IilI1Iil + "京豆🐶";
                    break;
                  case 6:
                    illilil1 = IilI1Iil + "店铺积分🎟️";
                    break;
                  case 9:
                    console.log(ilI1I1iI), illilil1 = (ilI1I1iI?.["interactPrizeSkuList"][0]?.["skuName"] || "未知") + "🎁";
                    break;
                  case 10:
                    illilil1 = IilI1Iil + "元E卡🎁";
                    break;
                  case 14:
                    illilil1 = IilI1Iil / 100 + "元红包🧧";
                    break;
                  default:
                    illilil1 = "未知奖品（" + II1IilI + "）";
                }
                IIlll1ii.push(illilil1);
              }
            }
            if (IIlll1ii.length > 0) {
              console.log("" + ii11ii1 + Iil1lIlI + " ➜ ✅ " + iIil1Ii + " " + IIlll1ii.join("，"));
              for (const iIl1liI of IIlll1ii) {
                li1i11lI.insert(iIl1liI);
              }
            } else console.log("" + ii11ii1 + Iil1lIlI + " ➜ ✅ " + iIil1Ii + " 💨");
            Ill1I11l = false;
          } else {
            if (IlliiIl1.code !== 200) {
              const iIIlli1l = signStatusMessages[IlliiIl1.code] || IlliiIl1.code + "|活动太火爆";
              [407100001, 407100002, 402].includes(IlliiIl1.code) && invalidTokensMap.set(Iil1lIlI, true);
              console.log("" + ii11ii1 + Iil1lIlI + " ➜ ❌ " + iIil1Ii + " " + iIIlli1l);
              (IlliiIl1.code === "-1" || IlliiIl1.code === -1) && (Ill1I11l = true);
            } else {
              if (IlliiIl1.msg) {
                console.log("" + ii11ii1 + Iil1lIlI + " ➜ ❌ " + iIil1Ii + " " + IlliiIl1.msg);
                if (!signStatusMessages[IlliiIl1.code]) Ill1I11l = true;
              } else console.log("" + ii11ii1 + Iil1lIlI + " ➜ ❌ " + iIil1Ii + " " + JSON.stringify(IlliiIl1));
            }
          }
          break;
      }
    } catch (i1ll1111) {
      console.log("❌ 未能正确处理 " + iil1ll1I + " 请求响应 " + (i1ll1111.message || i1ll1111));
    }
  }
  async function lilIilI1(llIiiIil) {
    let iI1I1lil = "",
      i11Iii1I = null,
      i1i1l = null,
      Il11IIl = "GET",
      lIIiilI1 = {},
      iiil11li = {};
    switch (llIiiIil) {
      case "signCollectGift":
        iiil11li = {
          "appId": "4da33",
          "functionId": "interact_center_shopSign_signCollectGift",
          "appid": "interCenter_shopSign",
          "body": {
            "token": Iil1lIlI,
            "venderId": parseInt(i1l11iII) || "",
            "activityId": parseInt(iII11II1) || "",
            "type": 56,
            "actionType": 7
          },
          "version": "4.7",
          "ua": ii11l1II
        }, lIIiilI1 = await H5st.getH5st(iiil11li), iI1I1lil = "https://api.m.jd.com/api", i1i1l = Object.assign({}, lIIiilI1.paramsData, {
          "jsonp": "jsonp1003"
        });
        break;
    }
    const IIIIi11i = {
      "t": iiiIii1i,
      "loginType": "2"
    };
    if (i11Iii1I) {
      Object.assign(i11Iii1I, IIIIi11i);
    }
    i1i1l && Object.assign(i1i1l, IIIIi11i);
    const IiIli11i = {
      "url": iI1I1lil,
      "method": Il11IIl,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "text/plain",
        "Host": "api.m.jd.com",
        "Referer": "https://h5.m.jd.com/",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": ii11l1II,
        "Cookie": I111ili
      },
      "params": i1i1l,
      "data": i11Iii1I,
      "timeout": 30000
    };
    Il11IIl === "GET" && (delete IiIli11i.data, delete IiIli11i.headers["Content-Type"]);
    const Il1lilI = 3;
    let iII1Ii11 = 0,
      IliIl1li = null,
      liIlI11l = false;
    while (iII1Ii11 < Il1lilI) {
      iIil1Ii = common.formatTime("HH:mm:ss.S");
      const lIllII1l = await common.request(IiIli11i);
      if (!lIllII1l.success) {
        IliIl1li = "" + ii11ii1 + Iil1lIlI + " ➜ 请求失败（" + lIllII1l.error + "）🚫";
        iII1Ii11++;
        continue;
      }
      if (!lIllII1l.data) {
        IliIl1li = "" + ii11ii1 + Iil1lIlI + " ➜ 请求失败（无响应数据）🚫";
        iII1Ii11++;
        continue;
      }
      iIiIiliI(llIiiIil, lIllII1l.data);
      liIlI11l = false;
      break;
    }
    iII1Ii11 >= Il1lilI && (console.log(IliIl1li), liIlI11l && ($.outFlag = true));
  }
}
async function concMain(ilII1i1I = 1, I1l11ill, IIIII1iI, iIilIlII, I1Iilll) {
  const II1Il1l1 = I1l11ill.map(llI1I1il => llI1I1il),
    iillll = decodeURIComponent(common.getCookieValue(IIIII1iI, "pt_pin")),
    i1iI = "【账号" + iIilIlII + "】" + iillll + "：",
    Il1IllI = await common.getLoginStatus(IIIII1iI);
  if (!Il1IllI && typeof Il1IllI === "boolean") {
    console.log(i1iI + "账号无效 🚫");
    return;
  }
  const l1li1Ill = notify.create(iIilIlII, iillll),
    lll1ilI = common.genUA(iillll),
    iIIliIil = {
      "cookie": IIIII1iI,
      "index": iIilIlII,
      "title": i1iI,
      "UA": lll1ilI,
      "message": l1li1Ill
    };
  let lIli11ii = 0;
  async function li1I1I(iI1iil) {
    await I1Iilll(iI1iil, iIIliIil);
    lIli11ii--;
    IiiliI1l();
  }
  async function IiiliI1l() {
    while (lIli11ii < ilII1i1I && II1Il1l1.length > 0) {
      const ilI1iIi = II1Il1l1.shift();
      lIli11ii++;
      await li1I1I(ilI1iIi);
    }
  }
  const II1I1llI = Math.min(II1Il1l1.length, ilII1i1I),
    iiIiI1Il = [];
  for (let iIiIlI1i = 0; iIiIlI1i < II1I1llI; iIiIlI1i++) {
    const IilIl1I1 = II1Il1l1.shift();
    lIli11ii++;
    iiIiI1Il.push(li1I1I(IilIl1I1));
  }
  await Promise.all(iiIiI1Il);
  IiiliI1l();
  await new Promise(l11lii11 => {
    const l1iiIl11 = setInterval(() => {
      lIli11ii === 0 && (clearInterval(l1iiIl11), l11lii11());
    }, 100);
  });
}