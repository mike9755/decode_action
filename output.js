//Sun Aug 23 2026 23:17:05 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let activityTypes = ["10082", "10084", "10086", "10089", "10091", "10092", "10093", "10094", "10095"];
$.templateId = $.getQueryString($.activityUrl, "templateId");
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) {
    throw new Error("请更新脚本");
  }
  if (!$.activityId || !$.activityUrl) {
    {
      $.expire = true;
      $.putMsg("activityId|activityUrl不存在");
      return;
    }
  }
  $.UA = $.ua();
  let iiIIl1iI = await $.isvObfuscator();
  if (iiIIl1iI.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = iiIIl1iI?.["token"];
  if (activityTypes.includes($.activityType)) {
    {
      await $.login();
      let ilI1ilII = await $.api("/api/game/getGameInfo", {
          "gameUrl": "https://lzkj-yc.isvjd.com/index.html?templateId=" + $.templateId + "&token=" + $.Token,
          "shareUserId": ""
        }),
        i1lIili1 = ilI1ilII.data.taskList || [];
      for (let lII11iI1 of i1lIili1.filter(iliiiI1 => iliiiI1.status === 0)) {
        for (let I1lI1i1I = 0; I1lI1i1I < lII11iI1.maxNum; I1lI1i1I++) {
          [14, 2, 13, 1].includes(lII11iI1.taskType) && (await $.api("/api/basic/task/toDo", {
            "taskId": lII11iI1.taskId,
            "skuId": ""
          }));
          if ([3, 5].includes(lII11iI1.taskType)) {
            await $.api("/api/basic/task/toDo", {
              "taskId": lII11iI1.taskId,
              "skuId": lII11iI1.skuInfoVO[I1lI1i1I].skuId
            });
          }
        }
      }
      await $.wait(1000, 2000);
      ilI1ilII = await $.api("/api/game/getGameInfo", {
        "gameUrl": "https://lzkj-yc.isvjd.com/index.html?templateId=" + $.templateId + "&token=" + $.Token,
        "shareUserId": ""
      });
      let li1111iI = ilI1ilII.data.canDrawTimes || 0,
        I1iiI1I = ilI1ilII.data.score || 4000,
        llll1lIl = ilI1ilII.data.gameChance || 4,
        Il1l1il = await $.api("/api/game/init", {
          "templateId": $.templateId
        }),
        IllliiI1 = Il1l1il.data.publicKey,
        I11IIli = Il1l1il.data.ruleScore,
        i1iill1l = $.addressIndex;
      for (let IIl11iI = 0; IIl11iI < llll1lIl; IIl11iI++) {
        let iii1lII = await $.api("/api/game/start", {}),
          lilIIIil = iii1lII.data.id;
        const iI1IIl1i = $.rsaEncrypt(IllliiI1, {
          "encryptionScheme": "pkcs1"
        }, {
          "id": lilIIIil,
          "score": I11IIli + ""
        });
        let il1IIIl1 = await $.api("/api/game/end", {
            "result": iI1IIl1i,
            "activityId": $.activityId
          }),
          iliIl1li = await $.api("/api/prize/draw", {
            "consumePoints": 0
          });
        if (iliIl1li.data) {
          $.putMsg(iliIl1li.data.prizeName);
          if (iliIl1li.data.prizeType == 3) {
            $.addressIndex = i1iill1l;
            $.addressId = iliIl1li.data.addressId;
            $.prizeName = iliIl1li.data.prizeName;
            await $.saveAddress();
          }
        } else {
          $.putMsg("空气");
        }
      }
      return;
    }
  }
  await $.getSimpleActInfoVo();
  if ($.expire) {
    return;
  }
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let ii1lllll = await $.api("wxGameActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
  if (!ii1lllll.result || !ii1lllll.data) {
    {
      await $.wxStop(ii1lllll.errorMessage);
      return;
    }
  }
  $.actStartTime = ii1lllll.data.startTime || "";
  $.actEndTime = ii1lllll.data.endTime || "";
  let llI1iIiI = ii1lllll.data.todayCanDrawOk || 1;
  $.gameName = ii1lllll.data.name;
  $.content = ii1lllll.data.drawContentVOs;
  let llill1i1 = $.content.filter(IIIlIlIl => [6, 7, 9, 13, 14, 15, 16].includes(IIIlIlIl.type) && IIIlIlIl.prizeNum > IIIlIlIl.hasSendPrizeNum);
  if (llill1i1.length === 0) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
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
  await $.api("wxGameActivity/follow", "activityId=" + $.activityId + "&pin=" + $.Pin);
  for (let II1lli1I = 0; II1lli1I < Math.min(llI1iIiI, 50); II1lli1I++) {
    let liIi1lI = $.random(llill1i1[0].startScore, llill1i1[0].endScore);
    liIi1lI = liIi1lI + "";
    liIi1lI = (liIi1lI.substring(0, liIi1lI.length - 1) + 0) * 1;
    $.domain.includes("cjhy") && (liIi1lI = EncryptCrypto("AES", "ECB", "Pkcs7", liIi1lI, $.activityId, "00000000"), liIi1lI = encodeURIComponent(encodeURIComponent(liIi1lI)), await $.api("wxGameActivity/gameStartDeposit", "activityId=" + $.activityId + "&pin=" + $.Pin));
    let IlIi1iI1 = await $.api("wxGameActivity/gameOverRecord", "activityId=" + $.activityId + "&pin=" + $.Pin + "&score=" + liIi1lI);
    if (IlIi1iI1.result) {
      {
        $.putMsg(IlIi1iI1.data.name || "空气");
        if (IlIi1iI1.data.needWriteAddress === "y") {
          $.addressId = IlIi1iI1.data.addressId;
          $.prizeName = IlIi1iI1.data.name;
          await $.saveAddress();
        }
        await $.wxStop(IlIi1iI1.data.errorMessage);
      }
    } else {
      {
        $.putMsg("" + IlIi1iI1.errorMessage);
        if (await $.wxStop(IlIi1iI1.errorMessage)) {
          break;
        }
      }
    }
  }
};
$.after = async function () {
  try {
    for (let Iili1I1 of $.content || $.prizeList || []) {
      $.msg.push("    " + (Iili1I1.name || Iili1I1.prizeName) + " 剩" + Iili1I1?.["leftNum"] + "份");
    }
  } catch (lII1illi) {
    console.log(lII1illi);
  }
  $.msg.push("export M_WX_GAME_URL=\"" + $.activityUrl + "\"");
};
function EncryptCrypto(li1lIIil, liI1I1Ii, liiilIl1, ililIiiI, Ilil1il1, liii1III) {
  return CryptoJS[li1lIIil].encrypt(CryptoJS.enc.Utf8.parse(ililIiiI), CryptoJS.enc.Utf8.parse(Ilil1il1), {
    "mode": CryptoJS.mode[liI1I1Ii],
    "padding": CryptoJS.pad[liiilIl1],
    "iv": CryptoJS.enc.Utf8.parse(liii1III)
  }).ciphertext.toString(CryptoJS.enc.Base64);
}