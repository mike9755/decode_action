//Mon Aug 24 2026 11:13:08 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  if (!$.activityId || !$.activityUrl) {
    {
      $.expire = true;
      $.putMsg("activityId|activityUrl不存在");
      return;
    }
  }
  $.log("活动id: " + $.activityId, "活动url: " + $.activityUrl);
  $.UA = $.ua();
  let l1il1lIi = await $.isvObfuscator();
  if (l1il1lIi.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = l1il1lIi?.["token"];
  if (["10058"].includes($.activityType)) {
    {
      await $.login();
      let lIlIii1i = await $.api("/api/shopGift/drawShopGift", {
        "flag": true,
        "memberUser": 0,
        "name": "",
        "visitor": "",
        "position": ""
      });
      if (lIlIii1i.data) $.putMsg("领取成功");else {
        $.putMsg(lIlIii1i.resp_msg);
      }
      $.index === $.masterNum && $.putMsg("全部完成");
      return;
    }
  }
  if ($.domain.includes("gzsl")) {
    let Il1lIlil = await $.api("wuxian/user/getShopGiftActivity/" + $.activityId, {
      "venderId": $.activityId,
      "token": $.Token,
      "source": "01"
    });
    $.log(Il1lIlil.activity.prizes);
    if (Il1lIlil.status !== "1") {
      $.putMsg("获取礼包信息失败");
      return;
    }
    $.shopName = Il1lIlil.activity.detail;
    $.venderId = Il1lIlil.activity.venderId;
    $.shopId = Il1lIlil.activity.shopId;
    $.prizeList = Il1lIlil.activity.prizes;
    $.actStartTime = Il1lIlil.activity.startTime;
    $.actEndTime = Il1lIlil.activity.endTime;
    let IIlIIiiI = $.prizeList.filter(lI1i1il => !["2"].includes(lI1i1il.source));
    if (IIlIIiiI.length === 0) {
      {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
    }
    let iiiiIl11 = Il1lIlil.activity.id,
      lllilIIi = await $.api("wuxian/user/getShopGiftPrize/" + iiiiIl11 + "?wxToken=" + $.Token, {
        "token": $.Token,
        "wxToken": $.Token,
        "activityId": iiiiIl11,
        "source": "01"
      });
    lllilIIi.status === "1" ? $.putMsg("" + lllilIIi.data) : $.putMsg("" + lllilIIi.msg);
    $.index === $.masterNum && $.putMsg("全部完成");
    return;
  }
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let IilliIl = await $.api("wxShopGift/activityContent", "activityId=" + $.activityId + "&buyerPin=" + $.Pin);
  if (!IilliIl.result || !IilliIl.data) {
    $.putMsg(IilliIl.errorMessage);
    await $.wxStop(IilliIl.errorMessage);
    return;
  }
  $.prizeList = IilliIl.data.list;
  let ll1lIllI = ["jd", "jf"],
    iiIiII1l = $.prizeList.filter(i1illiIi => ll1lIllI.includes(i1illiIi.type));
  if (iiIiII1l.length === 0 || iiIiII1l.length === 1 && iiIiII1l[0].type === "jf" && iiIiII1l[0].takeNum === 1) {
    {
      $.putMsg("垃圾或领完");
      $.expire = true;
      return;
    }
  }
  let ilIi1111 = await $.api("wxShopGift/draw", "activityId=" + $.activityId + "&buyerPin=" + $.Pin + "&hasFollow=false&accessType=app");
  if (ilIi1111.result) {
    $.putMsg("领取成功");
  } else $.putMsg("" + ilIi1111.errorMessage), await $.wxStop(ilIi1111.errorMessage);
  $.index === $.masterNum && $.putMsg("全部完成");
};
let kv = {
    "jd": "京豆",
    "jf": "积分",
    "dq": "券",
    "jq": "券"
  },
  kv2 = {
    "1": "京豆",
    "2": "券"
  };
$.getPrizeList = async function () {
  let Iilil1II = await $.api("/api/shopGift/shopGiftMain", {});
  $.prizeList = Iilil1II.data?.["prizeInfoList"] || [];
};
$.after = async function () {
  try {
    for (let il1ll111 of $.prizeList || []) {
      {
        if ($.domain.includes("lzkj") || $.domain.includes("cjhy")) $.activityType == "10058" ? $.msg.push("    " + il1ll111.prizeName) : $.msg.push("    " + (il1ll111.takeNum || il1ll111.discount) + " " + (kv[il1ll111?.["type"]] || il1ll111?.["type"]));else {
          $.msg.push("    " + il1ll111.unit + " " + (kv2[il1ll111?.["source"]] || il1ll111?.["source"]) + "\n");
        }
      }
    }
  } catch (iI11i1ll) {
    console.log(iI11i1ll);
  }
  $.msg.push("export M_WX_SHOP_GIFT_URL=\"" + $.activityUrl + "\"");
};