//Sun Aug 23 2026 23:01:27 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let forceOpen = parseInt(process.env.M_OPEN_CARD_FORCE || "1");
$.version = "v1.0.0";
$.config = async function () {
  if ($.openCardArgv.startsWith("http")) {
    $.shopId = this.getQueryString($.openCardArgv, "shopId") || "";
    $.venderId = this.getQueryString($.openCardArgv, "venderId") || "";
    let {
      shopId: _0x424fe6,
      venderId: _0x453989,
      shopName: _0x31d97d
    } = await $.getShopBaseInfo();
    $.shopId = _0x424fe6;
    $.venderId = _0x453989;
    $.shopName = _0x31d97d;
  } else {
    let _0xd3dfe8 = $.openCardArgv.split("_");
    $.shopId = _0xd3dfe8?.[0];
    $.venderId = _0xd3dfe8?.[1];
  }
  $.activityUrl = "https://shopmember.m.jd.com/shopcard/?shopId=" + $.shopId + "&venderId=" + $.venderId;
};
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.shopId || !$.venderId) {
    $.log("无效的参数" + $.openCardArgv);
    $.expire = true;
    return;
  }
  $.UA = $.ua();
  if (!$.venderCardName) {
    let _0x546229 = await $.openCardInfo();
    if (_0x546229?.["busiCode"] !== "0") {
      $.log(JSON.stringify(_0x546229));
      return;
    }
    $.venderCardName = _0x546229.result?.["shopMemberCardInfo"]?.["venderCardName"];
    let _0x3a6d08 = _0x546229.result?.["interestsRuleList"] || [],
      _0x1b797c = _0x3a6d08.filter(_0x50911e => _0x50911e?.["prizeType"] === 4 || _0x50911e?.["prizeType"] === 14 || _0x50911e?.["prizeName"] === "京豆" || _0x50911e?.["prizeName"] === "红包")?.[0] || "";
    $.beanCount = 0;
    $.beanCount = _0x1b797c?.["discountString"] * 1 || 0;
    $.activityId = _0x1b797c?.["interestsInfo"]?.["activityId"] || "";
  }
  let _0x36bb84 = await $.openCard($.venderId, 208, $.activityId);
  if (_0x36bb84.code === 0) {
    {
      let _0x5db71a = _0x36bb84.result?.["giftInfo"]?.["giftList"] || [];
      if (_0x5db71a.length == 0 && _0x36bb84.message.includes("加入店铺会员成功")) {
        {
          $.log("没水停止了");
          $.expire = true;
          return;
        }
      }
      for (let _0x3a2ea8 of _0x5db71a || []) {
        $.putMsg("" + _0x3a2ea8.discountString + _0x3a2ea8.prizeName);
      }
    }
  }
};
async function getOpenCardGift() {
  let _0x9078f5 = "jsonp_" + $.timestamp() + "_" + $.random(10000, 99999),
    _0x3da23c = "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" + $.venderId + "%22%2C%22channel%22%3A406%7D&client=H5&clientVersion=9.2.0&uuid=&jsonp=" + _0x9078f5,
    _0x490a20 = {
      "Accept": "*/*",
      "Connection": "close",
      "Referer": "https://shopmember.m.jd.com/shopcard/?",
      "Accept-Encoding": "gzip, deflate, br",
      "Host": "api.m.jd.com",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Cookie": $.cookie
    };
  return await $.get(_0x3da23c, _0x490a20);
}
let fansFuseMemberDetailMap = new Map();
async function getFansFuseMemberDetail() {
  let _0x3c564f = {
      "venderId": $.venderId,
      "shopId": $.shopId,
      "channel": 102,
      "queryVersion": "10.5.2"
    },
    _0x484ec5 = fansFuseMemberDetailMap.get($.venderId);
  if (!_0x484ec5) {
    _0x484ec5 = await $.sign("getFansFuseMemberDetail", _0x3c564f);
    fansFuseMemberDetailMap.set($.venderId, _0x484ec5);
  }
  let _0x490d18 = {
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
  _0x490d18.Cookie = $.cookie;
  let _0x357580 = "https://api.m.jd.com/client.action?functionId=" + _0x484ec5.fn,
    {
      status: _0x58ab8c,
      data: _0x2d16e6
    } = await $.request(_0x357580, _0x490d18, _0x484ec5.sign);
  return _0x2d16e6;
}
let collectGiftMap = new Map();
async function collectGift() {
  let _0x4cdeee = {
      "venderId": $.venderId,
      "shopId": $.shopId,
      "activityType": $.activityType,
      "activityId": $.activityId
    },
    _0x47c21e = collectGiftMap.get($.venderId);
  if (!_0x47c21e) {
    _0x47c21e = await $.sign("collectGift", _0x4cdeee);
    collectGiftMap.set($.venderId, _0x47c21e);
  }
  let _0xed9537 = {
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
  _0xed9537.Cookie = $.cookie;
  let _0x2f92da = "https://api.m.jd.com/client.action?functionId=" + _0x47c21e.fn,
    {
      status: _0x2af450,
      data: _0x4f1411
    } = await $.request(_0x2f92da, _0xed9537, _0x47c21e.sign);
  return _0x4f1411;
}
$.after = async function () {
  $.venderCardName && $.msg.push("【" + $.venderCardName + "】入会送（" + $.beanCount + "京豆）");
  $.msg.push("export M_OPEN_CARD_ARGV=\"" + $.openCardArgv + "\"");
};
$.run({
  "whitelist": ["1-100"]
}).catch(_0x33696a => $.log(_0x33696a));