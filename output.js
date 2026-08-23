//Sun Aug 23 2026 23:19:30 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
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
  let iII1Ill1 = await $.isvObfuscator();
  if (iII1Ill1.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = iII1Ill1?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) {
    return;
  }
  await $.accessLog();
  let II11I1i1 = await $.api("mc/wxMcLevelAndBirthGifts/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&level=1");
  if (!II11I1i1.result) {
    {
      $.putMsg(II11I1i1.errorMessage);
      return;
    }
  }
  $.rule = II11I1i1.data.actRule;
  $.actStartTime = II11I1i1.data.startTime;
  $.actEndTime = II11I1i1.data.endTime;
  $.content = JSON.parse(II11I1i1.data.content);
  if ($.content.filter(illIi1i => [6, 7, 9, 13, 14, 15, 16].includes(illIi1i.type)).length === 0) {
    {
      $.putMsg("垃圾或领完");
      this.expire = true;
      return;
    }
  }
  if ($.actStartTime > $.timestamp()) {
    $.putMsg("活动未开始");
    this.expire = true;
    return;
  }
  if ($.timestamp() > $.actEndTime) {
    $.putMsg("活动已结束");
    this.expire = true;
    return;
  }
  let iiIiII11 = await $.api("mc/wxMcLevelAndBirthGifts/getMemberLevel", "venderId=" + $.venderId + "&pin=" + $.Pin),
    li111i1l = iiIiII11.data?.["level"] || false,
    i1Il1ii1 = iiIiII11.data?.["levelName"] || "非会员";
  if (!li111i1l) {
    let IIIlll1i = $.content.filter(Ii1I1i => Ii1I1i.drawLevel * 1 === 1 && (Ii1I1i.type === 6 || Ii1I1i.type === 7));
    if (IIIlll1i.length > 0 && (IIIlll1i[0].beanNum >= beanNum || IIIlll1i[0].type === 7)) await $.openCard(), await $.wait(1500, 2000);else {
      {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
    }
    iiIiII11 = await $.api("mc/wxMcLevelAndBirthGifts/getMemberLevel", "venderId=" + $.venderId + "&pin=" + $.Pin);
    li111i1l = iiIiII11.data?.["level"] || false;
    i1Il1ii1 = iiIiII11.data?.["levelName"] || "非会员";
  }
  $.putMsg("" + i1Il1ii1);
  let lilllil = II11I1i1.data.isReceived;
  if (lilllil === 1) {
    $.putMsg("已领过");
    let l1i1ill1 = await $.api("mc/wxMcLevelAndBirthGifts/getDrawBirthdayRecord", "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.Pin);
    for (let li1lilI1 = 0; li1lilI1 < l1i1ill1.data.length; li1lilI1++) {
      for (let Il1111Ii = 0; Il1111Ii < l1i1ill1.data[li1lilI1].recordInfoList.length; Il1111Ii++) {
        {
          for (let li1I1ill = 0; li1I1ill < l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii]?.["birthList"]?.["length"]; li1I1ill++) {
            {
              let iIIi1111 = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].birthList[li1I1ill];
              iIIi1111.type === 7 && (this.prizeName = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].birthList[li1I1ill].name, this.addressId = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].birthList[li1I1ill].addressId, this.saveAddress());
            }
          }
          for (let I11ii1ii = 0; I11ii1ii < l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii]?.["levelList"]?.["length"]; I11ii1ii++) {
            let Ill1iiI1 = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].levelList[I11ii1ii];
            Ill1iiI1.type === 7 && (this.prizeName = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].levelList[I11ii1ii].name, this.addressId = l1i1ill1.data[li1lilI1].recordInfoList[Il1111Ii].levelList[I11ii1ii].addressId, this.saveAddress());
          }
        }
      }
    }
    await $.complete();
    return;
  }
  let IIi11i1i;
  if ($.activityType === 103) {
    let llIIlI1i = await $.api("mc/wxMcLevelAndBirthGifts/getBirthInfo", "venderId=" + $.venderId + "&pin=" + $.Pin);
    if (!llIIlI1i.result) {
      {
        $.log("去填生日");
        for (let l1IlIil = 0; l1IlIil < 5; l1IlIil++) {
          {
            var iIlliIll = await $.api("mc/wxMcLevelAndBirthGifts/saveBirthDay", "venderId=" + $.venderId + "&pin=" + $.Pin + "&birthDay=" + $.now("yyyy-MM-dd"));
            if (!iIlliIll.result) await $.wait(1000, 2000);else break;
          }
        }
        li111i1l = 1;
      }
    }
    await $.wait(2000, 4000);
    IIi11i1i = await $.api("mc/wxMcLevelAndBirthGifts/sendBirthGifts", "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + $.Pin + "&level=" + li111i1l);
    for (let l1Iiii1i = 0; l1Iiii1i < IIi11i1i.data.birthdayData.length; l1Iiii1i++) {
      IIi11i1i.data.birthdayData[l1Iiii1i].type === 7 && (this.addressId = IIi11i1i.data.birthdayData[l1Iiii1i].addressId, this.prizeName = IIi11i1i.data.birthdayData[l1Iiii1i].name, this.saveAddress());
    }
    await $.complete();
  } else IIi11i1i = await $.api("mc/wxMcLevelAndBirthGifts/sendLevelGifts", "venderId=" + $.venderId + "&activityId=" + $.activityId + "&pin=" + $.Pin + "&level=" + li111i1l);
  IIi11i1i.result ? $.putMsg("领取成功") : (console.log(IIi11i1i), $.putMsg(IIi11i1i.errorMessage || IIi11i1i.data?.["levelError"] || IIi11i1i.data?.["birthdayError"] || "未知"), await $.wxStop(IIi11i1i.errorMessage || IIi11i1i.data.levelError || IIi11i1i.data.birthdayError));
  await $.complete();
};
$.after = async function () {
  try {
    for (let iiilIIll of $.content || []) {
      $.msg.push("    等级:" + (iiilIIll.drawLevel || "未知") + "," + (iiilIIll.realvalue || iiilIIll.value) + " " + iiilIIll.name);
    }
  } catch (iIIII1Il) {
    console.log(iIIII1Il);
  }
  console.log($.rule);
  $.msg.push("export M_WX_LEVEL_BIRTH_URL=\"" + $.activityUrl + "\"");
};