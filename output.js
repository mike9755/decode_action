//Mon Aug 24 2026 11:19:07 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.activityUrl = $.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, $.activityUrl);
$.domain = $.match(/https?:\/\/([^/]+)/, $.activityUrl);
$.activityId = $.getQueryString($.activityUrl, "id");
$.userId = $.getQueryString($.activityUrl, "user_id");
$.content = [];
$.activityName = "";
let leaders = [],
  equityTypes = ["JD_BEAN", "JD_E_CARD", "JD_REDBAG", "JD_AIQIYI", "JD_GOODS"],
  keymap = {
    "one": "awardOneStatus",
    "two": "awardTwoStatus",
    "three": "awardThreeStatus",
    "four": "awardFourStatus"
  },
  keymap2 = {
    "one": "leveOneNum",
    "two": "leveTwoNum",
    "three": "leveThreeNum",
    "four": "leveFourNum"
  },
  keymap4 = {
    "one": "1级",
    "two": "2级",
    "three": "3级",
    "four": "4级"
  },
  skipCookieNumber = 0;
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.userId) {
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let Illll1i1 = await $.isvObfuscator();
  if (Illll1i1.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = Illll1i1?.["token"];
  let iII11lII = await $.api("/front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
  if (!iII11lII.succ) {
    $.putMsg("setMixNick失败");
    return;
  }
  let l1Iiiili = leaders.filter(IlIiiiil => !IlIiiiil.draw);
  console.log(l1Iiiili);
  if (l1Iiiili.length === 0 && $.index > leaderNum) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
  }
  leaders.filter(I1I11i1l => I1I11i1l.count >= I1I11i1l.need + 2 && !I1I11i1l.draw).forEach(llIIi1l1 => {
    llIIi1l1.draw = true;
    llIIi1l1.count = 9999;
  });
  $.inviterNick = l1Iiiili && l1Iiiili.length > 0 ? l1Iiiili[0].inviterNick : encodeURIComponent(iII11lII.msg);
  let i11I1l11 = await $.api("ql/front/showInviteJoin", "inviterNick=" + $.inviterNick + "&isOpenCard=0&from=kouling&id=" + $.activityId + "&user_id=" + $.userId + "&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
  const iIlllili = cheerio.load(cheerio.load(i11I1l11).html());
  $.rule = iIlllili("#description", "body").text();
  $.shopName = iIlllili("#shop_title", "body").attr("value");
  $.shopId = iIlllili("#shop_sid", "body").attr("value");
  $.venderId = iIlllili("#vender_id", "body").attr("value");
  $.helpLogs = JSON.parse(iIlllili("#helpLogs", "body").attr("value"));
  $.bindLogsList = JSON.parse(iIlllili("#bindLogsList", "body").attr("value"));
  $.inviteSetting2 = JSON.parse(iIlllili("#inviteSetting2", "body").attr("value"));
  $.index < 2 && $.log(JSON.stringify($.inviteSetting2));
  const liil1iIl = /(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/g,
    Il1iIiiI = $.rule.match(liil1iIl),
    Iiii1I1I = Il1iIiiI[0],
    llilIlI1 = Il1iIiiI[1];
  $.startTime = new Date(Iiii1I1I).getTime();
  $.endTime = new Date(llilIlI1).getTime();
  if ($.startTime > Date.now()) {
    $.putMsg("活动未开始");
    $.expire = true;
    return;
  }
  if ($.endTime < Date.now()) {
    $.putMsg("活动已结束");
    $.expire = true;
    return;
  }
  $.errorMsg = iIlllili("#errorMsg", "body").attr("value");
  $.log($.errorMsg);
  if ($.errorMsg && $.errorMsg.includes("邀请人的会员等级不符合条件哦")) {
    $.putMsg($.errorMsg);
    return;
  }
  if ($.errorMsg.includes("跳开卡页面")) {
    await $.openCard($.userId);
    i11I1l11 = await $.api("ql/front/showInviteJoin", "inviterNick=" + $.inviterNick + "&isOpenCard=1&from=kouling&id=" + $.activityId + "&user_id=" + $.userId + "&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
    $3 = cheerio.load(cheerio.load(i11I1l11).html());
    $.errorMsg = $3("#errorMsg", "body").attr("value");
    $.log("$.errorMsg " + $.errorMsg);
    $.inviteSucc = $3("#inviteSucc", "body").attr("value");
    $.log("$.inviteSucc " + $.inviteSucc);
    if ($.inviteSucc && $.inviteSucc.includes("已成功邀请您加入本店会员")) {
      {
        let IilI1Ill = leaders.filter(lI1Ilil => lI1Ilil.inviterNick === $.inviterNick);
        leaders.filter(IiiilII => IiiilII.inviterNick === $.inviterNick).forEach(lI1i1l1i => lI1i1l1i.count++);
        $.log("助力" + IilI1Ill[0].username + "++，当前已邀请" + IilI1Ill[0].count + "人");
      }
    }
  }
  $.activityAll = JSON.parse(iIlllili("#activityAll", "body").attr("value"));
  $.awardType = $.activityAll.awardType;
  skipCookieNumber += $.helpLogs.length;
  let I11il1I = false;
  for (let lliIi in $.inviteSetting2) {
    if (!I11il1I) {
      I11il1I = $.inviteSetting2[lliIi].availableQuantity > 0;
    }
  }
  if (!I11il1I) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
  }
  if ($.index <= leaderNum) {
    $.putMsg("队长");
    for (let il1iIill in $.inviteSetting2) {
      let lI11i1li = $.inviteSetting2[il1iIill].equityName;
      if ([1, 2].includes($.inviteSetting2[il1iIill][keymap[il1iIill]]) && equityTypes.includes($.inviteSetting2[il1iIill].equityType)) {
        {
          if ($.inviteSetting2[il1iIill].availableQuantity > 0 && $.index <= $.inviteSetting2[il1iIill].availableQuantity) {
            if ($.inviteSetting2[il1iIill][keymap2[il1iIill]] * 1 > needMaxNum || $.inviteSetting2[il1iIill].equityName.match(new RegExp(m_wx_address_stop_keyword)) != null) continue;
            leaders.push({
              "cookie": $.cookie,
              "token": $.Token,
              "equityName": lI11i1li,
              "index": $.index,
              "key": il1iIill,
              "inviterNick": encodeURIComponent(iII11lII.msg),
              "username": $.username,
              "awardId": $.inviteSetting2[il1iIill].id,
              "count": $.helpLogs.length,
              "need": $.inviteSetting2[il1iIill][keymap2[il1iIill]],
              "draw": $.inviteSetting2[il1iIill][keymap[il1iIill]] === 3
            });
          }
        }
      }
      if ([3].includes($.inviteSetting2[il1iIill][keymap[il1iIill]])) {
        $.putMsg(lI11i1li + "已领过");
      }
    }
  }
  debugger;
  if ($.index > leaderNum && leaders.length === 0) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
  }
  let l1IilIli = leaders.filter(ll1ilIi1 => ll1ilIi1.count >= ll1ilIi1.need && !ll1ilIi1.draw);
  if (l1IilIli && l1IilIli.length > 0) for (let lIilil1 of l1IilIli) {
    {
      await $.wait(2000, 5000);
      $.cookie = lIilil1.cookie;
      $.Token = lIilil1.token;
      await $.api("/front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
      i11I1l11 = await $.api("ql/front/showInviteJoin", "inviterNick=" + $.inviterNick + "&isOpenCard=0&from=kouling&id=" + $.activityId + "&user_id=" + $.userId + "&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
      const lIi11Iii = cheerio.load(cheerio.load(i11I1l11).html());
      $.inviteSetting2 = JSON.parse(lIi11Iii("#inviteSetting2", "body").attr("value"));
      for (let IlI111I1 in $.inviteSetting2) {
        {
          if ([2].includes($.inviteSetting2[IlI111I1][keymap[IlI111I1]])) {
            try {
              await $.wait(2000, 5000);
              let lIIiIII = $.inviteSetting2[IlI111I1].id;
              $.index = lIilil1.index;
              $.username = lIilil1.username;
              let illliill = lIilil1.equityName;
              $.cookie = lIilil1.cookie;
              $.Token = lIilil1.token;
              await $.api("/front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
              await $.api("ql/front/showInviteJoin", "inviterNick=" + $.inviterNick + "&isOpenCard=1&from=kouling&id=" + $.activityId + "&user_id=" + $.userId + "&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
              let lllIiilI = await $.api("/ql/front/receiveInviteJoinAward", "user_id=" + $.userId + "&awardId=" + lIIiIII + "&act_id=" + $.activityId);
              $.log(lllIiilI.msg);
              if (lllIiilI.msg.includes("奖品发完了")) $.putMsg(illliill + "已发完"), leaders.filter(I1IlIlil => I1IlIlil.awardId === lIIiIII).forEach(Iii1iIIi => {
                Iii1iIIi.draw = true;
                Iii1iIIi.count = 9999;
              });else {
                if (lllIiilI.msg.includes("您已经领过该奖品了")) $.putMsg(illliill + "已领过"), leaders.filter(I1i1i => I1i1i.cookie === lIilil1.cookie && I1i1i.awardId === lIIiIII)[0].draw = true, leaders.filter(IiiIi1II => IiiIi1II.cookie === lIilil1.cookie && IiiIi1II.awardId === lIIiIII)[0].count = 9999;else {
                  if (lllIiilI.succ) {
                    let Iil1Iil1 = JSON.parse(lllIiilI.msg);
                    if (Iil1Iil1.isSendSucc && Iil1Iil1.drawAwardDto) {
                      {
                        try {
                          {
                            let l1Iiilli = $.getAwardText(Iil1Iil1.drawAwardDto);
                            $.putMsg(l1Iiilli);
                            Iil1Iil1.drawAwardDto.awardType === "JD_GOODS" && ($.prizeName = l1Iiilli, $.addressId = Iil1Iil1.actLogId, await $.saveAddress());
                          }
                        } catch (lIliIill) {
                          console.log(lIliIill);
                        }
                        $.putMsg(illliill + "领取成功");
                        leaders.filter(llIIll => llIIll.cookie === lIilil1.cookie && llIIll.awardId === lIIiIII)[0].draw = true;
                      }
                    } else {
                      $.putMsg(data.msg);
                      break;
                    }
                  } else $.putMsg(illliill + " " + lllIiilI.msg);
                }
              }
            } catch (iI1illiI) {
              console.log(iI1illiI);
            }
          }
        }
      }
    }
  }
  await $.api("/ql/front/reportActivity/recordActPvUvData", "userId=" + $.userId + "&actId=" + $.activityId);
};
$.after = async function () {
  try {
    {
      $.msg.push("    活动时间:" + $.formatDate($.startTime, "yyyy-MM-dd HH:mm") + "至" + $.formatDate($.endTime, "yyyy-MM-dd HH:mm"));
      $.log($.rule);
      for (let lIiIii1l in $.inviteSetting2 || []) {
        {
          let illI1lI = $.inviteSetting2[lIiIii1l];
          $.msg.push(keymap4[lIiIii1l] + " " + illI1lI["leve" + capitalizeFirstLetter(lIiIii1l) + "Num"] + "人 " + illI1lI.equityName + " " + illI1lI.availableQuantity + "/" + illI1lI.freezeQuantity + " 份");
        }
      }
    }
  } catch (lilil1i1) {
    console.log(lilil1i1);
  }
  $.msg.push("export M_JINGGENG_INVITE_URL=\"" + $.activityUrl + "\"");
};
function capitalizeFirstLetter(iIIiIiii) {
  return iIIiIiii.charAt(0).toUpperCase() + iIIiIiii.slice(1);
}