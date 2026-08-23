//Sun Aug 23 2026 23:13:49 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
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
  let Il1Il = await $.isvObfuscator();
  if (Il1Il.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  $.Token = Il1Il?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) return;
  let iII1lIII = await $.api("wxActionCommon/getUserInfo", "pin=" + $.Pin);
  if (!iII1lIII.result || !iII1lIII.data) {
    {
      $.putMsg("获取getUserInfo失败");
      return;
    }
  }
  $.nickname = iII1lIII.data.nickname;
  $.attrTouXiang = iII1lIII.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  await $.accessLog();
  let I1il1lI = await $.api("wxgame/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + ($.shareId || ""));
  if (!I1il1lI.result || !I1il1lI.data) {
    {
      $.putMsg("明日再来，还未开始");
      $.expire = true;
      return;
    }
  }
  $.actStartTime = $.match(/(\d+-\d+-\d+ \d+:\d+) 至/, I1il1lI.data.actRule);
  $.actEndTime = $.match(/至 (\d+-\d+-\d+ \d+:\d+)/, I1il1lI.data.actRule);
  $.gameName = I1il1lI.data.activityName;
  $.content = I1il1lI.data.drawContentList;
  $.drawMiniScore = I1il1lI.data.drawMiniScore;
  if (I1il1lI.data.isGameEnd) {
    {
      $.putMsg("活动已结束");
      $.expire = true;
      return;
    }
  }
  !$.shareId ? $.shareId = I1il1lI.data.uid : $.shareId;
  if (I1il1lI.data.helpFriendStatus === 0 && $.index !== 1) {
    let llIlI11I = await $.api("wxgame/helpFriend", "activityId=" + $.activityId + "&pin=" + $.Pin);
    console.log("助力", llIlI11I);
  }
  let Iii1llIl = await $.api("wxgame/myInfo", "activityId=" + $.activityId + "&pin=" + $.Pin);
  $.skuList = [];
  if (Iii1llIl.result && Iii1llIl.data.taskList.filter(i1iIlli => i1iIlli.taskId !== "share2help")) for (let i1ll1111 of Iii1llIl.data.taskList.filter(IIil1i1i => IIil1i1i.curNum < IIil1i1i.maxNeed)) {
    try {
      {
        if (i1ll1111.taskId === "followsku") {
          let IliiiIi1 = await $.api("wxgame/getProduct", "type=3&activityId=" + $.activityId + "&pin=" + $.Pin);
          for (let iI1I1IiI = 0; iI1I1IiI < IliiiIi1.data.length && iI1I1IiI < i1ll1111.maxNeed; iI1I1IiI++) {
            {
              let l1illIi1 = IliiiIi1.data[iI1I1IiI];
              await $.api("wxgame/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=" + i1ll1111.taskId + "&param=" + l1illIi1.skuId);
            }
          }
        } else {
          if (i1ll1111.taskId === "add2cart") {
            {
              let l1lilii = await $.api("wxgame/getProduct", "type=1&activityId=" + $.activityId + "&pin=" + $.Pin);
              for (let i111ilI1 = 0; i111ilI1 < l1lilii.data.length && i111ilI1 < i1ll1111.maxNeed; i111ilI1++) {
                let ilili11I = l1lilii.data[i111ilI1];
                $.skuList.push(ilili11I.skuId);
                await $.api("wxgame/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=" + i1ll1111.taskId + "&param=" + ilili11I.skuId);
              }
            }
          } else {
            {
              let iIlllll = await $.api("wxgame/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=" + i1ll1111.taskId + "&param=");
            }
          }
        }
      }
    } catch (ll1Ill1i) {
      console.log(ll1Ill1i);
    } finally {
      await $.wait(300, 500);
    }
  }
  Iii1llIl = await $.api("wxgame/myInfo", "activityId=" + $.activityId + "&pin=" + $.Pin);
  for (let iII1ilII = 0; iII1ilII < Math.min(Iii1llIl?.["data"]?.["chance"], 7); iII1ilII++) {
    try {
      let ii11III1 = await $.api("wxgame/game/start", "activityId=" + $.activityId + "&pin=" + $.Pin),
        I1iiiil = ii11III1.data,
        Ii1iIil1 = $.drawMiniScore + $.random(100, 200);
      await $.wait(1000, 2000);
      let iI1lIllI = new Date().getTime(),
        I1iiIi1 = $.md5(I1iiiil + "," + iI1lIllI + "," + Ii1iIil1 + ",0eed6538f6e84b754ad2ab95b45c54f8");
      await $.api("wxgame/game/end", "activityId=" + $.activityId + "&pin=" + $.Pin + "&score=" + Ii1iIil1 + "&gameId=" + I1iiiil + "&reqtime=" + iI1lIllI + "&sign=" + I1iiIi1 + "&getRank=true&getScoreRank=true&getPlayerNum=true");
      let I1IllI11 = new Date().getTime().toString(),
        IiilIil = await $.api("wxgame/game/luckyDraw", "activityId=" + $.activityId + "&pin=" + $.Pin + "&score=" + Ii1iIil1 + "&gameId=" + I1iiiil + "&reqtime=" + I1IllI11 + "&sign=" + $.md5(I1iiiil + "," + I1IllI11 + ",0eed6538f6e84b754ad2ab95b45c54f8"));
      IiilIil.result ? ($.putMsg(IiilIil.data.name || "空气"), IiilIil.data?.["needWriteAddress"] === "y" && ($.addressId = IiilIil.data.addressId, $.prizeName = IiilIil.data.name, await $.saveAddress())) : ($.putMsg("" + IiilIil.errorMessage), await $.wxStop(IiilIil.errorMessage));
    } catch (I1Ii1I1) {
      $.log(I1Ii1I1);
    }
  }
  $?.["skuList"]?.["length"] > 0 ? await $.carRmv($.skuList) : "";
  Iii1llIl?.["data"]?.["chance"] === 0 && $.putMsg("没次数不跑了");
};
$.after = async function () {
  try {
    for (let II1lIii1 of $.content || []) {
      $.msg.push("    " + II1lIii1.name);
    }
  } catch (i1ll11li) {
    console.log(i1ll11li);
  }
  $.msg.push("export M_WX_DADOUDOU_URL=\"" + $.activityUrl + "\"");
};