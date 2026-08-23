//Sun Aug 23 2026 16:05:49 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  const illI1iiI = "https://api.m.jd.com/client.action";
  let iliiI11I = "functionId=jm_marketing_maininfo&body=%7B%22shopId%22%3A%2212765935%22%2C%22venderId%22%3A%2213577546%22%2C%22projectId%22%3A358620%7D&t=1697155128683&eid=eidIde5c812183sbwkZEkK6%2FTCezMUyGy3rdu8JGRgfcBCAt40UcQi3vl8KucZUDXY9IDHh3YGNPj%2BnDWMIUs19jQaju%2FLkzCeIe030URPX5cdlBMNhF&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=70492ed7d2e0f3c29baa49e8f4a45a3812d922a3";
  const iI1l1iII = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "" + $.cookie,
    "Connection": "keep-alive",
    "Accept": "*/*",
    "Referer": "https://service.vapp.jd.com/3CCA5269C1CA14CA76B9955243C60F78/1/page-frame.html",
    "Host": "api.m.jd.com",
    "User-Agent": "JD4iPhone/168684 (iPhone; iOS 16.2; Scale/3.00)",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9"
  };
  let lI1Ilii1 = await $.request(illI1iiI, iI1l1iII, iliiI11I);
  if (lI1Ilii1.data.code !== 200) {
    console.log("请手动确认活动");
    return;
  }
  let liilllil = lI1Ilii1.data.data.project.viewTaskVOS;
  if ($.timestamp() > lI1Ilii1.data.data.project.endTime) {
    {
      $.expire = true;
      $.putMsg("活动已结束，通知作者删除");
      return;
    }
  }
  $.log("关注店铺");
  iliiI11I = "functionId=followShop&body=%7B%22shopId%22%3A%2212765935%22%2C%22follow%22%3Atrue%2C%22type%22%3A0%2C%22sourceRpc%22%3A%22shop_app_myfollows_shop%22%2C%22refer%22%3A%22https%3A%2F%2Fwq.jd.com%2Fpages%2Findex%2Findex%22%7D&t=1697113701851&eid=eidIde5c812183sbwkZEkK6%2FTCezMUyGy3rdu8JGRgfcBCAt40UcQi3vl8KucZUDXY9IDHh3YGNPj%2BnDWMIUs19jQaju%2FLkzCeIe030URPX5cdlBMNhF&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=70492ed7d2e0f3c29baa49e8f4a45a3812d922a3";
  let ilIl11I = await $.request(illI1iiI, iI1l1iII, iliiI11I);
  for (let lI1I1iII of liilllil.filter(lI11Illl => [2, 4].includes(lI11Illl.type) && lI11Illl.finishCount === 0)) {
    $.log(lI1I1iII.name);
    iliiI11I = "functionId=jm_task_process&body=%7B%22shopId%22%3A%2212765935%22%2C%22venderId%22%3A%2213577546%22%2C%22projectId%22%3A358620%2C%22taskId%22%3A" + lI1I1iII.id + "%2C%22token%22%3A%22" + lI1I1iII.token + "%22%2C%22opType%22%3A2%2C%22referSource%22%3A10084096558196%7D&t=1697113686255&eid=eidIde5c812183sbwkZEkK6%2FTCezMUyGy3rdu8JGRgfcBCAt40UcQi3vl8KucZUDXY9IDHh3YGNPj%2BnDWMIUs19jQaju%2FLkzCeIe030URPX5cdlBMNhF&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=70492ed7d2e0f3c29baa49e8f4a45a3812d922a3";
    let l11Ili = await $.request(illI1iiI, iI1l1iII, iliiI11I);
  }
  let llli1lil = liilllil.filter(iIi1Il => iIi1Il.name.includes("抽奖"))[0].token,
    ililIIi = liilllil.filter(lI11Iii => lI11Iii.name.includes("抽奖"))[0].id;
  while (true) {
    try {
      iliiI11I = "functionId=jm_task_process&body=%7B%22shopId%22%3A%2212765935%22%2C%22venderId%22%3A%2213577546%22%2C%22projectId%22%3A358620%2C%22taskId%22%3A" + ililIIi + "%2C%22token%22%3A%22" + llli1lil + "%22%2C%22opType%22%3A2%2C%22referSource%22%3A10084096558196%7D&t=1697113686255&eid=eidIde5c812183sbwkZEkK6%2FTCezMUyGy3rdu8JGRgfcBCAt40UcQi3vl8KucZUDXY9IDHh3YGNPj%2BnDWMIUs19jQaju%2FLkzCeIe030URPX5cdlBMNhF&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=70492ed7d2e0f3c29baa49e8f4a45a3812d922a3";
      let i111IIli = await $.request(illI1iiI, iI1l1iII, iliiI11I);
      if (i111IIli?.["data"]?.["msg"]?.["includes"]("不足")) break;
      let iIIlIIIl = i111IIli?.["data"]?.["data"]?.["awardVO"];
      if (!i111IIli.data.success || !iIIlIIIl) {
        i111IIli.data.msg && $.log(i111IIli.data.msg);
        continue;
      }
      debugger;
      let IIIil11i = iIIlIIIl.discount + iIIlIIIl.name;
      $.putMsg(IIIil11i);
      if (iIIlIIIl.type === 1) {
        break;
      }
    } catch (IiIliII) {
      $.log(IiIliII);
    }
  }
};