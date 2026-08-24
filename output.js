//Mon Aug 24 2026 11:25:18 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let mode = __dirname.includes("magic");
const {
    Env,
    cheerio
  } = mode ? require("../magic") : require("./magic"),
  $ = new Env("M组队瓜分");
$.activityUrl = decodeURIComponent(process.argv.splice(2)?.[0] || process.env.M_WX_TEAM_URL);
mode && ($.activityUrl = "https://cjhy-isv.isvjcloud.com/wxTeam/activity?activityId=bbab575d8ff0427c989fe02d84b5e16a", $.activityUrl = "https://lzkj-isv.isvjcloud.com/wxTeam/activity2/3d8c84144c714543be4665c265e8bd21?activityId=3d8c84144c714543be4665c265e8bd21", $.activityUrl = "https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10033&activityId=1674586872175251457&templateId=2021062190900zdgf081&nodeId=101001&prd=cjwx&adsource=tg_storePage", $.activityUrl = "https://jinggeng-isv.isvjcloud.com/ql/front/showPartition?id=9e8080b5890a206c01890b12420746e2&user_id=1000102195", $.activityUrl = "https://hdb-isv.isvjcloud.com/h5/pages/partitionTeam/partitionTeam?id=5a387f9f1e81f5ba037da023d0ae449b&userId=1000009802");
let centerIndex = parseInt(process.env?.["M_CENTER_INDEX"] || 1),
  leaderNumber = parseInt(process.env.M_WX_TEAM_MASTER_LEADER_NUM || 1),
  onlyBean = parseInt(process.env.M_WX_TEAM_ONLY_BEAN || 2),
  beanLimit = parseInt(process.env.M_WX_TEAM_BEAN_LIMIT || 0);
$.notTeamList = process.env?.["M_WX_NOT_TEAM_LIST"]?.["split"]("@") || "沃隆@海尔".split("@");
let leaders = [],
  skipCookieNumber = 0;
$.version = "v1.2.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  $.signUuid = leaders.filter(_0x672b90 => _0x672b90.finish === false)?.[0]?.["signUuid"] || "";
  if ($.index > leaderNumber && !$.signUuid) {
    {
      $.log("已无车头");
      $.expire = true;
      return;
    }
  }
  if (!$.activityId || !$.activityUrl) {
    {
      $.log("活动id不存在");
      $.expire = true;
      return;
    }
  }
  $.UA = $.ua();
  let _0x2a7494 = await $.isvObfuscator();
  if (_0x2a7494.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = _0x2a7494?.["token"];
  if (["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"].includes($.domain)) {
    await this.login();
    let _0x585254 = await this.api("/front/activity/loadPartitionTeamSetting", {
        "teamId": $.signUuid
      }),
      _0x50d6b8 = _0x585254.result.partitionTeamSetting;
    $.prizeList = [{
      "prizeType": _0x50d6b8.awardType.includes("JD_MARKET") || _0x50d6b8.awardType.includes("JD_BEAN") ? 1 : 4
    }];
    $.maxGroup = _0x50d6b8.inviterTimes;
    $.prizeType = _0x50d6b8.awardType.includes("JD_MARKET") || _0x50d6b8.awardType.includes("JD_BEAN") ? 1 : 4;
    $.prizeNumbers = _0x50d6b8.helperAwardNum;
    $.sendNumbers = _0x50d6b8.awardTotalNum;
    $.extraPrizeNumbers = _0x50d6b8.inviterAwardNum;
    if ($.index <= leaderNumber) {
      _0x585254.result.myTeamLog?.["teamId"] ? ($.putMsg("已有" + _0x585254.result.currentTeams.length + "人"), leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "signUuid": _0x585254.result.myTeamLog.teamId,
        "username": $.username,
        "finish": false
      })) : (await $.wait(3000, 5000), await saveCaptain(0));
    }
    $.signUuid = leaders.filter(_0x3432a5 => _0x3432a5.finish === false)?.[0]?.["signUuid"] || "";
    if ($.index === 1 || !$.signUuid) return;
    let _0x14864f = await this.api("/front/activity/joinPartitionTeam", {
      "teamId": $.signUuid,
      "tidaType": "joinPartitionTeam"
    });
    if (_0x14864f.result?.["dmAwards"] || _0x14864f.message?.["includes"]("战队已满员")) {
      $.index = leaders.filter(_0x256557 => _0x256557.finish === false)?.[0]?.["index"];
      $.username = leaders.filter(_0x1a8394 => _0x1a8394.finish === false)?.[0]?.["username"];
      $.Token = leaders.filter(_0x213437 => _0x213437.finish === false)?.[0]?.["token"];
      $.cookie = leaders.filter(_0x1754a1 => _0x1754a1.finish === false)?.[0]?.["cookie"];
      leaders.filter(_0x5e4da2 => _0x5e4da2.signUuid === $.signUuid)[0].finish = true;
      await $.login();
      await saveCaptain(0);
      await $.wait(3000, 5000);
      $.signUuid = leaders.filter(_0x4daa75 => _0x4daa75.finish === false)?.[0]?.["signUuid"] || "";
    } else {
      this.putMsg(_0x14864f.message || _0x14864f.result?.["message"] || "未知结果");
    }
    return;
  } else {
    if ($.domain.includes("jinggeng-isv.isvjcloud.com")) {
      {
        let _0x1e903e = await $.api("front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
        if (!_0x1e903e.succ) {
          $.putMsg("setMixNick失败");
          return;
        }
        let _0x5b2e69 = await $.api("/ql/front/showPartition?id=" + $.activityId + "&user_id=" + $.userId + "&teamId=null&inviterNick=&envNew=notwx");
        if (_0x5b2e69.includes("<title>活动已结束</title>")) {
          {
            $.putMsg("活动已结束");
            $.expire = true;
            return;
          }
        }
        const _0x59b26a = cheerio.load(cheerio.load(_0x5b2e69).html());
        $.shopId = _0x59b26a("#shop_sid", "body").attr("value");
        $.venderId = _0x59b26a("#vender_id", "body").attr("value");
        $.shopName = _0x59b26a("#shop_title", "body").attr("value");
        $.rule = _0x59b26a("#description", "body").html();
        const _0x5cc03c = /(\d+-\d+-\d+\s\d+:\d+:\d+)/g,
          _0xf4d868 = $.rule.match(_0x5cc03c),
          _0x403f55 = _0xf4d868[0],
          _0x24ba29 = _0xf4d868[1];
        $.actStartTime = new Date(_0x403f55).getTime();
        $.actEndTime = new Date(_0x24ba29).getTime();
        $.maxGroup = $.rule.match(/每个玩家可创建(\d+)个战队/)[1] * 1;
        $.prizeType = $.rule.includes("积分") ? 4 : 1;
        $.prizeNumbers = $.rule.match(/组队成功后每人可获得(\d+)/)[1] * 1;
        $.sendNumbers = _0x59b26a(".head .count_jd", "body").text().match(/(\d+)/)[0] * 1;
        $.extraPrizeNumbers = $.rule.match(/组队成功后队长可获得额外(\d+)/)[1] * 1;
        if ($.actStartTime > Date.now()) {
          $.putMsg("活动未开始");
          $.expire = true;
          return;
        }
        if ($.actEndTime < Date.now()) {
          {
            $.putMsg("活动已结束");
            $.expire = true;
            return;
          }
        }
        $.index <= leaderNumber && (await $.api("front/followShop", "userId=" + $.userId), await $.wait(3000, 5000), await saveCaptain(), await $.wait(3000, 5000));
        await saveMember();
        if ($.index === 2 && leaders.length === 2) {
          $.log("ck1进ck2队伍");
          let _0x126702 = leaders[0],
            _0x173471 = leaders[1];
          $.Token = _0x126702.token;
          $.cookie = _0x126702.cookie;
          $.index = _0x126702.index;
          $.username = _0x126702.username;
          $.signUuid = _0x173471.signUuid;
          await $.wait(3000, 5000);
          await saveMember();
        }
        return;
      }
    }
  }
  if (["10033"].includes($.activityType)) {
    await $.login();
    let _0x2c66c8 = await $.api("/api/task/organizeTeam/activity", {
      "shareUserId": $.signUuid || ""
    });
    if (_0x2c66c8.resp_code !== 0) {
      $.putMsg("活动已结束");
      $.expire = true;
      return;
    }
    for (let _0x5d1567 of $.notTeamList) {
      {
        if ($.shopName.includes(_0x5d1567)) {
          {
            $.expire = true;
            $.putMsg("已屏蔽");
            return;
          }
        }
      }
    }
    $.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
    $.signUuid = leaders.filter(_0x2d3e9c => _0x2d3e9c.finish === false)?.[0]?.["signUuid"] || "";
    if ($.index > leaderNumber && !$.signUuid) {
      {
        $.log("已无车头");
        $.expire = true;
        return;
      }
    }
    $.prizeNumbers = _0x2c66c8.data.memberPrize;
    $.sendNumbers = _0x2c66c8.data.prizeList[0].totalPrizeNum || 0;
    $.extraPrizeNumbers = _0x2c66c8.data.captainPrize;
    $.prizeType = _0x2c66c8.data.prizeType;
    $.maxGroup = _0x2c66c8.data.groupNumber;
    if ($.index > leaderNumber && _0x2c66c8.resp_code == 1000) {
      {
        $.log("已加入别人了");
        return;
      }
    }
    if (_0x2c66c8.data.joinFlag == 4 && $.index > leaderNumber) {
      console.log("已加入别人了");
      return;
    }
    if ($.prizeType === 4 && onlyBean === 1) {
      $.putMsg("仅跑豆子组队");
      $.expire = true;
      return;
    }
    if ($.index <= leaderNumber) {
      let _0x4e6de6 = 0;
      for (let _0x17611e of _0x2c66c8.data.captainList || []) {
        _0x4e6de6 += _0x17611e.memberCount;
      }
      await $.api("/api/task/bargain/guest/myself", {
        "shareUserId": $.signUuid || ""
      });
      let _0x511510 = await $.api("/api/task/share/getUserId", {
        "shareUserId": $.signUuid || ""
      });
      if ($.maxGroup * 5 === _0x4e6de6) {
        {
          leaders.push({
            "index": $.index,
            "cookie": $.cookie,
            "token": $.Token,
            "username": $.username,
            "finish": true
          });
          $.putMsg("已经组满");
          return;
        }
      }
      if (_0x2c66c8.data?.["captainList"]?.["length"] > 0 && _0x4e6de6 % 5 != 0) leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "signUuid": _0x511510.data.shareUserId,
        "teamId": _0x2c66c8.data.captainList.filter(_0x2c280c => _0x2c280c.memberCount !== 5)[0].id,
        "username": $.username,
        "finish": false
      }), $.putMsg("已有" + _0x4e6de6 + "人");else {
        await $.api("/api/task/organizeTeam/saveCaptain", {});
        let _0x2ad0d4 = await $.api("/api/task/organizeTeam/activity", {
          "shareUserId": $.signUuid || ""
        });
        leaders.push({
          "index": $.index,
          "cookie": $.cookie,
          "token": $.Token,
          "signUuid": _0x511510.data.shareUserId,
          "teamId": _0x2ad0d4.data.captainList.filter(_0x56cc44 => _0x56cc44.memberCount !== 5)[0].id,
          "username": $.username,
          "finish": false
        });
        $.putMsg("建队");
      }
    }
    if ($.expire) {
      return;
    }
    if ($.index === 1) return;
    if (_0x2c66c8.resp_code == 1000) {
      $.log("已加入队伍");
      return;
    }
    $.signUuid = leaders.filter(_0x12afd9 => _0x12afd9.finish === false)?.[0]?.["signUuid"] || "";
    $.teamId = leaders.filter(_0x1a825d => _0x1a825d.finish === false)?.[0]?.["teamId"] || "";
    await saveMember();
    if ($.index === 2 && leaders.length === 2) {
      {
        $.log("ck1进ck2队伍");
        let _0x490262 = leaders[0],
          _0xdae24 = leaders[1];
        $.Token = _0x490262.token;
        $.cookie = _0x490262.cookie;
        $.index = _0x490262.index;
        $.username = _0x490262.username;
        $.signUuid = _0xdae24.signUuid;
        $.teamId = _0xdae24.teamId;
        await saveMember();
      }
    }
    return;
  }
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  await $.getMyPing();
  if (!$.Pin) {
    return;
  }
  await $.accessLog();
  $.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  $.signUuid = leaders.filter(_0x5965ae => _0x5965ae.finish === false)?.[0]?.["signUuid"] || "";
  if ($.index > leaderNumber && !$.signUuid) {
    {
      $.log("已无车头");
      $.expire = true;
      return;
    }
  }
  activityContent = await $.api("wxTeam/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&signUuid=" + ($.signUuid || ""));
  if (!activityContent.result || !activityContent.data) {
    {
      $.putMsg(activityContent.errorMessage);
      await $.wxStop(activityContent.errorMessage);
      return;
    }
  }
  $.actStartTime = activityContent.data.active.startTime;
  $.actEndTime = activityContent.data.active.endTime;
  $.prizeNumbers = activityContent.data.active.prizeNumbers;
  $.sendNumbers = activityContent.data.active.sendNumbers;
  $.extraPrizeNumbers = activityContent.data.active.extraPrizeNumbers;
  $.prizeType = activityContent.data.active.prizeType;
  $.maxGroup = activityContent.data.active.maxGroup;
  $.shopName = await $.getShopName();
  if ($.prizeType * 1 === 9) {
    {
      for (let _0x1f2fdf of $.notTeamList) {
        if ($.shopName.includes(_0x1f2fdf)) {
          {
            $.expire = true;
            $.putMsg("垃圾活动");
            return;
          }
        }
      }
      if ($.shopName.includes("海尔") || $.shopName.includes("沃隆")) {
        $.expire = true;
        return;
      }
    }
  }
  let _0xb4aafb = $.actStartTime.startTime - $.timestamp();
  _0xb4aafb > 0 && _0xb4aafb < 1800000 ? await $.wait(_0xb4aafb + 10) : "";
  if ($.actEndTime <= $.timestamp()) {
    {
      $.putMsg("活动已结束");
      $.expire = true;
      return;
    }
  }
  let _0x2c530e = activityContent.data.canJoin;
  if ($.index > leaderNumber && !_0x2c530e) {
    {
      $.log("已加入别人了");
      return;
    }
  }
  if ($.prizeType === 9 && onlyBean === 1) {
    {
      $.putMsg("仅跑豆子组队");
      $.expire = true;
      return;
    }
  }
  if ($.prizeType === 6 && ($.prizeNumbers + $.extraPrizeNumbers) * $.maxGroup + $.prizeNumbers < beanLimit) {
    {
      $.putMsg("豆子小于" + beanLimit + ",智能判断");
      $.expire = true;
      return;
    }
  }
  if ($.index <= leaderNumber) {
    {
      let _0x4af6ce = activityContent.data.signUuid,
        _0x7da6b7 = 0;
      for (let _0x1daa6b of activityContent.data.successRetList || []) {
        _0x7da6b7 += _0x1daa6b.memberList.length;
      }
      if ($.maxGroup * 5 === _0x7da6b7) {
        leaders.push({
          "index": $.index,
          "cookie": $.cookie,
          "token": $.Token,
          "pin": $.Pin,
          "signUuid": _0x4af6ce,
          "username": $.username,
          "finish": true
        });
        $.putMsg("已经组满");
        skipCookieNumber += $.maxGroup * 4;
        return;
      }
      let _0x4ac1ae = activityContent.data.list?.["length"];
      _0x4ac1ae > 0 ? (leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "pin": $.Pin,
        "signUuid": _0x4af6ce,
        "username": $.username,
        "finish": false
      }), $.putMsg("已有" + _0x4ac1ae + "人")) : await saveCaptain(0);
    }
  }
  if ($.expire) return;
  if ($.index === 1 && $.domain.includes("cjhy")) {
    return;
  }
  if (!_0x2c530e) {
    {
      $.log("已加入队伍");
      return;
    }
  }
  $.signUuid = leaders.filter(_0x45296a => _0x45296a.finish === false)?.[0]?.["signUuid"] || "";
  await saveMember();
  if ($.index === 2 && leaders.length === 2) {
    $.log("ck1进ck2队伍");
    let _0x31e208 = leaders[0],
      _0x4fa6e0 = leaders[1];
    $.Pin = _0x31e208.pin;
    $.index = _0x31e208.index;
    $.Token = _0x31e208.token;
    $.cookie = _0x31e208.cookie;
    $.username = _0x31e208.username;
    $.signUuid = _0x4fa6e0.signUuid;
    await $.api("customer/getMyPing", "userId=" + $.venderId + "&token=" + $.Token + "&fromType=APP");
    await saveMember();
  }
};
let typeObj = {
  "1": "京豆",
  "2": "流量包",
  "4": "积分",
  "6": "京豆",
  "7": "实物",
  "8": "专享价",
  "9": "积分",
  "13": "京东E卡",
  "14": "爱奇艺会员",
  "15": "PLUS会员"
};
$.getPrizeList = async function () {
  try {
    {
      let _0x31aed8 = await $.api("/api/task/organizeTeam/activity", {
        "shareUserId": $.signUuid || ""
      });
      $.prizeType = _0x31aed8.data.prizeType;
      $.prizeNumbers = _0x31aed8.data.memberPrize;
      $.sendNumbers = _0x31aed8.data.prizeList[0].totalPrizeNum || 0;
      $.extraPrizeNumbers = _0x31aed8.data.captainPrize;
      $.prizeType = _0x31aed8.data.prizeType;
      $.maxGroup = _0x31aed8.data.groupNumber;
      $.prizeList = [{
        "prizeType": $.prizeType,
        "prizeName": typeObj[$.prizeType]
      }];
    }
  } catch (_0x1e20f8) {
    console.log(_0x1e20f8);
  }
};
async function saveCaptain(_0x3a75db = 0) {
  let _0x2b688f = $.index,
    _0x1a569f = $.username;
  if (["hdb-isv.isvjcloud.com", "jingyun-rc.isvjcloud.com"].includes($.domain)) {
    let _0x4c4676 = await $.api("/front/activity/startPartitionTeam", {
      "tidaType": "share"
    });
    if (_0x4c4676.message?.["includes"]("组队次数已达到上限")) {
      $.putMsg("已经组满");
      return;
    }
    $.putMsg("建队");
    leaders.push({
      "index": $.index,
      "cookie": $.cookie,
      "token": $.Token,
      "signUuid": _0x4c4676.result.teamId,
      "username": $.username,
      "finish": false
    });
  } else {
    if ($.domain.includes("jinggeng-isv.isvjcloud.com")) {
      let _0x20b74b = await $.api("ql/front/postPartition", "user_id=" + $.userId + "&act_id=" + $.activityId);
      _0x20b74b.msg ? $.log(_0x20b74b.msg) : "";
      if (_0x20b74b.msg?.["includes"]("关注店铺") && _0x3a75db < 3) {
        let _0x32bbe9 = await $.api("front/followShop", "userId=" + $.userId);
        if (!_0x32bbe9.success) {
          {
            $.putMsg(_0x32bbe9.msg);
            return;
          }
        }
        await $.wait(3000, 5000);
        _0x20b74b = await $.api("ql/front/postPartition", "user_id=" + $.userId + "&act_id=" + $.activityId);
      }
      _0x20b74b.msg?.["includes"]("活动已经结束") && console.log(_0x20b74b);
      let _0x17c92b = _0x20b74b.data.partitionTeamLogParams[0];
      _0x17c92b.jdCombatTeamLogs.length === 5 ? _0x20b74b.msg?.["includes"]("发起战队的机会用完了呢") && $.putMsg("已经组满") : leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "signUuid": _0x17c92b.jdCombatTeamSetting.id,
        "username": $.username,
        "finish": _0x17c92b.jdCombatTeamLogs.length === 5
      });
    } else {
      let _0x46e587 = await $.api("wxTeam/saveCaptain", "activityId=" + $.activityId + "&pin=" + $.Pin + "&venderId=" + $.venderId + "&pinImg=" + encodeURIComponent($.attrTouXiang));
      if (_0x46e587.result && _0x46e587.data) $.putMsg("建队"), leaders.push({
        "index": $.index,
        "cookie": $.cookie,
        "token": $.Token,
        "pin": $.Pin,
        "signUuid": _0x46e587.data.signUuid,
        "username": $.username,
        "finish": false
      });else {
        if (_0x46e587.errorMessage.includes("店铺会员") && _0x3a75db < 3) await $.openCard(), await saveCaptain(_0x3a75db++);else {
          if (_0x46e587.errorMessage.includes("奖品与您擦肩而过") && _0x3a75db === 0) await saveCaptain(1);else {
            if (_0x46e587.errorMessage.includes("还没满员")) {
              {
                $.putMsg("建队");
                let _0x57f5af = await $.api("wxTeam/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&signUuid=" + ($.signUuid || ""));
                leaders.push({
                  "index": $.index,
                  "cookie": $.cookie,
                  "token": $.Token,
                  "pin": $.Pin,
                  "signUuid": _0x57f5af.data.signUuid,
                  "username": $.username,
                  "finish": false
                });
              }
            } else _0x46e587.errorMessage.includes("未开始") ? ($.putMsg("未开始"), $.expire = true) : $.log("saveCaptain异常：" + JSON.stringify(_0x46e587));
          }
        }
      }
    }
  }
}
async function saveMember(_0x27f93e = 0) {
  if (_0x27f93e > 5) {
    console.log("递归异常退出");
    return;
  }
  let _0x11d800 = $.index,
    _0x2659fc = $.username;
  if (["10033"].includes($.activityType)) {
    {
      if (!$.teamId || !$.signUuid) {
        console.log("无车头退出");
        return;
      }
      let _0x468c3c = await $.api("/api/task/organizeTeam/saveMember", {
        "teamId": $.teamId,
        "shareUserId": $.signUuid
      });
      $.log(_0x468c3c.data ? "入队成功" : _0x468c3c.resp_msg);
      if (_0x468c3c.data?.["memberList"]?.["length"] === 5) {
        let _0xe1fedf = leaders.filter(_0x570d19 => _0x570d19.signUuid === $.signUuid)[0];
        $.cookie = _0xe1fedf.cookie;
        $.Token = _0xe1fedf.token;
        $.index = _0xe1fedf.index;
        $.username = _0xe1fedf.username;
        await $.login();
        let _0x4b9730 = await $.api("/api/task/organizeTeam/saveCaptain", {});
        if (_0x4b9730.resp_code === 0) {
          {
            let _0x183c04 = await $.api("/api/task/organizeTeam/activity", {
              "shareUserId": $.signUuid || ""
            });
            $.putMsg("建队");
            _0xe1fedf.teamId = _0x183c04.data.captainList.filter(_0x26a369 => _0x26a369.memberCount !== 5)[0].id;
          }
        } else _0xe1fedf.finish = true, $.log("已经组满");
        return;
      }
      if (_0x468c3c.resp_msg.includes("您已加入其他队伍！")) {
        return;
      }
      if (_0x468c3c.resp_msg.includes("您的好友组队数已达上限！")) {
        let _0x452f6d = leaders.filter(_0x2eb431 => _0x2eb431.signUuid === $.signUuid)[0];
        _0x452f6d.finish = true;
        $.index = _0x452f6d.index;
        $.username = _0x452f6d.username;
        $.putMsg("已经组满");
        $.username = _0x2659fc;
        $.index = _0x11d800;
        _0x452f6d = leaders.filter(_0xb2e389 => _0xb2e389.finish === false)?.[0];
        if (!_0x452f6d) {
          {
            $.putMsg("已无车头");
            $.expire = true;
            return;
          }
        }
        $.teamId = _0x452f6d?.["teamId"] || "";
        $.signUuid = _0x452f6d?.["signUuid"] || "";
        await saveMember(_0x27f93e++);
      }
    }
  } else {
    if ($.domain.includes("jinggeng-isv.isvjcloud.com")) {
      {
        if ($.signUuid) {
          {
            let _0x5b2842 = await $.api("ql/front/postPartition", "user_id=" + $.userId + "&act_id=" + $.activityId + "&teamId=" + $.signUuid);
            _0x5b2842.msg ? $.log(_0x5b2842.msg) : "";
            if (_0x5b2842.msg?.["includes"]("活动已经结束")) {
              $.expire = true;
              return;
            }
            if (_0x5b2842.msg?.["includes"]("火爆") || _0x5b2842.msg?.["includes"]("已用完")) return;
            if (_0x5b2842.msg?.["includes"]("关注") && _0x27f93e < 3) {
              {
                await $.api("front/followShop", "userId=" + $.userId);
                await $.wait(3000, 5000);
                await saveMember(_0x27f93e++);
                return;
              }
            }
            if (_0x5b2842.msg?.["includes"]("已满员")) {
              let _0x26170d = leaders.filter(_0x15b46c => _0x15b46c.signUuid === $.signUuid)[0];
              _0x26170d.finish = true;
              $.Token = _0x26170d.token;
              $.index = _0x26170d.index;
              $.username = _0x26170d.username;
              $.cookie = _0x26170d.cookie;
              await saveCaptain(0);
              $.signUuid = leaders.filter(_0x486c76 => _0x486c76.finish === false)?.[0]?.["signUuid"] || "";
              if ($.index > leaderNumber && !$.signUuid) {
                $.log("已无车头");
                $.expire = true;
              }
            }
          }
        }
      }
    } else {
      {
        let _0x41a551 = await $.api("wxTeam/saveMember", "activityId=" + $.activityId + "&signUuid=" + $.signUuid + "&pin=" + $.Pin + "&venderId=" + $.venderId + "&pinImg=" + encodeURIComponent($.attrTouXiang)),
          _0x33d8f3 = leaders.filter(_0xaafac => _0xaafac.signUuid === $.signUuid)[0];
        if (_0x41a551.result && _0x41a551.data) {
          if ($.index > leaderNumber) {
            return;
          }
          $.putMsg("入" + _0x33d8f3.username + "队伍");
        } else {
          if (_0x41a551.errorMessage.includes("店铺会员") && _0x27f93e < 3) await $.openCard(), await saveMember(_0x27f93e++);else {
            if (_0x41a551.errorMessage.includes("队伍已经满员")) {
              {
                $.log(_0x33d8f3);
                $.index = _0x33d8f3.index;
                $.username = _0x33d8f3.username;
                $.putMsg("已经组满");
                $.username = _0x2659fc;
                $.index = _0x11d800;
                leaders.filter(_0x26c20d => _0x26c20d.signUuid === $.signUuid)[0].finish = true;
                $.signUuid = leaders.filter(_0x473564 => _0x473564.finish === false)?.[0]?.["signUuid"] || "";
                if (!$.signUuid) {
                  $.log("已无车头");
                  $.expire = true;
                  return;
                }
                await saveMember(0);
              }
            } else {
              if (_0x41a551.errorMessage.includes("奖品与您擦肩而过") && _0x27f93e === 0) await saveMember(1);else _0x41a551.errorMessage.includes("已经加入") ? $.putMsg(_0x41a551.errorMessage) : ($.putMsg(_0x41a551.errorMessage || "saveMember异常"), await $.wxStop(_0x41a551.errorMessage), $.log("saveMember异常：" + JSON.stringify(_0x41a551)));
            }
          }
        }
      }
    }
  }
}
$.after = async function () {
  try {
    {
      if ($.prizeType) {
        {
          let _0x3110eb = typeObj[$.prizeType];
          $.msg.push("    最多可组" + $.maxGroup + "队,共" + $.sendNumbers + _0x3110eb + " " + $.index);
          let _0x19c100 = ($.prizeNumbers + $.extraPrizeNumbers) * $.maxGroup,
            _0x2c14d3 = _0x19c100 + $.prizeNumbers;
          $.msg.push("    组满" + _0x2c14d3 + _0x3110eb + ",队长" + _0x19c100 + _0x3110eb + ",队员" + $.prizeNumbers + _0x3110eb);
        }
      }
    }
  } catch (_0x49a3fb) {
    console.log(_0x49a3fb);
  }
  $.msg.push("export M_WX_TEAM_URL=\"" + $.activityUrl + "\"");
};
$.run({
  "whitelist": ["1-9999"],
  "multCenter": true,
  "mod": centerIndex * 1
}).catch(_0x275dcc => $.log(_0x275dcc));