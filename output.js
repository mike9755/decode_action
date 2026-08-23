//Sun Aug 23 2026 23:20:51 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let activityTypes = ["10020", "10021", "10026", "10031", "10042", "10046", "10062", "10063", "10073", "10080"];
process.env.M_WX_LUCK_ACTIVITY_TYPES ? process.env.M_WX_LUCK_ACTIVITY_TYPES.split(/[@,&|]/).forEach(ll1II1Ii => activityTypes.push(ll1II1Ii)) : "";
$.limit = 0;
let maxLimit = "",
  everyLimit = "",
  luckLimitRule = "";
$.version = "v1.6.0";
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在", $.activityUrl, $.activityId);
    return;
  }
  if ($.limit === $.notLuckLimit) {
    this.expire = true;
    $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
    return;
  }
  $.UA = $.ua();
  let I1Ii1IIi = await $.isvObfuscator();
  if (I1Ii1IIi.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = I1Ii1IIi?.["token"];
  if ($.hdbTypes.includes($.domain)) {
    {
      await $.login();
      let lIIi1I1I = "",
        I1iIii1I = 5;
      if ($.activityUrl.includes("pointDraw")) lIIi1I1I = "postPointDraw";else {
        lIIi1I1I = "postDraw";
        let ili1iiIi = await $.api("/front/task/showTaskList", {});
        for (let iii1i1il of ili1iiIi?.["result"]?.["taskList"]?.["filter"](lIIllii1 => lIIllii1.isFinish === 0) || []) {
          await $.api("/front/task/completeActivityTask", {
            "conditionType": iii1i1il.conditionType
          });
          await $.wait(5000, 6000);
        }
        var il11IIII = await $.api("/front/activity/getDrawTimes", {});
        il11IIII?.["succ"] && (I1iIii1I = il11IIII?.["result"]?.["giveTimes"]);
      }
      await $.wait(1000, 2000);
      if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
        this.expire = true;
        $.putMsg("垃圾或领完");
        return;
      }
      if (I1iIii1I === 0) {
        {
          $.limit++;
          $.putMsg("无抽奖次数");
          if ($.limit === $.notLuckLimit) {
            this.expire = true;
            $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
            return;
          }
        }
      }
      for (let iIil1l1I = 0; iIil1l1I < I1iIii1I; iIil1l1I++) {
        let lI11lIi1 = await $.api("/front/activity/" + lIIi1I1I, {
          "drawTimes": 1
        });
        if (lI11lIi1.succ) {
          {
            let llI1IIiI = lI11lIi1.result;
            if (llI1IIiI.succ) {
              let Ii1lllii = llI1IIiI.dmAward.awardType;
              $.prizeName = this.getAwardText(llI1IIiI.dmAward);
              $.putMsg($.prizeName);
              "JD_GOODS" === llI1IIiI.dmAward.awardType && ($.addressId = llI1IIiI.dmActivityLog.id, await $.saveAddress());
            } else {
              $.putMsg(lI11lIi1.message);
            }
            break;
          }
        } else {
          {
            $.putMsg(lI11lIi1.message.includes("您未中奖") ? "空气" : lI11lIi1.message);
            if (/(明天继续|空指针|上限|暂无抽奖次数|最大抽奖次数|积分不足|部分会员)/.test(lI11lIi1.message)) {
              break;
            }
            if (/(未开始|结束)/.test(lI11lIi1.message)) {
              {
                $.putMsg(lI11lIi1.message);
                $.expire = true;
                break;
              }
            }
          }
        }
        await $.wait(2000, 4000);
      }
      return;
    }
  }
  if ($.jinggengTypes.includes($.domain)) {
    await $.wait(1000, 2000);
    let ii1III1i = await $.api("front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
    if (!ii1III1i.succ) {
      {
        $.putMsg("setMixNick失败");
        return;
      }
    }
    let ll1iilII = "showTaskDraw";
    if ($.activityUrl.includes("showDrawOne")) ll1iilII = "showDrawOne";else {
      if ($.activityUrl.includes("loadBlindBox")) {
        ll1iilII = "loadBlindBox";
      }
    }
    let ilI1i1l = await $.api("ql/front/" + ll1iilII, "id=" + $.activityId + "&user_id=" + $.userId);
    const Ili1iil = cheerio.load(cheerio.load(ilI1i1l).html());
    $.shopId = Ili1iil("#shop_sid", "body").attr("value");
    $.venderId = Ili1iil("#vender_id", "body").attr("value");
    $.shopName = Ili1iil("#shop_title", "body").attr("value");
    $.activityType = Ili1iil("#actType", "body").attr("value");
    if ($.activityUrl.includes("loadBlindBox")) {
      $.lotteryCount = +Ili1iil("#times").text();
      if (ilI1i1l.match(/活动已结束/)) {
        $.putMsg("活动已结束");
        $.expire = true;
        return;
      }
      const il11iIiI = Ili1iil("#blindTask").attr("value");
      if (!il11iIiI) {
        {
          $.putMsg("未知异常，请联系开发者");
          $.expire = true;
          return;
        }
      }
      const IlIIIlII = JSON.parse(il11iIiI),
        IIlIlIIl = IlIIIlII.filter(iill11lI => {
          {
            const i11lilii = iill11lI.isFinish,
              i1i1l111 = iill11lI.taskType;
            if (["everyDay", "buy", "cartItem"].includes(i1i1l111) || i11lilii === "1") return false;
            return true;
          }
        });
      if (IIlIlIIl.length > 0) for (let Il11I1i = 0; Il11I1i < IIlIlIIl.length; Il11I1i++) {
        await $.wait(2000, 4000);
        const Ii1I1I = IIlIlIIl[Il11I1i],
          I1I1iIii = Ii1I1I.taskType,
          I1l1IiII = await $.api("ql/front/postDrawTimes", "userId=" + $.userId + "&actId=" + $.activityId + "&taskType=" + I1I1iIii + "&drawCountNumFlag=true");
        if (I1l1IiII.succ) {
          const ii1IlllI = I1l1IiII.giveNum;
          $.lotteryCount += ii1IlllI;
        } else $.putMsg(I1l1IiII.msg);
      }
      if ($.lotteryCount <= 0) {
        {
          $.putMsg("无抽奖次数");
          $.limit++;
          if ($.limit === $.notLuckLimit) {
            this.expire = true;
            $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
            return;
          }
          return;
        }
      }
      $.prizeList = JSON.parse(Ili1iil("#jdEquityList").attr("value"));
    } else $.prizeList = JSON.parse(Ili1iil("#awards", "body").text());
    debugger;
    const lIiilIll = $.prizeList.filter(IilIlIII => !["JD_COUPON"].includes(IilIlIII.equityType) && IilIlIII.availableQuantity > 0);
    $.rule = Ili1iil("#description", "body").text();
    await $.getRuleSETime($.rule);
    if (lIiilIll.length === 0) {
      {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
    }
    if ($.actStartTime > Date.now()) {
      $.putMsg("活动未开始");
      $.expire = true;
      return;
    }
    if ($.actEndTime < Date.now()) {
      $.putMsg("活动已结束");
      $.expire = true;
      return;
    }
    if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
      {
        this.expire = true;
        $.putMsg("垃圾或领完");
        return;
      }
    }
    ll1iilII = "postFrontTaskDraw";
    if ($.activityUrl.includes("showDrawOne")) {
      ll1iilII = "postFrontCheckDrawOne";
    } else $.activityUrl.includes("loadBlindBox") && (ll1iilII = "postBlindBox");
    let llIIlI1I = 1;
    $.lotteryCount > 0 && (llIIlI1I = $.lotteryCount);
    while (llIIlI1I > 0) {
      try {
        {
          let ill1llII = await $.api("ql/front/" + ll1iilII, "user_id=" + $.userId + "&act_id=" + $.activityId);
          if (ill1llII.succ) {
            let iIil1IlI = JSON.parse(ill1llII.msg);
            if (iIil1IlI.isSendSucc && iIil1IlI.drawAwardDto) {
              let lll11i1I = iIil1IlI.drawAwardDto,
                lli1liIl = $.getAwardText(iIil1IlI.drawAwardDto);
              $.putMsg(lli1liIl);
              lll11i1I.awardType === "JD_GOODS" && ($.addressId = iIil1IlI.actLogId, $.prizeName = lli1liIl, await $.saveAddress());
            } else $.putMsg(ill1llII.msg);
            llIIlI1I--;
          } else {
            const lII1IlIl = ill1llII.msg;
            await $.wxStop(lII1IlIl);
            $.putMsg(lII1IlIl);
            if (llIIlI1I === 1 && lII1IlIl?.["includes"]("积分不足")) {
              $.limit++;
              break;
            }
            if (lII1IlIl.match(/只有部分会员才可以参加活动|对不起您没有抽奖次数了/)) break;
            llIIlI1I--;
          }
        }
      } catch (i11illI) {
        const i11lii = i11illI.message;
        console.log(i11lii);
        llIIlI1I--;
        if (llIIlI1I === 0) {
          break;
        }
      }
    }
    if ($.limit === $.notLuckLimit) {
      this.expire = true;
      $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
      return;
    }
  } else {
    if (activityTypes.includes($.activityType)) {
      await $.login();
      if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
        this.expire = true;
        $.putMsg("垃圾或领完");
        return;
      }
      let iil1llll = await $.api("/api/task/jiugongge/activity", {});
      if (iil1llll.resp_code !== 0) {
        $.putMsg("获取活动失败");
        $.putMsg(iil1llll.resp_code + " " + iil1llll.resp_msg);
        return;
      }
      $.skuList = [];
      await $.taskToDo(iil1llll);
      if (["10026", "10080"].includes($.activityType)) {
        {
          $.canDrawTimes = 2;
          let iilIiiii = await $.api("/api/task/points/consumePoints", {});
          $.consumePoints = iilIiiii.data.integral;
        }
      } else {
        {
          let I1ilI1lI = await $.api("/api/prize/drawPrize", {});
          $.canDrawTimes = I1ilI1lI.data?.["drawNumber"] || 0;
          $.canDrawTimes === 0 && ($.limit++, $.putMsg("无抽奖次数"));
          if ($.limit === $.notLuckLimit) {
            this.expire = true;
            $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
            return;
          }
        }
      }
      for (let iiIi1IiI = 1; $.canDrawTimes--; iiIi1IiI++) {
        let Iil1i1l1 = await $.api("/api/prize/draw", {
          "consumePoints": $.consumePoints || 0
        });
        if (Iil1i1l1.data == "1") {
          $.putMsg("积分不足");
          $.limit++;
          if ($.limit === $.notLuckLimit) {
            this.expire = true;
            $.putMsg("垃圾或领完");
            $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
            return;
          }
          break;
        }
        if (Iil1i1l1.resp_code == "0") {
          Iil1i1l1.data.dayTime == $.now("yyyy-MM-dd") ? ($.putMsg(Iil1i1l1.data.prizeName), Iil1i1l1.data.prizeType == 3 && ($.addressId = Iil1i1l1.data.addressId, $.prizeName = Iil1i1l1.data.prizeName, await $.saveAddress()), Iil1i1l1.data.prizeType == 7 && $.putMsg(JSON.parse(Iil1i1l1.data?.["prizeJson"] || {})?.["cardNumber"] || "")) : $.putMsg("空气");
        } else {
          $.putMsg(Iil1i1l1.resp_msg);
        }
        $.limit = 0;
      }
    } else {
      if ($.domain.includes("gzsl-isv.isvjcloud.com")) {
        {
          let iIllI1 = await $.api("wuxian/user/getLottery/" + $.activityId, {
            "id": $.activityId,
            "token": $.Token,
            "source": "01"
          });
          if (iIllI1.status !== "1") {
            {
              $.putMsg("活动已结束");
              $.expire = true;
              await $.wxStop(iIllI1.msg);
              return;
            }
          }
          $.shopName = iIllI1.activity.shopName;
          $.venderId = iIllI1.activity.venderId || iIllI1.activity.shopId;
          $.shopId = iIllI1.activity.shopId;
          $.activityType = iIllI1.activity.activityType;
          $.prizeList = iIllI1.activity.prizes;
          $.actStartTime = iIllI1.activity.startTime;
          $.actEndTime = iIllI1.activity.endTime;
          if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
            {
              this.expire = true;
              $.putMsg("垃圾或领完");
              return;
            }
          }
          if ($.actStartTime > $.timestamp()) {
            {
              $.putMsg("活动未开始");
              $.expire = true;
              return;
            }
          }
          if ($.actEndTime < $.timestamp()) {
            {
              $.putMsg("活动已结束");
              $.expire = true;
              return;
            }
          }
          let Il1ill1 = $.prizeList.filter(lII1Iill => ["1", "3", "4"].includes(lII1Iill.source));
          if (Il1ill1.length === 0) {
            {
              $.putMsg("垃圾或领完");
              $.expire = true;
              return;
            }
          }
          $.canDrawTimes = iIllI1.leftTime || 0;
          $.canDrawTimes === 0 ? $.limit++ : $.limit = 0;
          if ($.canDrawTimes === 0) {
            {
              $.putMsg("抽奖次数0");
              return;
            }
          }
          await $.wait(1000, 3000);
          for (let l1li1l = 1; $.canDrawTimes--; l1li1l++) {
            await $.wait(3000, 5000);
            let liii1ii1 = await $.api("wuxian/user/draw/" + $.activityId, {
              "id": $.activityId,
              "token": $.Token,
              "source": "01"
            });
            if (liii1ii1.status !== "1") {
              if (["-2", "-8"].includes(liii1ii1.status)) {
                this.putMsg(liii1ii1.msg);
                break;
              }
              if (liii1ii1.status === "-14") {
                {
                  $.putMsg("开卡入会后参与活动");
                  await $.complete();
                  break;
                }
              }
              if (l1li1l === 1 && liii1ii1.status === "-3") {
                $.log("去关注");
                await $.api("wuxian/user/flowShop/" + $.shopId + "/" + $.shopId, {
                  "shopId": $.shopId,
                  "source": "01",
                  "token": $.Token,
                  "venderId": $.shopId
                });
                $.canDrawTimes++;
                continue;
              }
              if (/明天继续/.test(liii1ii1.msg)) {
                break;
              }
              $.putMsg(liii1ii1.msg);
              continue;
            }
            liii1ii1?.["winId"] ? (liii1ii1.data.source === "0" && $.canDrawTimes++, $.putMsg(liii1ii1.data.detail)) : $.putMsg("空气");
          }
        }
      } else {
        {
          await $.getSimpleActInfoVo();
          if ($.expire) {
            return;
          }
          await $.getMyPing();
          if (!$.Pin) {
            return;
          }
          $.shopName = await $.getShopName();
          await $.accessLog();
          let I1iiiIil = "wxDrawActivity";
          if ($.activityType === 26) {
            I1iiiIil = "wxPointDrawActivity";
          }
          $.activityType === 124 && (I1iiiIil = "wxScratchActive");
          $.activityType === 128 && (I1iiiIil = "wxGashaponActive");
          if ($.activityType === 125) {
            I1iiiIil = "wxPointBlindBox";
          }
          $.activityType === 129 && (I1iiiIil = "wxDollGrabbing");
          let iii1lIli = await $.api(I1iiiIil + "/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
          if (!iii1lIli.result || !iii1lIli.data) {
            $.putMsg(iii1lIli?.["errorMessage"]);
            return;
          }
          $.hasFollow = iii1lIli.data.hasFollow;
          $.needFollow = iii1lIli.data.needFollow;
          $.prizeList = iii1lIli.data.content;
          $.rule = iii1lIli.data.rule;
          let I1i111l = $.rule.split("\n");
          if (!luckLimitRule) {
            {
              let IIiii111 = 0;
              for (let I11i11i of I1i111l) {
                if (I11i11i.includes("抽奖机会") || I11i11i.includes("每人每天")) {
                  IIiii111 = 1;
                }
                IIiii111 > 0 && IIiii111 < 3 && (luckLimitRule += I11i11i + "\n", IIiii111++);
              }
              maxLimit = $.match(/累计抽奖(不超过)?(\d+)次/, $.rule)?.[1];
              everyLimit = $.match(/每天最多抽奖(\d+)次/, $.rule);
            }
          }
          $.actName = iii1lIli.data.drawConsume ? "积分抽奖" : "幸运抽奖";
          $.drawConsume = iii1lIli.data.drawConsume || 0;
          $.actStartTime = iii1lIli.data?.["startTime"];
          $.actEndTime = iii1lIli.data?.["endTime"];
          await $.getRuleSETime($.rule);
          if ($.prizeList.filter(lIilli1l => [6, 7, 13, 14, 15, 16].includes(lIilli1l.type)).length === 0) {
            {
              $.putMsg("垃圾或领完");
              this.expire = true;
              return;
            }
          }
          if ($.actStartTime && $.actStartTime > $.timestamp()) {
            {
              this.expire = true;
              $.putMsg("活动未开始");
              return;
            }
          }
          if ($.actEndTime && $.actEndTime < $.timestamp()) {
            this.expire = true;
            $.putMsg("活动已结束");
            return;
          }
          if ([26, 124, 125, 128, 129].includes($.activityType)) {
            if ($.notLuckDrawList && new RegExp("(" + $.notLuckDrawList + ")").test($.shopName) && $.formatDate($.actStartTime, "yyyy-MM-dd") !== $.formatDate(Date.now(), "yyyy-MM-dd") && !process?.["argv"][1]?.["includes"]("hand")) {
              {
                $.expire = true;
                $.putMsg("已屏蔽");
                return;
              }
            }
          }
          if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
            {
              this.expire = true;
              $.putMsg("垃圾或领完");
              return;
            }
          }
          if (![26, 124, 125, 128, 129].includes($.activityType)) {
            let i1IIlli = await $.api("wxDrawActivity/getGiveContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
            $.follow = i1IIlli.data.follow;
            $.share = i1IIlli.data.share;
            if (i1IIlli?.["result"]) {
              try {
                {
                  if ($.follow && i1IIlli.data.follow.hasFollowTimes < i1IIlli.data.follow.followTimes) {
                    {
                      $.log("做关注任务");
                      let iIl11llI = i1IIlli.data.follow.followTimes - i1IIlli.data.follow.hasFollowTimes;
                      for (let l111lili = 0; l111lili < iIl11llI; l111lili++) {
                        {
                          let IIiI1I1i = i1IIlli.data.follow.skuIdsList[l111lili],
                            iI1liIii = await $.api("wxDrawActivity/follow", "activityId=" + $.activityId + "&pin=" + $.Pin + "&skuId=" + IIiI1I1i);
                          if (!iI1liIii.result) {
                            break;
                          }
                        }
                      }
                    }
                  }
                  if ($.share && i1IIlli.data.share.hasShareTimes < i1IIlli.data.share.shareTimes) {
                    $.log("做分享任务");
                    let i111iI1l = i1IIlli.data.share.shareTimes - i1IIlli.data.share.hasShareTimes;
                    for (let il1iI1Ii = 0; il1iI1Ii < i111iI1l; il1iI1Ii++) {
                      {
                        let IIllI1ll = await $.api("wxDrawActivity/shareSuccess", "activityId=" + $.activityId + "&pin=" + $.Pin);
                        if (IIllI1ll?.["result"]) break;
                      }
                    }
                  }
                  if ($.follow || $.share) {
                    iii1lIli = await $.api(I1iiiIil + "/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
                  }
                }
              } catch (II1ilIli) {
                $.log(II1ilIli);
              }
            } else $.putMsg("获取任务列表失败");
          }
          $.canDrawTimes = iii1lIli.data.canDrawTimes || 0;
          $.canDrawTimes === 0 && ($.limit++, $.putMsg("无抽奖次数"));
          if ($.limit === $.notLuckLimit) {
            {
              this.expire = true;
              $.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
              return;
            }
          }
          if ([26, 124, 125, 128, 129].includes($.activityType)) {
            let lIIi1II1 = await this.api("common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + $.Pin + "&activityType=" + this.activityType + "&activityId=" + this.activityId);
            if (lIIi1II1?.["data"]?.["openCard"] === 0) {
              $.putMsg("需要开卡跳过");
              $.needOpenCard = true;
              return;
            }
            if (lIIi1II1?.["data"]?.["follow"] === 0) {
              let Il1li1 = await this.api("wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&buyerPin=" + $.Pin + "&activityType=" + this.activityType + "&activityId=" + this.activityId);
            }
          }
          $.canDrawTimes = Math.min($.canDrawTimes, 5);
          for (let liIll = 1; $.canDrawTimes--; liIll++) {
            $.limit = 0;
            let iiilIli = await $.api(I1iiiIil + "/start", "activityId=" + $.activityId + "&pin=" + $.Pin);
            if (iiilIli.result) {
              {
                $.canDrawTimes = iiilIli.data.canDrawTimes;
                if (iiilIli.data.drawOk) {
                  $.putMsg(iiilIli.data.name);
                  iiilIli.data.drawInfoType === 7 && iiilIli.data.needWriteAddress === "y" && iiilIli.data.addressId && ($.addressId = iiilIli.data.addressId, $.prizeName = iiilIli.data.name, await $.saveAddress());
                } else $.putMsg("空气");
              }
            } else {
              {
                if (iiilIli.errorMessage.includes("当前不在活动可兑换时间内") || iiilIli.errorMessage.includes("活动未开始,或已结束")) {
                  {
                    if ($.timestamp() > $.parseDate($.match(/至 (\d+-\d+-\d+ \d+:\d+)/, $.rule) + ":00")) {
                      $.putMsg("活动已结束");
                      this.expire = true;
                      return;
                    }
                    if ($.parseDate($.match(/(\d+-\d+-\d+ \d+:\d+) 至/, $.strTime) + ":00") > $.timestamp()) {
                      $.putMsg("未开始");
                      this.expire = true;
                      return;
                    }
                    $.putMsg("" + iiilIli.errorMessage);
                    this.expire = true;
                    return;
                  }
                }
                $.putMsg("" + iiilIli.errorMessage);
                await $.wxStop(iiilIli.errorMessage);
                break;
              }
            }
            if (!$.shopName.includes("蓝月亮")) {
              {
                if (Number($.canDrawTimes) <= 0 || liIll >= 5) {
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
};
$.after = async function () {
  try {
    {
      if (maxLimit) {
        $.msg.push("    抽奖次数:每天最多" + everyLimit + "次,累计最大" + maxLimit + "次");
        $.msg.push("" + luckLimitRule);
        try {
          {
            if ($.actStartTime && $.timestamp() > addDays(typeof $.actStartTime === "string" ? $.parseDate($.actStartTime).getTime() : $.actStartTime, Math.floor(maxLimit / everyLimit)).getTime()) {
              $.msg.push("    已超过最大抽奖次数");
            }
          }
        } catch (lliI11il) {}
      }
      $.rule.includes("初次赠送抽奖机会 0 次") && $.msg.push("    已超过最大抽奖次数,初次赠送抽奖机会用完");
      if ($.rule.includes("初次赠送抽奖机会 1 次") && $.timestamp() > $.parseDate($.actStartTime).getTime()) {
        $.msg.push("    已超过最大抽奖次数,初次赠送抽奖机会用完");
      }
      try {
        {
          if ($.actStartTime) {
            {
              const iIlIl1il = $.checkDrawTimes($.rule, $.actStartTime, /每人每天最多抽奖(\d+)次，活动期间每人累计抽奖(不超过)?(\d+)次/);
              !iIlIl1il && $.msg.push("智能判断，已超过最大抽奖次数");
            }
          }
        }
      } catch (lil1lil1) {
        console.log(lil1lil1);
      }
      if ($.jinggengTypes.includes($.domain)) {} else [26, 124, 125, 128, 129].includes($.activityType) && $.msg.push("    花费" + $.drawConsume + "积分/次");
      if ($.hdbTypes.includes($.domain)) for (let iIliiI of $.prizeList || []) {
        $.msg.push("    " + $.getAwardText(iIliiI));
      }
      for (let lilIlIl1 of $.prizeList || []) {
        {
          if ($.domain.includes("loreal") || $.domain.includes("lzbk") || $.domain.includes("lzkj") || $.domain.includes("cjhy")) {
            if (activityTypes.includes($.activityType)) $.msg.push("    " + lilIlIl1.prizeName + " 剩" + lilIlIl1.leftNum + "份");else {
              if (lilIlIl1.name.includes("谢谢") || lilIlIl1.name.includes("再来")) {
                continue;
              }
              $.msg.push("    " + lilIlIl1.name + "    " + lilIlIl1.priceInfo + "元  " + (lilIlIl1?.["type"] === 8 ? "专享价" : ""));
            }
          } else {
            {
              if ($.domain.includes("jinggeng")) {
                {
                  if (lilIlIl1.equityName.includes("谢谢") || lilIlIl1.equityName.includes("再来")) continue;
                  $.msg.push("    " + lilIlIl1.equityName + " 共" + lilIlIl1.availableQuantity + "/" + lilIlIl1.freezeQuantity + "份");
                }
              }
              if ($.domain.includes("gzsl-isv.isvjcloud.com")) {
                $.msg.push("    " + (lilIlIl1.detail.includes("自定义奖品") ? lilIlIl1.name : lilIlIl1.detail));
              }
            }
          }
        }
      }
    }
  } catch (I1iIIiIl) {
    console.log(I1iIIiIl);
  }
  $.msg.push("export M_WX_LUCK_DRAW_URL=\"" + $.activityUrl + "\"");
};
$.checkDrawTimes = function (lIIlI1Il, IlI1ll11, illiI1i) {
  const I1I1I1Il = new RegExp(illiI1i),
    l11iII11 = lIIlI1Il.match(I1I1I1Il);
  if (l11iII11) {
    const iI1ilIIi = +l11iII11[1],
      lIlIli1 = +l11iII11[3],
      Ili1lil1 = $.now("yyyy-MM-dd HH:mm:ss"),
      Ill11Iil = differenceInDays(new Date(Ili1lil1.split(" ")[0]), new Date(IlI1ll11.split(" ")[0])),
      liIIilii = Ill11Iil - 1;
    if (liIIilii * iI1ilIIi - 1 > lIlIli1) {
      return false;
    }
  }
  return true;
};