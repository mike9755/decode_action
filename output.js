//Sun Aug 23 2026 23:11:22 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let Appid = "jdchoujiang_h5";
$.notSend = true;
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl|path不存在");
    return;
  }
  $.UA = $.ua();
  if ($.activityUrl.match(/(mall\/active)/)?.["length"] > 0) {
    $.activityCode = $.activityId;
    debugger;
    let Il1i1i11 = getUrl("memberBringActPage", {
        "code": $.activityCode,
        "invitePin": $.invitePin || "",
        "_t": $.timestamp()
      }),
      lilIili = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-Hans-US;q=1,en-US;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Cookie": $.cookie,
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA
      },
      {
        data: IliilIII
      } = await $.request(Il1i1i11, lilIili);
    $.activityName = IliilIII.data.inviteFloor;
    $.shopId = IliilIII.data.shopId;
    $.shopName = IliilIII.data.shopName;
    $.venderId = IliilIII.data.venderId;
    $.actStartTime = IliilIII.data.beginTime;
    $.actEndTime = IliilIII.data.endTime;
    $.prizeList = IliilIII.data.rewards;
    debugger;
  } else {
    if ($.activityUrl.includes("activityType=")) {
      await $.isvObfuscator();
      await $.login();
    } else {
      {
        await $.isvObfuscator();
        await $.getSimpleActInfoVo();
        await $.getMyPing();
        await $.accessLog();
        if ($.activityUrl.match(/(wxTeam)/)?.["length"] > 0) {
          let IIl = await $.api("wxTeam/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&signUuid=" + ($.signUuid || ""));
          if (!IIl.result || !IIl.data) {
            $.putMsg(IIl.errorMessage);
            return;
          }
          $.activityName = "组队瓜分";
          $.actStartTime = IIl.data.active.startTime;
          $.actEndTime = IIl.data.active.endTime;
          let i1illi1i = IIl.data.active.prizeType,
            II11iilI = IIl.data.active.sendNumbers + "京豆";
          $.rule = IIl.data.active.rule;
          $.prizeList = i1illi1i === 6 ? [{
            "type": i1illi1i,
            "name": II11iilI
          }] : [];
          debugger;
        } else {
          if ($.activityUrl.match(/(wxShopGift)/)?.["length"] > 0) {
            let lIiiIil1 = await $.api("wxShopGift/activityContent", "activityId=" + $.activityId + "&buyerPin=" + $.Pin);
            if (!lIiiIil1.result || !lIiiIil1.data) {
              $.putMsg(lIiiIil1.errorMessage);
              await $.wxStop(lIiiIil1.errorMessage);
              return;
            }
            $.actStartTime = lIiiIil1.data || "";
            $.actEndTime = lIiiIil1.data || "";
            $.activityName = "无线关注";
            $.rule = lIiiIil1.data.rule;
            $.prizeList = lIiiIil1.data.list;
            debugger;
          } else {
            if ($.activityUrl.match(/(wxSecond)/)?.["length"] > 0) {
              {
                let Ii1llI1I = await $.api("wxSecond/getData", "activityId=" + $.activityId + "&pin=" + $.Pin + "&shareUuid=&activityStatus=");
                if (!Ii1llI1I.result || !Ii1llI1I.data) {
                  {
                    $.putMsg(Ii1llI1I.errorMessage);
                    await $.wxStop(Ii1llI1I.errorMessage);
                    return;
                  }
                }
                let Il1l1IlI = Ii1llI1I.data.secondActive;
                $.activityName = "读秒手速";
                $.actStartTime = Il1l1IlI.startTime || "";
                $.actEndTime = Il1l1IlI.endTime || "";
                $.rule = Ii1llI1I.data.rule;
                $.prizeList = Ii1llI1I.data.prizeList;
                debugger;
              }
            } else {
              if ($.activityUrl.match(/(wxKnowledgeActivity)/)?.["length"] > 0) {
                let lii1lI1I = await $.api("/wxKnowledgeActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
                if (!lii1lI1I.result || !lii1lI1I.data) {
                  $.putMsg(lii1lI1I.errorMessage);
                  return;
                }
                $.actStartTime = lii1lI1I.data.startTime || "";
                $.actEndTime = lii1lI1I.data.endTime || "";
                $.activityName = "知识超人";
                $.rule = lii1lI1I.data.rule;
                $.prizeList = lii1lI1I.data.drawContentVOs;
                debugger;
              } else {
                if ($.activityUrl.match(/(wxGameActivity)/)?.["length"] > 0) {
                  let llillli1 = await $.api("wxGameActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
                  if (!llillli1.result || !llillli1.data) {
                    await $.wxStop(llillli1.errorMessage);
                    return;
                  }
                  $.actStartTime = llillli1.data.startTime || "";
                  $.actEndTime = llillli1.data.endTime || "";
                  $.rule = llillli1.data.rule;
                  $.activityName = "无线游戏";
                  $.prizeList = llillli1.data.drawContentVOs;
                  debugger;
                } else {
                  if ($.activityUrl.match(/(wxShopFollowActivity)/)?.["length"] > 0) {
                    {
                      let IlIilll1 = await $.api("wxShopFollowActivity/activityContentOnly", "activityId=" + $.activityId + "&pin=" + $.Pin);
                      if (!IlIilll1.result || !IlIilll1.data) {
                        {
                          $.putMsg(IlIilll1.errorMessage);
                          return;
                        }
                      }
                      $.activityName = "关注抽奖";
                      $.rule = IlIilll1.data.rule;
                      $.actStartTime = IlIilll1.data.startTime;
                      $.actEndTime = IlIilll1.data.endTime;
                      $.prizeList = IlIilll1.data.drawContentVOs || [];
                      debugger;
                    }
                  } else {
                    if ($.activityUrl.match(/(wxgame)/)?.["length"] > 0) {
                      {
                        let II11i11I = await $.api("wxgame/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + ($.shareId || ""));
                        if (!II11i11I.result || !II11i11I.data) {
                          {
                            $.putMsg(II11i11I.errorMessage);
                            return;
                          }
                        }
                        $.activityName = "打豆豆";
                        $.rule = II11i11I.data.actRule;
                        $.prizeList = II11i11I.data.drawContentList;
                        debugger;
                      }
                    } else {
                      if ($.activityUrl.match(/(drawCenter)/)?.["length"] > 0) {
                        {
                          debugger;
                          let lIIIil11 = await $.api("drawCenter/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
                          if (!lIIIil11.result || !lIIIil11.data) {
                            $.putMsg(lIIIil11.errorMessage);
                            return;
                          }
                          $.rule = lIIIil11.data.actRule;
                          $.actStartTime = lIIIil11.data.startTime;
                          $.actEndTime = lIIIil11.data.endTime;
                          $.activityName = "老虎机抽奖";
                          let llIl1lii = await $.api("drawCenter/getPrizeList", "activityId=" + $.activityId + "&activityType=" + $.activityType + "&venderId=" + $.venderId);
                          $.prizeList = llIl1lii.data;
                          debugger;
                        }
                      } else {
                        if ($.activityUrl.match(/(wxCollectionActivity)/)?.["length"] > 0) {
                          debugger;
                          let iiIiiI11 = await $.api("wxCollectionActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin),
                            l1li11ii = iiIiiI11.data;
                          if (!iiIiiI11.result || !l1li11ii) {
                            $.putMsg(iiIiiI11.errorMessage);
                            return;
                          }
                          $.rule = l1li11ii.rule;
                          $.activityName = "加购有礼";
                          $.actStartTime = l1li11ii.startTime;
                          $.actEndTime = l1li11ii.endTime;
                          $.prizeList = [iiIiiI11.data.drawInfo.drawInfo];
                        } else {
                          if ($.activityUrl.match(/(lzclient|wxDrawActivity)/)?.["length"] > 0) {
                            {
                              let l1Illl1l = "wxDrawActivity";
                              $.activityType === 26 && (l1Illl1l = "wxPointDrawActivity");
                              $.activityType === 124 && (l1Illl1l = "wxScratchActive");
                              $.activityType === 128 && (l1Illl1l = "wxGashaponActive");
                              if ($.activityType === 125) {
                                l1Illl1l = "wxPointBlindBox";
                              }
                              $.activityType === 129 && (l1Illl1l = "wxDollGrabbing");
                              let lIlIIlII = await $.api(l1Illl1l + "/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
                              if (!lIlIIlII.result || !lIlIIlII.data) {
                                {
                                  $.putMsg(lIlIIlII?.["errorMessage"]);
                                  return;
                                }
                              }
                              $.needPoint = lIlIIlII.data.drawConsume || 0;
                              $.activityName = lIlIIlII.data.drawConsume ? "积分抽奖" : "幸运抽奖";
                              $.actStartTime = lIlIIlII.data?.["startTime"];
                              $.actEndTime = lIlIIlII.data?.["endTime"];
                              $.prizeList = lIlIIlII.data.content;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  await $.getRuleSETime($.rule);
  if ($.actStartTime && $.actStartTime > $.timestamp()) {
    this.expire = true;
    $.putMsg("活动未开始");
    return;
  }
  $.actEndTime && $.actEndTime < $.timestamp() && (this.expire = true, $.putMsg("活动已结束"));
};
$.after = async function () {
  if ($.msg.filter(iIlllIl1 => iIlllIl1.includes("结束")).length === 0) {
    {
      if ($.activityUrl.match(/(mall\/active)/)?.["length"] > 0) {
        debugger;
        for (let IlI1lll of $.prizeList.filter(il11l1li => [1].includes(il11l1li.rewardType))) {
          $.msg.push("  " + IlI1lll.rewardName + " 剩" + IlI1lll.rewardStock + "份");
          $.notSend = false;
        }
      } else {
        if ($.activityUrl.includes("activityType=")) {
          for (let I11li1i of $.prizeList.filter(Iliiill => [1, 3, 6, 8, 9, 10].includes(Iliiill.prizeType))) {
            $.msg.push("  " + I11li1i.prizeName + " 剩" + I11li1i.leftNum + "份");
            $.notSend = false;
          }
        } else {
          debugger;
          for (let IliliIil of $.prizeList.filter(il1il1ll => [6, 7].includes(il1il1ll.type))) {
            $.msg.push("  " + IliliIil.name);
            $.notSend = false;
          }
        }
      }
      $.msg.push("活动ID:" + $.activityId);
      $.activityName && $.msg.push("活动名称:🚩【#" + $.activityName + "】 " + ($.needPoint ? $.needPoint + "分/次" : ""));
      $.msg.push("\"" + $.activityUrl + "\"");
    }
  }
};
function getUrl(Ilili1iI, llil1I1i) {
  return "https://api.m.jd.com/api?client=&clientVersion=&appid=" + Appid + "&t=" + $.timestamp() + "&functionId=" + Ilili1iI + "&body=" + encodeURIComponent(JSON.stringify(llil1I1i)) + "&openid=-1&code=" + $.activityCode + "&invitePin=" + ($.invitePin || "");
}