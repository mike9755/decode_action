//Sun Aug 23 2026 23:18:19 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
let openCardBeanNum = parseInt(process.env.M_WX_KNOWLEDGE_BEAN_NUM || 1);
$.beanNumAll = parseInt(process.env.M_WX_BEAN_NUM_ALL || 999);
$.version = "v1.0.0";
let actAns = [],
  origin = "remote",
  sure = false;
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
  let IIilIl1i = await $.isvObfuscator();
  if (IIilIl1i.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  if (["10039"].includes($.activityType)) {
    {
      let i11lli1i = $.cookie;
      await $.login();
      if (actAns.length === 0) {
        {
          let Ii1lI1ll = await $.request("http://" + (mode ? "127.0.0.1" : "119.91.23.232") + ":7705/answer_list", {
            "Cookie": "123",
            "actType": "10039",
            "activityId": $.activityId
          });
          Ii1lI1ll.data.data && (sure = true, actAns = JSON.parse(Ii1lI1ll.data.data));
        }
      }
      if (actAns.length === 0) {
        {
          $.index = 0;
          for (let llIi1iII of $.originCookies.reverse()) {
            {
              if (sure) break;
              try {
                $.index++;
                $.cookie = llIi1iII;
                let lIII1il1 = llIi1iII.match(/pt_pin=(.+?);/) && llIi1iII.match(/pt_pin=(.+?);/)[1];
                $.username = decodeURIComponent(lIII1il1);
                http.defaults.headers.Cookie = llIi1iII;
                $.UA = $.ua();
                let IIIll1l = await $.isvObfuscator();
                if (IIIll1l.code !== "0") {
                  $.putMsg("获取Token失败");
                  return;
                }
                await $.login();
                let IiIlI = await $.api("/api/task/know/activity", {});
                if (actAns.length === 0) {
                  actAns = IiIlI.data.activityQaBankByIds;
                }
                let Illl1Il = await $.api("/api/task/know/startAnswer", {}),
                  i11iIIlI = Illl1Il.data;
                if (i11iIIlI == "1") continue;
                if (i11iIIlI == "2") {
                  continue;
                }
                for (let lilii1ii = 0; lilii1ii < actAns.length; lilii1ii++) {
                  let IliiI11l = actAns[lilii1ii],
                    l1IlIlI = IliiI11l.qaAnswerList[0],
                    iIliii1i = await $.api("/api/task/know/answer", {
                      "questionId": IliiI11l.questionId,
                      "recordId": i11iIIlI,
                      "answersId": l1IlIlI.answerId
                    });
                  if (iIliii1i.data == "1") {
                    {
                      actAns[lilii1ii].qaAnswerList = [l1IlIlI];
                      continue;
                    }
                  }
                  if (iIliii1i.data?.["id"]) {
                    $.prizeName = iIliii1i.data.prizeName;
                    $.putMsg($.prizeName);
                    iIliii1i.data.addressId && ($.addressId = iIliii1i.data.addressId, await $.saveAddress());
                    origin = "local";
                    sure = true;
                    $.index = 1;
                  } else {
                    actAns[lilii1ii].qaAnswerList = IliiI11l.qaAnswerList.slice(1, IliiI11l.qaAnswerList.length);
                  }
                }
              } catch (l1IIiii1) {
                console.log(l1IIiii1);
              }
            }
          }
        }
      }
      if (!sure) {
        throw new Error("没找到正确答案");
      }
      if (origin == "local") {
        await $.request("http://" + (mode ? "127.0.0.1" : "119.91.23.232") + ":7705/update_answer", {
          "Cookie": "123",
          "actType": "10039",
          "activityId": $.activityId
        }, actAns);
      }
      $.cookie = i11lli1i;
      let iiII1li = i11lli1i.match(/pt_pin=(.+?);/) && i11lli1i.match(/pt_pin=(.+?);/)[1];
      $.username = decodeURIComponent(iiII1li);
      http.defaults.headers.Cookie = i11lli1i;
      $.UA = $.ua();
      let ll11I1il = await $.isvObfuscator();
      if (ll11I1il.code !== "0") {
        $.putMsg("获取Token失败");
        return;
      }
      await $.login();
      let l11I1li1 = await $.api("/api/task/know/activity", {}),
        Iill1Ill = await $.api("/api/task/know/startAnswer", {}),
        iI1liIi = Iill1Ill.data;
      if (iI1liIi == "1") {
        $.putMsg("已放弃");
        return;
      }
      if (iI1liIi == "2") {
        {
          $.putMsg("已完成");
          return;
        }
      }
      for (let i1ilI111 = 0; i1ilI111 < actAns.length; i1ilI111++) {
        {
          let IllIIlIi = actAns[i1ilI111],
            Ii11I1iI = IllIIlIi.qaAnswerList[0],
            iII1llI = await $.api("/api/task/know/answer", {
              "questionId": IllIIlIi.questionId,
              "recordId": iI1liIi,
              "answersId": Ii11I1iI.answerId
            });
          if (iII1llI.data == "1") {
            actAns[i1ilI111].qaAnswerList = [Ii11I1iI];
            continue;
          }
          if (iII1llI.data?.["id"]) {
            $.prizeName = iII1llI.data.prizeName;
            $.putMsg($.prizeName);
            iII1llI.data.addressId && ($.addressId = iII1llI.data.addressId, await $.saveAddress());
            sure = true;
          } else actAns[i1ilI111].qaAnswerList = IllIIlIi.qaAnswerList.slice(1, IllIIlIi.qaAnswerList.length);
        }
      }
      return;
    }
  }
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) return;
  await $.accessLog();
  let iIilIi1I = await $.api("/wxKnowledgeActivity/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin);
  if (!iIilIi1I.result || !iIilIi1I.data) {
    $.putMsg(iIilIi1I.errorMessage);
    return;
  }
  $.clearance = iIilIi1I.data.clearance || false;
  $.needFollow = iIilIi1I.data.needFollow || false;
  $.hasFollow = iIilIi1I.data.hasFollow || false;
  $.actEndTime = iIilIi1I.data.endTime || "";
  $.actStartTime = iIilIi1I.data.startTime || "";
  $.questionSize = iIilIi1I.data.questionSize || 0;
  $.activityName = iIilIi1I.data.activityName || "";
  $.hasAnswerTimes = iIilIi1I.data.hasAnswerTimes || 0;
  $.questions = iIilIi1I.data.questions || [];
  $.prizeList = iIilIi1I.data.drawContentVOs || [];
  let lIl1Il = iIilIi1I.data.drawContentVOs.filter(lllII1i => [6, 7, 9, 13, 14, 15, 16].includes(lllII1i.type));
  if (lIl1Il.length === 0) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
  }
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
  let i1lI1i1I = 10,
    il11IIIi = null,
    Illlilil = true;
  if (lIl1Il[0].type !== 6 && $.index > $.masterNum || lIl1Il[0].type === 6 && lIl1Il[0].beanNum < $.beanNumAll) {
    $.putMsg("全部完成");
    this.expire = true;
    return;
  }
  let iIII11Ii = lIl1Il[0].type === 6 && lIl1Il[0].beanNum >= openCardBeanNum || lIl1Il[0].type === 7 || false;
  while (i1lI1i1I-- > 0) {
    {
      if (this.expire) break;
      il11IIIi = await $.api("wxKnowledgeActivity/startAnswer", "activityId=" + $.activityId + "&pin=" + $.Pin);
      if (il11IIIi.result) break;
      if (il11IIIi.errorMessage.includes("会员")) {
        if (iIII11Ii) {
          await $.openCard();
          continue;
        } else {
          Illlilil = false;
          $.putMsg("不是会员");
          break;
        }
      }
      $.putMsg(il11IIIi.errorMessage);
      if (il11IIIi.errorMessage.includes("答题次数已用完")) {
        {
          Illlilil = false;
          break;
        }
      }
      if (il11IIIi.errorMessage.includes("答题已通关")) {
        {
          if ($.index === $.masterNum) {
            $.putMsg("全部完成");
          }
          Illlilil = false;
          break;
        }
      }
      await $.wxStop(il11IIIi.errorMessage);
    }
  }
  if (!Illlilil) {
    return;
  }
  for (let l111ill of $.questions) {
    if (this.expire) break;
    let l11II1lI = await $.api("/wxKnowledgeActivity/answer", "questionId=" + l111ill.id + "&detailId=" + il11IIIi.data.id + "&answer=" + l111ill.realAnswer);
    await $.wxStop(l11II1lI.errorMessage);
    if (l11II1lI.errorMessage.includes("答题已通关")) break;
  }
  let I1il1l1I = await $.api("wxKnowledgeActivity/getPrize", "detailId=" + il11IIIi.data.id);
  if (I1il1l1I.data.drawOk) {
    $.putMsg(I1il1l1I.data.name);
    I1il1l1I.data.drawInfoType === 7 && I1il1l1I.data.needWriteAddress === "y" && I1il1l1I.data.addressId && ($.addressId = I1il1l1I.data.addressId, $.prizeName = I1il1l1I.data.name, await $.saveAddress());
    if ($.index === $.masterNum) {
      $.putMsg("全部完成");
    }
  } else $.putMsg(I1il1l1I.errorMessage);
  await $.wxStop(I1il1l1I.errorMessage);
};
$.after = async function () {
  try {
    for (let Ili1I11l of $.prizeList || []) {
      if (Ili1I11l?.["name"]["includes"]("谢谢") || Ili1I11l?.["name"]["includes"]("再来")) continue;
      $.msg.push("    " + (Ili1I11l.name || Ili1I11l.prizeName) + " " + (Ili1I11l?.["type"] === 8 ? "专享价" : ""));
    }
  } catch (llii1i11) {
    console.log(llii1i11);
  }
  $.msg.push("export M_WX_KNOWLEDGE_URL=\"" + $.activityUrl + "\"");
};