//Mon Aug 24 2026 11:09:00 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.limit = 0;
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let IlIi1i11 = await $.isvObfuscator();
  if (IlIi1i11.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = IlIi1i11?.["token"];
  if (["10079"].includes($.activityType)) {
    {
      await $.login();
      let IIi1iI11 = {
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "Connection": "keep-alive",
          "user-agent": $.UA,
          "Referer": $.activityUrl,
          "token": $.Token
        },
        i1iIliil = "https://" + $.domain + $.urlPrefix + "/api/pointsExchange/activity",
        I11lIIll = await $.get(i1iIliil, IIi1iI11);
      if (I11lIIll.resp_code !== 0) {
        {
          $.putMsg("获取奖品失败");
          return;
        }
      }
      $.prizeList = I11lIIll.data.pointsExchangePrizeVos || [];
      let IiIIlIil = $.prizeList.filter(liIllI1 => liIllI1.stock !== 0);
      if (IiIIlIil.length === 0) {
        {
          $.putMsg("垃圾或领完");
          $.expire = true;
          return;
        }
      }
      let lilIl11l = I11lIIll.data.myPoints;
      $.putMsg(lilIl11l + "积分");
      let Il1I1Ii1 = $.prizeList.filter(l1i1lI1l => lilIl11l >= l1i1lI1l.num);
      if (lilIl11l < $.prizeList[0].num) {
        $.putMsg("积分不足");
        return;
      }
      let ili1Illl = $.addressIndex;
      for (let l1lIllll of Il1I1Ii1.reverse()) {
        {
          $.addressIndex = ili1Illl;
          let Ii1ili11 = await $.api("/api/pointsExchange/exchange", {
            "prizeInfoId": l1lIllll.prizeInfoId,
            "status": 1
          });
          if (Ii1ili11.data?.["result"]) {
            {
              $.prizeName = Ii1ili11.data.prizeName;
              lilIl11l -= l1lIllll.num;
              Il1I1Ii1 = $.prizeList.filter(i1IllIi1 => lilIl11l >= i1IllIi1.num);
              $.putMsg($.prizeName);
              Ii1ili11.data.prizeType === 3 && ($.addressId = Ii1ili11.data.addressId, await $.saveAddress());
            }
          }
        }
      }
      $.addressIndex++;
      return;
    }
  }
  if ($.domain.includes("jinggeng")) {
    {
      let Ii1i1I1 = await $.api("front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
      if (!Ii1i1I1.succ) {
        $.putMsg("setMixNick失败");
        return;
      }
      let III1ll1I = await $.api("ql/front/exchangeActDetail", "actId=" + $.activityId + "&userId=" + $.userId);
      const IlIII1ii = cheerio.load(cheerio.load(III1ll1I).html());
      if (III1ll1I.indexOf("活动已结束") !== -1) {
        {
          $.putMsg("活动已结束");
          $.expire = true;
          return;
        }
      }
      $.shopId = IlIII1ii("#shop_sid", "body").attr("value");
      $.venderId = IlIII1ii("#vender_id", "body").attr("value");
      $.shopName = IlIII1ii("#shop_title", "body").attr("value");
      $.activityType = IlIII1ii("#actType", "body").attr("value");
      $.rule = IlIII1ii("#description", "body").text();
      $.startTime = $.parseDate($.match(/(\d+-\d+-\d+ \d+:\d+:\d+)-/, $.rule)).getTime();
      $.actTimeStr = $.match(/(\d+-\d+-\d+ \d+:\d+:\d+-\d+-\d+-\d+ \d+:\d+:\d)/, $.rule);
      if ($.activityType === "JD_GOODS" || $.activityType === "JD_COUPON" || $.activityType === "JD_POINTTOBUY") {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
      if ($.timestamp() < $.startTime) {
        {
          $.expire = true;
          $.putMsg("未开始");
          return;
        }
      }
      let Iil1IiIi = $.rule.match(/(?<=每人可兑换)\d{1,2}/)[0] || "1";
      for (i = 0; i < Iil1IiIi; i++) {
        try {
          {
            let Il1II1ii = await $.api("ql/front/postQlExchange", "act_id=" + $.activityId + "&user_id=" + $.userId);
            if (Il1II1ii.succ) {
              let I1iiili = JSON.parse(Il1II1ii.msg);
              if (I1iiili.isSendSucc && I1iiili.drawAwardDto) {
                let lliIil1 = $.getAwardText(I1iiili.drawAwardDto);
                $.putMsg(lliIil1);
                if ($.activityType === "JD_GOODS") {
                  $.prizeName = lliIil1;
                  $.addressId = I1iiili.actLogId;
                  await $.saveAddress();
                }
              } else {
                $.putMsg(Il1II1ii.msg);
                break;
              }
            } else {
              await $.wxStop(Il1II1ii.msg);
              if (Il1II1ii.msg.includes("点的太快")) {
                {
                  Iil1IiIi++;
                  await $.wait(2000, 4000);
                  continue;
                }
              }
              if (Il1II1ii.msg.includes("奖品已经兑完了")) {
                {
                  $.putMsg(Il1II1ii.msg);
                  $.expire = true;
                  return;
                }
              } else {
                $.putMsg(Il1II1ii.msg);
                break;
              }
            }
            await $.wait(2000, 4000);
          }
        } catch (I11I1l) {
          $.log(I11I1l);
        }
      }
      return;
    }
  }
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  $.shopName = (await $.getShopInfo())?.["shopName"] || "未知";
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let iiI1iI1l = await $.api("mc/wxPointShop/getBuyerPoints", "venderId=" + $.venderId + "&buyerPin=" + $.Pin);
  $.beansLevel = parseInt(iiI1iI1l.data?.["grade"] || "1");
  $.buyerPoints = parseInt(iiI1iI1l.data?.["buyerPoints"] || "0");
  $.putMsg("等级" + $.beansLevel + "," + $.buyerPoints + "积分");
  if ($.buyerPoints <= 0) {
    $.putMsg("没有积分");
    $.limit++;
    $.limit >= $.masterNum && $.putMsg("屏蔽兑换");
    return;
  }
  if ($.beansLevel === 1 && $.needPoint && $.buyerPoints < $.needPoint) {
    $.putMsg("需要" + $.needPoint + "积分");
    ++$.limit >= $.masterNum && $.putMsg("屏蔽兑换");
    return;
  }
  let i11ll1lI;
  if ($.activityUrl.includes("pointExgECard")) i11ll1lI = await $.api("mc/equity/selectEquityForC", "giftId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + $.Pin);else {
    if ($.activityUrl.includes("pointExgHb")) i11ll1lI = await $.api("mc/hb/selectHbForC", "giftId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + $.Pin);else {
      if ($.activityUrl.includes("pointExgShiWu")) {
        for (let li1liIl1 of $.notPointDrawList) {
          $.shopName.includes(li1liIl1) && ($.expire = true, $.putMsg("已屏蔽"));
        }
        i11ll1lI = await $.api("mc/shiWu/selectShiWu", "giftId=" + $.activityId + "&venderId=" + $.venderId);
      } else {
        if ($.activityUrl.includes("pointExgBeans")) {
          if ($.shopName.includes("同仁堂")) {
            $.expire = true;
            $.putMsg("已屏蔽");
          }
          i11ll1lI = await $.api("mc/beans/selectBeansForC", "giftId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + $.Pin + "&beansLevel=" + $.beansLevel);
        }
      }
    }
  }
  if (!i11ll1lI.result) {
    $.putMsg(i11ll1lI?.["errorMessage"]);
    return;
  }
  $.rule = i11ll1lI.data?.["mcGiftBaseInfo"]?.["actrule"] || i11ll1lI.data.actrule;
  $.actTimeStr = $.match(/(\d{4}(-\d{2}){2}(\s\d{2}(:\d{2}){1,2})[\s\S]*至[\s\S]*\d{4}(-\d{2}){2}(\s\d{2}(:\d{2}){1,2}))/, $.rule)[0] || "长期";
  $.timeLimit = JSON.parse(i11ll1lI.data?.["mcConfig"]?.["timeLimitJson"] || "[]");
  $.giftName = "";
  if ($.activityUrl.includes("pointExgShiWu")) {
    {
      $.rule = i11ll1lI.data.mcGiftBaseInfo.actrule;
      $.upTime = i11ll1lI.data.mcGiftBaseInfo.upTime;
      $.downTime = i11ll1lI.data.mcGiftBaseInfo.downTime;
      $.giftName = i11ll1lI.data.mcGiftBaseInfo.giftName;
      $.mcShiWu = i11ll1lI.data.mcShiWu;
      $.num = i11ll1lI.data.mcGiftBaseInfo.num === i11ll1lI.data.mcGiftBaseInfo.usedNum;
      $.needPoint = i11ll1lI.data.mcGiftBaseInfo["point" + $.beansLevel];
      if ($.needPoint === null) {
        {
          $.putMsg("等级不符");
          $.index === 2 ? $.expire = true : "";
          return;
        }
      }
    }
  } else {
    {
      $.rule = i11ll1lI.data.actrule;
      $.upTime = i11ll1lI.data.upTime;
      $.downTime = i11ll1lI.data.downTime;
      $.num = i11ll1lI.data.num === i11ll1lI.data.usedNum;
      $.needPoint = i11ll1lI.data["point" + $.beansLevel];
      $.giftName = i11ll1lI.data.giftName;
      if ($.needPoint === null) {
        {
          $.putMsg("等级不符");
          $.index === 2 ? $.expire = true : "";
          return;
        }
      }
      i11ll1lI.data.beansLevelCount > 0 && ($.needPoint = i11ll1lI.data["point" + $.beansLevel] * i11ll1lI.data.beansLevelCount);
    }
  }
  if ($.needPoint > $.buyerPoints) {
    {
      $.putMsg("需要" + $.needPoint + "积分");
      $.limit++;
      return;
    }
  }
  if ($.expire) {
    return;
  }
  if ($.num) {
    $.expire = true;
    $.putMsg("明日再来");
    return;
  }
  for (let iI1Iiiii of $.notPointDrawGiftNameList) {
    {
      if ($.giftName.includes(iI1Iiiii)) {
        this.expire = true;
        $.putMsg("屏蔽兑换");
        return;
      }
    }
  }
  if ($.timestamp() >= $.downTime) {
    $.expire = true;
    $.putMsg("活动已结束");
    return;
  }
  if ($.timestamp() < $.upTime) {
    $.expire = true;
    $.putMsg("活动未开始");
    return;
  }
  if ($.activityUrl.includes("pointExgHb")) {
    {
      let i1ll = await $.api("mc/wxPointShop/exgHB", "giftId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + $.Pin);
      console.log(i1ll);
      $.putMsg("" + (i1ll.errorMessage || "兑换成功"));
      return;
    }
  }
  if ($.activityUrl.includes("pointExgECard")) {
    {
      let lil11ii1 = await $.api("/mc/wxPointShop/exgECard", "giftId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + $.Pin + "&buyerNick=" + encodeURIComponent($.nickname));
      console.log(lil11ii1);
      $.putMsg("" + (lil11ii1.errorMessage || "兑换成功"));
      return;
    }
  }
  if ($.activityUrl.includes("pointExgShiWu")) {
    {
      let iiIIllii = await $.api("mc/wxPointShop/selectAddressList", "venderId=" + $.venderId + "&buyerPin=" + $.Pin);
      if (iiIIllii.ok && iiIIllii.count >= 1) for (let i1iIiI1i of iiIIllii.data) {
        let llIllIIi = await $.api("mc/wxPointShop/deleteAddress", "venderId=" + $.venderId + "&buyerPin=" + $.Pin + "&addressId=" + i1iIiI1i.addressId);
        console.log(llIllIIi);
      }
      if ($.addressIndex > $.accountAddressList.length) {
        $.addressIndex = 1;
      }
      let ll1liIii = $.accounts[$.username]?.["address"];
      if (!ll1liIii) {
        $.putMsg("没有配置地址信息");
        return;
      }
      let IiI1i1l = await $.api("/mc/wxPointShop/saveAddress", "buyerPin=" + $.Pin + "&venderId=" + $.venderId + "&receiver=" + encodeURIComponent(ll1liIii.receiver) + "&receiverPhone=" + ll1liIii.phone + "&province=" + encodeURIComponent(ll1liIii.province) + "&city=" + encodeURIComponent(ll1liIii.city) + "&county=" + encodeURIComponent(ll1liIii.county) + "&address=" + encodeURIComponent(ll1liIii.address));
      IiI1i1l.result && IiI1i1l.data ? ($.addressId = IiI1i1l.data.addressId, $.putMsg("已填地址")) : $.putMsg("" + (IiI1i1l.errorMessage || "未知原因"));
      console.log(IiI1i1l);
      let iiIIllIl = 0;
      while (iiIIllIl < 10) {
        {
          iiIIllIl++;
          let Il11ilii = await $.api("/mc/wxPointShop/exgShiWu", "buyerPin=" + $.Pin + "&buyerNick=" + encodeURIComponent($.nickname) + "&giftId=" + $.activityId + "&venderId=" + $.venderId + "&addressId=" + $.addressId);
          if (Il11ilii.result) {
            $.putMsg("兑换成功");
            await fs.appendFileSync("gifts.csv", $.now() + "," + $.giftName + "," + $.shopName + "," + $.username + "," + ll1liIii.phone + "," + ll1liIii.address + "," + $.name + "," + $.activityUrl + "\n");
            break;
          }
          if (Il11ilii.errorMessage.includes("火爆")) continue;
          if (Il11ilii.errorMessage.includes("未到每天兑换时间")) {
            $.putMsg("未到每天兑换时间");
            $.expire = true;
            break;
          }
          if (Il11ilii.errorMessage.includes("请明日再来") || Il11ilii.errorMessage.includes("请明天再来")) {
            $.putMsg("请明日再来");
            $.expire = true;
            break;
          }
          if (Il11ilii.errorMessage.includes("积分不足") || Il11ilii.errorMessage.includes("等级不符")) {
            {
              $.index === 2 ? $.expire = true : "";
              $.putMsg("" + Il11ilii.errorMessage);
              break;
            }
          }
          if (await $.wxStop(Il11ilii.errorMessage)) {
            $.putMsg("" + Il11ilii.errorMessage);
            break;
          }
        }
      }
      return;
    }
  }
  $.exgBeanNum = parseInt($.buyerPoints / i11ll1lI.data["point" + $.beansLevel]);
  if (i11ll1lI.data.canExgByPeopDay && $.exgBeanNum > i11ll1lI.data.canExgByPeopDay) $.exgBeanNum = i11ll1lI.data.canExgByPeopDay;else {
    {
      if (!$.beansLevelCount) {
        {
          $.beansLevelCount = i11ll1lI.data.beansLevelCount;
          if ($.exgBeanNum < $.beansLevelCount) {
            $.putMsg("积分不足0");
            $.index === 2 ? $.expire = true : "";
            return;
          }
          $.exgBeanNum = i11ll1lI.data.beansLevelCount === 0 ? $.exgBeanNum : i11ll1lI.data.beansLevelCount;
        }
      }
    }
  }
  if ($.exgBeanNum <= 0) {
    {
      $.putMsg("积分不足1");
      $.index === 2 ? $.expire = true : "";
      return;
    }
  }
  let lli1iI1 = 0;
  while (lli1iI1 < 10) {
    {
      lli1iI1++;
      let ilI1liiI = await $.api("mc/wxPointShop/exgBeans", "buyerPin=" + $.Pin + "&buyerNick=&giftId=" + $.activityId + "&venderId=" + $.venderId + "&beansLevel=" + $.beansLevel + "&exgBeanNum=" + $.exgBeanNum);
      if (ilI1liiI.result) {
        $.putMsg($.exgBeanNum + "京豆");
        break;
      }
      if (ilI1liiI.errorMessage.includes("火爆")) continue;
      if (ilI1liiI.errorMessage.includes("积分不足") || ilI1liiI.errorMessage.includes("每人每日兑换最大上限") || ilI1liiI.errorMessage.includes("等级不符")) {
        {
          $.putMsg("" + ilI1liiI.errorMessage);
          break;
        }
      }
      if (await $.wxStop(ilI1liiI.errorMessage)) {
        {
          $.putMsg("" + ilI1liiI.errorMessage);
          break;
        }
      }
    }
  }
};
$.after = async function () {
  try {
    {
      if ($.domain.includes("jinggeng")) $.msg.push("\n" + ($.rule || "\n未知"));else {
        if ($.activityUrl.includes("pointExgShiWu")) {
          $.mcShiWu?.["takeBeginTime"] ? $.msg.push("    兑换时间:" + ($.mcShiWu?.["takeBeginTime"] || "") + "，每天:" + ($.mcShiWu?.["dayNum"] || "") + "件") : "";
        }
      }
      for (let ilIiiiil of $.timeLimit || []) {
        ilIiiiil.timeLimitStartDay === $.formatDateTime(new Date(), "yyyy-MM-dd") && $.msg.push("    兑换时间:" + (ilIiiiil.timeLimitStartTime || ""));
      }
      for (let ill1III of $.timeLimit || []) {
        $.msg.push("    " + ill1III.timeLimitStartDay + "至" + ill1III.timeLimitEndDay);
        $.msg.push("    " + ill1III.timeLimitStartTime + "至" + ill1III.timeLimitEndTime + "  " + ill1III.timeLimitNum + "份");
      }
      if ($.giftName) $.msg.push("    " + ($.giftName || "") + " 库存:" + $.num);else for (let lIliIii of $.prizeList) {
        $.msg.push("    " + lIliIii.prizeName + " 库存:" + lIliIii.stock + " 需要:" + lIliIii.num);
      }
    }
  } catch (lIIIlili) {
    console.log(lIIIlili);
  }
  $.msg.push($.rule);
  $.msg.push("export M_WX_POINT_DRAW_URL=\"" + $.activityUrl + "\"");
};