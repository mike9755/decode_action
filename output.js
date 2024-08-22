//Thu Aug 22 2024 15:35:58 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  CryptoJS = require("crypto-js"),
  dplhIdList = (process.env.jd_dplh_viewShop_ids || "").split(/[,@\n]+/g).map(_0xecd2c5 => _0xecd2c5.trim()).filter(Boolean);
let taskThreads = process.env.jd_dplh_viewShop_threads || "1";
const runInterval = process.env.jd_dplh_viewShop_interval || "1000",
  isNotify = (process.env.jd_dplh_viewShop_notify || process.env.jd_dplh_viewShop_Notify) === "true",
  pinFilter = (process.env.jd_dplh_viewShop_pinFilter || "").split("@"),
  Testing = process.env.jd_dplh_viewShop_testing === "true",
  Nowater = process.env.jd_dplh_viewShop_nowater || "20";
let cookiesArr = Object.keys(jdCookie).map(_0x276e9c => jdCookie[_0x276e9c]).filter(_0x72309d => _0x72309d);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    title: $.name
  });
  await Main();
  isNotify && notify.getMessage() && (await notify.push());
})().catch(_0x27424f => $.logErr(_0x27424f)).finally(() => $.done());
async function Main() {
  try {
    if (dplhIdList.length === 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本");
      return;
    }
    const _0x5d2544 = [...new Set(dplhIdList)];
    try {
      const _0x137957 = parseInt(taskThreads);
      _0x137957 > 0 && _0x137957 !== 1 && (taskThreads = _0x137957);
      Testing && (taskThreads = 1);
    } catch {
      taskThreads = 1;
    }
    taskThreads = Math.min(taskThreads, 10);
    $.waitTime = null;
    if (runInterval) {
      try {
        const _0x1bd52b = parseInt(runInterval);
        _0x1bd52b >= 0 && ($.waitTime = _0x1bd52b);
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    console.log("==========" + $.name + "变量开启状态==========");
    console.log("测水功能: [" + (Testing ? "开启" : "关闭") + "]" + (Testing ? ", 连续无豆[" + Nowater + "]次跳过当前活动" : ", 不建议开启测水功能"));
    console.log("通用参数: [" + taskThreads + "]并发线程数, [" + $.waitTime / 1000 + "秒]运行间隔时长");
    console.log("代理开关: [" + common.getProxyStatus() + "]");
    console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]");
    console.log("账号过滤: [" + pinFilter.join(", ") + "]");
    console.log("==========" + $.name + "变量状态结束==========");
    console.log("");
    _0x5d2544.length > 0 && console.log("🏬 共计 " + _0x5d2544.length + " 个活动\n");
    for (let _0x35ee2c = 0; _0x35ee2c < _0x5d2544.length; _0x35ee2c++) {
      $.needRemoveCookieIndex = [];
      $.activityId = _0x5d2544[_0x35ee2c];
      console.log("🏬 开始 [" + $.activityId + "] 任务\n");
      await common.concTask(taskThreads, cookiesArr, taskFnc);
      $.hasPrintActInfo = false;
      $.runEnd = false;
      _0x35ee2c !== _0x5d2544.length - 1 && console.log("");
      $.needRemoveCookieIndex.length > 0 && (cookiesArr = cookiesArr.filter((_0x39c07c, _0x22b18d) => !$.needRemoveCookieIndex.includes(_0x22b18d + 1)), $.needRemoveCookieIndex = []);
    }
  } catch (_0x16243b) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x16243b);
  }
}
async function taskFnc(_0x2406a0, _0x4af21a) {
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  const _0x16de2c = decodeURIComponent(common.getCookieValue(_0x2406a0, "pt_pin"));
  function _0x58d328(_0x10dd43, _0x3c4c2d) {
    if (_0x10dd43.length <= 4) {
      return _0x10dd43;
    } else {
      const _0x589908 = _0x10dd43.slice(0, 2),
        _0x259e8e = _0x10dd43.slice(-2),
        _0x522ed2 = Math.max(_0x3c4c2d - _0x589908.length - _0x259e8e.length, 0),
        _0xb1f3e2 = "*".repeat(_0x522ed2);
      return _0x589908 + _0xb1f3e2 + _0x259e8e;
    }
  }
  const _0x5646c8 = decodeURIComponent(_0x16de2c),
    _0x588fb1 = _0x58d328(_0x5646c8, 6),
    _0x2e848e = "【账号" + _0x4af21a + "】" + _0x588fb1 + "：",
    _0x3d1b47 = notify.create(_0x4af21a, _0x16de2c);
  if (pinFilter.length > 0 && (pinFilter.includes(_0x16de2c) || pinFilter.includes(encodeURIComponent(_0x16de2c)))) {
    _0x3d1b47.fix("已设置跳过运行当前账号");
    console.log(_0x3d1b47.getInlineContent());
    $.needRemoveCookieIndex.push(_0x4af21a);
    return;
  }
  const _0x1456d8 = await common.getLoginStatus(_0x2406a0);
  if (!_0x1456d8 && typeof _0x1456d8 === "boolean") {
    console.log(_0x2e848e + "账号无效");
    _0x3d1b47.fix("账号无效");
    $.needRemoveCookieIndex.push(_0x4af21a);
    return;
  }
  const _0x46546a = common.genUA(_0x16de2c);
  let _0x3697f9 = "",
    _0x2ed2b0 = $.activityId,
    _0x3d4b18 = "10299171",
    _0x83d570 = "",
    _0x1b7282 = "jinggengjcq-isv.isvjcloud.com",
    _0x5844e8 = "https://" + _0x1b7282,
    _0x2c10e6 = "",
    _0x31d4b5 = false,
    _0x15c398 = false,
    _0x13532f = 0,
    _0x576ed6 = [],
    _0x3b9069 = "";
  _0x83d570 = await getToken(_0x2406a0, _0x5844e8);
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  if (!_0x83d570) {
    return;
  }
  await _0x5790e5("activity_load");
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  if (!_0x3697f9) {
    return;
  }
  if ($.runEnd || _0x31d4b5) {
    return;
  }
  _0x576ed6 = "";
  await _0x5790e5("shopList");
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  if (_0x576ed6) {
    for (let _0x10f18c of _0x576ed6 || []) {
      _0x3b9069 = _0x10f18c.userId;
      await _0x5790e5("viewShopMission");
      await $.wait(parseInt($.waitTime * 1 + 1500, 10));
      _0x3b9069 = "";
      if (_0x15c398) {
        break;
      }
      if (_0x13532f >= Nowater) {
        console.log(_0x2e848e + "连续" + Nowater + "次浏览都无京豆，跳过当前活动。");
        $.runEnd = true;
        break;
      }
    }
  }
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  async function _0x4f14a1(_0x335cb5, _0x4fbd11) {
    try {
      switch (_0x335cb5) {
        case "activity_load":
          if (_0x4fbd11.success && _0x4fbd11.data?.["status"] === 200) {
            _0x3697f9 = _0x4fbd11.data.data?.["missionCustomer"]?.["buyerNick"];
          } else {
            _0x4fbd11.data?.["status"] === 500 ? (["活动数据", "查询失败"].some(_0x34ef1a => _0x4fbd11.errorMessage.includes(_0x34ef1a)) ? (console.log(_0x2e848e + "该活动可能已结束，跳过当前活动。"), _0x3d1b47.fix("该活动可能已结束，跳过当前活动。"), $.runEnd = true) : console.log("" + _0x2e848e + _0x4fbd11.errorMessage), _0x31d4b5 = true) : console.log("❓" + _0x335cb5 + " " + JSON.stringify(_0x4fbd11));
          }
          break;
        case "shopList":
          if (_0x4fbd11.success && _0x4fbd11.data?.["status"] === 200) {
            _0x576ed6 = _0x4fbd11?.["data"]?.["data"] || [];
          } else {
            _0x4fbd11.data?.["status"] === 500 ? console.log("" + _0x2e848e + _0x4fbd11.errorMessage) : console.log("❓" + _0x335cb5 + " " + JSON.stringify(_0x4fbd11));
          }
          break;
        case "viewShopMission":
          if (_0x4fbd11.success && _0x4fbd11.data?.["status"] === 200) {
            const _0x1baffd = _0x4fbd11?.["data"]?.["data"];
            console.log("" + _0x2e848e + (_0x4fbd11.msg || _0x1baffd?.["remark"] || ""));
            _0x3d1b47.fix("" + (_0x4fbd11.msg || _0x1baffd?.["remark"] || ""));
            ["次数", "赠送"].some(_0x2933c9 => _0x1baffd?.["remark"]["includes"](_0x2933c9)) && (_0x15c398 = true);
            if (Testing) {
              let _0xab13db = _0x1baffd?.["remark"]["includes"]("京豆");
              _0xab13db ? _0x13532f = 0 : _0x13532f++;
            }
          } else {
            _0x4fbd11.data?.["status"] === 500 ? console.log("" + _0x2e848e + _0x4fbd11.errorMessage) : console.log("❓" + _0x335cb5 + " " + JSON.stringify(_0x4fbd11));
          }
          break;
      }
    } catch (_0x4782af) {
      console.log("❌ 未能正确处理 " + _0x335cb5 + " 请求响应 " + (_0x4782af.message || _0x4782af));
    }
  }
  async function _0x5790e5(_0x4d3357) {
    if ($.runEnd) {
      return;
    }
    let _0x11e450 = _0x5844e8,
      _0x146140 = null,
      _0x37f705 = null,
      _0x4e41a7 = "POST";
    switch (_0x4d3357) {
      case "activity_load":
        _0x11e450 += "/dm/front/jdJoinCardtf/activity/load";
        _0x37f705 = {
          open_id: "",
          mix_nick: _0x3697f9 || "",
          user_id: _0x3d4b18
        };
        _0x146140 = _0xdc6d5f("/jdJoinCardtf/activity/load", Object.assign({
          jdToken: _0x83d570,
          source: "01",
          inviteNick: _0x2c10e6 || ""
        }));
        break;
      case "shopList":
        _0x11e450 += "/dm/front/jdJoinCardtf/shop/shopList";
        _0x37f705 = {
          open_id: "",
          mix_nick: _0x3697f9 || "",
          user_id: _0x3d4b18
        };
        _0x146140 = _0xdc6d5f("/jdJoinCardtf/shop/shopList", {});
        break;
      case "viewShopMission":
        _0x11e450 += "/dm/front/jdJoinCardtf/mission/completeMission";
        _0x37f705 = {
          open_id: "",
          mix_nick: _0x3697f9 || "",
          user_id: _0x3d4b18
        };
        _0x146140 = _0xdc6d5f("/jdJoinCardtf/mission/completeMission", Object.assign({
          missionType: "viewShop"
        }, _0x3b9069 ? {
          goodsNumId: _0x3b9069
        } : {}));
        break;
      default:
        console.log("❌ 未知请求 " + _0x4d3357);
        return;
    }
    const _0x14b7fc = {};
    _0x146140 && Object.assign(_0x146140, _0x14b7fc);
    _0x37f705 && Object.assign(_0x37f705, _0x14b7fc);
    const _0x122b01 = {
      url: _0x11e450,
      method: _0x4e41a7,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x2406a0,
        "User-Agent": _0x46546a,
        "X-Requested-With": "XMLHttpRequest"
      },
      params: _0x37f705,
      data: _0x146140,
      timeout: 30000
    };
    _0x4e41a7 === "GET" && (delete _0x122b01.data, delete _0x122b01.headers["Content-Type"]);
    _0x5844e8.includes("jinggengjcq-isv.isvjcloud.com") && (Object.assign(_0x122b01.headers, {
      Origin: "https://jinggengjcq-isv.isvjcloud.com",
      "Content-Type": "application/json; charset=utf-8"
    }), delete _0x122b01.headers.Cookie);
    const _0x556f0e = 1;
    let _0x442bd6 = 0,
      _0x2e5cc2 = null;
    while (_0x442bd6 < _0x556f0e) {
      _0x442bd6 > 0 && (await $.wait(1000));
      const _0x3df309 = await common.request(_0x122b01);
      if (!_0x3df309.success) {
        _0x2e5cc2 = "🚫 " + _0x4d3357 + " 请求失败 ➜ " + _0x3df309.error;
        _0x442bd6++;
        continue;
      }
      if (!_0x3df309.data) {
        _0x2e5cc2 = "🚫 " + _0x4d3357 + " 请求失败 ➜ 无响应数据";
        _0x442bd6++;
        continue;
      }
      await _0x4f14a1(_0x4d3357, _0x3df309.data);
      break;
    }
    _0x442bd6 >= _0x556f0e && console.log(_0x2e5cc2);
  }
  function _0xdc6d5f(_0x1db4d1, _0x116eaa) {
    const _0x13c089 = mpdzSign({
        actId: _0x2ed2b0,
        ..._0x116eaa,
        method: _0x1db4d1,
        userId: _0x3d4b18,
        buyerNick: _0x3697f9 || ""
      }),
      _0x301585 = {
        jsonRpc: "2.0",
        params: {
          commonParameter: {
            m: "POST",
            oba: _0x13c089.sign,
            timestamp: _0x13c089.timeStamp,
            userId: _0x3d4b18
          },
          admJson: {
            actId: _0x2ed2b0,
            ..._0x116eaa,
            method: _0x1db4d1,
            userId: _0x3d4b18,
            buyerNick: _0x3697f9 || ""
          }
        }
      };
    _0x1db4d1.indexOf("missionInviteList") > -1 && delete _0x301585.params.admJson.actId;
    return _0x301585;
  }
}
function mpdzSign(_0xe4a007) {
  const _0x72ed4f = "6cc5dbd8900e434b94c4bdb0c16348ed",
    _0x25b7af = "c1614da9ac68",
    _0x1e279f = new Date().valueOf(),
    _0x22436c = new RegExp("'", "g"),
    _0xc8b2b3 = new RegExp("~", "g"),
    _0x372339 = encodeURIComponent(JSON.stringify(_0xe4a007)).replace(_0x22436c, "%27").replace(_0xc8b2b3, "%7E"),
    _0x5eb579 = "f" + _0x25b7af + "D" + _0x372339 + "c" + _0x1e279f + _0x72ed4f,
    _0x453b54 = CryptoJS.MD5(_0x5eb579.toLowerCase()).toString();
  return {
    sign: _0x453b54,
    timeStamp: _0x1e279f
  };
}