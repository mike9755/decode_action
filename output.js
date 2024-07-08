//Mon Jul 08 2024 12:29:39 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let token = process.env.jd_dpqd_token || "",
  accountThreads = process.env.jd_dpqd_account_threads || "1";
const runInterval = process.env.jd_dpqd_account_interval || "";
let signHotMaxRetryTimes = process.env.jd_dpqd_max_retry || "0";
const isNotify = process.env.jd_dpqd_notify === "true",
  activityUrl = "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + token,
  signStatusMessages = {
    403030023: "今日已签",
    404130026: "已达到签到上限",
    407100001: "活动尚未开始",
    407100002: "活动已经结束",
    407000007: "账号无效",
    402: "活动无效",
    "-1": "服务器繁忙"
  },
  cookiesArr = Object.keys(jdCookie).map(Ii1iIIi => jdCookie[Ii1iIIi]).filter(iI1i1i1i => iI1i1i1i);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  try {
    notify.config({
      "title": $.name
    });
    if (!token) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }
    $.waitTime = null;
    if (runInterval) {
      try {
        const I11iIlI1 = parseInt(runInterval);
        I11iIlI1 >= 0 && ($.waitTime = I11iIlI1);
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    try {
      const IIIli1l = parseInt(signHotMaxRetryTimes);
      signHotMaxRetryTimes = IIIli1l > 0 ? IIIli1l : 0;
    } catch {
      signHotMaxRetryTimes = 3;
    }
    try {
      const l1Ii1Ii1 = parseInt(accountThreads);
      l1Ii1Ii1 > 0 && l1Ii1Ii1 !== 1 && (accountThreads = l1Ii1Ii1);
    } catch {
      accountThreads = 1;
    }
    await Main();
    isNotify && notify.getMessage() && (await notify.push());
  } catch (IlIii1Ii) {
    console.log("❌ 脚本运行遇到了错误\n" + IlIii1Ii);
  }
})().catch(Iili1lll => $.logErr(Iili1lll)).finally(() => $.done());
async function Main() {
  let iIIlilli = true;
  token.includes(":") && token.split(":").length === 3 && (token = token.split(":")[0]);
  if (token.length !== 32 || !/^[A-Z0-9]*$/.test(token)) {
    console.log("❌ 令牌格式错误");
    return;
  }
  $.token = token;
  $.UA = common.genUA("刘强东");
  ({
    jsToken: $.jsToken
  } = await jsTk($.UA, "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html", {
    "bizId": "SJHT-DPQDH5",
    "v": "3.2.1.0",
    "qs": "token=" + $.token
  }));
  let IiIIIII1 = 0;
  $.getActivityInfo = "";
  $.invalidAct = false;
  const Ili11llI = 10;
  while (!$.getActivityInfo && IiIIIII1 < Ili11llI && !$.invalidAct) {
    $.getActivityInfo = "";
    await sendRequest("getActivityInfo");
    await $.wait(1000);
    IiIIIII1++;
    IiIIIII1 === Ili11llI && (console.log($.errMsg || "❌ 获取活动信息失败"), $.errMsg = "");
  }
  if (!$.getActivityInfo) return;
  $.venderId = $.getActivityInfo.venderId;
  $.activityId = $.getActivityInfo.id;
  if (!$.venderId || !$.activityId || $.invalidAct) return;
  const Iilll1il = $.getActivityInfo.activityStatus,
    II111lI = $.getActivityInfo.continuePrizeRuleList || [],
    Il1i1li1 = $.getActivityInfo.prizeRuleList || [],
    lili1ili = $.getActivityInfo.startTime,
    l1iIi1I = $.getActivityInfo.endTime,
    iiilIli1 = $.time("yyyy-MM-dd HH:mm", lili1ili),
    IiIllIi = $.time("yyyy-MM-dd HH:mm", l1iIi1I);
  let liIi111 = false;
  const llliiiII = [],
    iIIIi1il = [...Il1i1li1, ...II111lI];
  for (const lIililIl of iIIIi1il) {
    const IlIlIil = lIililIl.level,
      II1l1Il = lIililIl.prizeList || [],
      iIl1i = [];
    for (const illIl1li of II1l1Il) {
      let i1i111lI = "";
      const IIllII1l = illIl1li.discount,
        II1iIll = illIl1li.type,
        illIllll = illIl1li.number,
        Iii1i1li = illIl1li.status,
        iIlIll1I = Iii1i1li === 5;
      switch (II1iIll) {
        case 1:
          i1i111lI = "优惠券";
          break;
        case 4:
          i1i111lI = IIllII1l + "京豆";
          break;
        case 6:
          i1i111lI = IIllII1l + "店铺积分";
          break;
        case 9:
          i1i111lI = "" + illIl1li?.["interactPrizeSkuList"][0]?.["skuName"];
          break;
        case 10:
          i1i111lI = IIllII1l + "元E卡";
          break;
        case 14:
          i1i111lI = IIllII1l / 100 + "元红包";
          break;
        default:
          i1i111lI = "未知奖品（" + II1iIll + "）";
      }
      if (![1, 6].includes(II1iIll) && !iIlIll1I) liIi111 = true;
      iIl1i.push(i1i111lI + "（共" + illIllll + "份" + (iIlIll1I ? "，已发完" : "") + "）");
    }
    llliiiII.push({
      "days": IlIlIil,
      "prize": iIl1i,
      "havePrize": liIi111
    });
  }
  const II11l1i1 = await common.getShopName({
    "venderId": $.venderId
  });
  console.log((II11l1i1 ? "店铺名称：#" + II11l1i1 + "\n" : "") + "开始时间：" + iiilIli1 + "\n结束时间：" + IiIllIi);
  notify.appendContent((II11l1i1 ? "\n【店铺名称】#" + II11l1i1 : "") + "\n【开始时间】" + iiilIli1 + "\n【结束时间】" + IiIllIi);
  llliiiII.length > 0 && (console.log(llliiiII.map(liIll1l => (liIll1l.days === 0 ? "每日签到" : "连续" + (liIll1l.days < 10 ? " " : "") + liIll1l.days + "天") + "：" + liIll1l.prize.join("，")).join("\n")), notify.appendContent("\n" + llliiiII.map(Ill1iII1 => "【" + (Ill1iII1.days === 0 ? "每日签到" : "连续" + (Ill1iII1.days < 10 ? " " : "") + Ill1iII1.days + "天") + "】" + Ill1iII1.prize.join("，")).join("\n")));
  console.log("");
  notify.appendContent("\n\n" + activityUrl);
  const I1lilIii = Date.now();
  lili1ili && I1lilIii < lili1ili && (console.log("活动将在 " + iiilIli1 + " 开始，晚点再来吧~\n"), iIIlilli = false);
  if (l1iIi1I && I1lilIii > l1iIi1I) console.log("活动已于 " + IiIllIi + " 结束，下次早点来吧~\n"), iIIlilli = false;else {
    if (Iilll1il === 3) {
      console.log("活动已结束\n");
      iIIlilli = false;
    }
  }
  !liIi111 && (iIIlilli = false);
  llliiiII.length > 0 && ($.minLevel = llliiiII[0].days, $.maxLevel = llliiiII[llliiiII.length - 1].days);
  if (!iIIlilli) return;
  await common.concTask(accountThreads, cookiesArr, async (illi1l1l, l11lIIIl) => {
    await concMain(illi1l1l, l11lIIIl);
    if ($.waitTime) await $.wait($.waitTime);
  });
}
async function concMain(i11Illl, Iii1IIli) {
  if ($.runEnd) return {
    "runEnd": true
  };
  const iI1l11i1 = decodeURIComponent(common.getCookieValue(i11Illl, "pt_pin")),
    IIIi1i11 = "【账号" + Iii1IIli + "】" + iI1l11i1 + "：",
    IliIiI1I = notify.create(Iii1IIli, iI1l11i1),
    IilII1l1 = await common.getLoginStatus(i11Illl);
  if (!IilII1l1 && typeof IilII1l1 === "boolean") {
    console.log(IIIi1i11 + "🚫 账号无效");
    IliIiI1I.fix("账号无效");
    return;
  }
  const i11I1IiI = common.genUA(iI1l11i1),
    {
      jsToken: lliII1i1
    } = await jsTk(i11I1IiI, "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html", {
      "bizId": "SJHT-DPQDH5",
      "v": "3.2.1.0",
      "qs": "token=" + $.token
    });
  if ($.runEnd) return {
    "runEnd": true
  };
  let l1ll1IlI = "",
    ii1ll1i = [],
    iil11ii = false;
  await i1ilIIii("signCollectGift");
  if ($.waitTime) await $.wait($.waitTime);
  if (iil11ii && signHotMaxRetryTimes > 0) {
    let II1111i1 = 0;
    while (II1111i1 < signHotMaxRetryTimes) {
      if ($.runEnd) return {
        "runEnd": true
      };
      await i1ilIIii("signCollectGift");
      if (!iil11ii) break;
      if ($.waitTime) await $.wait($.waitTime);
      II1111i1++;
    }
  }
  if (l1ll1IlI) {
    await i1ilIIii("getSignRecord");
    const Iliii1ii = "" + l1ll1IlI + (ii1ll1i.length > 0 ? "（" + ii1ll1i.join("，") + "）" : "");
    console.log("" + IIIi1i11 + Iliii1ii);
    IliIiI1I.fix(Iliii1ii.replace("✅", "").replace("❌", "").replace("🚫", "").trim());
  }
  function lilllI1(iill1li, ii1Ii1i) {
    try {
      switch (iill1li) {
        case "signCollectGift":
          if (ii1Ii1i.code === 200 && ii1Ii1i.success === true) {
            const i1l11Ill = [];
            if (ii1Ii1i.data && ii1Ii1i.data.length > 0) for (const l1Il1iI of ii1Ii1i.data) {
              const ilI1lllI = l1Il1iI?.["prizeList"] || [];
              for (const lI1lII1l of ilI1lllI) {
                const Ili1i1lI = lI1lII1l?.["type"],
                  ll1i11ii = lI1lII1l?.["discount"];
                let lIIll1ii = "";
                switch (Ili1i1lI) {
                  case 1:
                    lIIll1ii = "优惠券🗑️";
                    break;
                  case 4:
                    lIIll1ii = ll1i11ii + "京豆🐶";
                    break;
                  case 6:
                    lIIll1ii = ll1i11ii + "店铺积分🎟️";
                    break;
                  case 9:
                    lIIll1ii = (lI1lII1l?.["interactPrizeSkuList"][0]?.["skuName"] || "未知") + "🎁";
                    break;
                  case 10:
                    lIIll1ii = ll1i11ii + "元E卡🎁";
                    break;
                  case 14:
                    lIIll1ii = ll1i11ii / 100 + "元红包🧧";
                    break;
                  default:
                    lIIll1ii = "未知奖品（" + Ili1i1lI + "）";
                }
                i1l11Ill.push(lIIll1ii);
              }
            }
            l1ll1IlI = "✅ 签到成功";
            i1l11Ill.length > 0 && (ii1ll1i = i1l11Ill);
            iil11ii = false;
          } else {
            if (ii1Ii1i.code !== 200) {
              const iil1Iii1 = signStatusMessages[ii1Ii1i.code] || ii1Ii1i.code + "|活动太火爆";
              [407100001, 407100002, 402].includes(ii1Ii1i.code) && ($.runEnd = true);
              ii1ll1i = [iil1Iii1];
              l1ll1IlI = "❌ 签到失败";
              (ii1Ii1i.code === "-1" || ii1Ii1i.code === -1) && (iil11ii = true);
            } else {
              if (ii1Ii1i.msg) {
                l1ll1IlI = "❌ 签到失败";
                ii1ll1i = [ii1Ii1i.msg];
                if (!signStatusMessages[ii1Ii1i.code]) iil11ii = true;
              } else l1ll1IlI = "❌ 签到失败 - " + JSON.stringify(ii1Ii1i);
            }
          }
          break;
        case "getSignRecord":
          if (ii1Ii1i.code === 200 && ii1Ii1i.success === true && ii1Ii1i.data) {
            const ll1i1I1i = ii1Ii1i.data.days;
            ll1i1I1i > 0 && $.maxLevel && (ii1ll1i.push("连签" + ll1i1I1i + "天"), $.maxLevel && ll1i1I1i >= $.maxLevel && ii1ll1i.push("已达活动上限"));
          } else {
            if (ii1Ii1i.msg) {} else console.log("❓" + iill1li + " " + JSON.stringify(ii1Ii1i));
          }
          break;
      }
    } catch (llI11lI) {
      console.log("❌ 未能正确处理 " + iill1li + " 请求响应 " + (llI11lI.message || llI11lI));
    }
  }
  async function i1ilIIii(iIli1lI) {
    let lIiilIIi = "",
      ll1II1li = null,
      IIlllIl = null,
      iIliiIl1 = "GET",
      I1lIllii = {},
      I11iiI1 = {};
    switch (iIli1lI) {
      case "signCollectGift":
        I11iiI1 = {
          "appId": "4da33",
          "functionId": "interact_center_shopSign_signCollectGift",
          "appid": "interCenter_shopSign",
          "body": {
            "token": $.token,
            "venderId": parseInt($.venderId) || "",
            "activityId": parseInt($.activityId) || "",
            "type": 56,
            "actionType": 7
          },
          "version": "4.7",
          "ua": i11I1IiI
        }, I1lIllii = await H5st.getH5st(I11iiI1), lIiilIIi = "https://api.m.jd.com/api", IIlllIl = Object.assign({}, I1lIllii.paramsData, {
          "jsonp": "jsonp1003"
        });
        break;
      case "getSignRecord":
        lIiilIIi = "https://api.m.jd.com/api", IIlllIl = {
          "appid": "interCenter_shopSign",
          "functionId": "interact_center_shopSign_getSignRecord",
          "body": JSON.stringify({
            "token": $.token,
            "venderId": parseInt($.venderId) || "",
            "activityId": parseInt($.activityId) || "",
            "type": 56
          }),
          "jsonp": "jsonp1001"
        };
        break;
    }
    const Ii1lI1li = {
      "t": Math.floor(Date.now() / 1000) + "000",
      "loginType": "2",
      "x-api-eid-token": lliII1i1
    };
    ll1II1li && Object.assign(ll1II1li, Ii1lI1li);
    IIlllIl && Object.assign(IIlllIl, Ii1lI1li);
    const l11iIIll = {
      "url": lIiilIIi,
      "method": iIliiIl1,
      "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "text/plain",
        "Host": "api.m.jd.com",
        "Referer": activityUrl,
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": i11I1IiI,
        "Cookie": i11Illl
      },
      "params": IIlllIl,
      "data": ll1II1li,
      "timeout": 30000
    };
    if (iIliiIl1 === "GET") {
      delete l11iIIll.data;
      delete l11iIIll.headers["Content-Type"];
    }
    const II1lIlI1 = 3;
    let II11Ii1l = 0,
      IiiI1lli = null,
      l1llllI1 = false;
    while (II11Ii1l < II1lIlI1) {
      const IillI1Ii = await common.request(l11iIIll);
      if (!IillI1Ii.success) {
        IiiI1lli = iIli1lI + " ➜ 请求失败（" + IillI1Ii.error + "）🚫";
        II11Ii1l++;
        continue;
      }
      if (!IillI1Ii.data) {
        IiiI1lli = iIli1lI + " ➜ 请求失败（无响应数据）🚫";
        II11Ii1l++;
        continue;
      }
      lilllI1(iIli1lI, IillI1Ii.data);
      l1llllI1 = false;
      break;
    }
    II11Ii1l >= II1lIlI1 && (console.log(IiiI1lli), l1llllI1 && ($.outFlag = true));
  }
}
async function handleResponse(liil1iIl, iIilI11I) {
  try {
    switch (liil1iIl) {
      case "getActivityInfo":
        if (iIilI11I.code === 200 && iIilI11I.success === true && iIilI11I.data) $.getActivityInfo = iIilI11I.data;else iIilI11I.msg ? (console.log("🚫 查询活动信息失败 ➜ " + iIilI11I.msg), $.invalidAct = true) : (console.log("❓" + liil1iIl + " " + JSON.stringify(iIilI11I)), $.invalidAct = true);
        break;
    }
  } catch (il11iIil) {
    console.log("❌ 未能正确处理 " + liil1iIl + " 请求响应 " + (il11iIil.message || il11iIil));
  }
}
async function sendRequest(i1llilII) {
  if ($.runEnd) return;
  let l1Il1I1i = "",
    IilII1ll = null,
    liilIi11 = null,
    iI1iiIl1 = "GET",
    Ilii1il1 = {},
    IlIIIil1 = {};
  switch (i1llilII) {
    case "getActivityInfo":
      IlIIIil1 = {
        "appId": "4da33",
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": $.token,
          "venderId": ""
        },
        "version": "4.7",
        "ua": $.UA
      }, Ilii1il1 = await H5st.getH5st(IlIIIil1), l1Il1I1i = "https://api.m.jd.com/api", liilIi11 = Object.assign({}, Ilii1il1.paramsData, {
        "jsonp": "jsonp1003"
      });
      break;
    default:
      console.log("❌ 未知请求 " + i1llilII);
      return;
  }
  const IiIlIi = {
    "t": Math.floor(Date.now() / 1000) + "000",
    "loginType": "2",
    "x-api-eid-token": $.jsToken
  };
  IilII1ll && Object.assign(IilII1ll, IiIlIi);
  liilIi11 && Object.assign(liilIi11, IiIlIi);
  const ililliil = {
    "url": l1Il1I1i,
    "method": iI1iiIl1,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "text/plain",
      "Host": "api.m.jd.com",
      "Referer": activityUrl,
      "Sec-Fetch-Dest": "script",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "params": liilIi11,
    "data": IilII1ll,
    "timeout": 30000,
    "httpsTlsOptions": common.useAppTls()
  };
  iI1iiIl1 === "GET" && (delete ililliil.data, delete ililliil.headers["Content-Type"]);
  const Ii1li = 1;
  let i1ii = 0,
    ilIl1lIl = null,
    i1i1II11 = null;
  while (i1ii < Ii1li) {
    i1ii > 0 && (await $.wait(2000));
    const l1I1ill = await common.request(ililliil);
    if (!l1I1ill.success) {
      i1i1II11 = l1I1ill.status;
      ilIl1lIl = "🚫 " + i1llilII + " 请求失败 ➜ " + l1I1ill.error;
      i1ii++;
      continue;
    }
    if (!l1I1ill.data) {
      ilIl1lIl = "🚫 " + i1llilII + " 请求失败 ➜ 无响应数据";
      i1ii++;
      continue;
    }
    await handleResponse(i1llilII, l1I1ill.data);
    ipBlack = false;
    break;
  }
  i1ii >= Ii1li && ($.errMsg = ilIl1lIl, i1i1II11 !== 403 && console.log(ilIl1lIl));
}