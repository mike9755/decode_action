//Sun Aug 23 2026 23:10:08 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.uid = "";
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.activityId || !$.activityUrl) {
    {
      $.expire = true;
      $.putMsg("activityId|activityUrl不存在");
      return;
    }
  }
  $.UA = $.ua();
  let lIli1iIl = await $.isvObfuscator();
  if (lIli1iIl.code !== "0") {
    $.putMsg("获取Token失败");
    return;
  }
  $.Token = lIli1iIl?.["token"];
  if (["10054"].includes($.activityType)) {
    await $.login();
    let I11II = await $.api("/api/task/upperSign/getTask", {
      "shareUserId": ""
    });
    if (I11II.resp_code !== 0) {
      {
        $.putMsg("获取活动失败");
        $.putMsg(I11II.resp_code + " " + I11II.resp_msg);
        return;
      }
    }
    if (!I11II.data?.["taskList"]) {
      {
        $.putMsg("获取任务列表失败");
        return;
      }
    }
    if (I11II.resp_code == 0) {
      {
        $.skuList = [];
        for (let I1llllii of I11II?.["data"]?.["taskList"] || []) {
          if (I1llllii.completeCount >= I1llllii.finishNum || I1llllii.completeCount >= I1llllii.maxNum || I1llllii.status == 1) continue;
          let Il1i1l = I1llllii.finishNum - I1llllii.completeCount;
          if (I1llllii.taskType == "14") {
            $.log("每日签到");
            todo = await $.api("/api/basic/task/toDo", {
              "skuId": "",
              "taskId": I1llllii.taskId
            });
          }
          I1llllii.taskType == "2" && ($.log("浏览店铺"), todo = await $.api("/api/basic/task/toDo", {
            "skuId": "",
            "taskId": I1llllii.taskId
          }));
          if (I1llllii.taskType == "3") {
            $.log("浏览商品");
            for (let Ill1iII = 0; Ill1iII < Il1i1l; Ill1iII++) {
              skuId = I1llllii.skuInfoVO[Ill1iII].skuId;
              todo = await $.api("/api/basic/task/toDo", {
                "skuId": skuId,
                "taskId": I1llllii.taskId
              });
            }
          }
          if (I1llllii.taskType == "7") {
            {
              $.log("加购商品");
              for (let l1Il1llI = 0; l1Il1llI < Il1i1l; l1Il1llI++) {
                skuId = I1llllii.skuInfoVO[l1Il1llI].skuId;
                todo = await $.api("/api/basic/task/toDo", {
                  "skuId": skuId,
                  "taskId": I1llllii.taskId
                });
              }
            }
          }
          I1llllii.taskType == "4" && ($.log("浏览会场/直播"), todo = await $.api("/api/basic/task/toDo", {
            "skuId": "",
            "taskId": I1llllii.taskId
          }));
          I1llllii.taskType == "1" && ($.log("关注店铺"), todo = await $.api("/api/basic/task/toDo", {
            "skuId": "",
            "taskId": I1llllii.taskId
          }));
          if (I1llllii.taskType == "5") {
            {
              $.log("关注商品");
              for (let iIliiI = 0; iIliiI < Il1i1l; iIliiI++) {
                skuId = I1llllii.skuInfoVO[iIliiI].skuId;
                todo = await $.api("/api/basic/task/toDo", {
                  "skuId": skuId,
                  "taskId": I1llllii.taskId
                });
              }
            }
          }
        }
      }
    }
    let Il1iI1 = await $.api("/api/prize/drawPrize", {});
    $.canDrawTimes = Il1iI1.data.drawNumber || 0;
    $.consumePoints = 0;
    if ($.canDrawTimes === 0) {
      $.putMsg("抽奖次数0");
      return;
    }
    for (let IIlilIli = 0; $.canDrawTimes--; IIlilIli++) {
      {
        let iIl1Il1I = await $.api("/api/prize/draw", {
          "consumePoints": $.integral
        });
        if (iIl1Il1I.data == "1") {
          $.putMsg("积分不足");
          break;
        }
        if (iIl1Il1I.resp_code == "1000") {
          await $.api("/api/task/followShop/follow", {});
          $.canDrawTimes++;
          continue;
        }
        if (iIl1Il1I.resp_code == "0") {
          iIl1Il1I.data.dayTime == $.now("yyyy-MM-dd") ? ($.putMsg(iIl1Il1I.data.prizeName), iIl1Il1I.data.prizeType == 3 && ($.addressId = iIl1Il1I.data.addressId, $.prizeName = iIl1Il1I.data.prizeName, await $.saveAddress())) : $.putMsg("空气");
        } else $.putMsg(iIl1Il1I.resp_msg);
      }
    }
    return;
  }
  await $.getSimpleActInfoVo();
  if ($.expire) return;
  await $.getMyPing();
  if (!$.Pin) {
    return;
  }
  await $.accessLog();
  let l1i11Il = await $.api("wxActionCommon/getUserInfo", "pin=" + $.Pin);
  if (!l1i11Il.result) {
    $.putMsg("获取用户信息,结束运行");
    return;
  }
  $.nickname = l1i11Il.data.nickname;
  $.attrTouXiang = l1i11Il.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
  let II1lI1i1 = await $.api("drawCenter/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&nick=" + $.nickname + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&shareUuid=" + ($.uid || ""));
  if (!II1lI1i1.result || !II1lI1i1.data) {
    $.putMsg(II1lI1i1.errorMessage);
    await $.wxStop(II1lI1i1.errorMessage);
    return;
  }
  this.actStartTime = $.match(/(\d+-\d+-\d+ \d+:\d+) 至/, II1lI1i1.data.actRule);
  this.actEndTime = $.match(/至 (\d+-\d+-\d+ \d+:\d+)/, II1lI1i1.data.actRule);
  !$.uid && ($.uid = II1lI1i1.data.uid);
  let I111li = await $.api("drawCenter/getPrizeList", "activityId=" + $.activityId + "&activityType=" + $.activityType + "&venderId=" + $.venderId);
  if (I111li.result) {
    $.prizeList = I111li.data;
  }
  let l1l1iliI = $.prizeList.filter(lIilIlI1 => [6, 7, 9, 13, 14, 15, 16].includes(lIilIlI1.type));
  if (l1l1iliI.length === 0) {
    $.putMsg("垃圾或领完");
    $.expire = true;
    return;
  }
  let lllII1lI = await $.api("drawCenter/myInfo", "activityId=" + $.activityId + "&pin=" + $.Pin);
  if (!lllII1lI.result) {
    {
      $.putMsg("获取任务列表失败");
      return;
    }
  }
  $.skuList = [];
  for (let llli1i11 of lllII1lI?.["data"]?.["taskList"] || []) {
    if (llli1i11.curNum >= llli1i11.maxNeed) continue;
    let I1iii = llli1i11.maxNeed - llli1i11.curNum;
    console.log(llli1i11.taskId);
    if (llli1i11.taskId === "ordersku") {
      let IillI1lI = await $.api("drawCenter/getProduct", "activityId=" + $.activityId + "&pin=" + $.Pin + "&type=2");
      for (let il11Iii of IillI1lI?.["data"]["filter"](i111i11I => !i111i11I.taskDone)) {
        {
          if (I1iii <= 0) break;
          await $.api("drawCenter/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=ordersku&param=" + il11Iii.skuId);
          I1iii--;
        }
      }
    } else {
      if (llli1i11.taskId === "followsku") {
        $.log("followsku");
        let I11iIii1 = await $.api("drawCenter/getProduct", "activityId=" + $.activityId + "&pin=" + $.Pin + "&type=3");
        for (let llil1III of I11iIii1?.["data"]["filter"](llI1il1 => !llI1il1.taskDone)) {
          {
            if (I1iii <= 0) {
              break;
            }
            await $.api("drawCenter/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=followsku&param=" + llil1III.skuId);
            I1iii--;
          }
        }
      } else {
        if (llli1i11.taskId === "add2cart") {
          let lIiiiilI = await $.api("drawCenter/getProduct", "activityId=" + $.activityId + "&pin=" + $.Pin + "&type=1");
          for (let lllil1ll of lIiiiilI?.["data"]["filter"](Iil1Iiii => !Iil1Iiii.taskDone)) {
            {
              if (I1iii <= 0) break;
              $.skuList.push(lllil1ll.skuId);
              await $.api("drawCenter/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=add2cart&param=" + lllil1ll.skuId);
              I1iii--;
            }
          }
        } else {
          if (llli1i11.taskId === "scansku") {
            {
              let i111lIl1 = await $.api("drawCenter/getProduct", "activityId=" + $.activityId + "&pin=" + $.Pin + "&type=4");
              for (let Ii1iiIIi of i111lIl1?.["data"]["filter"](lliiIlll => !lliiIlll.taskDone)) {
                {
                  if (I1iii <= 0) break;
                  await $.api("drawCenter/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=scansku&param=" + Ii1iiIIi.skuId);
                  I1iii--;
                }
              }
            }
          } else await $.api("drawCenter/doTask", "activityId=" + $.activityId + "&pin=" + $.Pin + "&taskId=" + llli1i11.taskId + "&param=");
        }
      }
    }
  }
  II1lI1i1 = await $.api("drawCenter/activityContent", "activityId=" + $.activityId + "&pin=" + $.Pin + "&nick=" + $.nickname + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg") + "&shareUuid=" + $.uid);
  if (!II1lI1i1.result) {
    $.putMsg("获取不到活动信息,结束运行");
    $.expire = true;
    return;
  }
  $.canDrawTimes = II1lI1i1.data.chance || 0;
  if ($.canDrawTimes === 0) {
    $.putMsg("抽奖次数 " + $.canDrawTimes);
    $.expire = true;
    return;
  }
  for (let i111li1i = 0; i111li1i < Math.min($.canDrawTimes, 7); i111li1i++) {
    let ili1l1Il = await $.api("/drawCenter/draw/luckyDraw", "activityId=" + $.activityId + "&pin=" + $.Pin);
    if (ili1l1Il.result) ili1l1Il.data.drawOk ? ($.putMsg(ili1l1Il.data.name), ili1l1Il.data.needWriteAddress === "y" && ($.addressId = ili1l1Il.data.addressId, $.prizeName = ili1l1Il.data.name, await $.saveAddress())) : $.putMsg("空气");else {
      await $.wxStop(ili1l1Il.errorMessage);
      $.putMsg("" + ili1l1Il.errorMessage);
      break;
    }
  }
  $?.["skuList"]?.["length"] > 0 ? await $.carRmv($.skuList) : "";
};
$.after = async function () {
  try {
    for (let ilIiiIll of $.prizeList || []) {
      if (ilIiiIll?.["name"]?.["includes"]("谢谢") || ilIiiIll?.["name"]?.["includes"]("再来")) continue;
      $.msg.push("    " + (ilIiiIll?.["name"] || ilIiiIll?.["prizeName"]) + (ilIiiIll?.["type"] === 8 ? "专享价" : ""));
    }
  } catch (IiI1ii1I) {
    console.log(IiI1ii1I);
  }
  $.msg.push("export M_WX_CENTER_DRAW_URL=\"" + $.activityUrl + "\"");
};