//Sun Aug 23 2026 23:08:58 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.activityUrl = $.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, $.activityUrl);
$.activityType = $.getQueryString($.activityUrl, "activityType") || "";
$.domain = $.match(/https?:\/\/([^/]+)/, $.activityUrl);
$.activityId = $.getActivityId();
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let II1l1i = await $.isvObfuscator();
  if (II1l1i.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = II1l1i?.["token"];
  if (["10036"].includes($.activityType)) {
    await $.login();
    let l11iI1i1 = await $.api("/api/task/bargain/guest/myself", {
        "shareUserId": ""
      }),
      iIII1lil = await $.api("/api/task/addSkuPrice/activity", {
        "shareUserId": ""
      }),
      l1Ii1iii = await $.api("/api/task/addSkuPrice/activity1", {}),
      lIlII1ll = await $.api("/api/task/addSkuPrice/activity2", {}),
      il1lIlll = await $.api("/api/task/share/getUserId", {}),
      i1liI1lI = [];
    for (let liiIil1I of lIlII1ll.data.skuInfoList) {
      lIlII1ll.resp_code == 0 && i1liI1lI.push({
        "skuId": liiIil1I.skuId
      });
    }
    $.actStartTime = lIlII1ll.data.addSkuStartTime;
    $.actEndTime = lIlII1ll.data.addSkuEndTime;
    $.drawTime = lIlII1ll.data.priceTime;
    $.totals = lIlII1ll.data.skuNumber;
    $.open = $.timestamp() > $.drawTime;
    $.drawTime = $.formatDate($.drawTime, "yyyy-MM-dd HH:mm:ss");
    if ($.open) {
      {
        let liI111I1 = await $.api("/api/task/addSkuPrice/draw", {});
        if (liI111I1?.["data"]) {
          if (liI111I1?.["data"]["draw"]) {
            $.putMsg(liI111I1?.["data"]["draw"]["prizeName"]);
            liI111I1?.["data"]["draw"]["prizeType"] == 3 && liI111I1?.["data"]["draw"]["dayTime"] == $.now("yyyy-MM-dd") && ($.addressId = liI111I1?.["data"]["draw"]["addressId"], $.prizeName = liI111I1?.["data"]["draw"]["prizeName"], await $.saveAddress());
          } else $.putMsg("空气");
        } else $.putMsg(liI111I1.errorMessage), await $.wxStop(liI111I1.errorMessage);
        return;
      }
    }
    if (lIlII1ll.data.addSkuNumber !== lIlII1ll.data.skuNumber) {
      {
        let liIiiII1 = await $.api("/api/task/addSkuPrice/addSku", {
          "skuId": "999"
        });
        if (liIiiII1.resp_msg.includes("仅限店铺会员")) {
          {
            if (openCardMode === 4) {
              await $.openCard();
              await $.wait(1000, 2000);
              let II11Iiii = await $.api("/api/task/addSkuPrice/addSku", {
                "skuId": "999"
              });
              $.putMsg(II11Iiii.resp_msg || "已完成加购");
              await $.wxStop(II11Iiii.resp_msg);
            } else {
              if ($.prizeList.filter(Iiilii => Iiilii.prizeType === 1 || Iiilii.prizeType === 3)?.["length"] > 0 && openCardMode === 3) {
                await $.openCard();
                await $.wait(1000, 2000);
                let lli11lii = await $.api("/api/task/addSkuPrice/addSku", {
                  "skuId": "999"
                });
                $.putMsg(lli11lii.resp_msg || "已完成加购");
                await $.wxStop(lli11lii.resp_msg);
              } else {
                if ($.prizeList.filter(lilI11Ii => lilI11Ii.prizeType === 3)?.["length"] > 0 && openCardMode === 2) {
                  {
                    await $.openCard();
                    await $.wait(1000, 2000);
                    let Ill1liiI = await $.api("/api/task/addSkuPrice/addSku", {
                      "skuId": "999"
                    });
                    $.putMsg(Ill1liiI.resp_msg || "已完成加购");
                    await $.wxStop(Ill1liiI.resp_msg);
                  }
                } else {
                  if ($.prizeList.filter(illI1IiI => illI1IiI.prizeType === 3)?.["length"] > 0 && openCardMode === 1) {
                    await $.openCard();
                    await $.wait(1000, 2000);
                    let illl = await $.api("/api/task/addSkuPrice/addSku", {
                      "skuId": "999"
                    });
                    $.putMsg(illl.resp_msg || "已完成加购");
                    await $.wxStop(illl.resp_msg);
                  } else $.putMsg(liIiiII1.resp_msg || "已完成加购"), await $.wxStop(liIiiII1.resp_msg);
                }
              }
            }
          }
        }
        if (liIiiII1.resp_msg.includes("时间已过")) {
          {
            $.putMsg(liIiiII1.resp_msg);
            this.expire = true;
            return;
          }
        } else $.putMsg(liIiiII1.resp_msg || "已完成加购"), await $.wxStop(liIiiII1.resp_msg);
      }
    } else {
      $.putMsg("已完成加购");
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
      await $.accessLog();
      let iiIIiiil = await $.api("wxActionCommon/getUserInfo", "pin=" + $.Pin);
      if (!iiIIiiil.result || !iiIIiiil.data) {
        {
          $.putMsg("获取getUserInfo失败");
          return;
        }
      }
      $.attrTouXiang = iiIIiiil.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
      let II1l111l = await $.api("wxCartKoi/cartkoi/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&status=1&friendUuid=\"\"&yunMidImageUrl=" + $.attrTouXiang);
      if (!II1l111l.result || !II1l111l.data) {
        $.putMsg(II1l111l.errorMessage);
        return;
      }
      let IiII1iiI = [];
      for (let l11Ii11l of II1l111l.data.prodectVos) {
        if (l11Ii11l.collection === false) {
          IiII1iiI.push(l11Ii11l.productId);
        }
      }
      let ilIllI1I = II1l111l.data?.["activityVo"] || {};
      $.actStartTime = ilIllI1I.cartStartTime;
      $.actEndTime = ilIllI1I.cartEndTime;
      $.drawTime = ilIllI1I.drawTime;
      $.totals = II1l111l.data.totals;
      $.open = $.timestamp() > $.parseDate($.drawTime).getTime();
      $.prizeList = (await $.api("wxCartKoi/cartkoi/getDrawPrizeInfo", "activityId=" + $.activityId))?.["data"];
      if ($.prizeList.filter(lIIililI => [6, 7, 9, 13, 14, 15, 16].includes(lIIililI.type)).length === 0) {
        $.putMsg("垃圾或领完");
        this.expire = true;
        return;
      }
      if ($.open) {
        let il1iI1ll = await $.api("wxCartKoi/cartkoi/drawResult", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + II1l111l.data.joinRecord.myUuid);
        il1iI1ll?.["result"] && il1iI1ll?.["data"] ? il1iI1ll?.["data"]["drawOk"] ? ($.addressId = il1iI1ll?.["data"]["addressId"], $.prizeName = il1iI1ll?.["data"]["drawName"], $.putMsg($.prizeName), il1iI1ll?.["data"]["drawType"] === 7 && il1iI1ll?.["data"]["needWriteAddress"] === "y" && (await $.saveAddress())) : $.putMsg("空气") : ($.putMsg(il1iI1ll.errorMessage), await $.wxStop(il1iI1ll.errorMessage));
        return;
      }
      if (II1l111l.data.addCarts !== II1l111l.data.totals) {
        let liiIli11 = await $.api("wxCartKoi/cartkoi/quickAddCart", "activityId=" + $.activityId + "&pin=" + $.Pin + "&productIds=" + encodeURIComponent(JSON.stringify(IiII1iiI)));
        if (liiIli11.errorMessage.includes("仅限店铺会员")) {
          {
            if (openCardMode === 4) await $.openCard(), liiIli11 = await $.api("wxCartKoi/cartkoi/quickAddCart", "activityId=" + $.activityId + "&pin=" + $.Pin + "&productIds=" + encodeURIComponent(JSON.stringify(IiII1iiI))), $.putMsg(liiIli11.errorMessage || "已完成加购"), await $.wxStop(liiIli11.errorMessage);else {
              if ($.prizeList.filter(liIiiil => liIiiil.type === 7 || liIiiil.type === 6)?.["length"] > 0 && openCardMode === 3) {
                await $.openCard();
                await $.wait(1000, 2000);
                liiIli11 = await $.api("wxCartKoi/cartkoi/quickAddCart", "activityId=" + $.activityId + "&pin=" + $.Pin + "&productIds=" + encodeURIComponent(JSON.stringify(IiII1iiI)));
                $.putMsg(liiIli11.errorMessage || "已完成加购");
                await $.wxStop(liiIli11.errorMessage);
              } else {
                if ($.prizeList.filter(IliIi1Il => IliIi1Il.type === 6)?.["length"] > 0 && openCardMode === 2) {
                  await $.openCard();
                  await $.wait(1000, 2000);
                  liiIli11 = await $.api("wxCartKoi/cartkoi/quickAddCart", "activityId=" + $.activityId + "&pin=" + $.Pin + "&productIds=" + encodeURIComponent(JSON.stringify(IiII1iiI)));
                  $.putMsg(liiIli11.errorMessage || "已完成加购");
                  await $.wxStop(liiIli11.errorMessage);
                } else {
                  if ($.prizeList.filter(liliI1iI => liliI1iI.type === 6)?.["length"] > 0 && openCardMode === 1) {
                    {
                      await $.openCard();
                      await $.wait(1000, 2000);
                      liiIli11 = await $.api("wxCartKoi/cartkoi/quickAddCart", "activityId=" + $.activityId + "&pin=" + $.Pin + "&productIds=" + encodeURIComponent(JSON.stringify(IiII1iiI)));
                      $.putMsg(liiIli11.errorMessage || "已完成加购");
                      await $.wxStop(liiIli11.errorMessage);
                    }
                  } else $.putMsg(liiIli11.errorMessage || "已完成加购"), await $.wxStop(liiIli11.errorMessage);
                }
              }
            }
          }
        } else $.putMsg(liiIli11.errorMessage || "已完成加购"), await $.wxStop(liiIli11.errorMessage);
        await $.carRmv(IiII1iiI);
      } else $.putMsg("已完成加购");
    }
  }
};
$.getPrizeList = async function () {
  let IiiiiI1 = await $.api("/api/prize/drawPrize", {});
  if (IiiiiI1.resp_code !== 0) {
    $.putMsg("获取奖品是失败");
    return;
  }
  $.prizeList = IiiiiI1.data.prizeInfo;
};
$.after = async function () {
  try {
    $.actStartTime && ($.open ? $.msg.push("已经开奖") : $.msg.push("开奖时间:" + $.drawTime));
    for (let I1iIlll1 of $.prizeList || []) {
      $.msg.push("    " + (I1iIlll1.name || I1iIlll1.prizeName));
    }
  } catch (lillil1l) {
    console.log(lillil1l);
  }
  $.msg.push("export M_WX_CARTKOI_URL=\"" + $.activityUrl + "\"");
};