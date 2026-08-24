//Mon Aug 24 2026 11:11:02 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.limit = parseInt(process.env.M_WX_SECOND_LIMIT || 7);
$.version = "v1.0.0";
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
  let iilii1i = await $.isvObfuscator();
  if (iilii1i.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = iilii1i?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let i1iilIli = await $.api("wxSecond/getData", "activityId=" + $.activityId + "&pin=" + $.Pin + "&shareUuid=&activityStatus=");
  if (!i1iilIli.result || !i1iilIli.data) {
    $.putMsg(i1iilIli.errorMessage);
    await $.wxStop(i1iilIli.errorMessage);
    return;
  }
  debugger;
  let i1l1li = i1iilIli.data.score,
    i111lIl1 = i1iilIli.data.secondActive,
    Iiiillli = encodeURIComponent(i1iilIli.data.brushBane),
    iiIIl11I = i1iilIli.data.bid;
  $.actStartTime = i111lIl1.startTime;
  let ii11lii = i111lIl1.targetTime;
  $.actEndTime = i111lIl1.endTime;
  let lIilIill = i1iilIli.data.uuid;
  $.skuList = [];
  $.content = i1iilIli.data.prizeList;
  if ($.content.filter(i1i1iliI => [6, 7, 9, 13, 14, 15, 16].includes(i1i1iliI.type)).length === 0) {
    $.putMsg("垃圾或领完");
    this.expire = true;
    return;
  }
  let iIi11I1 = await $.api("wxSecond/getTaskDay", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + lIilIill);
  if (iIi11I1.result) {
    for (const i1l1i1lI of iIi11I1.data || []) {
      {
        let i11ii1Ii = i1l1i1lI.taskType;
        for (let iIilIi1I = 0; iIilIi1I < i1l1i1lI.dayMaxNumber && i1l1i1lI.finishNumber === 0; iIilIi1I++) {
          {
            if ([2, 5].includes(i11ii1Ii)) {
              {
                let l1iIII1 = i1l1i1lI.activityTaskGoods.slice(iIilIi1I * i1l1i1lI.commodity, iIilIi1I * i1l1i1lI.commodity + i1l1i1lI.commodity).filter(l1lIi11I => l1lIi11I.complete === 0);
                for (let IlI1Ii11 of l1iIII1) {
                  $.skuList.push(IlI1Ii11.skuId);
                  let I11Ii1l1 = await $.api("wxSecond/finishTask", "activityId=" + $.activityId + "&uuid=" + lIilIill + "&taskType=" + i11ii1Ii + "&skuId=" + IlI1Ii11.skuId);
                  I11Ii1l1.result && (i1l1li += I11Ii1l1.data.score);
                  await $.wait(300, 500);
                }
              }
            }
            await $.wait(300, 500);
          }
        }
        await $.wait(300, 500);
      }
    }
  }
  iIi11I1 = await $.api("wxSecond/getTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&uuid=" + lIilIill);
  if (iIi11I1.result) for (const Il11ilI1 of iIi11I1.data || []) {
    let Il1IlI1l = Il11ilI1.taskType;
    for (let lllII1il = 0; lllII1il < Il11ilI1.dayMaxNumber && Il11ilI1.finishNumber === 0; lllII1il++) {
      if ([3].includes(Il1IlI1l)) {
        {
          let lliIIIli = Il11ilI1.activityTaskGoods.slice(lllII1il * Il11ilI1.commodity, lllII1il * Il11ilI1.commodity + Il11ilI1.commodity).filter(lIIlliI => lIIlliI.complete === 0);
          for (let iIl11i of lliIIIli) {
            $.skuList.push(iIl11i.skuId);
            let l1iliIll = await $.api("wxSecond/finishTask", "activityId=" + $.activityId + "&uuid=" + lIilIill + "&taskType=" + Il1IlI1l + "&skuId=" + iIl11i.skuId);
            l1iliIll.result && (i1l1li += l1iliIll.data.score);
            await $.wait(300, 500);
          }
        }
      }
      if ([12].includes(Il1IlI1l)) {
        {
          let li111lI = await $.api("wxSecond/finishTask", "activityId=" + $.activityId + "&uuid=" + lIilIill + "&taskType=" + Il1IlI1l + "&skuId=");
          li111lI.result && (i1l1li += li111lI.data.score);
          await $.wait(300, 500);
        }
      }
      await $.wait(300, 500);
    }
    await $.wait(300, 500);
  }
  if (i1l1li === 0) {
    $.putMsg("游戏次数0，不跑了");
    return;
  }
  for (let i11lilli = 0; i11lilli < Math.min(i1l1li, $.limit); i11lilli++) {
    let lI11lI1l = await $.api("/wxSecond/checkAuth", "activityId=" + $.activityId + "&brushBane=" + Iiiillli + "&bid=" + iiIIl11I + "&pin=" + $.Pin),
      I1iiIl1l = encodeURIComponent(lI11lI1l.data.data.brushResult),
      lIilIlli = await $.api("wxSecond/start", "activityId=" + $.activityId + "&uuid=" + lIilIill + "&seconds=" + ii11lii + "&brushBane=" + I1iiIl1l + "&bid=" + encodeURIComponent(lI11lI1l.data.data.bid));
    if (lIilIlli.result) {
      {
        let ll1iIlIl = lIilIlli.data.draw.drawOk ? lIilIlli.data.draw.name : lIilIlli.data.errorMessage || "空气";
        $.putMsg(ll1iIlIl);
      }
    } else {
      if (lIilIlli.errorMessage) {
        $.putMsg("" + lIilIlli.errorMessage);
        if (lIilIlli.errorMessage.includes("来晚了") || lIilIlli.errorMessage.includes("已发完") || lIilIlli.errorMessage.includes("活动已结束")) {
          $.expire = true;
          break;
        }
      }
    }
  }
  let l1Ilii11 = await $.api("wxSecond/myPrize", "activityId=" + $.activityId + "&uuid=" + lIilIill);
  if (l1Ilii11.result) for (let lI1IiI1l of l1Ilii11?.["data"]?.["filter"](IlIiI => IlIiI.type === 7 && IlIiI.needWriteAddress === "y" && IlIiI.drawTime === $.now("yyyy-MM-dd")) || []) {
    $.addressId = lI1IiI1l.addressId;
    $.prizeName = lI1IiI1l.name;
    await $.saveAddress();
  }
  $?.["skuList"]?.["length"] > 0 ? await $.carRmv($.skuList) : "";
};
$.after = async function () {
  try {
    for (let Ill1I1I1 of $.content || []) {
      {
        if (Ill1I1I1.name.includes("谢谢") || Ill1I1I1.name.includes("再来")) {
          continue;
        }
        $.msg.push("    " + Ill1I1I1.name + (Ill1I1I1?.["type"] === 8 ? "专享价" : ""));
      }
    }
  } catch (llIIlI11) {
    console.log(llIIlI11);
  }
  $.msg.push("export M_WX_SECOND_DRAW_URL=\"" + $.activityUrl + "\"");
};