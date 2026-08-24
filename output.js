//Mon Aug 24 2026 11:44:15 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
$.logic = async () => {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  if (!$.activityId || !$.activityUrl) {
    {
      $.log("活动id不存在");
      $.expire = true;
      return;
    }
  }
  $.UA = $.ua();
  let _0x133cda = await $.isvObfuscator();
  if (_0x133cda.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = _0x133cda?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  if ($.prizeList.length == 0) {
    {
      let _0x10932c = await $.api("mc/zeroTrial/wx/getActivityContent?activityId=" + $.activityId + "&pin=" + $.Pin, "");
      $.prizeList = _0x10932c.data.zeroTrialGoodsOutVOList || [];
      $.actStartTime = _0x10932c.data.startTime;
      $.actEndTime = _0x10932c.data.endTime;
    }
  }
  if ($.prizeList.length > 0) {
    {
      let _0x23066a = $.prizeList[$.random(0, $.prizeList.length - 1)],
        _0x1a6a59 = await $.api("mc/zeroTrial/wx/applyTrial", "activityId=" + $.activityId + "&pin=" + $.Pin + "&goodsId=" + _0x23066a.goodsId + "&venderId=" + $.venderId + "&nickName=" + encodeURIComponent($.nickname));
      if (_0x1a6a59.result) $.putMsg(_0x23066a.name), $.addressId = _0x1a6a59.data, $.prizeName = _0x23066a.name, await $.saveAddress();else {
        $.putMsg(_0x1a6a59.errorMessage);
        (_0x1a6a59.errorMessage.includes("未开始") || _0x1a6a59.errorMessage.includes("结束")) && ($.expire = true);
        return;
      }
    }
  } else {
    {
      $.putMsg("未获取到试用品");
      $.expire = true;
      return;
    }
  }
};
$.after = async () => {
  for (let _0xc79239 of $.prizeList) {
    $.msg.push(_0xc79239.name + "，" + _0xc79239.price + "元，共" + _0xc79239.sendNum + "份");
  }
  $.msg.push("export M_WX_ZEROTRIAL_URL=\"" + $.activityUrl + "\"");
};
$.run().catch(_0x11b562 => $.log(_0x11b562));