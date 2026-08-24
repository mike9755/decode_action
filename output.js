//Mon Aug 24 2026 11:40:58 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.leaders = [];
$.finishCount = 0;
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.putMsg("activityId|activityUrl不存在");
    $.expire = true;
    return;
  }
  $.UA = $.ua();
  let I11i11li = await $.isvObfuscator();
  if (I11i11li.code !== "0") {
    {
      if ($.index < 20) $.putMsg("获取Token失败");else {
        $.log("获取Token失败");
      }
      return;
    }
  }
  $.Token = I11i11li?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let l1illI11 = await $.api("wxUnPackingActivity/activityContent", "activityId=" + $.activityId + "&buyerNick=" + $.Pin + "&friendUuid=" + ($.friendUuid || ""));
  if (!l1illI11.result || !l1illI11.data) {
    $.putMsg(l1illI11.errorMessage);
    await $.wxStop(l1illI11.errorMessage);
    return;
  }
  $.needCount = l1illI11.data.wucvo.unpackingPeople;
  $.actStartTime = l1illI11.data.wucvo.startTime + " 00:00:00";
  $.actEndTime = l1illI11.data.wucvo.endTime + " 23:59:59";
  $.content = l1illI11.data.wdifo;
  $.type = l1illI11.data.wdifo.type;
  if ($.actStartTime > $.timestamp()) {
    $.putMsg("活动未开始");
    $.expire = true;
    return;
  }
  if ($.timestamp() > $.actEndTime) {
    {
      $.putMsg("活动已结束");
      $.expire = true;
      return;
    }
  }
  if ($.type === 1 || $.type === 20 || $.content.name.includes("券") || $.type === 7 && (await $.wxAddressStop($.content.name))) {
    $.putMsg("垃圾或领完");
    this.expire = true;
    return;
  }
  if ($.needCount > $.cookies.length) {
    {
      $.expire = true;
      $.putMsg("ck太少了，需要" + $.needCount + "助力");
      return;
    }
  }
  $.mySelfId = l1illI11.data.wucvo.mySelfId;
  if ($.leaders.length < leaderNum) {
    $.leaders.push({
      "token": $.Token,
      "pin": $.Pin,
      "index": $.index,
      "mySelfId": $.mySelfId,
      "finish": false
    });
    $.putMsg("队长");
  }
  $.hasCount = l1illI11.data.wuivo.hasUnpackingPeople;
  $.finishCount === 0 && ($.finishCount = $.hasCount);
  let i11il1l1 = $.leaders.filter(lIiI1Il => lIiI1Il.finish === false);
  $.friendUuid = i11il1l1.length > 0 ? i11il1l1[0].mySelfId : "";
  if ($.hasCount >= $.needCount) {
    $.leaders.filter(iiIiII1i => iiIiII1i.mySelfId === $.friendUuid)[0].finish = true;
    $.putMsg("助力已满");
    return;
  }
  if ($.friendUuid === $.mySelfId) {
    {
      $.log("自己不能助力自己跳过");
      return;
    }
  }
  if (!$.friendUuid) {
    {
      $.expire = true;
      $.log("已经没有队长了，不跑了");
      return;
    }
  }
  let II1ll1lI = await $.api("wxUnPackingActivity/getMyFriendInfo", "friendUuid=" + ($.friendUuid || ""));
  if (!II1ll1lI.result) {
    $.putMsg(II1ll1lI.errorMessage);
    return;
  }
  let ill1IiiI = await $.api("wxUnPackingActivity/unpackingInfo", "activityId=" + $.activityId + "&friendUuid=" + ($.friendUuid || "") + "&mySelfUuid=" + $.mySelfId);
  if (!ill1IiiI.result) {
    {
      $.putMsg(ill1IiiI.errorMessage);
      return;
    }
  }
  console.log(ill1IiiI.data.hasHelpUnpacking, ill1IiiI.data.hasHelper);
  if (ill1IiiI.data.hasHelpUnpacking) {
    {
      $.log("已帮拆过");
      return;
    }
  }
  let ii111ili = await $.api("wxUnPackingActivity/unPacking", "activityId=" + $.activityId + "&friendUuid=" + ($.friendUuid || "") + "&mySelfId=" + $.mySelfId);
  ii111ili.errorMessage.includes("会员") && ($.type === 16 || $.type === 9 || $.type === 6 || $.type === 7) && (await $.openCard(), await $.wait(1000, 2000), ii111ili = await $.api("wxUnPackingActivity/unPacking", "activityId=" + $.activityId + "&friendUuid=" + ($.friendUuid || "") + "&mySelfId=" + $.mySelfId));
  await $.wxStop(ii111ili?.["errorMessage"]);
  if (!ii111ili.result) {
    {
      $.putMsg(ii111ili?.["errorMessage"]);
      return;
    }
  }
  $.log(ii111ili.errorMessage);
  console.log("xxx", $.leaders);
  if (++$.finishCount >= $.needCount) {
    $.leaders.filter(i1l1iil => i1l1iil.mySelfId === $.friendUuid)[0].finish = true;
    let I1II1lIi = $.leaders.filter(iiIil1I1 => iiIil1I1.mySelfId === $.friendUuid)[0];
    $.finishCount = 0;
    $.cookie = $.cookies[I1II1lIi.index - 1];
    $.username = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.putMsg("助力已满", $.getRemarks($.username));
    console.log("满了");
    if ($.type !== 7) {
      return;
    }
    try {
      {
        let Ililll11 = await $.isvObfuscator();
        if (Ililll11.code !== "0") {
          {
            $.putMsg("获取Token失败");
            return;
          }
        }
        $.Token = Ililll11?.["token"];
        await $.api("customer/getMyPing", "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP");
        $.Pin = I1II1lIi.pin;
        await $.api("common/" + ($.domain.includes("cjhy") ? "accessLog" : "accessLogWithAD"), "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.Pin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=");
        let i11lIi = await $.api("wxUnPackingActivity/drawPrize", "activityId=" + $.activityId + "&mySelfId=" + I1II1lIi.mySelfId);
        i11lIi.errorMessage.includes("会员") && (await $.openCard(), await $.wait(2000, 5000), i11lIi = await $.api("wxUnPackingActivity/drawPrize", "activityId=" + $.activityId + "&mySelfId=" + I1II1lIi.mySelfId));
        i11lIi.result && i11lIi.data && ($.addressId = i11lIi.data.addressId, $.prizeName = i11lIi.data.drawInfoName, await $.saveAddress());
      }
    } catch (ll1i1IIl) {
      console.log(ll1i1IIl);
    }
  }
};
$.after = async function () {
  try {
    $.msg.push("    " + $.content.name + " " + $.content?.["type"] + " 需要:" + $.needCount + "助力");
  } catch (i1Iii1iI) {
    console.log(i1Iii1iI);
  }
  $.msg.push("export M_WX_UNPACK_DRAW_URL=\"" + $.activityUrl + "\"");
};