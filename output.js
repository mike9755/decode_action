//Sat Jan 18 2025 16:32:45 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H");
let idList = (process.env.jd_opencard_force_venderId || "").split(","),
  taskThreads = process.env.jd_opencard_force_task_threads || "1",
  accountThreads = process.env.jd_opencard_force_account_threads || "1";
const runInterval = process.env.jd_opencard_force_account_interval || "",
  isNotify = false,
  invalidIdsMap = new Map(),
  maxThreads = 3,
  cookiesArr = Object.keys(jdCookie).map(IIIl1I => jdCookie[IIIl1I]).filter(iil1ii => iil1ii);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  try {
    {
      notify.config({
        "title": $.name
      });
      if (idList.length > 0) idList = [...new Set(idList.filter(IIIl11 => IIIl11 !== ""))];
      if (idList.length <= 0) {
        {
          console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
          return;
        }
      }
      $.waitTime = null;
      if (runInterval) {
        try {
          const lil11I = parseInt(runInterval);
          lil11I >= 0 && ($.waitTime = lil11I);
        } catch {
          console.log("⚠ 自定义运行间隔时长设置错误");
        }
      }
      try {
        {
          const Iliii1 = parseInt(taskThreads);
          Iliii1 > 0 && Iliii1 !== 1 && (taskThreads = Iliii1);
        }
      } catch {
        taskThreads = 1;
      }
      taskThreads = Math.min(taskThreads, maxThreads);
      try {
        {
          const lillIl = parseInt(accountThreads);
          lillIl > 0 && lillIl !== 1 && (accountThreads = lillIl);
        }
      } catch {
        accountThreads = 1;
      }
      accountThreads = Math.min(accountThreads, maxThreads);
      $.needRemoveCookieIndex = [];
      $.showPrintId = false;
      if (idList.length > 1) {
        $.showPrintId = true;
      }
      await common.concTask(accountThreads, cookiesArr, async (Ill1l, llI1Il) => {
        await concMain(taskThreads, idList, Ill1l, llI1Il, Main);
        if ($.waitTime) await $.wait($.waitTime);
      });
      isNotify && notify.getMessage() && (await notify.push());
    }
  } catch (Ill1i) {
    console.log("❌ 脚本运行遇到了错误\n" + Ill1i);
  }
})().catch(lllI1l => $.logErr(lllI1l)).finally(() => $.done());
async function Main(i11iii, llI1Ii) {
  const {
    title: li1i1l,
    UA: II1i1,
    cookie: lI1lll,
    message: iIiII
  } = llI1Ii;
  if (invalidIdsMap.get(i11iii)) return;
  let iil1lI = "",
    iiiliI = undefined,
    li1i1I = [];
  await ii1il1("getShopOpenCardInfo");
  if (invalidIdsMap.get(i11iii)) return;
  if (typeof iiiliI === "boolean") {
    {
      if (iiiliI) console.log(li1i1l + "已是会员");else {
        if (invalidIdsMap.get(i11iii)) return;
        await ii1il1("bindWithVender");
      }
    }
  }
  async function illIii(II1ii, IIIIII) {
    try {
      switch (II1ii) {
        case "getShopOpenCardInfo":
          if (IIIIII.success === true) {
            {
              let lillII = IIIIII.result;
              Array.isArray(lillII) && (lillII = lillII[0]);
              iiiliI = lillII?.["userInfo"]?.["openCardStatus"] === 1;
              iil1lI = lillII?.["interestsRuleList"]?.[0]?.["interestsInfo"]?.["activityId"];
              const {
                venderCardName: ii1ilI,
                venderCardLogo: lI1ll1
              } = lillII?.["shopMemberCardInfo"];
              if (lillII?.["shopMemberCardInfo"] && !ii1ilI && !lI1ll1) {
                console.log(li1i1l + "店铺会员不存在 🚫");
                invalidIdsMap.set(i11iii, true);
                return;
              }
              !$["hasPrintInfo_" + i11iii] && ($["hasPrintInfo_" + i11iii] = true, console.log("\n商家ID：" + i11iii), console.log("会员卡：" + (lillII?.["shopMemberCardInfo"]?.["venderCardName"] || "未知") + "\n"));
            }
          } else IIIIII.message ? console.log("" + li1i1l + IIIIII.message) : console.log(li1i1l + "获取店铺会员状态异常 " + JSON.stringify(IIIIII) + " 🚫");
          break;
        case "bindWithVender":
          if (IIIIII.success === true) {
            if (IIIIII.message === "加入店铺会员成功") {
              {
                if (IIIIII.result && IIIIII.result?.["giftInfo"]) {
                  li1i1I = [];
                  for (const IlIliI of IIIIII.result?.["giftInfo"]?.["giftList"]) {
                    const {
                      prizeType: l1iII1
                    } = IlIliI;
                    switch (l1iII1) {
                      case 1:
                      case 23:
                        li1i1I.push("优惠券🗑️");
                        iIiII.insert("优惠券🗑️");
                        break;
                      case 4:
                        li1i1I.push(IlIliI.discountString + "京豆🐶");
                        iIiII.insert(IlIliI.discountString + "京豆🐶");
                        break;
                      case 6:
                        li1i1I.push(IlIliI.discountString + "店铺积分🎟️");
                        iIiII.insert(IlIliI.discountString + "店铺积分🎟️");
                        break;
                      case 14:
                        li1i1I.push(IlIliI.discountString + "红包🧧");
                        iIiII.insert(IlIliI.discountString + "红包🧧");
                        break;
                      default:
                        li1i1I.push("" + IlIliI.discountString + IlIliI.prizeName);
                        iIiII.insert("" + IlIliI.discountString + IlIliI.prizeName);
                    }
                  }
                  li1i1I.length > 0 ? console.log(li1i1l + "加入店铺会员成功，获得：" + li1i1I.join("、")) : console.log(li1i1l + "加入店铺会员成功");
                } else console.log(li1i1l + "加入店铺会员成功");
              }
            } else IIIIII.message === "活动太火爆，请稍后再试" ? console.log("" + li1i1l + IIIIII.message + " 🚫") : console.log("" + li1i1l + IIIIII.message + " 🚫");
          } else IIIIII.message ? console.log("" + li1i1l + IIIIII.message + " 🚫") : console.log(li1i1l + "加入店铺会员失败 🚫");
          break;
      }
    } catch (ii1ill) {
      console.log("❌ 未能正确处理 " + II1ii + " 请求响应 " + (ii1ill.message || ii1ill));
    }
  }
  async function ii1il1(llI1II) {
    let lIli1l = "https://api.m.jd.com/client.action",
      lillIi = null,
      illIi1 = null,
      ii1ili = "POST",
      liil1i = {},
      lI1lil = {};
    switch (llI1II) {
      case "getShopOpenCardInfo":
        lI1lil = {
          "appId": "27004",
          "appid": "shopmember_m_jd_com",
          "functionId": "getShopOpenCardInfo",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": {
            "venderId": i11iii,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "27004",
            "needSecurity": true,
            "bizId": "shopmember_m_jd_com",
            "channel": 406
          },
          "version": "4.7",
          "t": true,
          "ua": II1i1
        };
        liil1i = await H5st.getH5st(lI1lil);
        lillIi = liil1i.paramsData;
        break;
      case "bindWithVender":
        lI1lil = {
          "appId": "27004",
          "appid": "shopmember_m_jd_com",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": {
            "venderId": i11iii,
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
          "ua": II1i1
        };
        iil1lI && (lI1lil.body.activityId = iil1lI);
        liil1i = await H5st.getH5st(lI1lil);
        lillIi = liil1i.paramsData;
        break;
    }
    const i1l1iI = {
      "area": "",
      "screen": "1290*2796",
      "uuid": "88888"
    };
    lillIi && Object.assign(lillIi, i1l1iI);
    illIi1 && Object.assign(illIi1, i1l1iI);
    const liil1l = {
      "url": lIli1l,
      "method": ii1ili,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Origin": "https://pages.jd.com",
        "Referer": "https://pages.jd.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": II1i1,
        "Cookie": lI1lll
      },
      "params": illIi1,
      "data": lillIi,
      "timeout": 30000
    };
    ii1ili === "GET" && (delete liil1l.data, delete liil1l.headers["Content-Type"]);
    const lI1lii = 1;
    let Iiili1 = 0,
      Iil1l1 = null,
      i1i11I = false;
    while (Iiili1 < lI1lii) {
      const iii1ii = await common.request(liil1l);
      if (!iii1ii.success) {
        {
          Iil1l1 = "" + li1i1l + llI1II + " 请求失败（" + iii1ii.error + "）🚫";
          Iiili1++;
          continue;
        }
      }
      if (!iii1ii.data) {
        Iil1l1 = "" + li1i1l + llI1II + " 请求失败（无响应数据）🚫";
        Iiili1++;
        continue;
      }
      await illIii(llI1II, iii1ii.data);
      i1i11I = false;
      break;
    }
    Iiili1 >= lI1lii && (console.log(Iil1l1), i1i11I && ($.outFlag = true));
  }
}
async function concMain(II11li = 1, I1l11i, iIIiiI, liiI1i, ililIi) {
  if ($.needRemoveCookieIndex.includes(liiI1i)) return;
  const ililIl = I1l11i.map(I1iIIl => I1iIIl),
    liiI1l = decodeURIComponent(common.getCookieValue(iIIiiI, "pt_pin")),
    i1l1II = "【账号" + liiI1i + "】" + liiI1l + "：" + ($.showPrintId ? venderId + " ➜ " : ""),
    i1ill = notify.create(liiI1i, liiI1l),
    I1l11l = await common.getLoginStatus(iIIiiI);
  if (!I1l11l && typeof I1l11l === "boolean") {
    {
      console.log(i1l1II + "账号无效");
      i1ill.fix("账号无效");
      $.needRemoveCookieIndex.push(liiI1i);
      return;
    }
  }
  const lilIIi = common.genUA(liiI1l),
    i1l1Il = {
      "cookie": iIIiiI,
      "index": liiI1i,
      "title": i1l1II,
      "UA": lilIIi,
      "message": i1ill
    };
  let llIli = 0;
  async function i1i11l(i1ilI) {
    await ililIi(i1ilI, i1l1Il);
    llIli--;
    i1i11i();
  }
  async function i1i11i() {
    while (llIli < II11li && ililIl.length > 0) {
      {
        const i1ilI1 = ililIl.shift();
        llIli++;
        await i1i11l(i1ilI1);
      }
    }
  }
  const II11l1 = Math.min(ililIl.length, II11li),
    Iil1lI = [];
  for (let Iil1li = 0; Iil1li < II11l1; Iil1li++) {
    {
      const Iiilil = ililIl.shift();
      llIli++;
      Iil1lI.push(i1i11l(Iiilil));
    }
  }
  await Promise.all(Iil1lI);
  i1i11i();
  await new Promise(lI1III => {
    const IIliIi = setInterval(() => {
      llIli === 0 && (clearInterval(IIliIi), lI1III());
    }, 100);
  });
}