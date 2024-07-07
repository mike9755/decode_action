//Sun Jul 07 2024 14:47:22 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const notify = $.isNode() ? require("./sendNotify") : "",
  got = require("got"),
  {
    format
  } = require("date-fns"),
  tunnel = require("tunnel"),
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
process.env.API_PROXY_POOL ? process.env.API_PROXY_POOL.split(/[@,|\n]/).forEach(ll1Ili => proxyPoolAPIs.push(ll1Ili)) : "";
let cookiesArr = [],
  cookie = "",
  allMessage = "",
  message;
let activityId = "",
  vender = "",
  num = 0;
$.intervalIds = [];
process.env.DPQD && (process.env.DPQD.includes("\n") ? token = [...process.env.DPQD.split("\n"), ...token] : token = [...process.env.DPQD.split("&"), ...token]);
if (!token.length) {
  console.log("无店铺签到token,不执行.需自备token:环境变量DPQD: tk1&tk2.");
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(i1IiIl => {
    cookiesArr.push(jdCookieNode[i1IiIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(i1IiIi => i1IiIi.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(ll1Ill => ll1Ill !== "" && ll1Ill !== null && ll1Ill !== undefined);
}
$.useProxyPool = process.env.USE_API_PROXY_POOL ? process.env.USE_API_PROXY_POOL === "true" : false;
$.timeProxyPool = process.env.TIME_PROXY_POOL ? parseInt(process.env.TIME_PROXY_POOL) : 12;
$.countProxyPool = process.env.COUNT_PROXY_POOL ? parseInt(process.env.COUNT_PROXY_POOL) : 1;
$.useProxyPool && (console.log("✅ 代理已启动"), console.log("🔉 API_PROXY_POOL[代理API]：" + proxyPoolAPIs));
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("🔉🔉🔉 共" + token.length + "个店铺，开始签到...");
  for (let IlI1 = 0; IlI1 < cookiesArr.length; IlI1++) {
    if (cookiesArr[IlI1]) {
      cookie = cookiesArr[IlI1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlI1 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      if ($.useProxyPool && $.index == 1) await findWorkingProxy(), await $.wait(2000);
      await TotalBean();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      getUA();
      await dpqd();
      await showMsg();
      await $.wait(1500);
    }
  }
  $.isNode() && allMessage && (await notify.sendNotify("店铺签到", "" + allMessage));
})().catch(i111l => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + i111l + "!", "");
}).finally(() => {
  $.done();
  $.intervalIds.forEach(IiIII => {
    clearInterval(IiIII);
  });
});
async function getProxyIPsFromProxyPool(l1IIi, l1IIl) {
  try {
    const IlIi1l = await got.get(l1IIi, {
        "timeout": 3000,
        "headers": {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.4 Mobile/15E148 Safari/604.1"
        }
      }),
      IiIiiI = IlIi1l.body.split("\n"),
      IlIi1i = [];
    for (let lIllii = 0; lIllii < IiIiiI.length && IlIi1i.length < l1IIl; lIllii++) {
      IlIi1i.push(IiIiiI[lIllii]);
    }
    return IlIi1i;
  } catch (IIiI) {
    return console.error("❌ API提取响应处理异常：" + (IIiI.message || IIiI)), false;
  }
}
async function testIP(l1iil1) {
  try {
    const Ill1i1 = {
        "timeout": 3000,
        "headers": {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.4 Mobile/15E148 Safari/604.1"
        }
      },
      [illl1I, lillI] = l1iil1.split(":"),
      Il11i = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": illl1I,
            "port": lillI
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": illl1I,
            "port": lillI
          }
        })
      };
    Object.assign(Ill1i1, {
      "agent": Il11i
    });
    return true;
  } catch (iiI1) {
    return console.error("❌ IP测试响应处理异常：" + (iiI1.message || iiI1)), false;
  }
}
function findWorkingProxy() {
  let l1iiil = 0,
    l1ilI = 0;
  proxyIP = "";
  async function IIi1() {
    if (l1ilI >= 2 * proxyPoolAPIs.length) {
      console.log("🌐 已达到API尝试上限，切换到直连模式->");
      $.useProxyPool = false;
      l1ilI = 0;
      return;
    }
    const IIii = proxyPoolAPIs[l1iiil],
      i1Ii1I = new URL(IIii).hostname,
      llIiIl = new Date(),
      I1i1i = llIiIl.getHours(),
      lIi1II = llIiIl.getMinutes(),
      iiiIii = llIiIl.getSeconds();
    console.log("🌐 当前API(" + (l1iiil + 1) + ")[" + I1i1i + ":" + lIi1II + ":" + iiiIii + "]: " + i1Ii1I);
    proxyIPs = await getProxyIPsFromProxyPool(IIii, $.countProxyPool);
    if (!proxyIPs || proxyIPs.length === 0) {
      console.log("🌐 未能获取IP，尝试下一个API");
      l1ilI++;
      l1iiil = (l1iiil + 1) % proxyPoolAPIs.length;
      IIi1();
      return;
    }
    let IllI1 = false;
    for (let iiiIll of proxyIPs) {
      proxyIP = iiiIll;
      console.log("🌐 当前使用IP：" + proxyIP);
      isAlive = await testIP(proxyIP);
      if (isAlive) {
        IllI1 = true;
        $.useProxyPool = true;
        break;
      }
    }
    if (!IllI1) {
      console.log("🌐 当前IP不可用，尝试下一个API");
      l1ilI++;
      l1iiil = (l1iiil + 1) % proxyPoolAPIs.length;
      IIi1();
      return;
    }
    l1iiil > 0 && setTimeout(() => {
      l1iiil = 0;
    }, 10000);
  }
  intervalId = setInterval(IIi1, $.timeProxyPool * 1000);
  $.intervalIds.push(intervalId);
  IIi1();
}
async function dpqd() {
  for (var i11Il = 0; i11Il < token.length; i11Il++) {
    num = i11Il + 1;
    const Il1ill = token[i11Il];
    if (token[i11Il] == "") {
      continue;
    }
    console.log("🔉 当前运行第" + (i11Il + 1) + "个店铺TOKEN：" + token[i11Il]);
    if (Il1ill.includes(":")) {
      const [IIllII, iil1I1, iI11il] = Il1ill.split(":");
      await getvenderName(iil1I1);
      await signCollectGift(IIllII, iil1I1, iI11il);
      await taskUrl(IIllII, iil1I1, iI11il);
    } else {
      await getvenderId(token[i11Il]);
      if (vender == "") continue;
      await getvenderName(vender);
      await signCollectGift(token[i11Il], vender, activityId);
      await taskUrl(token[i11Il], vender, activityId);
    }
  }
}
async function getvenderId(liIII1) {
  return new Promise(async IIiIII => {
    const lIi1Il = setTimeout(() => {
        return console.error("getvenderId: API查询请求超时 ‼️‼️"), IIiIII();
      }, 30000),
      Ii1lII = {
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": liIII1,
          "venderId": ""
        }
      };
    try {
      body = await generateH5ST("4da33", Ii1lII);
      const illIII = body.match(/h5st=([^&]+)/);
      if (illIII) {
        const ii1iIi = illIII[1],
          iliI1i = decodeURIComponent(ii1iIi);
        h5stParams = iliI1i.split(";");
        h5stParams1 = ii1iIi.split(";");
      }
      const iliI1l = {
        "url": "https://api.m.jd.com/api?loginType=2&" + body,
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "referer": "https://h5.m.jd.com/",
          "User-Agent": $.UA
        },
        "timeout": 30000
      };
      $.useProxyPool && ([host, port] = proxyIP.split(":"), agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      }, Object.assign(iliI1l, {
        "agent": agent
      }));
      $.get(iliI1l, (i11III, ii1iIl, Ill1l1) => {
        clearTimeout(lIi1Il);
        try {
          if (i11III) console.log("" + JSON.stringify(i11III)), console.log("getvenderId: API查询请求失败 ‼️‼️");else {
            Ill1l1 = JSON.parse(/{(.*)}/g.exec(Ill1l1)[0]);
            if (Ill1l1?.["code"] == 402) vender = "", console.log("第" + num + "个店铺签到活动已失效"), message += "第" + num + "个店铺签到活动已失效\n";else {
              vender = Ill1l1?.["data"]?.["venderId"];
              activityId = Ill1l1?.["data"]?.["id"];
              $.startTimej = Ill1l1?.["data"]?.["startTime"];
              $.endTimej = Ill1l1?.["data"]?.["endTime"];
              if ($.index == 1) {
                console.log("开始时间：" + timestampToTime($.startTimej));
                console.log("结束时间：" + timestampToTime($.endTimej));
                let I111lI = "";
                for (let l1iii1 = 0; l1iii1 < Ill1l1?.["data"]?.["continuePrizeRuleList"]?.["length"]; l1iii1++) {
                  const iiilIl = Ill1l1?.["data"]?.["continuePrizeRuleList"][l1iii1]["level"];
                  for (let Il1ilI of Ill1l1?.["data"]?.["continuePrizeRuleList"][l1iii1]["prizeList"]) {
                    if (Il1ilI.type == 4) l1iii1 != Ill1l1?.["data"]?.["continuePrizeRuleList"]?.["length"] - 1 ? I111lI += iiilIl + "天" + Il1ilI.discount + "豆" + Il1ilI.number + "份|" : I111lI += iiilIl + "天" + Il1ilI.discount + "豆" + Il1ilI.number + "份";else {
                      if (Il1ilI.type == 14) l1iii1 != Ill1l1?.["data"]?.["continuePrizeRuleList"]?.["length"] - 1 ? I111lI += iiilIl + "天" + Il1ilI.discount / 100 + "红包" + Il1ilI.number + "份|" : I111lI += iiilIl + " 天 " + Il1ilI.discount / 100 + "红包" + Il1ilI.number + "份";else {}
                    }
                  }
                }
                !I111lI && (I111lI = "无豆无红包，积分优惠券！");
                console.log("奖励：" + I111lI);
              }
            }
          }
        } catch (iI11ll) {
          console.log(iI11ll, ii1iIl);
        } finally {
          IIiIII(Ill1l1);
        }
      });
    } catch (liIl1l) {
      console.error(liIl1l);
    }
  });
}
function getvenderName(IIiII1) {
  return new Promise(iIllI => {
    const liII1i = setTimeout(() => {
        return console.error("getvenderName: API查询请求超时 ‼️‼️"), iIllI();
      }, 30000),
      iIiIil = {
        "url": "https://api.m.jd.com/client.action?functionId=whx_getMShopOutlineInfo&body=%7B%22venderId%22:%22" + IIiII1 + "%22,%22source%22:%22m-shop%22%7D&t=" + Date.now() + "&appid=shop_view",
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "Host": "api.m.jd.com",
          "x-refer-page": "htts://shop.m.jd.com/shop/home",
          "origin": "https://shop.m.jd.com",
          "referer": "https://shop.m.jd.com",
          "cookie": cookie,
          "User-Agent": $.UA
        },
        "timeout": 30000
      };
    if ($.useProxyPool) {
      [host, port] = proxyIP.split(":");
      agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      };
      Object.assign(iIiIil, {
        "agent": agent
      });
    }
    $.get(iIiIil, (lI1i, i11, Ii1llI) => {
      clearTimeout(liII1i);
      try {
        if (lI1i) {
          console.log("getvenderName: API查询请求失败 ‼️‼️");
          console.log("" + JSON.stringify(lI1i));
        } else {
          Ii1llI = JSON.parse(Ii1llI);
          $.shopName = Ii1llI.data.shopInfo.shopName;
          $.shopId = Ii1llI.data.shopInfo.shopId;
          $.index == 1 && (console.log("店铺名称：" + $.shopName), console.log("店铺链接：https://shop.m.jd.com/?venderId=" + IIiII1));
          message += "【" + $.shopName + "】";
        }
      } catch (iIll1) {
        console.log(iIll1, i11);
      } finally {
        iIllI(Ii1llI);
      }
    });
  });
}
async function getActivityInfo(i1I, liII1I, iIiIiI) {
  return $.signFlag = false, new Promise(async IlIiI1 => {
    const l11ll1 = setTimeout(() => {
        return console.error("getActivityInfo: API查询请求超时 ‼️‼️"), IlIiI1();
      }, 30000),
      iIlllI = {
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": i1I,
          "venderId": liII1I
        }
      };
    try {
      body = await generateH5ST("4da33", iIlllI);
      const IlIiIi = body.match(/h5st=([^&]+)/);
      if (IlIiIi) {
        const i1IIi1 = IlIiIi[1],
          IIlIiI = decodeURIComponent(i1IIi1);
        h5stParams = IIlIiI.split(";");
        h5stParams2 = i1IIi1.split(";");
      }
      const IIlIi1 = {
        "url": "https://api.m.jd.com/api?loginType=2&" + body,
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + i1I + "&sceneval=2&jxsid=16105853541009626903&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1001280291_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713",
          "User-Agent": $.UA
        },
        "timeout": 30000
      };
      $.useProxyPool && ([host, port] = proxyIP.split(":"), agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      }, Object.assign(IIlIi1, {
        "agent": agent
      }));
      $.get(IIlIi1, (i1iiI1, ll1l1I, iIilI1) => {
        clearTimeout(l11ll1);
        try {
          if (i1iiI1) console.log("getActivityInfo: API查询请求失败 ‼️‼️"), console.log("" + JSON.stringify(i1iiI1));else {
            console.log(iIilI1);
            iIilI1 = JSON.parse(/{(.*)}/g.exec(iIilI1)[0]);
            activityId = iIilI1.data.id;
            $.startTimej = iIilI1.data.startTime;
            $.endTimej = iIilI1.data.endTime;
            $.index == 1 && (console.log("开始时间：" + timestampToTime($.startTimej)), console.log("结束时间：" + timestampToTime($.endTimej)));
            giftConditions = iIilI1.data.continuePrizeRuleList;
            $.dayNums = [];
            for (let i1IIiI of giftConditions) {
              $.dayNum = i1IIiI.level;
              i1IIiI.prizeList[0].userPirzeStatus == "1" && i1IIiI.prizeList[0].type == "4" && (console.log("签到" + $.dayNum + "天获得" + i1IIiI.prizeList[0].discount + "京豆"), $.dayNums.push($.dayNum), $.signFlag = true);
            }
            iIilI1.data.prizeRuleList[0] && typeof iIilI1.data.prizeRuleList[0].prizeList[0].type != "undefined" && iIilI1.data.prizeRuleList[0].prizeList[0].type == "4" && iIilI1.data.prizeRuleList[0].prizeList[0].userPirzeStatus == "1" && (console.log("🎉 每日签到获得" + iIilI1.data.prizeRuleList[0].prizeList[0].discount + "京豆"), $.signFlag = true);
          }
        } catch (l111II) {
          console.log(l111II, ll1l1I);
        } finally {
          IlIiI1(iIilI1);
        }
      });
    } catch (I1II1) {
      console.error(I1II1);
    }
  });
}
async function signCollectGift(l1II1i, lili11, lIllIi) {
  return new Promise(async I1l11 => {
    const llIiI1 = setTimeout(() => {
        return console.error("signCollectGift: API查询请求超时 ‼️‼️"), I1l11();
      }, 30000),
      li1li1 = {
        "functionId": "interact_center_shopSign_signCollectGift",
        "appid": "interCenter_shopSign",
        "body": {
          "token": l1II1i,
          "venderId": lili11,
          "activityId": lIllIi,
          "type": 56,
          "actionType": 7
        }
      };
    try {
      body = await generateH5ST("4da33", li1li1);
      const ii11li = body.match(/h5st=([^&]+)/);
      if (ii11li) {
        const iiliIi = ii11li[1],
          i111l1 = decodeURIComponent(iiliIi);
        h5stParams = i111l1.split(";");
        h5stParams3 = iiliIi.split(";");
      }
      const il1lIl = {
        "url": "https://api.m.jd.com/api?loginType=2&" + body,
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": cookie,
          "referer": "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + l1II1i + "&sceneval=2&jxsid=16105853541009626903&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_1001280291_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713",
          "User-Agent": $.UA
        },
        "timeout": 30000
      };
      $.useProxyPool && ([host, port] = proxyIP.split(":"), agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      }, Object.assign(il1lIl, {
        "agent": agent
      }));
      $.get(il1lIl, (lIl11l, iiii1i, iiii1l) => {
        clearTimeout(llIiI1);
        try {
          if (lIl11l) {
            console.log("signCollectGift: API查询请求失败 ‼️‼️");
            console.log("" + JSON.stringify(lIl11l));
          } else {
            iiii1l = JSON.parse(/{(.*)}/g.exec(iiii1l)[0]);
            if (iiii1l.success && iiii1l.success === true) {
              let I1li11 = 0;
              for (let II1iIl of iiii1l.data) {
                for (i of II1iIl.prizeList) switch (i.type) {
                  case 4:
                    I1li11 += i.discount;
                    break;
                }
              }
              console.log("结果：✅ 签到成功! " + (I1li11 > 0 ? "🎉 获得 " + I1li11 + " 京豆" : ""));
              I1li11 !== 0 && (message += " " + I1li11 + "京豆 ");
              fail = 0;
            } else {
              if (iiii1l.msg) console.log("结果：签到失败！" + iiii1l.msg);else {
                console.log("签到失败!");
                console.log(JSON.stringify(iiii1l));
                fail++;
                if (fail > 6) {
                  console.log("\n❌❌❌ 跑了" + fail + "个账号都签到失败，结束！");
                  return;
                }
              }
            }
          }
        } catch (Illi) {
          console.log(Illi, iiii1i);
        } finally {
          I1l11(iiii1l);
        }
      });
    } catch (l1IiiI) {
      console.error(l1IiiI);
    }
  });
}
function taskUrl(il11Il, IIiI1, II1iII) {
  return new Promise(iil1 => {
    const iiil = setTimeout(() => {
        return console.error("taskUrl: API查询请求超时 ‼️‼️"), iil1();
      }, 30000),
      li1Iil = {
        "url": "https://api.m.jd.com/api?appid=interCenter_shopSign&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + il11Il + "%22,%22venderId%22:" + IIiI1 + ",%22activityId%22:" + II1iII + ",%22type%22:56}&jsonp=jsonp1006",
        "headers": {
          "accept": "application/json",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9",
          "cookie": cookie,
          "referer": "https://h5.m.jd.com/",
          "User-Agent": $.UA
        },
        "timeout": 30000
      };
    if ($.useProxyPool) {
      [host, port] = proxyIP.split(":");
      agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      };
      Object.assign(li1Iil, {
        "agent": agent
      });
    }
    $.get(li1Iil, (iiIIil, iiIIii, i1liIi) => {
      clearTimeout(iiil);
      try {
        iiIIil ? (console.log("taskUrl: API查询请求失败 ‼️‼️"), console.log("" + JSON.stringify(iiIIil))) : (i1liIi = JSON.parse(/{(.*)}/g.exec(i1liIi)[0]), console.log("已签到：" + i1liIi?.["data"]?.["days"] + "天"), message += "已签到：" + i1liIi?.["data"]?.["days"] + "天\n");
      } catch (IiIill) {
        console.log(IiIill, iiIIii);
      } finally {
        iil1(i1liIi);
      }
    });
  });
}
async function showMsg() {
  $.isNode() && ($.msg("店铺签到𝓑𝔂:𝓳𝓮𝓳𝔃", "", "【" + $.index + " " + ($.nickName || $.UserName) + "】\n" + message), allMessage += "【" + $.index + " " + ($.nickName || $.UserName) + "】\n" + message + ($.index !== cookiesArr.length ? "\n" : ""));
}
async function generateH5ST(li1Ili, I11lil) {
  try {
    let li1Ill = new H5ST({
      "appId": li1Ili,
      "appid": "interCenter_shopSign",
      "clientVersion": "6.0.0",
      "pin": $.UserName,
      "client": "android",
      "ua": $.UA,
      "version": "4.1"
    });
    await li1Ill.genAlgo();
    let Ili1ll = await li1Ill.genUrlParams(I11lil.functionId, I11lil.body);
    return Ili1ll;
  } catch (IIl1Il) {
    return console.error(IIl1Il), "";
  }
}
function TotalBean() {
  return new Promise(async IIi111 => {
    const iiI11 = setTimeout(() => {
        return console.error("TotalBean: API查询请求超时 ‼️‼️"), IIi111();
      }, 30000),
      lIlIli = {
        "url": "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        "headers": {
          "Host": "me-api.jd.com",
          "Accept": "*/*",
          "Connection": "keep-alive",
          "Cookie": cookie,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42",
          "Accept-Language": "zh-cn",
          "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
          "Accept-Encoding": "gzip, deflate, br"
        },
        "timeout": 30000
      };
    if ($.useProxyPool) {
      [host, port] = proxyIP.split(":");
      agent = {
        "http": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        }),
        "https": tunnel.httpsOverHttp({
          "proxy": {
            "host": host,
            "port": port
          }
        })
      };
      Object.assign(lIlIli, {
        "agent": agent
      });
    }
    $.get(lIlIli, (l111I1, IiII11, I11liI) => {
      clearTimeout(iiI11);
      try {
        if (l111I1) {
          console.log("" + JSON.stringify(l111I1));
          console.log("TotalBean: API请求失败，请检查网路重试");
        } else {
          if (I11liI) {
            I11liI = JSON.parse(I11liI);
            if (I11liI.retcode === "1001" || I11liI.retcode === "13") {
              $.isLogin = false;
              return;
            }
            if (I11liI.retcode === "0" && I11liI.data && I11liI.data.hasOwnProperty("userInfo")) $.nickName = I11liI.data.userInfo.baseInfo.nickname;else {
              $.nickName = $.UserName;
            }
          } else console.log("京东服务器返回空数据");
        }
      } catch (iI1) {
        console.log(iI1, IiII11);
      } finally {
        IIi111();
      }
    });
  });
}
function jsonParse(I111Ii) {
  if (typeof I111Ii == "string") try {
    return JSON.parse(I111Ii);
  } catch (ilIiil) {
    return console.log(ilIiil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function randomString(iII) {
  iII = iII || 32;
  let lIIl = "abcdef0123456789",
    lIl1i = lIIl.length,
    Iili1l = "";
  for (i = 0; i < iII; i++) Iili1l += lIIl.charAt(Math.floor(Math.random() * lIl1i));
  return Iili1l;
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function timestampToTime(IIiIll) {
  let iI1i = new Date(IIiIll),
    liIiii = iI1i.getFullYear() + "-",
    l11Ill = (iI1i.getMonth() + 1 < 10 ? "0" + (iI1i.getMonth() + 1) : iI1i.getMonth() + 1) + "-",
    IIlliI = iI1i.getDate() + " ",
    ilIil1 = iI1i.getHours() + ":",
    iI1l = iI1i.getMinutes() + ":",
    lIl1I1 = iI1i.getSeconds();
  return liIiii + l11Ill + IIlliI + ilIil1 + iI1l + lIl1I1;
}