//Sat Jan 18 2025 10:45:40 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H");
let idList = (process.env.jd_opencard_venderId || "").split(","),
  minBeans = process.env.jd_opencard_min_beans || "2",
  taskThreads = process.env.jd_opencard_task_threads || "1",
  accountThreads = process.env.jd_opencard_account_threads || "1";
const runInterval = process.env.jd_opencard_account_interval || "1500",
  isNotify = process.env.jd_opencard_notify === "true",
  invalidIdsMap = new Map(),
  maxThreads = 3,
  cookiesArr = Object.keys(jdCookie).map(lllI1l => jdCookie[lllI1l]).filter(i11iii => i11iii);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  try {
    {
      notify.config({
        "title": $.name
      });
      if (idList.length > 0) idList = [...new Set(idList.filter(lIli1I => lIli1I !== ""))];
      if (idList.length <= 0) {
        console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
        return;
      }
      $.waitTime = null;
      if (runInterval) {
        try {
          const lllI11 = parseInt(runInterval);
          lllI11 >= 0 && ($.waitTime = lllI11);
        } catch {
          console.log("⚠ 自定义运行间隔时长设置错误");
        }
      }
      try {
        const I1lIli = parseInt(taskThreads);
        I1lIli > 0 && I1lIli !== 1 && (taskThreads = I1lIli);
      } catch {
        taskThreads = 1;
      }
      taskThreads = Math.min(taskThreads, maxThreads);
      try {
        const lillII = parseInt(accountThreads);
        lillII > 0 && lillII !== 1 && (accountThreads = lillII);
      } catch {
        accountThreads = 1;
      }
      accountThreads = Math.min(accountThreads, maxThreads);
      try {
        {
          const ii1ilI = parseInt(minBeans);
          ii1ilI >= 0 && (minBeans = ii1ilI);
        }
      } catch {
        minBeans = 10;
      }
      $.needRemoveCookieIndex = [];
      $.showPrintId = false;
      idList.length > 1 && ($.showPrintId = true);
      await common.concTask(accountThreads, cookiesArr, async (liil1I, i11ii1) => {
        {
          await concMain(taskThreads, idList, liil1I, i11ii1, Main);
          if ($.waitTime) await $.wait($.waitTime);
        }
      });
      isNotify && notify.getMessage() && (await notify.push());
    }
  } catch (iiill1) {
    console.log("❌ 脚本运行遇到了错误\n" + iiill1);
  }
})().catch(lIli1i => $.logErr(lIli1i)).finally(() => $.done());
async function Main(IIIII1, I1lIlI) {
  const {
    title: II1iI,
    UA: llI1II,
    cookie: lIli1l,
    message: lillIi
  } = I1lIlI;
  if (invalidIdsMap.get(IIIII1)) return;
  let illIi1 = "",
    ii1ili = "",
    liil1i = undefined,
    lI1lil = false,
    i1l1iI = false,
    liil1l = false,
    lI1lii = "",
    Iiili1 = [];
  await i1i11I("getShopOpenCardInfo");
  if (invalidIdsMap.get(IIIII1)) return;
  if (typeof liil1i === "boolean") {
    {
      if (liil1i) console.log(II1iI + "已是会员"), lI1lil && (await i1i11I("collectGift"));else {
        if (invalidIdsMap.get(IIIII1)) return;
        i1l1iI ? await i1i11I("bindWithVender") : liil1l ? console.log(II1iI + "礼包奖品[" + lI1lii + "]数量低于设置的阈值") : console.log(II1iI + "没有入会礼包");
      }
    }
  }
  async function Iil1l1(II11lI, lI1IIi) {
    try {
      switch (II11lI) {
        case "getShopOpenCardInfo":
          if (lI1IIi.success === true) {
            {
              let I1l11I = lI1IIi.result;
              Array.isArray(I1l11I) && (I1l11I = I1l11I[0]);
              liil1i = I1l11I?.["userInfo"]?.["openCardStatus"] === 1;
              if (I1l11I?.["interestsRuleList"]) {
                {
                  illIi1 = I1l11I?.["interestsRuleList"]?.[0]?.["interestsInfo"]?.["activityId"];
                  ii1ili = I1l11I?.["interestsRuleList"]?.[0]?.["interestsInfo"]?.["activityType"];
                  liil1i && (lI1lil = true);
                  for (const IlllIi of I1l11I?.["interestsRuleList"]) {
                    const {
                      prizeType: iIIiil
                    } = IlllIi;
                    switch (iIIiil) {
                      case 1:
                      case 23:
                        Iiili1.push("优惠券🗑️");
                        break;
                      case 4:
                        Iiili1.push(IlllIi.discountString + "京豆🐶");
                        i1l1iI = true;
                        minBeans > 0 && IlllIi.discountString < minBeans && (liil1l = true, i1l1iI = false, lI1lii = IlllIi.discountString + "京豆");
                        break;
                      case 6:
                        Iiili1.push(IlllIi.discountString + "店铺积分🎟️");
                        break;
                      case 14:
                        Iiili1.push(IlllIi.discountString + "红包🧧");
                        i1l1iI = true;
                        minBeans > 0 && parseInt(IlllIi.discountString * 100) < minBeans && (liil1l = true, i1l1iI = false, lI1lii = IlllIi.discountString + "红包");
                        break;
                      default:
                        Iiili1.push("" + IlllIi.discountString + IlllIi.prizeName);
                    }
                  }
                }
              }
              const {
                venderCardName: Ilil1l,
                venderCardLogo: iIIiii
              } = I1l11I?.["shopMemberCardInfo"];
              if (I1l11I?.["shopMemberCardInfo"] && !Ilil1l && !iIIiii) {
                console.log(II1iI + "店铺会员不存在 🚫");
                invalidIdsMap.set(IIIII1, true);
                return;
              }
              !$["hasPrintInfo_" + IIIII1] && ($["hasPrintInfo_" + IIIII1] = true, console.log("\n商家ID：" + IIIII1), console.log("会员卡：" + (I1l11I?.["shopMemberCardInfo"]?.["venderCardName"] || "未知") + "\n"));
            }
          } else lI1IIi.message ? console.log("" + II1iI + lI1IIi.message) : console.log(II1iI + "获取店铺会员状态异常 " + JSON.stringify(lI1IIi) + " 🚫");
          break;
        case "bindWithVender":
          if (lI1IIi.success === true) {
            if (lI1IIi.message === "加入店铺会员成功") {
              if (lI1IIi.result && lI1IIi.result?.["giftInfo"]) {
                Iiili1 = [];
                for (const lI1IIl of lI1IIi.result?.["giftInfo"]?.["giftList"]) {
                  const {
                    prizeType: i1ilI
                  } = lI1IIl;
                  switch (i1ilI) {
                    case 1:
                    case 23:
                      Iiili1.push("优惠券🗑️");
                      lillIi.insert("优惠券🗑️");
                      break;
                    case 4:
                      Iiili1.push(lI1IIl.discountString + "京豆🐶");
                      lillIi.insert(lI1IIl.discountString + "京豆🐶");
                      break;
                    case 6:
                      Iiili1.push(lI1IIl.discountString + "店铺积分🎟️");
                      lillIi.insert(lI1IIl.discountString + "店铺积分🎟️");
                      break;
                    case 14:
                      Iiili1.push(lI1IIl.discountString + "红包🧧");
                      lillIi.insert(lI1IIl.discountString + "红包🧧");
                      break;
                    default:
                      Iiili1.push("" + lI1IIl.discountString + lI1IIl.prizeName);
                      lillIi.insert("" + lI1IIl.discountString + lI1IIl.prizeName);
                  }
                }
                if (Iiili1.length > 0) console.log(II1iI + "加入店铺会员成功，获得：" + Iiili1.join("、"));else {
                  console.log(II1iI + "加入店铺会员成功");
                }
              } else console.log(II1iI + "加入店铺会员成功");
            } else {
              if (lI1IIi.message === "活动太火爆，请稍后再试") {
                console.log("" + II1iI + lI1IIi.message + " 🚫");
              } else console.log("" + II1iI + lI1IIi.message + " 🚫");
            }
          } else lI1IIi.message ? console.log("" + II1iI + lI1IIi.message + " 🚫") : console.log(II1iI + "加入店铺会员失败 🚫");
          break;
        case "collectGift":
          if (lI1IIi.success === true) Iiili1.forEach(iillI => {
            lillIi.insert(iillI);
          }), console.log(II1iI + "领取入会礼包成功，获得：" + Iiili1.join("、"));else lI1IIi.message ? console.log("" + II1iI + lI1IIi.message + " 🚫") : console.log(II1iI + "领取入会礼包失败 🚫");
          break;
      }
    } catch (IIliIi) {
      console.log("❌ 未能正确处理 " + II11lI + " 请求响应 " + (IIliIi.message || IIliIi));
    }
  }
  async function i1i11I(IllIiI) {
    {
      let I1l111 = "https://api.m.jd.com/client.action",
        IIii1l = null,
        I1iIII = null,
        liiI11 = "POST",
        ililI1 = {},
        IIii1i = {};
      switch (IllIiI) {
        case "getShopOpenCardInfo":
          IIii1i = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "getShopOpenCardInfo",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
              "venderId": IIIII1,
              "payUpShop": true,
              "queryVersion": "10.5.2",
              "appid": "27004",
              "needSecurity": true,
              "bizId": "shopmember_m_jd_com",
              "channel": 406
            },
            "version": "4.7",
            "t": true,
            "ua": llI1II
          };
          ililI1 = await H5st.getH5st(IIii1i);
          IIii1l = ililI1.paramsData;
          break;
        case "bindWithVender":
          IIii1i = {
            "appId": "27004",
            "appid": "shopmember_m_jd_com",
            "functionId": "bindWithVender",
            "clientVersion": "9.2.0",
            "client": "H5",
            "body": {
              "venderId": IIIII1,
              "bindByVerifyCodeFlag": 1,
              "registerExtend": {},
              "writeChildFlag": 0,
              "channel": 406,
              "appid": "27004",
              "needSecurity": true,
              "bizId": "shopmember_m_jd_com"
            },
            "version": "4.7",
            "t": true,
            "ua": llI1II
          };
          illIi1 && (IIii1i.body.activityId = illIi1);
          ililI1 = await H5st.getH5st(IIii1i);
          IIii1l = ililI1.paramsData;
          break;
        case "collectGift":
          liiI11 = "GET";
          I1iIII = {
            "appid": "jd_shop_member",
            "functionId": "collectGift",
            "body": JSON.stringify({
              "venderId": IIIII1,
              "activityId": illIi1,
              "activityType": ii1ili
            }),
            "clientVersion": "9.2.0",
            "client": "H5",
            "uuid": "88888",
            "jsonp": "jsonp_" + Date.now() + "_51149"
          };
          break;
      }
      const i1ili = {
        "area": "",
        "screen": "1290*2796",
        "uuid": "88888"
      };
      IIii1l && Object.assign(IIii1l, i1ili);
      I1iIII && Object.assign(I1iIII, i1ili);
      const Iiill1 = {
        "url": I1l111,
        "method": liiI11,
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh-Hans;q=0.9",
          "Origin": "https://pages.jd.com",
          "Referer": "https://pages.jd.com/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": llI1II,
          "Cookie": lIli1l
        },
        "params": I1iIII,
        "data": IIii1l,
        "timeout": 30000
      };
      liiI11 === "GET" && (delete Iiill1.data, delete Iiill1.headers["Content-Type"]);
      const I1iII1 = 1;
      let lilII1 = 0,
        iill1 = null,
        iii1l1 = false;
      while (lilII1 < I1iII1) {
        const IIliIl = await common.request(Iiill1);
        if (!IIliIl.success) {
          iill1 = "" + II1iI + IllIiI + " 请求失败（" + IIliIl.error + "）🚫";
          lilII1++;
          continue;
        }
        if (!IIliIl.data) {
          iill1 = "" + II1iI + IllIiI + " 请求失败（无响应数据）🚫";
          lilII1++;
          continue;
        }
        await Iil1l1(IllIiI, IIliIl.data);
        iii1l1 = false;
        break;
      }
      lilII1 >= I1iII1 && (console.log(iill1), iii1l1 && ($.outFlag = true));
    }
  }
}
async function concMain(II11ll = 1, liiI1I, ililII, lI1II1, i1ilII) {
  if ($.needRemoveCookieIndex.includes(lI1II1)) return;
  const IllIi1 = liiI1I.map(I1il1l => I1il1l),
    lilIII = decodeURIComponent(common.getCookieValue(ililII, "pt_pin")),
    Ii1ilI = "【账号" + lI1II1 + "】" + lilIII + "：" + ($.showPrintId ? venderId + " ➜ " : ""),
    II11i1 = notify.create(lI1II1, lilIII),
    iliIil = await common.getLoginStatus(ililII);
  if (!iliIil && typeof iliIil === "boolean") {
    console.log(Ii1ilI + "账号无效");
    II11i1.fix("账号无效");
    $.needRemoveCookieIndex.push(lI1II1);
    return;
  }
  const iliIii = common.genUA(lilIII),
    lill1i = {
      "cookie": ililII,
      "index": lI1II1,
      "title": Ii1ilI,
      "UA": iliIii,
      "message": II11i1
    };
  let il1li = 0;
  async function iIIill(lI1l1l) {
    await i1ilII(lI1l1l, lill1i);
    il1li--;
    iilii();
  }
  async function iilii() {
    while (il1li < II11ll && IllIi1.length > 0) {
      const iiliI = IllIi1.shift();
      il1li++;
      await iIIill(iiliI);
    }
  }
  const Ill11i = Math.min(IllIi1.length, II11ll),
    iilil = [];
  for (let Ill11I = 0; Ill11I < Ill11i; Ill11I++) {
    const I1il1i = IllIi1.shift();
    il1li++;
    iilil.push(iIIill(I1il1i));
  }
  await Promise.all(iilil);
  iilii();
  await new Promise(IliIIi => {
    {
      const i1iil = setInterval(() => {
        il1li === 0 && (clearInterval(i1iil), IliIIi());
      }, 100);
    }
  });
}