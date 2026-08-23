//Sun Aug 23 2026 16:02:13 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.uid = $.getQueryString($.activityUrl, "qwer");
let headers = {
  "Accept": "*/*",
  "Connection": "keep-alive",
  "Referer": "" + $.activityUrl,
  "Accept-Encoding": "gzip, deflate, br",
  "Host": "wq.jd.com",
  "User-Agent": "jdapp;iPhone;10.1.6;13.5;;network/wifi;model/iPhone11,6;addressid/4596882376;appBuild/167841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
  "Accept-Language": "zh-cn"
};
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  if ($.expire) {
    return;
  }
  await login();
  let llli1i = "https://wq.jd.com/active/getfunction?_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=jsonpCBKA&g_ty=ls",
    {
      data: IillIIll
    } = await $.request(llli1i, headers);
  headers.Cookie = "promotejs=" + IillIIll.match(/TOKEN":"(.*?)"/)[1] + eval(IillIIll.match(/a = (.*?);/)[1]) + ";" + $.cookie;
  let l1IIl1ii = $.activityUrl.includes("videofangrowth") ? JSON.parse((await $.request("https://wq.jd.com/activet2/looktreasure/draw_fans?_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls", headers))?.["data"]["match"](/openLibao\((.*)\n/)[1]) : $.activityUrl.includes("fansactiveall") ? JSON.parse((await $.request("https://wq.jd.com/activet2/looktreasure/draw_activetemporary?sceneval=2&backendId=" + JSON.parse((await $.request("https://wq.jd.com/activet2/looktreasure/query_tempactivconfig?uuid=" + $.uid + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls", headers))?.["data"]?.["match"](/query_tempactivconfig\((.*)\n/)?.[1])?.["backEnd"] + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=draw_activetemporary&g_ty=ls", headers))?.["data"]["match"](/draw_activetemporary\((.*)\n/)?.[1]) : $.activityUrl.includes("fansactivecopy") ? JSON.parse((await $.request("https://wq.jd.com/activet2/looktreasure/query_copytemporary?sceneval=2&backendId=&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=query_copytemporary&g_ty=ls", headers))?.["data"]["match"](/query_copytemporary\((.*)\n/)?.[1]) : false;
  if (!l1IIl1ii) {
    $.putMsg("不支持，请去检查");
    $.expire = true;
    return;
  }
  $.log(JSON.stringify(l1IIl1ii));
  l1IIl1ii.ret === 0 ? l1IIl1ii.msg ? $.putMsg(l1IIl1ii.msg) : $.putMsg((Array.isArray(l1IIl1ii.prize) ? l1IIl1ii.prize[0].sPrizeDesc + "," + l1IIl1ii.prize[0].sPrizeName : l1IIl1ii.prize.sPrizeDesc + "," + l1IIl1ii.prize.sPrizeName) || "空气") : l1IIl1ii.ret === 1005 ? $.putMsg("已领过") : $.putMsg(JSON.stringify(l1IIl1ii));
};
async function login() {
  let liIlIl = await got.get("https://wq.jd.com/mlogin/mpage/Login?rurl=" + encodeURIComponent($.activityUrl), {
    "headers": {
      "Host": "wq.jd.com",
      "Accept": "*/*",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
      "Cookie": $.cookie,
      "Accept-Language": "zh-cn",
      "Referer": "https://wqs.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "X-Requested-with": "XMLHttpRequest"
    },
    "followRedirect": false
  });
  if (liIlIl.headers["set-cookie"]) for (let i111IIii of liIlIl.headers["set-cookie"]) {
    $.cookie = "" + $.cookie + i111IIii.split(";")[0] + ";";
  }
  if (liIlIl.headers["Set-Cookie"]) {
    for (let IiII1Iil of liIlIl.headers["Set-Cookie"]) {
      $.cookie = "" + $.cookie + IiII1Iil.split(";")[0] + ";";
    }
  }
}
async function videofangrowth() {
  return JSON.parse((await $.request("https://" + $.domain + "/activet2/looktreasure/draw_fans?_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=openLibao&g_ty=ls", headers))?.["data"]["match"](/openLibao\((.*)\n/)[1]);
}
async function fansactiveall() {
  return JSON.parse((await $.request("https://" + $.domain + "/activet2/looktreasure/draw_activetemporary?sceneval=2&backendId=" + JSON.parse((await $.request("https://" + $.domain + "/activet2/looktreasure/query_tempactivconfig?uuid=" + $.uid + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=query_tempactivconfig&g_ty=ls", headers))?.["data"]?.["match"](/query_tempactivconfig\((.*)\n/)?.[1])?.["backEnd"] + "&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=draw_activetemporary&g_ty=ls", headers))?.["data"]["match"](/draw_activetemporary\((.*)\n/)?.[1]);
}
async function fansactivecopy() {
  return JSON.parse((await $.request("https://" + $.domain + "/activet2/looktreasure/draw_copytemporary?sceneval=2&_=" + $.timestamp() + "&sceneval=2&g_login_type=1&callback=query_copytemporary&g_ty=ls", headers))?.["data"]["match"](/query_copytemporary\((.*)\n/)?.[1]);
}
$.after = async function () {
  $.msg.push("\nexport M_FANS_RED_PACKET_URL=\"" + $.activityUrl + "\"");
};