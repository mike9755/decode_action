//Sun Aug 23 2026 23:12:38 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.activityUrl = $.match(/(https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/, $.activityUrl);
$.domain = $.match(/https?:\/\/([^/]+)/, $.activityUrl);
$.activityId = $.getActivityId();
$.activityType = $.getQueryString($.activityUrl, "activityType");
$.userId = $.getQueryString($.activityUrl, "user_id");
let activityContent = "",
  names = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康".split(""),
  phones = "13969023158@13789265347@13827195843@13105243798@13285217694@13810579842@18116850374@13957864013@18248527690@13218594367@18231025689@13795783126@18189607415@13158920361@13345937082@18046701523@13202613475@13908473691@13982147693@13920641735@18141893057@13786245370@13985634170@18123860451@18006837241@13712739086@13267203458@18131259064@13123049176@13328631504@13316720958@13802876945@13761723409@18296534180@13235129706@13916325740@18013258649@13768034759@18151237689@18214065739@13991643258@13969728354@18006234875@13956719043@13775604931@13141975826@13126179534@13360259417@13853924680@13862843095@13213902846@18223896540@13107952861@13285967423@13283140752@18045376298@13793865107@18202639415@18289063741@13160745381@18187594620@13247985610@13131708452@13379038615@13238671259@13334879512@13280243716@13210279853@13912964503@13842570813@13784275903@18016387205@13171365940@13764257381@18261043275@13878536049@13387542319@18163054927@13135497821@18090163487@13162073189@13809168374@18093186240@13262938514@18093571682@13361235094@13912067385@18172849601@18279628310@18247389526@13879463502@18147396150@13839072458@13903624971@18047301895@13934287591@13263475819@13364895023@13790357184@18139740182".split("@"),
  prizeList = [];
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.log("活动id: " + $.activityId, "活动url: " + $.activityUrl);
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
  let iiliIl1l = await $.isvObfuscator();
  if (iiliIl1l.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = iiliIl1l?.["token"];
  if ($.domain.includes("jinggeng")) {
    await $.wait(1000, 2000);
    let i1l11I11 = await $.api("front/setMixNick", "strTMMixNick=" + $.Token + "&userId=" + $.userId + "&source=01");
    if (!i1l11I11.succ) {
      {
        $.putMsg("setMixNick失败");
        return;
      }
    }
    let i1II1I11 = await $.api("ql/front/showPerfectInformation", "id=" + $.activityId + "&user_id=" + $.userId);
    const Il1IIIl = cheerio.load(cheerio.load(i1II1I11).html());
    $.shopId = Il1IIIl("#shop_sid", "body").attr("value");
    $.venderId = Il1IIIl("#vender_id", "body").attr("value");
    $.shopName = Il1IIIl("#shop_title", "body").attr("value");
    $.activityType = Il1IIIl("#actType", "body").attr("value");
    $.rule = Il1IIIl(".rule_tip .info .text", "body").text();
    const llIiI1Il = /(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/g,
      llllI1li = $.rule.match(llIiI1Il),
      IiilIl1 = llllI1li[0],
      l1lIl1 = llllI1li[1];
    $.actStartTime = new Date(IiilIl1).getTime();
    $.actEndTime = new Date(l1lIl1).getTime();
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
    let I11i1 = await $.api("ql/front/postAddMaterial", "user_id=" + $.userId + "&act_id=" + $.activityId + "&detail=" + encodeURIComponent(JSON.stringify({
      "姓名": names[$.random(0, names.length - 1)],
      "性别": $.randomArray(["男", "女"], 1)[0],
      "生日": "19" + $.random(60, 99) + "-0" + $.random(1, 9) + "-0" + $.random(1, 9),
      "手机号码": "" + phones[$.random(0, phones.length - 1)],
      "地区(省市)": "北京市-北京市"
    })));
    if (I11i1.succ) {
      {
        let lii111l = JSON.parse(I11i1.msg);
        if (lii111l.isSendSucc && lii111l.drawAwardDto) {
          {
            let liillI1 = lii111l.drawAwardDto,
              IIliIIII = $.getAwardText(lii111l.drawAwardDto);
            $.putMsg(IIliIIII);
            prizeList = [{
              "prizeName": IIliIIII
            }];
            liillI1.awardType === "JD_GOODS" && ($.addressId = lii111l.actLogId, $.prizeName = IIliIIII, await $.saveAddress());
            await $.complete();
          }
        } else $.putMsg(I11i1.msg);
      }
    } else {
      $.putMsg(I11i1.msg);
      await $.wxStop(I11i1.msg);
    }
    await $.wait(1000, 2000);
    return;
  }
  if (["10049"].includes($.activityType)) {
    {
      await $.login();
      debugger;
      let iIllIIi1 = await $.api("/api/task/perfectInfo/activity", {});
      if (iIllIIi1.resp_code !== 0) {
        $.putMsg("获取奖品失败");
        return;
      }
      prizeList = [iIllIIi1.data];
      let i1i1iiIi = prizeList.filter(llililli => llililli.prizeName.includes("京豆") || llililli.prizeName.includes("积分"));
      if (i1i1iiIi.length <= 0) {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
      for (let Il11i1i1 = 0; Il11i1i1 < 9; Il11i1i1++) {
        {
          await $.api("/api/task/perfectInfo/addInfo", {
            "perfectInfo": [{
              "num": "info01",
              "title": "姓名",
              "content": names[$.random(0, names.length - 1)]
            }, {
              "num": "info02",
              "title": "生日",
              "content": $.random(2000, 2022) + "年" + $.random(1, 12) + "月" + $.random(1, 27) + "日 "
            }, {
              "num": "info03",
              "title": "手机号",
              "content": phones[$.random(0, phones.length - 1)]
            }, {
              "num": "info04",
              "title": "性别",
              "content": $.randomArray(["男", "女"], 1)[0]
            }]
          });
          await $.api("/api/task/perfectInfo/activity", {});
          let liilIiil = await $.api("/api/prize/receive/acquire", {
            "prizeInfoId": iIllIIi1.data.prizeId
          });
          if (liilIiil.resp_code == 0) {
            {
              if (liilIiil.data.prizeName) {
                {
                  $.putMsg(liilIiil.data.prizeName);
                  if (liilIiil.data.prizeType == 3) {
                    $.addressId = liilIiil.data.addressId;
                    $.prizeName = liilIiil.data.prizeName;
                    await $.saveAddress();
                  }
                  await $.complete();
                  break;
                }
              } else {
                {
                  $.putMsg(liilIiil.resp_msg);
                  break;
                }
              }
            }
          } else {
            $.putMsg(liilIiil.resp_msg);
            break;
          }
        }
      }
    }
  } else {
    await $.getSimpleActInfoVo();
    if ($.expire) return;
    await $.getMyPing();
    if (!$.Pin) return;
    await $.accessLog();
    if (!activityContent) {
      activityContent = await $.api("drawContent/listDrawContent", "&activityId=" + $.activityId + "&type=" + $.activityType);
      if (!activityContent.result || !activityContent.data) {
        $.putMsg(activityContent.errorMessage || "可能未开始");
        return;
      }
    }
    prizeList = activityContent.data || [];
    let IIll1 = prizeList.filter(lIIiiiil => [6, 7, 9, 13, 14, 15, 16].includes(lIIiiiil.type) || lIIiiiil.hasSendPrizeNum - lIIiiiil.size > 0);
    if (IIll1.length === 0) {
      {
        $.putMsg("垃圾或领完");
        $.expire = true;
        return;
      }
    }
    let Ilii1lii = IIll1[0].drawInfoId,
      iiii1lli = await $.api("completeInfoActivity/selectById", "activityId=" + $.activityId + "&venderId=" + $.venderId);
    if (!iiii1lli.result) {
      $.putMsg(iiii1lli.errorMessage);
      return;
    }
    $.actStartTime = iiii1lli.data.startTime;
    $.actEndTime = iiii1lli.data.endTime;
    if ($.actStartTime > $.timestamp()) {
      {
        $.putMsg("活动未开始");
        this.expire = true;
        return;
      }
    }
    if ($.timestamp() > $.actEndTime) {
      $.putMsg("活动已结束");
      this.expire = true;
      return;
    }
    let iiIl1lIi = new Map();
    for (let I1ii1i1 in iiii1lli.data) {
      if (I1ii1i1.startsWith("choose") && iiii1lli.data[I1ii1i1] === "y") {
        let II1i11iI = firstCharToLowercase(I1ii1i1?.["replace"]("choose", ""));
        switch (II1i11iI) {
          case "name":
            iiIl1lIi.set("name", encodeURIComponent(names[$.random(0, names.length - 1)]));
            continue;
          case "phone":
            iiIl1lIi.set("phone", phones[$.random(0, phones.length - 1)]);
            continue;
          case "weixin":
            iiIl1lIi.set("weiXin", "wx_" + $.randomNum(10));
            continue;
          case "qq":
            iiIl1lIi.set("qq", $.randomNum(10));
            continue;
          case "birth":
            iiIl1lIi.set("birthDay", "19" + $.random(60, 99) + "-0" + $.random(1, 9) + "-0" + $.random(1, 9));
            continue;
          case "professional":
            iiIl1lIi.set("professional", encodeURIComponent($.randomArray(["科学家", "工人", "农民", "白领", "司机"], 1)[0]));
            continue;
          case "address":
            iiIl1lIi.set("province", encodeURIComponent("北京市"));
            iiIl1lIi.set("city", encodeURIComponent("东城区"));
            iiIl1lIi.set("address", encodeURIComponent("未知"));
            continue;
          case "email":
            iiIl1lIi.set("email", encodeURIComponent($.random(1000000, 9999999) + "@163.com"));
            continue;
          case "gender":
            iiIl1lIi.set("gender", encodeURIComponent($.randomArray(["男", "女"], 1)[0]));
            continue;
          default:
            iiIl1lIi.set(II1i11iI, "1");
        }
      }
    }
    if (iiii1lli.data.customJson) {
      {
        let II1III1I = [];
        for (let II11illl = 0; II11illl < JSON.parse(iiii1lli.data.customJson).length; II11illl++) {
          II1III1I.push("1");
        }
        iiIl1lIi.set("customContent", encodeURIComponent(JSON.stringify(II1III1I)));
      }
    }
    iiIl1lIi.set("drawInfoId", Ilii1lii);
    iiIl1lIi.set("activityId", $.activityId);
    iiIl1lIi.set("venderId", $.venderId);
    iiIl1lIi.set("pin", $.Pin);
    iiIl1lIi.set("vcode", "");
    iiIl1lIi.set("token", $.Token);
    iiIl1lIi.set("fromType", "APP");
    const II1lll = Array.from(iiIl1lIi).map(([l1iIiIil, l11Il1]) => l1iIiIil + "=" + l11Il1).join("&");
    let iIIIl111 = await $.api("wx/completeInfoActivity/save", II1lll);
    if (iIIIl111.result) {
      {
        if (iIIIl111.data?.["drawOk"]) $.putMsg("领取成功"), await $.complete();else iIIIl111.data === "修改成功" ? ($.putMsg("已领过"), await $.complete()) : ($.putMsg("" + iIIIl111.data.errorMessage), await $.wxStop(iIIIl111.data.errorMessage), await $.complete());
      }
    } else {
      $.putMsg("" + iIIIl111.errorMessage);
      await $.wxStop(iIIIl111.errorMessage);
      await $.complete();
    }
  }
};
$.after = async function () {
  try {
    for (let I1lillIi of prizeList || []) {
      $.msg.push("    " + (I1lillIi.prizeName || I1lillIi.name) + " " + (I1lillIi?.["type"] === 8 ? "专享价" : ""));
    }
  } catch (l1iI1Iil) {
    console.log(l1iI1Iil);
  }
  $.msg.push("export M_WX_COMPLETE_DRAW_URL=\"" + $.activityUrl + "\"");
};
function firstCharToLowercase(illi11II) {
  return illi11II.charAt(0).toLowerCase() + illi11II.slice(1);
}