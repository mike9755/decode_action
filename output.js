//Sun Aug 23 2026 23:15:07 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
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
  let IllI1l1 = await $.isvObfuscator();
  if (IllI1l1.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = IllI1l1?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) {
    return;
  }
  await $.accessLog();
  let Il11llll = await $.api("wxFansInterActionActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
  if (!Il11llll.result || !Il11llll.data) {
    $.putMsg(Il11llll.errorMessage);
    return;
  }
  $.actStartTime = Il11llll.data.actInfo.startTime;
  $.actEndTime = Il11llll.data.actInfo.endTime;
  $.content.length === 0 ? ["giftLevelOne", "giftLevelTwo", "giftLevelThree"].forEach(lI1I111 => JSON.parse(Il11llll.data.actInfo?.[lI1I111] || "[]").forEach(lI1i1ll => $.content.push(lI1i1ll))) : "";
  $.shopName = Il11llll.data.actInfo.shopName;
  let IIIll1i1 = Il11llll.data.actInfo.taskIds,
    IlIIliIi = Il11llll.data.actorInfo;
  if (IlIIliIi.prizeOneStatus && IlIIliIi.prizeTwoStatus && IlIIliIi.prizeThreeStatus) {
    $.index === 7 ? $.putMsg("全部完成") : $.putMsg("全部完成");
    return;
  }
  let iiI11lII = IlIIliIi.uuid,
    IiiIliI = {
      "1": "task1Sign",
      "2": "task2BrowGoods",
      "3": "task3AddCart",
      "4": "task4Share",
      "5": "task5Remind",
      "6": "task6GetCoupon",
      "7": "task7MeetPlaceVo"
    };
  $.skuList = [];
  for (let IilI1li of IIIll1i1.split(",")) {
    let iiilli11 = Il11llll.data[IiiIliI[IilI1li]];
    if (iiilli11.finishedCount >= iiilli11.upLimit) continue;
    for (let iII1ll1l = 1; iII1ll1l <= iiilli11.upLimit - iiilli11.finishedCount; iII1ll1l++) {
      try {
        if (IiiIliI[IilI1li] === "task1Sign") {
          await $.api("wxFansInterActionActivity/doSign", "activityId=" + $.activityId + "&uuid=" + iiI11lII);
        }
        if (IiiIliI[IilI1li] === "task2BrowGoods" && iiilli11.taskGoodList?.["length"] > 0) {
          let lIi1i1lI = iiilli11.taskGoodList,
            IiiIlIIi = lIi1i1lI[iII1ll1l].skuId;
          await $.api("wxFansInterActionActivity/doBrowGoodsTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII + "&skuId=" + IiiIlIIi);
        }
        if (IiiIliI[IilI1li] === "task3AddCart" && iiilli11.taskGoodList?.["length"] > 0) {
          let l1111II1 = iiilli11.taskGoodList,
            Ill1I1i = l1111II1[iII1ll1l].skuId;
          $.skuList.push(Ill1I1i);
          await $.api("wxFansInterActionActivity/doAddGoodsTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII + "&skuId=" + Ill1I1i);
        }
        IiiIliI[IilI1li] === "task4Share" && (await $.api("wxFansInterActionActivity/doShareTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII));
        if (IiiIliI[IilI1li] === "task5Remind") {
          await $.api("wxFansInterActionActivity/doRemindTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII);
        }
        if (IiiIliI[IilI1li] === "task6GetCoupon" && iiilli11.taskCouponInfoList?.["length"] > 0) {
          {
            let Iil11IIi = iiilli11.taskCouponInfoList,
              iiI11lll = Iil11IIi[0].couponInfo.couponId;
            await $.api("wxFansInterActionActivity/doGetCouponTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII + "&couponId=" + iiI11lll);
          }
        }
        IiiIliI[IilI1li] === "task7MeetPlaceVo" && (await $.api("wxFansInterActionActivity/doMeetingTask", "activityId=" + $.activityId + "&uuid=" + iiI11lII));
      } catch (lllIIlI1) {
        $.log(lllIIlI1);
      } finally {
        await $.wait(1500, 2000);
      }
    }
  }
  let iIiiiIii = IlIIliIi.follow;
  if (!iIiiiIii) {
    await $.api("wxFansInterActionActivity/followShop", "activityId=" + $.activityId + "&uuid=" + iiI11lII);
  }
  Il11llll = await $.api("wxFansInterActionActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
  IlIIliIi = Il11llll?.["data"]["actorInfo"] || IlIIliIi;
  let li1IIll = IlIIliIi.energyValue;
  li1IIll += IlIIliIi.fansLoveValue;
  let I1l1ilI = IlIIliIi.prizeOneStatus,
    iiIi1i1I = IlIIliIi.prizeTwoStatus,
    Il1II1II = IlIIliIi.prizeThreeStatus,
    ill1il1l = Il11llll.data.actConfig,
    lil1iiII = ill1il1l.prizeScoreOne,
    lI1llliI = ill1il1l.prizeScoreTwo,
    II1111il = ill1il1l.prizeScoreThree,
    Iil11Iil = "";
  !I1l1ilI && li1IIll >= lil1iiII && (Iil11Iil = "01");
  !iiIi1i1I && li1IIll >= lI1llliI && (Iil11Iil = "02");
  !Il1II1II && li1IIll >= II1111il && (Iil11Iil = "03");
  if (Iil11Iil) {
    {
      let IIiIIIli = await $.api("wxFansInterActionActivity/startDraw", "activityId=" + $.activityId + "&uuid=" + iiI11lII + "&drawType=" + Iil11Iil);
      $.log(JSON.stringify(IIiIIIli));
      if (IIiIIIli.result) {
        let lili1iIl = IIiIIIli.data.drawOk ? IIiIIIli.data.name : IIiIIIli.data.errorMessage || "空气";
        $.putMsg(lili1iIl);
        IIiIIIli.data.needWriteAddress === "y" && ($.addressId = IIiIIIli.data.addressId, $.prizeName = IIiIIIli.data.name, await $.saveAddress());
      } else $.putMsg("" + IIiIIIli.errorMessage), await $.wxStop(IIiIIIli.errorMessage);
    }
  } else $.putMsg("积分" + li1IIll + "，兑1:" + I1l1ilI + "，兑2:" + iiIi1i1I + "，兑3:" + Il1II1II);
  $?.["skuList"]?.["length"] > 0 ? await $.carRmv($.skuList) : "";
};
$.after = async function () {
  try {
    for (let llill1II of $.content || []) {
      {
        if (llill1II.name.includes("谢谢") || llill1II.name.includes("再来")) {
          continue;
        }
        $.msg.push("    " + llill1II.name + (llill1II?.["type"] === 8 ? "专享价" : ""));
      }
    }
  } catch (I1lIiliI) {
    console.log(I1lIiliI);
  }
  $.msg.push("export M_WX_FANS_DRAW_URL=\"" + $.activityUrl + "\"");
};