//Sun Aug 23 2026 23:03:15 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let actInfoSignMap = new Map(),
  signInfoSignMap = new Map(),
  ruleInfoSignMap = new Map();
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.config = async function () {
  if ($.gygShopArgv.startsWith("http")) {
    {
      $.shopId = this.getQueryString($.gygShopArgv, "shopId") || "";
      $.venderId = this.getQueryString($.gygShopArgv, "venderId") || "";
      let {
        shopId: iIIIii1i,
        venderId: i1li1IiI,
        shopName: liIllI1I
      } = await $.getShopBaseInfo();
      $.shopId = iIIIii1i;
      $.venderId = i1li1IiI;
      $.shopName = liIllI1I;
    }
  } else {
    let Ii1il1i1 = $.gygShopArgv.split("_");
    $.shopId = Ii1il1i1?.[0];
    $.venderId = Ii1il1i1?.[1];
  }
  $.activityUrl = "https://shop.m.jd.com/?shopId=" + $.shopId + "&venderId=" + $.venderId;
};
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.shopId || !$.venderId) {
    $.log("无效的参数" + $.gygShopArgv);
    $.expire = true;
    return;
  }
  let IiIi1l = await sign();
  if (IiIi1l?.["code"] === "0") {
    if (IiIi1l?.["result"]?.["isSign"] === 3) {
      $.putMsg("已刮过奖");
    } else IiIi1l?.["result"]?.["isSign"] === 1 ? IiIi1l?.["result"]["isWin"] ? $.putMsg(IiIi1l.result?.["signReward"]?.["name"]) : $.putMsg("未中奖") : $.log(JSON.stringify(IiIi1l));
  } else $.putMsg(JSON.stringify(IiIi1l));
};
async function drawShopGiftWx() {
  let IIiiI1iI = "https://api.m.jd.com/client.action?g_ty=ls&g_tk=518274330",
    IliIliii = "functionId=drawShopGift&body={\"follow\":0,\"shopId\":\"" + $.shopId + "\",\"activityId\":\"" + $.activityId + "\",\"sourceRpc\":\"shop_app_home_window\",\"venderId\":\"" + $.venderId + "\"}&client=apple&clientVersion=10.0.4&osVersion=13.7&appid=wh5&loginType=2&loginWQBiz=interact",
    l1iii1i = {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Connection": "keep-alive",
      "Accept-Language": "zh-cn",
      "Cookie": $.cookie
    };
  l1iii1i["User-Agent"] = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN miniProgram";
  let {
    data: IiiII1Il
  } = await $.request(IIiiI1iI, l1iii1i, IliIliii);
  return IiiII1Il;
}
async function sign() {
  let IiI1IiIl = {
      "vendorId": $.venderId,
      "sourceRpc": "shop_app_sign_home"
    },
    iIililll = signInfoSignMap.get($.venderId);
  if (!iIililll) {
    iIililll = await $.sign("sign", IiI1IiIl);
    signInfoSignMap.set($.venderId, iIililll);
  }
  let i1lliiii = {
    "J-E-H": "",
    "Connection": "keep-alive",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Referer": "",
    "J-E-C": "",
    "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
    "Accept": "*/*",
    "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)"
  };
  i1lliiii.Cookie = $.cookie;
  let iiIliliI = "https://api.m.jd.com/client.action?functionId=" + iIililll.fn,
    {
      status: IiIil1i,
      data: iillIIl
    } = await $.request(iiIliliI, i1lliiii, iIililll.sign);
  return iillIIl;
}
async function getSignActivityRule() {
  let lII1l11l = {
      "vendorId": $.venderId
    },
    iIliiilI = ruleInfoSignMap.get($.venderId);
  if (!iIliiilI) {
    iIliiilI = await $.sign("signActivityRule", lII1l11l);
    ruleInfoSignMap.set($.venderId, iIliiilI);
  }
  let i1il1iiI = {
    "J-E-H": "",
    "Connection": "keep-alive",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Referer": "",
    "J-E-C": "",
    "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
    "Accept": "*/*",
    "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)"
  };
  i1il1iiI.Cookie = $.cookie;
  let lI11l11I = "https://api.m.jd.com/client.action?functionId=" + iIliiilI.fn,
    {
      status: i1IliilI,
      data: IIliIiII
    } = await $.request(lI11l11I, i1il1iiI, iIliiilI.sign);
  return IIliIiII;
}
async function getShopHomeActivityInfo() {
  let IIi11lli = {
      "shopId": $.shopId,
      "source": "app-shop",
      "latWs": "0",
      "lngWs": "0",
      "displayWidth": "1098.000000",
      "sourceRpc": "shop_app_home_home",
      "lng": "0",
      "lat": "0",
      "venderId": $.venderId
    },
    I1lliiI = actInfoSignMap.get($.shopId + "_" + $.venderId);
  !I1lliiI && (I1lliiI = await $.sign("getShopHomeActivityInfo", IIi11lli), actInfoSignMap.set($.shopId + "_" + $.venderId, I1lliiI));
  let iIlII1ll = {
    "J-E-H": "",
    "Connection": "keep-alive",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "api.m.jd.com",
    "Referer": "",
    "J-E-C": "",
    "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
    "Accept": "*/*",
    "User-Agent": "JD4iPhone/167841 (iPhone; iOS; Scale/3.00)"
  };
  iIlII1ll.Cookie = $.cookie;
  let IiiIii1 = "https://api.m.jd.com/client.action?functionId=" + I1lliiI.fn,
    {
      status: i1IIii1I,
      data: llIii111
    } = await $.request(IiiIii1, iIlII1ll, I1lliiI.sign);
  return llIii111;
}
async function getShopName() {
  let li11l1Ii = "https://wq.jd.com/mshop/QueryShopMemberInfoJson?venderId=" + $.venderId,
    II1IIili = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "Referer": "https://h5.m.jd.com/",
      "Cookie": $.cookie,
      "User-Agent": "Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40"
    };
  return await $.get(li11l1Ii, II1IIili);
}
$.after = async function () {
  $.msg.push("export M_GYG_SHOP_ARGV=\"" + $.gygShopArgv + "\"");
};