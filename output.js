//Mon Aug 24 2026 11:17:17 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let activityContent = "",
  countSignArr = [];
function convertDateString(iiIii1li) {
  return iiIii1li.split(" ")[0].split("-").join("");
}
$.version = "v1.3.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
console.log("活动地址: " + $.activityUrl);
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  $.sevenDay = $.activityUrl.includes("sevenDay") || ["10040"].includes($.activityType);
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let I11I1l1I = await $.isvObfuscator();
  if (I11I1l1I.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  if ($.domain.includes("hdb-isv.isvjcloud.com") || $.domain.includes("jingyun-rc.isvjcloud.com")) {
    {
      await $.login();
      let l1IIl1 = 0,
        iliiil1i = await $.api("front/activity/signLoad", {});
      if (iliiil1i.result?.["signLog"]?.["lastSignTime"] && $.formatDate(iliiil1i.result.signLog.lastSignTime, "yyyy-MM-dd") === $.now("yyyy-MM-dd")) l1IIl1 = iliiil1i.result?.["signLog"]?.["continueCount"];else {
        {
          let IIi1lliI = await $.api("front/activity/signPost", {});
          if (IIi1lliI.succ && IIi1lliI.result.awardRes.succ) {
            {
              l1IIl1 = IIi1lliI.result?.["signLog"]?.["continueCount"];
              if (IIi1lliI.result.awardRes.needSend) {
                $.putMsg($.getAwardText(IIi1lliI.result.awardRes.dmAward));
              } else $.putMsg("空气");
            }
          } else $.putMsg(IIi1lliI.message);
        }
      }
      countSignArr.push(l1IIl1);
      $.putMsg("已签" + l1IIl1 + "天");
      return;
    }
  }
  if ($.domain.includes("jinggeng")) {
    {
      await $.wait(1000, 2000);
      let l1li1liI = await $.api("/front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
      if (!l1li1liI.succ) {
        {
          $.putMsg(l1li1liI.msg);
          return;
        }
      }
      let il11 = await $.api("ql/front/showSign", "id=" + $.activityId + "&user_id=" + $.userId + "&sid=" + $.randomString() + "&un_area=" + $.randomPattern("xx_xxxx_xxxx_xxxxx"));
      const il11Ii1 = cheerio.load(cheerio.load(il11).html());
      $.shopId = il11Ii1("#shop_sid", "body").attr("value");
      $.isSign = il11Ii1("#isSign", "body").attr("value") === "1";
      $.venderId = il11Ii1("#vender_id", "body").attr("value");
      $.shopName = il11Ii1("#shop_title", "body").attr("value");
      let IIl1II1i = il11Ii1("#continueCount", "body").attr("value") || 0,
        III1IIl1 = il11Ii1("#totalCount", "body").attr("value");
      $.description = il11Ii1("#description", "body").text().replace(/;/g, "\n");
      $.actStartTime = $.parseDate($.match(/(\d+-\d+-\d+ \d+:\d+:\d+)-/, $.description)).getTime();
      $.actEndTime = $.parseDate($.match(/-(\d+-\d+-\d+ \d+:\d+:\d+)/, $.description)).getTime();
      if ($.prizeList.length === 0) try {
        $.description.split("\n").forEach(liIlliIi => {
          let i11IIiii = $.match(/每日签到赠送(\d+)([\u4e00-\u9fa5]{2})/, liIlliIi);
          if (i11IIiii && i11IIiii.length > 0) $.prizeList.push({
            "giftName": i11IIiii[0] * 1,
            "giftType": i11IIiii[1].includes("积分") ? 9 : i11IIiii[1].includes("京豆") ? 6 : i11IIiii[1].includes("优惠券") ? 1 : 7
          });else {
            let IIllI1iI = $.match(/连续签到(\d+)天,赠送(\d+)([\u4e00-\u9fa5]{2})/g, liIlliIi);
            IIllI1iI && IIllI1iI.length > 0 && $.prizeList.push({
              "dayNum": IIllI1iI[0] * 1,
              "giftName": IIllI1iI[1],
              "giftType": IIllI1iI[2]
            });
          }
        });
      } catch (l1lll1) {
        console.log(l1lll1);
      }
      if ($.isSign) {
        countSignArr.push(IIl1II1i);
        $.putMsg("已签" + IIl1II1i + "天");
        try {
          {
            let IIl1II1 = await $.api("/ql/front/SearchCustomAward", "userId=" + $.userId + "&actId=" + $.activityId);
            if (IIl1II1.succ) for (let llIiI1ii of IIl1II1?.["qlActLogParams"]?.["resultList"]?.["filter"](I1I1i1 => convertDateString(I1I1i1.created) + "" === $.now("yyyyMMdd"))) {
              $.putMsg(llIiI1ii.remark);
              if (llIiI1ii.awardType === "JD_GOODS") {
                $.addressId = IIl1II1.actLogId;
                $.prizeName = awardName;
                await $.saveAddress();
              }
            }
          }
        } catch (iIiiIIll) {
          console.log(iIiiIIll);
        }
        return;
      }
      await $.api("/ql/front/reportActivity/recordActPvUvData", "userId=" + $.userId + "&actId=" + $.activityId);
      let IiIiIi11 = await $.api("front/followShop", "userId=" + $.userId),
        iiiII111 = await $.api("ql/front/saveSignIn", "user_id=" + $.userId + "&act_id=" + $.activityId);
      if (iiiII111.succ) {
        if (iiiII111.msg.includes("签到成功但不需要发奖")) {
          $.putMsg("空气");
        } else {
          let lllllIi1 = JSON.parse(iiiII111.msg);
          lllllIi1.isSendSucc ? $.putMsg(lllllIi1.actLogDto.remark) : $.putMsg("空气");
        }
        $.putMsg("已签" + ++IIl1II1i + "天");
      } else {
        $.putMsg(iiiII111.msg);
        await $.wxStop(iiiII111.msg);
      }
      try {
        {
          let I1I1I1ii = await $.api("/ql/front/SearchCustomAward", "userId=" + $.userId + "&actId=" + $.activityId);
          if (I1I1I1ii.succ) {
            for (let IllI1ii of I1I1I1ii?.["qlActLogParams"]?.["resultList"]?.["filter"](li11Il1 => convertDateString(li11Il1.created) + "" === $.now("yyyyMMdd"))) {
              $.putMsg(IllI1ii.remark);
              IllI1ii.awardType === "JD_GOODS" && ($.addressId = I1I1I1ii.actLogId, $.prizeName = awardName, await $.saveAddress());
            }
          }
        }
      } catch (l1i1iII1) {
        console.log(l1i1iII1);
      }
      countSignArr.push(IIl1II1i);
    }
  } else {
    if (["10023", "10040", "10002"].includes($.activityType)) {
      {
        await $.login();
        let II1l1ll1 = $.activityType == "10002" ? "sign" : "daySign";
        activityContent = await $.api("/api/task/" + II1l1ll1 + "/activity", {});
        if (!activityContent.data) {
          {
            $.putMsg(activityContent.reso_msg || "请确认活动有效性");
            $.expire = true;
            return;
          }
        }
        let iiiIiIlI = activityContent,
          ii1iII1 = $.activityType == "10002" ? iiiIiIlI.data.signContinuityNum : iiiIiIlI.data.continuityNum,
          li1i1lI = $.activityType == "10002" ? "add" : "getSignClick";
        debugger;
        if ($.sevenDay && iiiIiIlI.data.continuityNum < 7 && iiiIiIlI.data.sign == true || !$.sevenDay && iiiIiIlI.data.sign == true) {
          let i11Il111 = await $.api("/api/task/" + II1l1ll1 + "/" + li1i1lI, {});
          if (i11Il111.resp_code == 0) {
            ii1iII1++;
          } else $.putMsg(i11Il111.resp_msg);
        } else ii1iII1 = iiiIiIlI.data?.["signNum"] || 0, countSignArr.push(ii1iII1);
        try {
          {
            let lil1ilii = await $.api("/api/my/prize/list", {
              "current": "1",
              "size": "10000"
            });
            if (lil1ilii.resp_code == 0) for (lil1ilii of lil1ilii.data?.["filter"](l1illi1l => l1illi1l.dayTime == $.now("yyyy-MM-dd"))) {
              $.putMsg(lil1ilii.prizeName);
              if (lil1ilii.prizeType == 3) {
                $.addressId = lil1ilii.addressId;
                $.prizeName = lil1ilii.prizeName;
                await $.saveAddress();
              }
            } else {
              $.putMsg(lil1ilii.resp_msg || "空气");
            }
          }
        } catch (III1IIli) {
          console.log(III1IIli);
        }
        countSignArr.push(ii1iII1);
        $.putMsg("已签" + ii1iII1 + "天");
      }
    } else {
      await $.getSimpleActInfoVo();
      if ($.expire) {
        return;
      }
      await $.getMyPing();
      if (!$.Pin) return;
      await $.accessLog();
      if (!activityContent) {
        activityContent = await $.api("sign/" + ($.sevenDay ? "sevenDay/" : "") + "wx/getActivity", "actId=" + $.activityId + "&venderId=" + $.venderId);
        if (!activityContent.isOk) {
          $.putMsg(activityContent.msg || "活动已结束");
          $.expire = true;
          return;
        }
      }
      $.actStartTime = activityContent.act.startTime;
      $.actEndTime = activityContent.act.endTime;
      if ($.timestamp() > activityContent.act.endTime) {
        $.putMsg("活动已结束");
        $.expire = true;
        return;
      }
      if ($.prizeList.length === 0) {
        let iII1iili = [];
        if ($.sevenDay) for (let ill1I1I1 of activityContent.act?.["giftBean"]?.["giftConditions"] || []) {
          if (ill1I1I1.gift) {
            ill1I1I1.gift.dayNum = ill1I1I1.dayNum;
            iII1iili.push(ill1I1I1.gift);
          }
        } else {
          if (activityContent.act.wxSignActivityGiftBean.hasGiftEveryDay === "y") {
            iII1iili.push(activityContent.act.wxSignActivityGiftBean.gift);
          }
          if (activityContent.act.wxSignActivityGiftBean.giftConditions.length > 0) for (let illiI11l of activityContent.act.wxSignActivityGiftBean.giftConditions) {
            illiI11l.gift && (illiI11l.gift.dayNum = illiI11l.dayNum, iII1iili.push(illiI11l.gift));
          }
        }
        $.prizeList = iII1iili;
      }
      let llIlIIi = $.prizeList.filter(IIl1ilIl => ["6", "7", "9", "13", "14", "15", "16"].includes(IIl1ilIl.giftType));
      if (llIlIIi.length === 0) {
        {
          $.putMsg("垃圾或领完");
          $.expire = true;
          return;
        }
      }
      if ($.onlyBeanGoods && $.prizeList.filter(lII1iili => ["6", "7", "13", "14", "15", "16"].includes(lII1iili.giftType)).length === 0) {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
      let illlllli = await $.api("sign/" + ($.sevenDay ? "sevenDay/" : "") + "wx/getSignInfo", "venderId=" + $.venderId + "&pin=" + $.Pin + "&actId=" + $.activityId),
        Ii1i1llI = $.sevenDay ? illlllli?.["contiSignDays"] || 0 : illlllli?.["signRecord"]?.["contiSignNum"] || 0;
      if ($.sevenDay && illlllli.isSign === "n" || !$.sevenDay && illlllli.signRecord.lastSignDate !== $.now("yyyyMMdd") * 1) for (let Ilii11l1 = 0; Ilii11l1 < $.retryCount; Ilii11l1++) {
        {
          let IIiiii1i = await sign();
          if (IIiiii1i > 0) {
            Ii1i1llI++;
            break;
          }
          await $.wait(1000, 2000);
        }
      }
      countSignArr.push(Ii1i1llI);
      $.putMsg("已签" + Ii1i1llI + "天");
      if (!$.isaddr) try {
        {
          let iiII1i = await $.api("sign/" + ($.sevenDay ? "sevenDay/" : "") + "wx/getGiftRecords", "venderId=" + $.venderId + "&pin=" + $.Pin + "&actId=" + $.activityId);
          if (iiII1i.isOk) for (let I1l1liIl of iiII1i?.["records"]?.["filter"](II11II => II11II.giftDate + "" === $.now("yyyyMMdd"))) {
            $.putMsg(I1l1liIl.giftName);
            I1l1liIl.gift.giftType === "7" && ($.addressId = I1l1liIl.addressId, $.prizeName = I1l1liIl.giftName, await $.saveAddress());
          } else $.putMsg(signUp.msg);
        }
      } catch (i1iiiIlI) {
        console.log(i1iiiIlI);
      }
    }
  }
};
let kv = {
  1: "券",
  6: "京豆",
  7: "实物",
  9: "积分",
  10: "券",
  17: "券"
};
$.getPrizeList = async function () {
  if ($.prizeList.length === 0 && ["10023"].includes($.activityType)) {
    {
      let ilIil1ll = $.activityType == "10002" ? "sign" : "daySign";
      activityContent = await $.api("/api/task/" + ilIil1ll + "/activity", {});
      if (!activityContent.data) {
        $.putMsg(activityContent.reso_msg || "请确认活动有效性");
        $.expire = true;
        return;
      }
      let lllIl1l = [],
        lii1ili1 = await $.api("/api/active/getRule", {});
      $.rule = lii1ili1.data;
      let iI11liI1 = await $.api("/api/prize/drawPrize", {});
      $.prizeList = iI11liI1.data.prizeInfo || [];
      for (let I11l11i1 = 0; I11l11i1 < activityContent.data?.["signPiize"]?.["length"] || 0; I11l11i1++) {
        {
          let iiliI111 = activityContent.data?.["signPiize"][I11l11i1],
            ll1lIIII = $.prizeList[I11l11i1];
          lllIl1l.push({
            "dayNum": iiliI111.signNumber || 1,
            "giftName": ll1lIIII.prizeName,
            "giftType": ll1lIIII.prizeType == 1 ? 6 : ll1lIIII.prizeType == 3 ? 7 : ll1lIIII.prizeType,
            "giftTotal": ll1lIIII.leftNum,
            "giftNum": ll1lIIII.leftNum
          });
        }
      }
      $.prizeListShow = lllIl1l;
    }
  }
  if ($.prizeList.length === 0 && ["10040"].includes($.activityType)) {
    let IiIi1iiI = [],
      iiiiliI = await $.api("/api/prize/drawPrize", {});
    $.prizeList = iiiiliI.data.prizeInfo || [];
    for (let ii1l1II1 of iiiiliI.data.prizeInfo) {
      IiIi1iiI.push({
        "dayNum": ii1l1II1.position,
        "giftName": ii1l1II1.prizeName,
        "giftType": ii1l1II1.prizeType == 3 ? 7 : ii1l1II1.prizeType == 1 ? 6 : 9,
        "giftTotal": ii1l1II1.leftNum,
        "giftNum": ii1l1II1.beanNum
      });
    }
    $.prizeListShow = IiIi1iiI;
  }
  if ($.prizeList.length === 0 && ["10002"].includes($.activityType)) {
    let II11IIi1 = [],
      I1Iil1Ii = await $.api("/api/task/sign/prizeList", {});
    $.prizeList = I1Iil1Ii.data.prizeInfo || [];
    for (let ii11l1I1 of I1Iil1Ii.data.prizeInfo) {
      II11IIi1.push({
        "dayNum": ii11l1I1.days,
        "giftName": ii11l1I1.prizeName,
        "giftType": ii11l1I1.prizeType == 3 ? 7 : ii11l1I1.prizeType == 1 ? 6 : 9,
        "giftTotal": ii11l1I1.leftNum,
        "giftNum": ii11l1I1.beanNum
      });
    }
    $.prizeListShow = II11IIi1;
  }
};
$.after = async function () {
  try {
    {
      if ($.domain.includes("hdb-isv.isvjcloud.com") || $.domain.includes("jingyun-rc.isvjcloud.com")) {
        let liIiIII = [];
        for (let iIlI1iIi of $.prizeList || []) {
          liIiIII.push({
            "dayNum": iIlI1iIi.awardIndex,
            "giftName": $.getAwardText(iIlI1iIi),
            "giftType": iIlI1iIi.prizeType === "JD_MARKET" ? 6 : iIlI1iIi.prizeType === "JD_MARKET" ? 7 : 9,
            "giftTotal": iIlI1iIi.awardTotalQuantity
          });
        }
        $.prizeList = liIiIII;
      }
      for (let ili1Ill1 of $.prizeListShow || $.prizeList || []) {
        {
          if (ili1Ill1?.["insufficient"] === true) {
            {
              $.msg.push("    " + (ili1Ill1?.["dayNum"] || "每") + "天 " + ili1Ill1.giftName + " " + (!kv[ili1Ill1?.["giftType"]] ? ili1Ill1?.["giftType"] : "") + " " + ili1Ill1?.["giftTotal"] + "份 已发完");
              continue;
            }
          }
          $.msg.push("    " + (ili1Ill1?.["dayNum"] || "每") + "天 " + ili1Ill1.giftName + " " + (!kv[ili1Ill1?.["giftType"]] ? ili1Ill1?.["giftType"] : "") + " " + ili1Ill1?.["giftTotal"] + "份");
        }
      }
    }
  } catch (lliIi1l1) {
    console.log(lliIi1l1);
  }
  $.msg.push("export M_WX_SHOP_SIGN_URL=\"" + $.activityUrl + "\"");
};
async function sign() {
  try {
    {
      let li1II11 = await $.api("sign/" + ($.sevenDay ? "sevenDay/" : "") + "wx/signUp", "actId=" + $.activityId + "&pin=" + $.Pin);
      if (li1II11.isOk) {
        {
          $.putMsg("" + (li1II11?.["gift"]?.["giftName"] || li1II11?.["signResult"]?.["gift"]?.["giftName"] || "空气"));
          if (li1II11?.["needWriteAddress"] !== "y") {
            return 1;
          }
          $.addressId = li1II11.addressId;
          $.prizeName = li1II11?.["gift"]?.["giftName"] || li1II11?.["signResult"]?.["gift"]?.["giftName"];
          await $.saveAddress();
          $.isaddr = true;
          return 1;
        }
      } else {
        $.log(li1II11);
        li1II11.msg.includes("会员") ? $.prizeList.filter(l1iIi1l1 => ["6", "7"].includes(l1iIi1l1.giftType)).length > 0 && $.hasBeanOpenCard === 1 ? (await $.openCard(), await $.wait(1000, 2000), await sign()) : $.putMsg(li1II11.msg) : $.putMsg(li1II11.msg);
        await $.wxStop(li1II11.msg);
        return 1;
      }
    }
  } catch (i11iIi1l) {
    console.log(i11iIi1l);
  }
  return -1;
}