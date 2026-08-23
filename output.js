//Sun Aug 23 2026 22:59:29 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.activityUrl = $.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, $.activityUrl);
$.domain = $.match(/https?:\/\/([^/]+)/, $.activityUrl);
$.activityId = $.getQueryString($.activityUrl, "activityId");
$.leaders = [];
$.invitePin = "";
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.index > leaderNum && ($.needOpenCard = false);
  let _0x2d65e6 = $.leaders.filter(_0x387065 => _0x387065.curCount < _0x387065.needCount && _0x387065.draw === false)?.[0];
  if ($.index > leaderNum && !_0x2d65e6) {
    $.log("全部完成");
    $.expire = true;
    return;
  }
  $.UA = $.ua();
  let _0x43beb1 = await $.isvObfuscator();
  if (_0x43beb1.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = _0x43beb1?.["token"];
  let _0x1bddc2 = {
      "status": "0",
      "activityId": $.activityId,
      "tokenPin": $.Token,
      "source": "01",
      "shareUserId": $.invitePin || "",
      "uuid": ""
    },
    _0x23443f = await $.api("/api/user-info/login", _0x1bddc2);
  if (_0x23443f.resp_code !== 0) {
    $.putMsg("登录失败");
    return;
  }
  $.Token = _0x23443f.data.token;
  try {
    $.openCardUrl = _0x23443f.data.joinInfo.openCardUrl;
    $.venderId = _0x23443f.data.venderId || $.openCardUrl.split("venderId=")[1].split("&")[0];
  } catch (_0x2ea7a1) {
    $.venderId = _0x23443f.data.venderId || _0x23443f.data.shopId;
  }
  $.shopId = _0x23443f.data.shopId;
  $.shopName = _0x23443f.data.shopName;
  $.joinCode = _0x23443f.data.joinInfo.joinCodeInfo.joinCode;
  $.joinDes = _0x23443f.data.joinInfo.joinCodeInfo.joinDes;
  if ($.index <= leaderNum) {
    {
      if (_0x23443f.data.joinInfo.joinCodeInfo.joinCode == "1001") $.log("已经是会员了");else {
        await $.openCard($.venderId);
        await $.wait(500, 1000);
      }
    }
  }
  await $.api("/api/task/followShop/follow", {});
  let _0x20c796 = _0x23443f.data.joinInfo.joinCodeInfo.joinCode === "1001" ? 1 : -1;
  if ($.index > leaderNum && _0x20c796 === 1) {
    {
      $.log("已经是会员了");
      return;
    }
  }
  let _0x3e4ce4 = await $.api("/api/task/member/prizeList", {});
  if (_0x3e4ce4.resp_code !== 0) {
    $.putMsg("获取活动信息失败");
    return;
  }
  $.content = _0x3e4ce4.data.prizeInfo;
  let _0x3cf866 = await $.api("/api/active/basicInfo", {
    "activityId": $.activityId
  });
  $.actStartTime = _0x3cf866.data.startTime;
  $.actEndTime = _0x3cf866.data.endTime;
  if ($.timestamp() > $.actEndTime) {
    {
      $.putMsg("活动已过期");
      $.expire = true;
      return;
    }
  }
  if ($.actStartTime > $.timestamp()) {
    $.putMsg("未开始");
    $.expire = true;
    return;
  }
  let _0x392069 = $.content.filter(_0x11e5b0 => ![2, 4, 6, 10, 11].includes(_0x11e5b0.prizeType) && _0x11e5b0.prizeName.match(new RegExp(m_wx_address_stop_keyword)) == null && _0x11e5b0?.["days"] < needMaxNum);
  debugger;
  if (_0x392069.filter(_0x25488e => _0x25488e.leftNum > 0).length === 0) {
    $.putMsg("垃圾或领完");
    this.expire = true;
    return;
  }
  _0x392069.filter(_0x3d0026 => _0x3d0026.leftNum === 0).forEach(_0x4a4485 => {
    $.leaders.filter(_0x200657 => _0x200657.prizeInfoId === _0x4a4485.id).forEach(_0x3a5121 => {
      _0x3a5121.draw = true;
      _0x3a5121.curCount = 9999999;
    });
  });
  $.invitePin = _0x2d65e6?.["invitePin"] || "";
  let _0x2938de = await $.api("/api/task/member/getMember", {
    "shareUserId": $.invitePin || ""
  });
  if (_0x2d65e6 && _0x2d65e6.needCount - _0x2d65e6.curCount > $.cookies.length - $.index) {
    {
      $.putMsg("ck不够了停车");
      $.expire = true;
      return;
    }
  }
  if ($.index <= leaderNum) {
    let _0x375f72 = await $.api("/api/task/share/getUserId", {
      "shareUserId": $.invitePin || ""
    });
    $.log("当前已邀请:" + _0x2938de.data.shareUser);
    $.putMsg("队长");
    for (let _0x1c9193 of _0x392069 || []) {
      $.leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "prizeInfoId": _0x1c9193.id,
        "invitePin": _0x375f72.data.shareUserId,
        "username": $.username,
        "needCount": _0x1c9193.days,
        "curCount": _0x2938de.data.shareUser,
        "draw": false
      });
    }
  }
  if (_0x20c796 !== 1) {
    let _0x3e0ad9 = await $.openCard($.venderId);
    await $.api("/api/task/followShop/follow", {});
    _0x2938de = await $.api("/api/task/member/getMember", {
      "shareUserId": $.invitePin || ""
    });
    let _0x49e372 = await $.api("/api/task/bargain/guest/myself", {
      "shareUserId": $.invitePin || ""
    });
    if (_0x3e0ad9?.["code"] === 0 && _0x3e0ad9?.["success"] && _0x3e0ad9?.["busiCode"] !== "210" && _0x3e0ad9?.["busiCode"] !== "510" && _0x3e0ad9?.["busiCode"] !== "9003") {
      let _0xa24e49 = $.leaders.filter(_0x7e7303 => _0x7e7303.invitePin === $.invitePin)[0].username,
        _0x144c10 = $.leaders.filter(_0x49170f => _0x49170f.invitePin === $.invitePin)[0].curCount;
      $.log("助力[" + _0xa24e49 + "]成功，已邀请" + _0x144c10 + "人，助力数++++++");
      await $.api("/api/user-info/login", _0x1bddc2);
      $.leaders.filter(_0x3c7ff9 => _0x3c7ff9.invitePin === $.invitePin && _0x3c7ff9.index !== $.index).forEach(_0x5be06f => _0x5be06f.curCount++);
    }
  }
  let _0x5f1712 = $.leaders.filter(_0x5ad6bf => _0x5ad6bf.curCount >= _0x5ad6bf.needCount && _0x5ad6bf.draw === false) || [];
  if (_0x5f1712.length > 0) {
    {
      let _0x1b9471 = _0x5f1712?.[0];
      try {
        $.cookie = $.cookies[_0x1b9471.index - 1];
        $.username = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        let _0x4b76e0 = await $.isvObfuscator();
        if (_0x4b76e0.code !== "0") {
          {
            $.putMsg("获取Token失败");
            return;
          }
        }
        $.Token = _0x4b76e0?.["token"];
        let _0x1a589 = {
            "status": "0",
            "activityId": $.activityId,
            "tokenPin": $.Token,
            "source": "01",
            "shareUserId": $.invitePin || "",
            "uuid": ""
          },
          _0x460c16 = await $.api("/api/user-info/login", _0x1a589);
        $.joinCode = _0x460c16.data.joinInfo.joinCodeInfo.joinCode;
        $.joinDes = _0x460c16.data.joinInfo.joinCodeInfo.joinDes;
        await $.getSimpleActInfoVo();
        $.joinCode == "1004" ? ($.log("关注店铺"), await $.api("/api/task/followShop/follow", {})) : $.log($.joinCode + " " + $.joinDes);
        $.Token = _0x460c16.data.token;
        for (let _0x11cd80 of _0x5f1712) {
          await getPrize(_0x11cd80, $.Token, 0);
        }
      } catch (_0x2e450d) {
        $.log(_0x2e450d);
      }
    }
  }
};
$.after = async function () {
  $.msg.push("当前:" + $.index);
  for (let _0x5725af of $.content?.["reverse"]() || []) {
    $.msg.push("  邀请" + _0x5725af.days + "人 " + _0x5725af.prizeName + " 共" + _0x5725af.leftNum + "/" + _0x5725af.allNum + "份");
  }
  $.msg.push("\nexport M_INTERACT_INVITE_URL=\"" + $.activityUrl + "\"");
};
async function getPrize(_0xa2497f, _0x276e4a, _0x5c3641 = 0) {
  try {
    await $.api("/api/task/followShop/follow", {});
  } catch (_0x4c23c8) {
    console.log(_0x4c23c8);
  }
  let _0x506f2d = await $.api("/api/prize/receive/acquire", {
    "prizeInfoId": _0xa2497f.prizeInfoId
  });
  $.log("" + JSON.stringify(_0x506f2d));
  if (_0x506f2d.resp_code === 0) {
    $.putMsg("领取成功");
    if (_0x506f2d.data.prizeName) {
      $.putMsg(_0x506f2d.data.prizeName);
    }
    _0x506f2d.data.prizeType == 3 && ($.addressId = _0x506f2d.data.addressId, $.prizeName = _0x506f2d.data.prizeName, await $.saveAddress());
    $.leaders.filter(_0x48ebca => _0x48ebca.index === _0xa2497f.index && _0x48ebca.prizeInfoId === _0xa2497f.prizeInfoId && _0x48ebca.draw === false)[0].draw = true;
  } else _0x506f2d.resp_msg.includes("已领取") ? ($.putMsg(_0x506f2d.resp_msg), $.leaders.filter(_0xc4822 => _0xc4822.index === _0xa2497f.index && _0xc4822.prizeInfoId === _0xa2497f.prizeInfoId).forEach(_0x252995 => {
    _0x252995.draw = true;
  })) : ($.putMsg(_0x506f2d.resp_msg), $.leaders.filter(_0xe0d335 => _0xe0d335.index === _0xa2497f.index).forEach(_0x19310a => {
    _0x19310a.draw = true;
  }));
}