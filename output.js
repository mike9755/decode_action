//Sun Aug 23 2026 23:22:02 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let type = "",
  init,
  labName = "",
  shareCodes = [];
$.version = "v1.1.1";
let drawCount = 0;
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    {
      $.expire = true;
      $.putMsg("activityId|activityUrl不存在");
      return;
    }
  }
  $.UA = $.ua();
  let _0x203399 = await $.isvObfuscator();
  if (_0x203399.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = _0x203399?.["token"];
  $.shareUuid = $.randomArray(shareCodes, 1)[0]?.["shareUuid"] || $.ownerUuid || "";
  if (this.domain.includes("jinggengjcq")) {
    {
      $.userId = "10299171";
      let _0x53bb6d = await retryApi(getLoad);
      const {
          success: _0x47e676,
          errorCode: _0x1348e5,
          errorMessage: _0x49b99d,
          data: _0x4d6683
        } = _0x53bb6d,
        {
          status: _0x2fc7cc,
          msg: _0x1cc1e8
        } = _0x4d6683;
      if (_0x2fc7cc !== 200) {
        {
          $.log(_0x1cc1e8);
          return;
        }
      }
      $.buyerNick = _0x53bb6d.data.data.missionCustomer.buyerNick;
      $.index <= leaderNumber && shareCodes.push({
        "index": $.index,
        "cookie": $.cookie,
        "username": $.username,
        "count": 0,
        "shareUuid": $.buyerNick
      });
      if ($.shareUuid) {
        let _0x525612 = await retryApi(getInviteRelation);
        $.log(_0x525612.errorMessage);
        _0x525612.errorMessage.includes("关系绑定成功") && shareCodes.filter(_0x425637 => _0x425637.shareUuid === $.shareUuid).forEach(_0x5015ca => {
          _0x5015ca.count++;
        });
      } else {
        if (!$.shareUuid && $.index !== 1) {
          {
            $.expire = true;
            $.putMsg("未找到车头退出");
            return;
          }
        }
      }
      if (onekeyCollectFlag === 1) {
        {
          if (!_0x53bb6d.data.data.missionCustomer.hasAddCart) {
            {
              let _0xcbb863 = await retryApi(getUniteAddCart);
              $.log(_0xcbb863.data?.["data"]?.["remark"] || _0xcbb863.errorMessage);
            }
          }
        }
      }
      if (onekeyFlowFlag === 1) {
        if (!_0x53bb6d.data.data.missionCustomer.hasCollectShop) {
          {
            let _0x27f1aa = await retryApi(getHasCollectShop);
            $.log(_0x27f1aa.data?.["data"]?.["remark"] || _0x27f1aa.errorMessage);
          }
        }
      }
      if (luckdrawFlag === 1) {
        _0x53bb6d = await retryApi(getLoad);
        for (let _0x1f744f = 0; _0x1f744f < _0x53bb6d.data.data?.["missionCustomer"]?.["remainPoint"] / 100 && drawCount < 10; _0x1f744f++) {
          let _0x462c63 = await retryApi(getDraw);
          $.log(_0x462c63);
          $.log(_0x462c63.data?.["data"]?.["remark"] || _0x462c63?.["errorMessage"]);
          if (_0x462c63.errorMessage?.["includes"]("您的积分不足啦")) {
            break;
          }
          if (_0x462c63.success && _0x462c63.success === true && _0x462c63.data) {
            if (_0x462c63.data.status && _0x462c63.data.status == 200) {
              if (_0x462c63.data.data.sendResult) drawCount = 0, $.putMsg($.prizeName), $.prizeName = _0x462c63.data.data.awardSetting.awardName, _0x462c63.data.data.awardSetting.awardType == "goods" && ($.addressId = _0x462c63.data.data.awardSendLog.id, await $.saveAddress());else {
                $.log("空气");
                drawCount++;
              }
            }
          }
        }
      }
      let _0x2a5290 = await retryApi(getShopList);
      if (openCardFlag === "on") {
        let _0x297940 = _0x2a5290.data.data.filter(_0xac026e => !_0xac026e.open);
        if (!_0x297940.length) {
          $.log("已完成全部开卡");
        }
        for (let _0x136e5e = 0; _0x136e5e < _0x297940.length; _0x136e5e++) {
          let _0x3f3bb2 = _0x297940[_0x136e5e];
          $.shopId = _0x3f3bb2.shopId;
          $.venderId = _0x3f3bb2.userId;
          let _0x39363e = await retryApi(getCompleteMission);
          $.log(_0x39363e.data?.["data"]?.["remark"] || _0x39363e.errorMessage);
          await $.openCard($.venderId);
          let _0x18b04d = await retryApi(load2);
          $.log(_0x18b04d.data?.["data"]?.["openCardMsg"] || _0x18b04d.errorMessage);
        }
      }
      if (viewShopFlag === 1) {
        for (const _0x47aa46 of _0x2a5290?.["data"]?.["data"]) {
          try {
            $.shopId = _0x47aa46.shopId;
            $.venderId = _0x47aa46.userId;
            const _0x254c39 = await retryApi(completeMissonForViewShop),
              {
                success: _0x5e25b6,
                errorCode: _0x4bb2c5,
                data: _0x2bec9d
              } = _0x254c39;
            if (!_0x5e25b6) {
              {
                $.log("浏览异常 " + JSON.stringify(_0x254c39));
                continue;
              }
            }
            const {
              status: _0x31a2eb,
              data: _0x39778c
            } = _0x2bec9d;
            if (_0x31a2eb === 200) {
              {
                const _0x2959f4 = _0x39778c.remark,
                  _0x20d7e2 = _0x2959f4.match(/\d+个京豆/);
                if (!_0x20d7e2) {
                  break;
                }
                $.putMsg("" + _0x20d7e2[0]);
              }
            } else $.log("浏览异常 " + _0x39778c.msg);
            await $.wait(3000, 3000);
          } catch (_0x53e17f) {
            $.log("发生错误: " + _0x53e17f.message);
          }
        }
      }
      return;
    }
  } else {
    if ($.activityUrl.includes("joinCommon")) {
      let _0x6758e = await $.api("dingzhi/joinCommon/activity/5929859", "activityId=" + $.activityId);
      const _0x359d86 = cheerio.load(cheerio.load(_0x6758e).html());
      $.venderId = _0x359d86("#userId", "body").attr("value");
      await $.getMyPing();
    } else await $.getMyPing("customer/getMyCidPing");
  }
  if (!$.Pin) return;
  await $.getSimpleActInfoVo("dz/common/getSimpleActInfoVo");
  if ($.expire) {
    return;
  }
  $.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  await $.api("common/" + ($.domain.includes("cjhy") ? "accessLog" : "accessLogWithAD"), "venderId=" + $.venderId + "&code=99&pin=" + $.Pin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=");
  let _0x4ddbfc,
    _0x47b41b = encodeURIComponent($.nickname);
  try {
    if (!init && $.index < leaderNumber) {
      {
        init = await $.api("dingzhi/taskact/common/init", "activityId=" + $.activityId + "&dzActivityType=1&pin=");
        $.actStartTime = init.data.startTime;
        $.actEndTime = init.data.endTime;
        if (init.data.startTime && init.data.startTime > $.timestamp()) {
          {
            $.putMsg("活动还未开始");
            $.expire = true;
            return;
          }
        }
      }
    }
  } catch (_0x20b090) {
    console.log(_0x20b090);
  }
  if ($.activityUrl.includes("/m/unite/") || $.activityUrl.includes("joinCommon")) {
    _0x4ddbfc = await $.api("dingzhi/joinCommon/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + $.attrTouXiang + "&nick=" + _0x47b41b + "&shareUuid=" + ($.shareUuid || ""));
  } else {
    if ($.activityId.includes("shop")) {
      _0x4ddbfc = await $.api("dingzhi/shop/league/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + $.attrTouXiang + "&nick=" + _0x47b41b + "&shareUuid=" + ($.shareUuid || ""));
    } else {
      {
        if ($.index <= leaderNumber && !type) {
          type = await $.getOpenCardPath();
        }
        _0x4ddbfc = await $.api("dingzhi/" + type + "/union/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + $.attrTouXiang + "&nick=" + _0x47b41b + "&shareUuid=" + ($.shareUuid || ""));
      }
    }
  }
  if (_0x4ddbfc.errorMessage) {
    $.putMsg(_0x4ddbfc.errorMessage);
    await $.wxStop(_0x4ddbfc.errorMessage);
    return;
  }
  _0x4ddbfc = _0x4ddbfc.data;
  $.actStartTime = init?.["data"]?.["startTime"] || _0x4ddbfc.startTime;
  $.actEndTime = init?.["data"]?.["endTime"] || _0x4ddbfc.endTime;
  if (_0x4ddbfc.startTime && _0x4ddbfc.startTime > $.timestamp()) {
    {
      $.putMsg("活动还未开始");
      $.expire = true;
      return;
    }
  }
  if (_0x4ddbfc.hasEnd) {
    $.putMsg("活动已结束");
    $.expire = true;
    return;
  }
  $.actorUuid = _0x4ddbfc.actorUuid || _0x4ddbfc.actorInfo.uuid;
  $.index <= leaderNumber && ($.log(_0x4ddbfc.shareContent || _0x4ddbfc.activityName), labName = _0x4ddbfc.shareContent || _0x4ddbfc.activityName, shareCodes.push({
    "index": $.index,
    "cookie": $.cookie,
    "token": $.Token,
    "pin": $.Pin,
    "username": $.username,
    "count": 0,
    "shareUuid": $.actorUuid
  }));
  if ($.activityId.includes("shop")) {
    $.shareUuid = $.randomArray(shareCodes.filter(_0x3f849c => _0x3f849c.count < 20), 1)[0]?.["shareUuid"] || "";
    if (!$.index <= leaderNumber && !$.shareUuid) {
      {
        $.putMsg("已无车头");
        this.expire = true;
        return;
      }
    }
  } else $.shareUuid = $.randomArray(shareCodes, 1)[0]?.["shareUuid"] || "";
  if ($.index === 1) {
    return;
  }
  if ($.activityUrl.includes("/m/unite/") || $.activityUrl.includes("joinCommon")) {
    {
      let _0xdbd67 = await $.api("dingzhi/joinCommon/taskInfo", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
      const {
        result: _0x27ae0d,
        data: _0x2fc12a,
        errorMessage: _0x54463c
      } = _0xdbd67;
      if (!_0x27ae0d) throw new Error(_0x54463c);
      if (viewShopFlag === 1) {
        {
          const _0x3594af = _0x2fc12a["10"],
            _0x40b5ac = _0x3594af.settingInfo.map(_0x2b1689 => _0x2b1689.value);
          await doTask(_0x3594af.taskType, _0x40b5ac[0]);
        }
      }
      onekeyCollectFlag === 1 && (await doTask(23));
      onekeyFlowFlag === 1 && (await doTask(20));
      if (openCardFlag === "on") {
        let _0xac0fee = _0xdbd67.data["1"].settingInfo.map(_0xfc17c6 => _0xfc17c6.value),
          _0x358504 = await assist(1),
          _0x1ddaea = $.different(_0xac0fee, _0x358504);
        for (let _0x40916c = 0; _0x40916c < _0x1ddaea.length; _0x40916c++) {
          $.venderId = _0x1ddaea[_0x40916c];
          await $.openCard($.venderId);
        }
        await assist(2);
      }
    }
  } else {
    if ($.activityId.includes("shop")) {
      {
        await $.api("dingzhi/shop/league/saveTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid + "&shareUuid=" + ($.shareUuid || "") + "&taskType=1&taskValue=1");
        let _0x510bb4 = await initOpenCard1(1);
        for (let _0x2345fc = 0; _0x2345fc < _0x510bb4.length; _0x2345fc++) {
          $.shopId = _0x510bb4[_0x2345fc].value2;
          $.venderId = _0x510bb4[_0x2345fc].value;
          await $.openCard($.venderId);
        }
        await initOpenCard1(2);
      }
    } else {
      {
        await $.api("dingzhi/" + type + "/union/saveTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid + "&shareUuid=" + ($.shareUuid || "") + "&taskType=23&taskValue=23");
        let _0x10dde6 = await initOpenCard2(1);
        for (let _0x1e568c = 0; _0x1e568c < _0x10dde6.length; _0x1e568c++) {
          $.shopId = _0x10dde6[_0x1e568c].shopId;
          $.venderId = _0x10dde6[_0x1e568c].venderId;
          await $.openCard($.venderId);
        }
        await initOpenCard2(2);
      }
    }
  }
};
$.after = async function () {
  $.msg.push(labName);
  $.msg.push("export M_WX_OPENCARD_M_URL=\"" + $.activityUrl + "\"");
};
async function doTask(_0x41d74d, _0x526e41 = "") {
  const _0x439012 = await $.api("dingzhi/joinCommon/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid + "&taskType=" + _0x41d74d + "&taskValue=" + _0x526e41),
    {
      result: _0x38af3e,
      data: _0x168f40,
      errorMessage: _0x570c9c,
      count: _0x1f5465
    } = _0x439012;
  if (!_0x38af3e) {
    $.log(_0x570c9c);
  } else {
    const {
      sendState: _0x44a30b,
      beans: _0x44afc0,
      score: _0x12d04a
    } = _0x168f40;
    $.log("" + JSON.stringify(_0x168f40));
  }
}
async function assist(_0x4e4737) {
  let _0x35395e = await $.api("dingzhi/joinCommon/assist", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
  if (!_0x35395e.data) _0x35395e = await $.api("dingzhi/joinCommon/assist", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
  if (!_0x35395e.data) _0x35395e = await $.api("dingzhi/joinCommon/assist", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
  if (!_0x35395e.data) _0x35395e = await $.api("dingzhi/joinCommon/assist", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
  if (!_0x35395e.data) _0x35395e = await $.api("dingzhi/joinCommon/assist", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid);
  _0x35395e = _0x35395e.data;
  let _0x4d184e = _0x35395e.assistState,
    _0x1a5ee3 = _0x35395e.openCardInfo.openAll;
  if (_0x1a5ee3) {
    $.log("已完成全部开卡");
  }
  let _0x2904e9 = _0x35395e.openCardInfo.sendStatus;
  if (_0x4e4737 === 2) {
    let _0x5bcaf4 = shareCodes.filter(_0x54d958 => _0x54d958.shareUuid === $.shareUuid)[0];
    console.log("助力状态-->" + _0x4d184e + "," + _0x1a5ee3 + "," + _0x2904e9);
    switch (_0x4d184e) {
      case 0:
        $.log("无法助力自己");
        break;
      case 1:
        _0x5bcaf4.count++;
        $.log("助力[" + _0x5bcaf4.username + "]成功，已邀请" + _0x5bcaf4.count + "人");
        break;
      case 2:
        $.log("已经助力过了");
        break;
      case 3:
        $.log("没有助力次数了");
        break;
      case 10:
        $.log("您已为好友助力过了哦");
        break;
      case 11:
        $.log("您已成功为好友助力了，不能再为其他好友助力了");
        break;
      case 20:
        $.log("您需注册会员,才能为好友助力！");
        break;
      case 21:
        $.log("您需注册会员并关注店铺,才能为好友助力！");
        break;
      case 22:
        $.log("您需注关注店铺,才能为好友助力！");
        break;
      case 77:
        $.log("未全部开卡和关注，不能助力");
        break;
      case 78:
        $.log("已经是老会员，不能助力");
        break;
      default:
        $.log("未知状态");
        break;
    }
  }
  return _0x35395e.openCardInfo.openVenderId;
}
async function initOpenCard1(_0x56268d) {
  let {
      data: _0x4e3593
    } = await $.api("dingzhi/shop/league/checkOpenCard", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid + "&shareUuid=" + ($.shareUuid || "")),
    _0x54f179 = _0x4e3593.allOpenCard,
    _0x447002 = _0x4e3593.assistStatus,
    _0x19d80a = _0x4e3593.sendBeanNum;
  _0x19d80a > 0 && $.log("开卡获得" + _0x19d80a + "豆");
  $.log("助力状态-->" + _0x447002);
  _0x54f179 && $.log("已完成全部开卡");
  if (_0x56268d === 2) {
    let _0x114684 = shareCodes.filter(_0x2db317 => _0x2db317.shareUuid === $.shareUuid)[0];
    switch (_0x447002) {
      case 0:
        break;
      case 1:
        _0x114684.count++;
        $.log("助力[" + _0x114684.username + "]成功，已邀请" + _0x114684.count + "人");
        $.log("恭喜您为好友助力成功！");
        break;
      case 2:
        $.log("您已经为该好友助力过了！");
        break;
      case 3:
        $.log("您已经为其他好友助力过了！");
        break;
      case 11:
        $.log("今日助力次数已达上限，无法继续为他助力！");
        break;
      case 12:
        $.log("您活动期间助力次数已达上限，无法继续助力！");
        break;
      case 21:
        $.log("您还不是会员，无法为好友助力！");
        break;
      case 22:
        $.log("需要关注店铺及成为全部品牌会员并且有新会员，才能助力成功哦~");
        break;
      case 88:
        $.log("需要关注店铺及成为全部品牌会员并且有新会员，才能助力成功哦~");
        break;
      case 66:
        break;
      case 99:
        switch (_0x4e3593.shareType) {
          case 2:
            $.log("您需要完成全部开卡才能为好友助力");
            break;
          case 5:
            $.log("您需要完成任意一组开卡，并关注店铺才能为好友助力");
            break;
          case 6:
            $.log("您的好友邀请您为TA助力，您关注店铺和品牌全部开卡后，即为好友助力成功");
            break;
          default:
            break;
        }
        break;
    }
  }
  return _0x4e3593.cardList.filter(_0x2ecb2b => !_0x2ecb2b.status);
}
async function initOpenCard2(_0x48658c) {
  let {
      data: _0x4b53f8
    } = await $.api("dingzhi/" + type + "/union/initOpenCard", "activityId=" + $.activityId + "&pin=" + $.Pin + "&actorUuid=" + $.actorUuid + "&shareUuid=" + ($.shareUuid || "")),
    _0x4e64e1 = _0x4b53f8.allOpenCard,
    _0x18f0c0 = _0x4b53f8.openCardAndSendJd,
    _0x3d1f9f = _0x4b53f8.assistStatus,
    _0x37a55d = _0x4b53f8.openCardBeans;
  _0x37a55d > 0 && $.log("开卡获得" + _0x37a55d + "豆");
  $.log("助力状态-->" + _0x18f0c0 + "," + _0x3d1f9f);
  _0x4e64e1 && $.log("已完成全部开卡");
  if (_0x48658c === 2) {
    let _0xefe284 = shareCodes.filter(_0x3d0167 => _0x3d0167.shareUuid === $.shareUuid)[0];
    switch (_0x3d1f9f) {
      case 0:
        $.log("无法助力自己");
        break;
      case 1:
        _0xefe284.count++;
        $.log("助力[" + _0xefe284.username + "]成功，已邀请" + _0xefe284.count + "人");
        break;
      case 2:
        $.log("已经助力过了");
        break;
      case 3:
        $.log("没有助力次数了");
        break;
      case 10:
        $.log("您已为好友助力过了哦");
        break;
      case 11:
        $.log("您已成功为好友助力了，不能再为其他好友助力了");
        break;
      case 20:
        $.log("您需注册会员,才能为好友助力！");
        break;
      case 21:
        $.log("您需注册会员并关注店铺,才能为好友助力！");
        break;
      case 22:
        $.log("您需注关注店铺,才能为好友助力！");
        break;
      case 77:
        $.log("未全部开卡和关注，不能助力");
        break;
      case 78:
        $.log("已经是老会员，不能助力");
        break;
      default:
        $.log("未知状态");
        break;
    }
  }
  return _0x4b53f8.openInfo.filter(_0x544bde => !_0x544bde.openStatus);
}
async function retryApi(_0x2cdee1, _0xdc5159 = 0) {
  if (_0xdc5159 > 10) throw new Error("重试次数过多，放弃重试");
  let _0x182e03 = await _0x2cdee1();
  JSON.stringify(_0x182e03).includes("请稍后重试") && (await $.wait(3000, 5000), await retryApi(_0x2cdee1, ++_0xdc5159));
  return _0x182e03;
}
function getLoad() {
  return $.api("dm/front/jdJoinCardtf/activity/load?open_id=&mix_nick=" + $.Token + "&user_id=10299171", {
    "jdToken": $.Token,
    "source": "01",
    "inviteNick": $.shareUuid || ""
  });
}
function getInviteRelation() {
  return $.api("/dm/front/jdJoinCardtf/customer/inviteRelation?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/customer/inviteRelation",
    "inviterNick": $.shareUuid || ""
  });
}
function getUniteAddCart() {
  return $.api("/dm/front/jdJoinCardtf/mission/completeMission?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/mission/completeMission",
    "missionType": "uniteAddCart"
  });
}
function getHasCollectShop() {
  return $.api("/dm/front/jdJoinCardtf/mission/completeMission?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/mission/completeMission",
    "missionType": "uniteCollectShop"
  });
}
function getDraw() {
  return $.api("/dm/front/jdJoinCardtf/interactive/drawPost?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/interactive/drawPost",
    "dataType": "draw",
    "usedGameNum": "2"
  });
}
function getShopList() {
  return $.api("dm/front/jdJoinCardtf/shop/shopList?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/shop/shopList"
  });
}
function getCompleteMission() {
  return $.api("/dm/front/jdJoinCardtf/mission/completeMission?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/mission/completeMission",
    "missionType": "openCard",
    "shopId": $.venderId
  });
}
function completeMissonForViewShop() {
  return $.api("/dm/front/jdJoinCardtf/mission/completeMission?open_id=&mix_nick=" + ($.buyerNick || "") + "&user_id=10299171", {
    "method": "/jdJoinCardtf/mission/completeMission",
    "missionType": "viewShop",
    "goodsNumId": $.venderId
  });
}
function load2() {
  return $.api("dm/front/jdJoinCardtf/activity/load?open_id=&mix_nick=" + $.Token + "&user_id=10299171", {
    "jdToken": $.Token,
    "source": "01",
    "inviteNick": $.shareUuid || "",
    "shopId": $.venderId
  });
}