//Sun Aug 23 2026 23:16:07 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.1.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let i1iIiIll = await $.isvObfuscator();
  if (i1iIiIll.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = i1iIiIll?.["token"];
  if ($.domain.includes("jinggeng")) {
    let ll1I1iI = await $.api("front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
    if (!ll1I1iI.succ) {
      {
        $.putMsg("setMixNick失败");
        return;
      }
    }
    let i11i1lli = await $.api("ql/front/showFavoriteShop", "id=" + $.activityId + "&user_id=" + $.userId + "&from=kouling&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
    const llIliilI = cheerio.load(cheerio.load(i11i1lli).html());
    $.shopId = llIliilI("#shop_sid", "body").attr("value");
    $.venderId = llIliilI("#vender_id", "body").attr("value");
    $.shopName = llIliilI("#shop_title", "body").attr("value");
    $.activityType = llIliilI("#actType", "body").attr("value");
    let lllll = llIliilI("#error", "body").attr("value");
    if (lllll.includes("您已参加过此活动")) {
      $.putMsg("您已参加过此活动");
      return;
    }
    if (lllll) {
      $.putMsg(lllll);
      await $.wxStop(lllll);
    }
    let lIi1III1 = await $.api("ql/front/postFavoriteShop", "user_id=" + $.userId + "&act_id=" + $.activityId);
    if (lIi1III1.succ) {
      let Ill1liII = JSON.parse(lIi1III1.msg);
      if (Ill1liII.isSendSucc && Ill1liII.drawAwardDto) {
        let ilIi1ll = Ill1liII.drawAwardDto,
          iIl1Il1i = $.getAwardText(Ill1liII.drawAwardDto);
        $.putMsg(iIl1Il1i);
        ilIi1ll.awardType === "JD_GOODS" && ($.addressId = Ill1liII.actLogId, $.prizeName = iIl1Il1i, await $.saveAddress());
      } else $.putMsg(lIi1III1.msg);
    } else await $.wxStop(lIi1III1.msg), $.putMsg(lIi1III1.msg.includes("您未中奖") ? "空气" : lIi1III1.msg), lIi1III1.msg.includes("积分不足") && $.limit++;
    if ($.index === $.masterNum) {
      $.putMsg("全部完成");
    }
    await $.wait(1000, 2000);
    return;
  }
  if (["10053", "10069"].includes($.activityType)) {
    await $.login();
    let i1IiliII;
    if ($.activityType == "10053") await $.api("/api/task/followGoods/followGoods", {
      "skuId": ""
    }), i1IiliII = await $.api("/api/my/prize/list", {
      "current": 1,
      "size": 1000
    });else {
      {
        let i1I11IIl = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Connection": "keep-alive",
            "user-agent": $.UA,
            "Referer": $.activityUrl,
            "token": $.Token
          },
          II1ii1i1 = "https://lzkj-isv.isvjcloud.com/" + $.urlPrefix + "/api/task/lkFollowShop/saveFollowInfo?actType=10069";
        i1IiliII = await $.get(II1ii1i1, i1I11IIl);
      }
    }
    if (i1IiliII.resp_code != 0 || JSON.stringify(i1IiliII).includes("该用户已经参加过活动")) {
      $.putMsg(i1IiliII.resp_msg || i1IiliII.data);
      return;
    }
    if (i1IiliII.resp_code == 0 && i1IiliII.data) for (let iIiillII of i1IiliII.data) {
      iIiillII.prizeName && iIiillII.dayTime == $.now("yyyy-MM-dd") && $.putMsg(iIiillII.prizeName);
    } else $.putMsg(i1IiliII?.["data"] || "空气");
    $.index === $.masterNum && $.putMsg("全部完成");
  } else {
    await $.getSimpleActInfoVo();
    if ($.expire) return;
    await $.getMyPing();
    if (!$.Pin) return;
    await $.accessLog();
    let lll1l1 = await $.api("wxShopFollowActivity/activityContentOnly", "activityId=" + $.activityId + "&pin=" + $.Pin);
    if (!lll1l1.result || !lll1l1.data) {
      $.putMsg(lll1l1.errorMessage);
      return;
    }
    $.content = lll1l1.data.drawContentVOs || [];
    $.strStartTime = $.match(/(\d+-\d+-\d+ \d+:\d+) 至/, lll1l1.data.rule);
    $.strEndTime = $.match(/至 (\d+-\d+-\d+ \d+:\d+)/, lll1l1.data.rule);
    $.hasFollow = lll1l1.data.hasFollow || false;
    $.needFollow = lll1l1.data.needFollow || false;
    $.canDrawTimes = lll1l1.data?.["canDrawTimes"] || 0;
    $.drawConsume = lll1l1.data?.["drawConsume"] || 0;
    $.actStartTime = $.parseDate($.strStartTime + ":00");
    $.actEndTime = $.parseDate($.strEndTime + ":00");
    $.rule = lll1l1.data.rule;
    let lI11li1 = lll1l1.data.drawContentVOs.filter(i1l1I1li => [6, 7, 9, 13, 14, 15, 16].includes(i1l1I1li.type) && i1l1I1li.prizeNum >= i1l1I1li.hasSendPrizeNum);
    if (lI11li1.length === 0) {
      $.putMsg("垃圾或领完");
      $.expire = true;
      return;
    }
    if ($.actStartTime > $.timestamp()) {
      {
        $.putMsg("活动未开始");
        this.expire = true;
        return;
      }
    }
    if ($.timestamp() > $.actEndTime) {
      {
        $.putMsg("活动已结束");
        this.expire = true;
        return;
      }
    }
    await $.unfollow();
    let lIilI11i = await $.api("wxShopFollowActivity/follow", "activityId=" + $.activityId + "&pin=" + $.Pin);
    if (!lIilI11i.result) {
      $.putMsg(lIilI11i.errorMessage);
      await $.wxStop(lIilI11i.errorMessage);
      return;
    }
    await $.api("wxShopFollowActivity/follow", "activityId=" + $.activityId + "&pin=" + $.Pin);
    for (let ili1lIiI = 0; ili1lIiI < 3 && $.canDrawTimes > 0; ili1lIiI++) {
      let IIilii1I = await $.api("wxShopFollowActivity/getPrize", "activityId=" + $.activityId + "&pin=" + $.Pin);
      if (IIilii1I.result) {
        {
          $.canDrawTimes = IIilii1I.data.canDrawTimes;
          if (IIilii1I.data.drawOk) {
            $.putMsg(IIilii1I.data.name);
            IIilii1I.data.drawInfoType === 7 && IIilii1I.data.needWriteAddress === "y" && IIilii1I.data.addressId && ($.addressId = IIilii1I.data.addressId, $.prizeName = IIilii1I.data.name, await $.saveAddress());
            break;
          } else $.putMsg("空气");
        }
      } else {
        $.putMsg("" + IIilii1I.errorMessage);
        if (IIilii1I.errorMessage.includes("先关注,再抽奖")) continue;
        await $.wxStop(IIilii1I.errorMessage);
        break;
      }
    }
    $.index === $.masterNum && $.putMsg("全部完成");
  }
};
$.after = async function () {
  try {
    for (let Iilill1i of $.content || []) {
      if (["10053", "10069"].includes($.activityType)) {
        $.msg.push("    " + Iilill1i.prizeName + " 剩余" + Iilill1i.leftNum + "份");
        continue;
      } else {
        if (Iilill1i.name.includes("谢谢") || Iilill1i.name.includes("再来")) continue;
      }
      $.msg.push("    " + Iilill1i.name + " " + (Iilill1i?.["type"] === 8 ? "专享价" : ""));
    }
  } catch (il1iIill) {
    console.log(il1iIill);
  }
  console.log($.rule);
  $.msg.push("export M_WX_FOLLOW_DRAW_URL=\"" + $.activityUrl + "\"");
};