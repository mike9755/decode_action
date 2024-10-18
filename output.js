//Fri Oct 18 2024 14:57:55 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
$.limit = 0;
let maxLimit = "",
  everyLimit = "",
  luckLimitRule = "";
$.version = "v1.0.0";
class Task extends Env {
  constructor(IIi11lii) {
    super();
  }
  async ["getPrizeList"](IilI1lli) {
    $.jinggengTypes.includes($.domain) && ($.activityUrl.includes("loadBlindBox") ? $.prizeList = JSON.parse(IilI1lli("#jdEquityList").attr("value")) : $.prizeList = JSON.parse(IilI1lli("#awards", "body").text()));
    /(lzkj|cjhy)/.test($.domain) && !$.activityUrl.includes("activityType") && ($.prizeList = IilI1lli.data.content);
    if ($.hdbTypes.includes(this.domain)) {
      {
        let lll1iiI = await this.api("/front/activity/loadFrontAward", {});
        if (lll1iiI.succ) {
          this.super.prizeList = lll1iiI.result || [];
        } else this.log(lll1iiI.message);
      }
    }
    if ($.activityUrl.includes("activityType")) {
      let I11illl = await this.api("/api/prize/drawPrize", {});
      if (I11illl.resp_code !== 0) {
        {
          this.log("获取奖品是失败");
          return;
        }
      }
      !this.super.prizeList && this.log(I11illl.data?.["prizeInfo"]);
      this.super.prizeList = I11illl.data?.["prizeInfo"] || [];
    }
  }
  async ["exec"]() {
    if (!$.superVersion) throw new Error("请更新脚本");
    if (!$.activityId || !$.activityUrl) {
      {
        $.exit = true;
        this.putMsg("activityId|activityUrl不存在", $.activityUrl, $.activityId);
        return;
      }
    }
    if ($.limit === $.notLuckLimit) {
      {
        $.exit = true;
        this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
        return;
      }
    }
    let iI1l1ill = "showTaskDraw";
    if ($.activityUrl.includes("showDrawOne")) iI1l1ill = "showDrawOne";else $.activityUrl.includes("loadBlindBox") && (iI1l1ill = "loadBlindBox");
    let lI1iIiiI = await this.login({
      "fn": $.jinggengTypes.includes($.domain) ? "ql/front/" + iI1l1ill : "wuxian/user/getLottery/" + $.activityId
    });
    if ($.hdbTypes.includes($.domain)) {
      let I1i1i1l1 = "",
        lI1lIII = 5;
      if ($.activityUrl.includes("pointDraw")) I1i1i1l1 = "postPointDraw";else {
        {
          I1i1i1l1 = "postDraw";
          let II1Il1ii = await this.api("/front/task/showTaskList", {});
          for (let i11ii111 of II1Il1ii?.["result"]?.["taskList"]?.["filter"](IilIIiii => IilIIiii.isFinish === 0) || []) {
            await this.api("/front/task/completeActivityTask", {
              "conditionType": i11ii111.conditionType
            });
            await this.wait(5000, 6000);
          }
          var i1I1li1l = await this.api("/front/activity/getDrawTimes", {});
          i1I1li1l?.["succ"] && (lI1lIII = i1I1li1l?.["result"]?.["giveTimes"]);
        }
      }
      await this.wait(1000, 2000);
      if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
        {
          $.exit = true;
          this.putMsg("垃圾或领完");
          return;
        }
      }
      if (lI1lIII === 0) {
        $.limit++;
        this.putMsg("无抽奖次数");
        if ($.limit === $.notLuckLimit) {
          $.exit = true;
          this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
          return;
        }
      }
      for (let lll1il1I = 0; lll1il1I < lI1lIII; lll1il1I++) {
        let lil1i1I1 = await this.api("/front/activity/" + I1i1i1l1, {
          "drawTimes": 1
        });
        if (lil1i1I1.succ) {
          let I1IIiI1i = lil1i1I1.result;
          if (I1IIiI1i.succ) {
            {
              let II11iii1 = I1IIiI1i.dmAward.awardType;
              this.prizeName = await this.getAwardText(I1IIiI1i.dmAward);
              this.putMsg(this.prizeName);
              "JD_GOODS" === I1IIiI1i.dmAward.awardType && (this.addressId = I1IIiI1i.dmActivityLog.id, await this.saveAddress());
            }
          } else this.putMsg(lil1i1I1.message);
          break;
        } else {
          {
            this.putMsg(lil1i1I1.message.includes("您未中奖") ? "空气" : lil1i1I1.message);
            if (/(明天继续|空指针|上限|暂无抽奖次数|最大抽奖次数|积分不足|部分会员)/.test(lil1i1I1.message)) break;
            if (/(未开始|结束)/.test(lil1i1I1.message)) {
              {
                this.putMsg(lil1i1I1.message);
                $.exit = true;
                break;
              }
            }
          }
        }
        await this.wait(2000, 4000);
      }
      return;
    }
    if ($.jinggengTypes.includes($.domain)) {
      if ($.activityUrl.includes("loadBlindBox")) {
        {
          this.lotteryCount = lI1iIiiI("#times").text();
          const Ii1ilI11 = lI1iIiiI("#blindTask").attr("value");
          if (!Ii1ilI11) {
            this.putMsg("未知异常，请联系开发者");
            $.exit = true;
            return;
          }
          const i111lII = JSON.parse(Ii1ilI11),
            lIi1i1Il = i111lII.filter(IIi1IiIi => {
              const l11I1ll = IIi1IiIi.isFinish,
                l1lliilI = IIi1IiIi.taskType;
              if (["everyDay", "buy", "cartItem"].includes(l1lliilI) || l11I1ll === "1") return false;
              return true;
            });
          if (lIi1i1Il.length > 0) for (let liliIIl1 = 0; liliIIl1 < lIi1i1Il.length; liliIIl1++) {
            await this.wait(2000, 4000);
            const Ii1lII1i = lIi1i1Il[liliIIl1],
              ililll1 = Ii1lII1i.taskType,
              i1IIii = await this.api("ql/front/postDrawTimes", "userId=" + $.userId + "&actId=" + $.activityId + "&taskType=" + ililll1 + "&drawCountNumFlag=true");
            if (i1IIii.succ) {
              {
                const liilii11 = i1IIii.giveNum;
                this.lotteryCount += liilii11;
              }
            } else this.putMsg(i1IIii.msg);
          }
          if (this.lotteryCount <= 0) {
            {
              this.putMsg("无抽奖次数");
              $.limit++;
              if ($.limit === $.notLuckLimit) {
                $.exit = true;
                this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
                return;
              }
              return;
            }
          }
        }
      }
      debugger;
      let i1llIl1i = "postFrontTaskDraw";
      if ($.activityUrl.includes("showDrawOne")) i1llIl1i = "postFrontCheckDrawOne";else $.activityUrl.includes("loadBlindBox") && (i1llIl1i = "postBlindBox");
      let IiI11iI1 = 1;
      this.lotteryCount > 0 && (IiI11iI1 = this.lotteryCount);
      while (IiI11iI1 > 0) {
        try {
          {
            let i1iIl1l1 = await this.api("ql/front/" + i1llIl1i, "user_id=" + $.userId + "&act_id=" + $.activityId);
            if (i1iIl1l1.succ) {
              let llIi111i = JSON.parse(i1iIl1l1.msg);
              if (llIi111i.isSendSucc && llIi111i.drawAwardDto) {
                {
                  let llll1iii = llIi111i.drawAwardDto;
                  this.prizeName = await this.getAwardText(llIi111i.drawAwardDto);
                  this.putMsg(this.prizeName);
                  llll1iii.awardType === "JD_GOODS" && (this.addressId = llIi111i.actLogId, await this.saveAddress());
                }
              } else this.putMsg(i1iIl1l1.msg);
              IiI11iI1--;
            } else {
              const iIl1i1ll = i1iIl1l1.msg;
              await this.wxStop(iIl1i1ll);
              this.putMsg(iIl1i1ll);
              if (IiI11iI1 === 1 && iIl1i1ll?.["includes"]("积分不足")) {
                $.limit++;
                break;
              }
              if (iIl1i1ll.match(/只有部分会员才可以参加活动|已达上限|对不起您没有抽奖次数了/)) {
                break;
              }
              IiI11iI1--;
            }
          }
        } catch (iI1IIi1l) {
          {
            const lllI1lll = iI1IIi1l.message;
            this.log(lllI1lll);
            IiI11iI1--;
            if (IiI11iI1 === 0) {
              break;
            }
          }
        }
      }
      if ($.limit === $.notLuckLimit) {
        $.exit = true;
        this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
        return;
      }
      return;
    } else {
      if ($.activityUrl.includes("activityType")) {
        {
          if ($.blackLuckDrawRule && new RegExp("(" + $.blackLuckDrawRule + ")").test($.shopName)) {
            {
              $.exit = true;
              this.putMsg("垃圾或领完");
              return;
            }
          }
          let ll1liiil = await this.api("/api/task/jiugongge/activity", {});
          if (ll1liiil.resp_code !== 0) {
            this.putMsg("获取活动失败");
            this.putMsg(ll1liiil.resp_code + " " + ll1liiil.resp_msg);
            return;
          }
          await this.taskToDo(ll1liiil);
          if (["10026", "10080"].includes($.activityType)) {
            this.canDrawTimes = 2;
            let iII1iII = await this.api("/api/task/points/consumePoints", {});
            $.drawConsume = iII1iII.data.integral;
          } else {
            let IIil11II = await this.api("/api/prize/drawPrize", {});
            this.canDrawTimes = IIil11II.data?.["drawNumber"] || 0;
            this.canDrawTimes === 0 && ($.limit++, this.putMsg("无抽奖次数"));
            if ($.limit === $.notLuckLimit) {
              {
                $.exit = true;
                this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
                return;
              }
            }
          }
          for (let il1liii1 = 1; this.canDrawTimes--; il1liii1++) {
            {
              let Illi1 = await this.api("/api/prize/draw", {
                "consumePoints": $.drawConsume || 0
              });
              if (Illi1.data == "1") {
                {
                  this.putMsg("积分不足");
                  $.limit++;
                  if ($.limit === $.notLuckLimit) {
                    $.exit = true;
                    this.putMsg("垃圾或领完");
                    this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
                    return;
                  }
                  break;
                }
              }
              if (Illi1.resp_code == "0") {
                {
                  if (Illi1.data.dayTime == $.now("yyyy-MM-dd")) {
                    this.prizeName = Illi1.data.prizeName;
                    this.putMsg(this.prizeName);
                    Illi1.data.prizeType == 3 && (this.addressId = Illi1.data.addressId, await this.saveAddress());
                    Illi1.data.prizeType == 7 && this.putMsg(JSON.parse(Illi1.data?.["prizeJson"] || {})?.["cardNumber"] || "");
                  } else this.putMsg("空气");
                }
              } else this.putMsg(Illi1.resp_msg);
              $.limit = 0;
            }
          }
        }
      } else {
        if ($.domain.includes("gzsl-isv.isvjcloud.com")) {
          this.canDrawTimes = lI1iIiiI.leftTime || 0;
          if (this.canDrawTimes === 0) {
            $.limit++;
            this.putMsg("抽奖次数0");
            return;
          }
          $.limit = 0;
          await this.wait(1000, 3000);
          for (let liiiiI = 1; this.canDrawTimes--; liiiiI++) {
            await this.wait(3000, 5000);
            let iil1IilI = await this.api("wuxian/user/draw/" + $.activityId, {
              "id": $.activityId,
              "token": this.isvToken,
              "source": "01"
            });
            if (iil1IilI.status !== "1") {
              {
                if (["-2", "-8"].includes(iil1IilI.status)) {
                  {
                    this.putMsg(iil1IilI.msg);
                    break;
                  }
                }
                if (iil1IilI.status === "-14") {
                  if (liiiiI === 1) {
                    this.log(iil1IilI.msg);
                    await this.openCard();
                    continue;
                  }
                }
                if (liiiiI === 1 && iil1IilI.status === "-3") {
                  this.log("去关注");
                  await this.api("wuxian/user/flowShop/" + $.shopId + "/" + $.venderId, {
                    "shopId": $.shopId,
                    "source": "01",
                    "token": this.isvToken,
                    "venderId": $.venderId
                  });
                  continue;
                }
                if (/明天继续/.test(iil1IilI.msg)) break;
                this.putMsg(iil1IilI.msg);
              }
            }
            iil1IilI?.["winId"] ? (iil1IilI.data.source === "0" && this.canDrawTimes++, this.putMsg(iil1IilI.data.detail)) : this.putMsg("空气");
          }
        } else {
          let lI1liIii = "wxDrawActivity";
          $.activityType === 26 && (lI1liIii = "wxPointDrawActivity");
          if ($.activityType === 124) {
            lI1liIii = "wxScratchActive";
          }
          $.activityType === 128 && (lI1liIii = "wxGashaponActive");
          $.activityType === 125 && (lI1liIii = "wxPointBlindBox");
          $.activityType === 129 && (lI1liIii = "wxDollGrabbing");
          let ililii = await this.api(lI1liIii + "/activityContent", "activityId=" + $.activityId + "&pin=" + this.Pin);
          if (!ililii.result || !ililii.data) {
            this.putMsg(ililii?.["errorMessage"]);
            return;
          }
          let lIl11IlI = ililii.data.needFollow,
            IlIiiIl1 = ililii.data.hasFollow;
          lIl11IlI && !IlIiiIl1 && (await this.api("wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&buyerPin=" + this.Pin + "&activityType=" + $.activityType + "&activityId=" + $.activityId));
          $.rule = ililii.data.rule;
          let iIll1IIi = $.rule.split("\n");
          if (!luckLimitRule) {
            let Il1iII11 = 0;
            for (let ili1l of iIll1IIi) {
              (ili1l.includes("抽奖机会") || ili1l.includes("每人每天")) && (Il1iII11 = 1);
              Il1iII11 > 0 && Il1iII11 < 3 && (luckLimitRule += ili1l + "\n", Il1iII11++);
            }
            maxLimit = $.match(/累计抽奖(不超过)?(\d+)次/, $.rule)?.[1];
            everyLimit = $.match(/每天最多抽奖(\d+)次/, $.rule);
          }
          $.actName = ililii.data.drawConsume ? "积分抽奖" : "幸运抽奖";
          $.drawConsume = ililii.data.drawConsume || 0;
          $.actStartTime = ililii.data?.["startTime"];
          $.actEndTime = ililii.data?.["endTime"];
          await this.checkActivity(ililii);
          if ([26, 124, 125, 128, 129].includes($.activityType) && this.isMaster()) {
            if ($.notLuckDrawList && new RegExp("(" + $.notLuckDrawList + ")").test($.shopName) && $.formatDate($.actStartTime, "yyyy-MM-dd") !== $.formatDate(Date.now(), "yyyy-MM-dd")) {
              this.putMsg("已屏蔽");
              return;
            }
          }
          if (![26, 124, 125, 128, 129].includes($.activityType)) {
            let liIIilIl = await this.api("wxDrawActivity/getGiveContent", "activityId=" + $.activityId + "&pin=" + this.Pin),
              I1Iill1i = liIIilIl.data.follow,
              llIl1ll = liIIilIl.data.share;
            if (liIIilIl?.["result"]) try {
              if (I1Iill1i && liIIilIl.data.follow.hasFollowTimes < liIIilIl.data.follow.followTimes) {
                $.log("做关注任务");
                let IiilIilI = liIIilIl.data.follow.followTimes - liIIilIl.data.follow.hasFollowTimes;
                for (let iIliIIIi = 0; iIliIIIi < IiilIilI; iIliIIIi++) {
                  let i1iI1 = liIIilIl.data.follow.skuIdsList[iIliIIIi],
                    Il1lIl1l = await this.api("wxDrawActivity/follow", "activityId=" + $.activityId + "&pin=" + this.Pin + "&skuId=" + i1iI1);
                  if (!Il1lIl1l.result) break;
                }
              }
              if (llIl1ll && liIIilIl.data.share.hasShareTimes < liIIilIl.data.share.shareTimes) {
                {
                  $.log("做分享任务");
                  let iiI1l1Ii = liIIilIl.data.share.shareTimes - liIIilIl.data.share.hasShareTimes;
                  for (let IIIIi1ll = 0; IIIIi1ll < iiI1l1Ii; IIIIi1ll++) {
                    let I1ii1111 = await this.api("wxDrawActivity/shareSuccess", "activityId=" + $.activityId + "&pin=" + this.Pin);
                    if (I1ii1111?.["result"]) break;
                  }
                }
              }
              (I1Iill1i || llIl1ll) && (ililii = await this.api(lI1liIii + "/activityContent", "activityId=" + $.activityId + "&pin=" + this.Pin));
            } catch (II1IIIl1) {
              this.log(II1IIIl1);
            } else this.putMsg("获取任务列表失败");
          }
          let liII1l1 = ililii.data.canDrawTimes || 0;
          $.canDrawTimes = liII1l1;
          liII1l1 === 0 && !ililii.data.drawConsume && ($.limit++, this.putMsg("无抽奖次数"));
          if ($.limit === $.notLuckLimit) {
            $.exit = true;
            this.putMsg("设置了前" + $.notLuckLimit + "不能抽奖跳出");
            return;
          }
          if (liII1l1 === 0 && !ililii.data.drawConsume) {
            return;
          }
          $.limit = 0;
          if ([26, 124, 125, 128, 129].includes($.activityType)) {
            let iIiI1iil = await this.api("common/joinConfig/check", "venderId=" + $.venderId + "&pin=" + this.Pin + "&activityType=" + $.activityType + "&activityId=" + $.activityId);
            iIiI1iil?.["data"]?.["follow"] === 0 && (await this.api("wxActionCommon/newFollowShop", "venderId=" + $.venderId + "&buyerPin=" + this.Pin + "&activityType=" + $.activityType + "&activityId=" + $.activityId));
          }
          liII1l1 = Math.min(liII1l1 || 1, 5);
          for (let i1l1lIl = 1; liII1l1--; i1l1lIl++) {
            {
              let li1IIiII = await this.api(lI1liIii + "/start", "activityId=" + $.activityId + "&pin=" + this.Pin);
              if (li1IIiII.result) {
                {
                  liII1l1 = li1IIiII.data.canDrawTimes;
                  if (li1IIiII.data.drawOk) this.prizeName = li1IIiII.data.name, this.putMsg(this.prizeName), li1IIiII.data.drawInfoType === 7 && li1IIiII.data.needWriteAddress === "y" && li1IIiII.data.addressId && (this.addressId = li1IIiII.data.addressId, await this.saveAddress());else {
                    this.putMsg("空气");
                  }
                }
              } else {
                {
                  if (li1IIiII.errorMessage.includes("当前不在活动可兑换时间内") || li1IIiII.errorMessage.includes("活动未开始,或已结束")) {
                    if ($.timestamp() > $.parseDate($.match(/至 (\d+-\d+-\d+ \d+:\d+)/, $.rule) + ":00")) {
                      {
                        this.putMsg("活动已结束");
                        $.exit = true;
                        return;
                      }
                    }
                    if ($.parseDate($.match(/(\d+-\d+-\d+ \d+:\d+) 至/, $.strTime) + ":00") > $.timestamp()) {
                      {
                        this.putMsg("未开始");
                        $.exit = true;
                        return;
                      }
                    }
                    this.putMsg("" + li1IIiII.errorMessage);
                    $.exit = true;
                    return;
                  }
                  this.putMsg("" + li1IIiII.errorMessage);
                  await this.wxStop(li1IIiII.errorMessage);
                  break;
                }
              }
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
      if (maxLimit) {
        $.msg.push("    抽奖次数:每天最多" + everyLimit + "次,累计最大" + maxLimit + "次");
        $.msg.push("" + luckLimitRule);
        try {
          $.actStartTime && $.timestamp() > addDays(typeof $.actStartTime === "string" ? $.parseDate($.actStartTime).getTime() : $.actStartTime, Math.floor(maxLimit / everyLimit)).getTime() && $.msg.push("    已超过最大抽奖次数");
        } catch (IllliiIi) {}
      }
      $.rule.includes("初次赠送抽奖机会 0 次") && $.msg.push("    已超过最大抽奖次数,初次赠送抽奖机会用完");
      $.rule.includes("初次赠送抽奖机会 1 次") && $.timestamp() > $.parseDate($.actStartTime).getTime() && $.msg.push("    已超过最大抽奖次数,初次赠送抽奖机会用完");
      try {
        {
          if ($.actStartTime) {
            const li11i1li = $.checkDrawTimes($.rule, $.actStartTime, /每人每天最多抽奖(\d+)次，活动期间每人累计抽奖(不超过)?(\d+)次/);
            if (!li11i1li) {
              $.msg.push("智能判断，已超过最大抽奖次数");
            }
          }
        }
      } catch (IlllIl1) {
        console.log(IlllIl1);
      }
      [26, 124, 125, 128, 129].includes($.activityType) && $.msg.push("    花费" + $.drawConsume + "积分/次");
      if ($.hdbTypes.includes($.domain)) for (let iliI111 of $.prizeList || []) {
        $.msg.push("    " + (await $.getAwardText(iliI111)));
      }
      for (let i11il11I of $.prizeList) {
        {
          if ($.domain.includes("loreal") || $.domain.includes("lzbk") || $.domain.includes("lzkj") || $.domain.includes("cjhy")) {
            {
              if ($.activityUrl.includes("activityType")) {
                $.msg.push("    " + i11il11I.prizeName + " 剩" + i11il11I.leftNum + "份");
              } else {
                if (i11il11I.name.includes("谢谢") || i11il11I.name.includes("再来")) {
                  continue;
                }
                $.msg.push("    " + i11il11I.name + "    " + i11il11I.priceInfo + "元  " + (i11il11I?.["type"] === 8 ? "专享价" : ""));
              }
            }
          } else {
            {
              if ($.domain.includes("jinggeng")) {
                if (i11il11I.equityName.includes("谢谢") || i11il11I.equityName.includes("再来")) continue;
                $.msg.push("    " + i11il11I.equityName + " 共" + i11il11I.availableQuantity + "/" + i11il11I.freezeQuantity + "份");
              }
              $.domain.includes("gzsl-isv.isvjcloud.com") && $.msg.push("    " + (i11il11I.detail.includes("自定义奖品") ? i11il11I.name : i11il11I.detail));
            }
          }
        }
      }
    }
  } catch (li11iIll) {
    console.log(li11iIll);
  }
  $.msg.push("export M_WX_LUCK_DRAW_URL=\"" + $.activityUrl + "\"");
};
$.checkDrawTimes = function (Il1i1l1, IilliIiI, Iiii111l) {
  const ililIii = new RegExp(Iiii111l),
    I1iliiil = Il1i1l1.match(ililIii);
  if (I1iliiil) {
    const I11IilI = +I1iliiil[1],
      IilliIII = +I1iliiil[3],
      iII1IIi = $.now("yyyy-MM-dd HH:mm:ss"),
      lIlII1lI = differenceInDays(new Date(iII1IIi.split(" ")[0]), new Date(IilliIiI.split(" ")[0])),
      iIliiili = lIlII1lI - 1;
    if (iIliiili * I11IilI - 1 > IilliIII) return false;
  }
  return true;
};
$.start(Task);