//Sun Aug 23 2026 23:05:06 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  let l1iiiilI = "https://api.m.jd.com/client.action",
    liIil1iI = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://api.m.jd.com",
      "Referer": "https://api.m.jd.com",
      "Cookie": $.cookie,
      "User-Agent": $.ua()
    },
    lII11ii = "functionId=signBeanAct&appid=ld",
    iliiII1i = await $.post(l1iiiilI, lII11ii, liIil1iI),
    ilIlIIiI = iliiII1i.data?.["dailyAward"]?.["title"] || iliiII1i.data?.["continuityAward"]?.["title"],
    IillliIl = iliiII1i.data?.["dailyAward"]?.["beanAward"]?.["beanCount"] || iliiII1i.data?.["continuityAward"]?.["beanAward"]?.["beanCount"];
  IillliIl && $.putMsg((ilIlIIiI || "") + " 获得" + (IillliIl || "") + "京豆");
};