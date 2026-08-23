//Sun Aug 23 2026 16:18:05 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  let l1I1llli = $?.["favShopArgv"]?.["split"]("_");
  $.shopId = l1I1llli?.[0];
  $.venderId = l1I1llli?.[1];
  if (!$.shopId || !$.venderId) {
    {
      $.log("无效的参数" + $.favShopArgv);
      $.expire = true;
      return;
    }
  }
  await $.wait(1000, 3000);
  let iil11l1l = await QueryShopActive();
  if (iil11l1l?.["iRet"] !== "0") {
    $.putMsg(iil11l1l?.["errMsg"]);
    return;
  }
  if (iil11l1l?.["fan"] === 1) {
    {
      $.putMsg("已经收藏过啦");
      await DelShopFav();
      return;
    }
  }
  let iIIiii = iil11l1l?.["gift"]?.["filter"](IllIlI11 => IllIlI11.jingBean?.["sendCount"] > 0)?.[0];
  if (!iIIiii) {
    $.putMsg("没有奖励");
    return;
  }
  $.activeId = iIIiii.activeId || "";
  $.giftId = iIIiii.giftId || "";
  $.beanCnt = iIIiii?.["jingBean"]?.["sendCount"] || 0;
  $.log($.activeId, $.giftId, $.beanCnt);
  if (!$.activeId) {
    {
      $.putMsg("没找到活动信息");
      $.expire = true;
      return;
    }
  }
  let IlI111I = await addfavgiftshop();
  IlI111I.iRet === "0" && $.putMsg("收藏成功");
  let Ill111II = await GiveShopGift();
  $.log(JSON.stringify(Ill111II));
  if (Ill111II.retCode === 0) {
    $.putMsg($.beanCnt + "豆");
  } else Ill111II.retCode === 201 ? $.putMsg("已领取过") : $.putMsg("领取失败");
  await DelShopFav();
};
async function GiveShopGift() {
  let IIi11lIi = "https://wq.jd.com/fav_snsgift/GiveShopGift?venderId=" + $.venderId + "&activeId=" + $.activeId + "&giftId=" + $.giftId + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=jsonpCBKQ&g_tk=1292830178&g_ty=ls",
    liiil11I = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": $.cookie,
      "Host": "wq.jd.com",
      "Referer": "https://shop.m.jd.com/?shopId=" + $.shopId,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    },
    {
      status: iillIlll,
      data: lIlli1li
    } = await $.request(IIi11lIi, liiil11I);
  return $.handler(lIlli1li);
}
async function DelShopFav() {
  let IIIi1l = "https://wq.jd.com/fav/shop/DelShopFav?shopId=" + $.shopId + "&venderId=" + $.venderId + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=jsonpCBKM&g_tk=1292830178&g_ty=ls",
    i1il1Ill = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": $.cookie,
      "Host": "wq.jd.com",
      "Referer": "https://shop.m.jd.com/?shopId=" + $.shopId,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    },
    {
      data: Ii1I11li
    } = await $.request(IIIi1l, i1il1Ill);
  return $.handler(Ii1I11li);
}
async function addfavgiftshop() {
  let l1iI11Ii = "https://wq.jd.com/fav_snsgift/addfavgiftshop?venderId=" + $.venderId + "&shareToken=&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=jsonpCBKO&g_tk=1292830178&g_ty=ls",
    iI11II1I = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": $.cookie,
      "Host": "wq.jd.com",
      "Referer": "https://shop.m.jd.com/?shopId=" + $.shopId,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    },
    {
      status: IiIlil1l,
      data: l1liiI1i
    } = await $.request(l1iI11Ii, iI11II1I);
  return $.handler(l1liiI1i);
}
async function QueryShopActive() {
  let i11IlllI = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Cookie": $.cookie,
      "Host": "wq.jd.com",
      "Referer": "https://shop.m.jd.com/?shopId=" + $.shopId,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    },
    lIlIlilI = "https://wq.jd.com/fav_snsgift/QueryShopActive?venderId=" + $.venderId + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_tk=1292830178&g_ty=ls",
    {
      status: il1lI111,
      data: liiil1li
    } = await $.request(lIlIlilI, i11IlllI);
  return $.handler(liiil1li);
}
$.after = async function () {
  $.msg.push("export M_FAV_SHOP_ARGV=\"" + $.favShopArgv + "\"");
};