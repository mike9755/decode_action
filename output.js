//Wed Mar 05 2025 14:49:31 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let tokensList = (process.env.jd_dpqd_tokens || "").split(",") || [];
const printEnvValue = process.env.jd_dpqd_print_env === "true";
let TokensMap = new Map();
const CacheFile = __dirname + "/dpqd_tokens.json";
!(async () => {
  await Main();
})().catch(IliIilIl => $.logErr(IliIilIl)).finally(() => $.done());
async function Main() {
  try {
    {
      if (tokensList.length > 0) tokensList = [...new Set(tokensList.filter(llil1Ii1 => llil1Ii1 !== ""))];
      if (tokensList.length <= 0) {
        {
          console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
          return;
        }
      }
      const l111iII1 = [];
      console.log("");
      $.UA = common.genUA("刘强东");
      ({
        jsToken: $.jsToken
      } = await jsTk($.UA, "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html", {
        "bizId": "SJHT-DPQDH5",
        "v": "3.2.1.0",
        "qs": "token=" + tokensList[0]
      }));
      for (let [iiIIIiiI, lll1i1l1] of tokensList.entries()) {
        let liI1lll1 = true;
        const lllIlll = iiIIIiiI + 1;
        lll1i1l1.includes(":") && lll1i1l1.split(":").length === 3 && (lll1i1l1 = lll1i1l1.split(":")[0]);
        if (lll1i1l1.length !== 32 || !/^[A-Z0-9]*$/.test(lll1i1l1)) {
          {
            console.log("❌ 第" + lllIlll + "个令牌格式错误");
            continue;
          }
        }
        $.token = lll1i1l1;
        TokensMap.set(lll1i1l1, {
          "index": null,
          "venderId": "",
          "shopName": "",
          "activityId": "",
          "startTime": "",
          "endTime": "",
          "isValid": true,
          "rules": [],
          "minLevel": null,
          "maxLevel": null
        });
        let Ill1llII = 0;
        $.getActivityInfo = "";
        $.invalidAct = false;
        const I1il1i1i = 10;
        while (!$.getActivityInfo && Ill1llII < I1il1i1i && !$.invalidAct) {
          $.getActivityInfo = "";
          await sendRequest("getActivityInfo");
          await $.wait(1000);
          Ill1llII++;
          Ill1llII === I1il1i1i && (console.log($.errMsg || "❌ 获取活动信息失败"), $.errMsg = "");
        }
        if (!$.getActivityInfo) continue;
        const i1Ilii1l = $.getActivityInfo.venderId,
          i1l1lili = $.getActivityInfo.id,
          lll1i1Il = $.getActivityInfo.activityStatus,
          ill11llI = $.getActivityInfo.continuePrizeRuleList || [],
          II1i1Il = $.getActivityInfo.prizeRuleList || [],
          illlIl1 = $.getActivityInfo.startTime,
          ll1ilI1i = $.getActivityInfo.endTime,
          ll11IlI1 = $.time("yyyy-MM-dd HH:mm", illlIl1),
          I11li1 = $.time("yyyy-MM-dd HH:mm", ll1ilI1i);
        let Iil11Ii1 = false;
        const lIIIIl = [],
          I1l11ili = [...II1i1Il, ...ill11llI];
        for (const IIiill of I1l11ili) {
          const l11iII11 = IIiill.level,
            IlI1I1ll = IIiill.prizeList || [],
            Ili1liIl = [];
          for (const l11IIii1 of IlI1I1ll) {
            let ll1iI1Ii = "";
            const IIiIlIli = l11IIii1.discount,
              Iil1IlIi = l11IIii1.type,
              I1ilII1l = l11IIii1.number,
              l1lI11 = l11IIii1.status,
              iIl1iiIi = l1lI11 === 5;
            switch (Iil1IlIi) {
              case 1:
                ll1iI1Ii = "优惠券";
                break;
              case 4:
                ll1iI1Ii = IIiIlIli + "京豆";
                break;
              case 6:
                ll1iI1Ii = IIiIlIli + "店铺积分";
                break;
              case 9:
                ll1iI1Ii = "" + l11IIii1?.["interactPrizeSkuList"][0]?.["skuName"];
                break;
              case 10:
                ll1iI1Ii = IIiIlIli + "元E卡";
                break;
              case 14:
                ll1iI1Ii = IIiIlIli / 100 + "元红包";
                break;
              default:
                ll1iI1Ii = "未知奖品（" + Iil1IlIi + "）";
            }
            if (![1, 6].includes(Iil1IlIi) && !iIl1iiIi) Iil11Ii1 = true;
            Ili1liIl.push(ll1iI1Ii + "（共" + I1ilII1l + "份" + (iIl1iiIi ? "，已发完" : "") + "）");
          }
          lIIIIl.push({
            "days": l11iII11,
            "prize": Ili1liIl,
            "havePrize": Iil11Ii1
          });
        }
        const Iili1I1i = await common.getShopName({
          "venderId": i1Ilii1l
        });
        console.log("【" + lll1i1l1 + "】\n" + (Iili1I1i ? "店铺名称：#" + Iili1I1i + "\n" : "") + "开始时间：" + ll11IlI1 + "\n结束时间：" + I11li1);
        lIIIIl.length > 0 && console.log(lIIIIl.map(I1iiI11i => (I1iiI11i.days === 0 ? "每日签到" : "连续" + (I1iiI11i.days < 10 ? " " : "") + I1iiI11i.days + "天") + "：" + I1iiI11i.prize.join("，")).join("\n"));
        console.log("");
        const Illiiil1 = Date.now();
        illlIl1 && Illiiil1 < illlIl1 && (console.log("活动将在 " + ll11IlI1 + " 开始，晚点再来吧~\n"), l111iII1.push(lll1i1l1), liI1lll1 = false);
        if (ll1ilI1i && Illiiil1 > ll1ilI1i) console.log("活动已于 " + I11li1 + " 结束，下次早点来吧~\n"), l111iII1.push(lll1i1l1), liI1lll1 = false;else lll1i1Il === 3 && (console.log("活动已结束\n"), l111iII1.push(lll1i1l1), liI1lll1 = false);
        !Iil11Ii1 && (l111iII1.push(lll1i1l1), liI1lll1 = false);
        const Ii1i1iil = TokensMap.get(lll1i1l1);
        Ii1i1iil.index = lllIlll;
        Ii1i1iil.venderId = i1Ilii1l;
        Ii1i1iil.shopName = Iili1I1i;
        Ii1i1iil.activityId = i1l1lili;
        Ii1i1iil.startTime = illlIl1;
        Ii1i1iil.endTime = ll1ilI1i;
        Ii1i1iil.isValid = liI1lll1;
        Ii1i1iil.rules = lIIIIl;
        lIIIIl.length > 0 && (Ii1i1iil.minLevel = lIIIIl[0].days, Ii1i1iil.maxLevel = lIIIIl[lIIIIl.length - 1].days);
        TokensMap.set(lll1i1l1, Ii1i1iil);
      }
      if (l111iII1.length > 0) {
        console.log("\n建议移除的活动：");
        for (const I111iiIi of l111iII1) {
          console.log(I111iiIi);
        }
      }
      const lIii1II = Object.fromEntries(TokensMap),
        II1iiiil = require("fs");
      II1iiiil.writeFileSync(CacheFile, JSON.stringify(lIii1II));
      console.log("\n缓存写入完毕");
      if (printEnvValue) {
        console.log("\n环境变量：");
        let ili111i1 = [];
        for (const [lllli11, i1Iii1Il] of TokensMap) {
          i1Iii1Il.activityId && i1Iii1Il.venderId && ili111i1.push(lllli11 + ":" + i1Iii1Il.activityId + ":" + i1Iii1Il.venderId);
        }
        console.log(ili111i1.join(","));
      }
    }
  } catch (lilIIiIi) {
    console.log("❌ 脚本运行遇到了错误\n" + lilIIiIi);
  }
}
async function handleResponse(IiI1I1, IIlIIiil) {
  try {
    switch (IiI1I1) {
      case "getActivityInfo":
        if (IIlIIiil.code === 200 && IIlIIiil.success === true && IIlIIiil.data) $.getActivityInfo = IIlIIiil.data;else IIlIIiil.msg ? (console.log("🚫 查询活动信息失败 ➜ " + IIlIIiil.msg), $.invalidAct = true) : (console.log("❓" + IiI1I1 + " " + JSON.stringify(IIlIIiil)), $.invalidAct = true);
        break;
    }
  } catch (ll1l1lli) {
    console.log("❌ 未能正确处理 " + IiI1I1 + " 请求响应 " + (ll1l1lli.message || ll1l1lli));
  }
}
async function sendRequest(i1111iII) {
  if ($.runEnd) return;
  let il1l11ii = "",
    iiiiil1l = null,
    lIi11I1i = null,
    i1ll11Il = "GET",
    I11IIi1i = {},
    IIllii1I = {};
  switch (i1111iII) {
    case "getActivityInfo":
      IIllii1I = {
        "appId": "4da33",
        "functionId": "interact_center_shopSign_getActivityInfo",
        "appid": "interCenter_shopSign",
        "body": {
          "token": $.token,
          "venderId": parseInt($.venderId) || ""
        },
        "version": "4.7",
        "ua": $.UA
      };
      I11IIi1i = await H5st.getH5st(IIllii1I);
      il1l11ii = "https://api.m.jd.com/api";
      lIi11I1i = Object.assign({}, I11IIi1i.paramsData, {
        "jsonp": "jsonp1003"
      });
      break;
    default:
      console.log("❌ 未知请求 " + i1111iII);
      return;
  }
  const liIiIlIl = {
    "t": Math.floor(Date.now() / 1000) + "000",
    "loginType": "2",
    "x-api-eid-token": $.jsToken
  };
  iiiiil1l && Object.assign(iiiiil1l, liIiIlIl);
  lIi11I1i && Object.assign(lIi11I1i, liIiIlIl);
  const Ii11iliI = {
    "url": il1l11ii,
    "method": i1ll11Il,
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
      "User-Agent": $.UA
    },
    "params": lIi11I1i,
    "data": iiiiil1l,
    "timeout": 30000,
    "httpsTlsOptions": common.useAppTls()
  };
  i1ll11Il === "GET" && (delete Ii11iliI.data, delete Ii11iliI.headers["Content-Type"]);
  const lIliIli1 = 1;
  let iiI1i11 = 0,
    IllI1iII = null,
    I1illlli = null;
  while (iiI1i11 < lIliIli1) {
    {
      iiI1i11 > 0 && (await $.wait(2000));
      const I1il1lii = await common.request(Ii11iliI);
      if (!I1il1lii.success) {
        I1illlli = I1il1lii.status;
        IllI1iII = "🚫 " + i1111iII + " 请求失败 ➜ " + I1il1lii.error;
        iiI1i11++;
        continue;
      }
      if (!I1il1lii.data) {
        IllI1iII = "🚫 " + i1111iII + " 请求失败 ➜ 无响应数据";
        iiI1i11++;
        continue;
      }
      await handleResponse(i1111iII, I1il1lii.data);
      ipBlack = false;
      break;
    }
  }
  iiI1i11 >= lIliIli1 && ($.errMsg = IllI1iII, I1illlli !== 403 && console.log(IllI1iII));
}