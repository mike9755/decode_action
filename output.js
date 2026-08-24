//Mon Aug 24 2026 11:42:30 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  if (!$.activityId || !$.activityUrl) {
    $.expire = true;
    $.putMsg("activityId|activityUrl不存在");
    return;
  }
  $.UA = $.ua();
  let i1lllIll = await $.isvObfuscator();
  if (i1lllIll.code !== "0") {
    {
      $.putMsg("获取Token失败");
      return;
    }
  }
  if (["10044"].includes($.activityType)) {
    await $.login();
    let il1Il1I1 = await $.api("api/task/votePolitely/activity", {});
    if (il1Il1I1.data.voteSelectList.length == 0) {
      {
        let iIIill = [il1Il1I1.data.rule[0].text];
        il1Il1I1.data.votingForm == 2 && iIIill.push(il1Il1I1.data.rule[1].text);
        let l1lilII1 = await $.api("api/task/votePolitely/savePkResult", {
          "selectVote": iIIill
        });
        $.log("投票结果", l1lilII1);
        if (l1lilII1.resp_code == 0) {}
      }
    }
    for (let IliIil1 = 0; IliIil1 < 2; IliIil1++) {
      let Il111I1I = await $.api("/api/prize/draw", {
        "actId": $.activityId
      });
      if (Il111I1I.resp_code != 0) {
        {
          if (Il111I1I.resp_msg.includes("没有抽奖次数")) break;
          $.putMsg("" + Il111I1I.resp_msg);
          await $.wxStop(Il111I1I.resp_msg);
          return;
        }
      } else $.putMsg("" + (Il111I1I.data?.["prizeName"] || "空气")), Il111I1I.data?.["prizeType"] === 3 && ($.prizeName = Il111I1I.data?.["prizeName"], $.addressId = Il111I1I.data?.["addressId"], await $.saveAddress());
    }
    return;
  }
  $.Token = i1lllIll?.["token"];
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) {
    return;
  }
  await $.accessLog();
  let ilI1iIIl = await $.api("faxian/wxVote/activityContent", {
    "activityId": $.activityId,
    "pin": $.Pin
  });
  if (!ilI1iIIl.result || !ilI1iIIl.data) {
    {
      $.putMsg(ilI1iIIl.errorMessage || "活动已结束");
      return;
    }
  }
};
$.after = async function () {
  try {
    for (let IIiiIilI of $.prizeList || []) {
      $.msg.push("    " + IIiiIilI.prizeName + " 剩" + IIiiIilI.leftNum + "份");
    }
  } catch (IIl1iIi) {
    console.log(IIl1iIi);
  }
  $.msg.push("export M_WX_VOTE_DRAW_URL=" + $.activityUrl);
};