//Mon Sep 23 2024 14:02:21 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H");
let tokensList = (process.env.jd_dpqd_tokens || "").split(/[,@&|\n]+/g).filter(Boolean),
  taskThreads = process.env.jd_dpqd_task_threads || "1",
  accountThreads = process.env.jd_dpqd_account_threads || "1";
const runInterval = process.env.jd_dpqd_account_interval || "1000";
let signHotMaxRetryTimes = process.env.jd_dpqd_max_retry || "0";
const isNotify = process.env.jd_dpqd_prize_notify === "true";
let TokensMap = new Map();
const signStatusMessages = {
    403030023: "今日已签",
    404130026: "已达到签到上限",
    407100001: "活动尚未开始",
    407100002: "活动已经结束",
    407000007: "账号无效",
    402: "活动无效",
    "-1": "服务器繁忙"
  },
  invalidTokensMap = new Map(),
  CacheFile = __dirname + "/rs_dpqd_tokens.json",
  cookiesArr = Object.keys(jdCookie).map(_0x5ae8f1 => jdCookie[_0x5ae8f1]).filter(_0x5145dd => _0x5145dd);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  try {
    console.log("==========" + $.name + "变量开启状态==========");
    console.log("活动令牌: [" + tokensList.join(", ") + "]");
    console.log("代理开关: [" + common.getProxyStatus() + "]");
    console.log("间隔时长: [" + runInterval / 1000 + "秒]运行间隔时长");
    console.log("签到火爆时的最大重试次数: [" + signHotMaxRetryTimes + "]");
    console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]");
    console.log("==========" + $.name + "变量状态结束==========");
    console.log("");
    notify.config({
      title: $.name
    });
    if (tokensList.length > 0) {
      tokensList = [...new Set(tokensList.filter(_0x1637ac => _0x1637ac !== ""))];
    }
    if (tokensList.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }
    const _0x3ab016 = require("fs");
    if (_0x3ab016.existsSync(CacheFile)) {
      const _0x1bc6df = _0x3ab016.readFileSync(CacheFile, "utf-8"),
        _0x23a444 = JSON.parse(_0x1bc6df);
      for (const _0x3bcbc5 in _0x23a444) {
        TokensMap.set(_0x3bcbc5, _0x23a444[_0x3bcbc5]);
      }
    }
    $.waitTime = null;
    if (runInterval) {
      try {
        const _0x5d038c = parseInt(runInterval);
        _0x5d038c >= 0 && ($.waitTime = _0x5d038c);
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    try {
      const _0x404932 = parseInt(signHotMaxRetryTimes);
      signHotMaxRetryTimes = _0x404932 > 0 ? _0x404932 : 0;
    } catch {
      signHotMaxRetryTimes = 3;
    }
    try {
      const _0x450f5a = parseInt(taskThreads);
      _0x450f5a > 0 && _0x450f5a !== 1 && (taskThreads = _0x450f5a);
    } catch {
      taskThreads = 1;
    }
    try {
      const _0x159a35 = parseInt(accountThreads);
      _0x159a35 > 0 && _0x159a35 !== 1 && (accountThreads = _0x159a35);
    } catch {
      accountThreads = 1;
    }
    await common.concTask(accountThreads, cookiesArr, async (_0x4aa966, _0x289363) => {
      await concMain(taskThreads, tokensList, _0x4aa966, _0x289363, Main);
      if ($.waitTime) {
        await $.wait($.waitTime);
      }
    });
    isNotify && notify.getMessage() && (await notify.push());
  } catch (_0x37569a) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x37569a);
  }
})().catch(_0x5886e8 => $.logErr(_0x5886e8)).finally(() => $.done());
async function Main(_0x5988b7, _0x11d2a0) {
  const {
    title: _0x44ff4b,
    UA: _0x10669c,
    cookie: _0x4edb30,
    message: _0x32b818
  } = _0x11d2a0;
  if (invalidTokensMap.get(_0x5988b7)) {
    return;
  }
  let _0x28f45f = "",
    _0x46064c = "";
  const _0x1ee77e = TokensMap.get(_0x5988b7);
  if (_0x1ee77e) {
    _0x28f45f = _0x1ee77e.venderId;
    _0x46064c = _0x1ee77e.activityId;
  } else {
    try {
      if (_0x5988b7.includes(":") && _0x5988b7.split(":").length === 3) {
        const _0x416569 = _0x5988b7.split(":");
        if (!_0x416569[0] || !_0x416569[1] || !_0x416569[2]) {
          return;
        }
        _0x5988b7 = _0x416569[0];
        if (_0x5988b7.length !== 32 || !/^[A-Z0-9]*$/.test(_0x5988b7)) {
          return;
        }
        _0x46064c = _0x416569[1];
        _0x28f45f = _0x416569[2];
        _0x416569[2].startsWith("123") && _0x416569[2].length === 8 && !_0x416569[1].startsWith("123") && (_0x46064c = _0x416569[2], _0x28f45f = _0x416569[1]);
        TokensMap.set(_0x5988b7, {
          index: null,
          venderId: _0x28f45f,
          shopName: "",
          activityId: _0x46064c,
          startTime: "",
          endTime: "",
          isValid: true,
          rules: [],
          minLevel: null,
          maxLevel: null
        });
      }
    } catch (_0x25659f) {
      return;
    }
  }
  if (!_0x28f45f || !_0x46064c) {
    return;
  }
  const _0x148572 = Math.floor(Date.now() / 1000) + "000";
  if (invalidTokensMap.get(_0x5988b7)) {
    return;
  }
  let _0x2a7f0a = false,
    _0x5083ba;
  await _0x28a2e6("signCollectGift");
  if ($.waitTime) {
    await $.wait($.waitTime);
  }
  if (_0x2a7f0a && signHotMaxRetryTimes > 0) {
    let _0x36723d = 0;
    while (_0x36723d < signHotMaxRetryTimes) {
      if (invalidTokensMap.get(_0x5988b7)) {
        return;
      }
      await _0x28a2e6("signCollectGift");
      if ($.waitTime) {
        await $.wait($.waitTime);
      }
      if (!_0x2a7f0a) {
        break;
      }
      _0x36723d++;
    }
  }
  function _0x3fd3c9(_0x1e66f5, _0x47d86f) {
    try {
      switch (_0x1e66f5) {
        case "signCollectGift":
          if (_0x47d86f.code === 200 && _0x47d86f.success === true) {
            const _0x5ce678 = [];
            if (_0x47d86f.data && _0x47d86f.data.length > 0) {
              for (const _0x3987d1 of _0x47d86f.data) {
                const _0x175b39 = _0x3987d1?.["prizeList"] || [];
                for (const _0x382dc5 of _0x175b39) {
                  const _0x3faac2 = _0x382dc5?.["type"],
                    _0x2c015d = _0x382dc5?.["discount"];
                  let _0x1237b1 = "";
                  switch (_0x3faac2) {
                    case 1:
                      _0x1237b1 = "优惠券🗑️";
                      break;
                    case 4:
                      _0x1237b1 = _0x2c015d + "京豆🐶";
                      break;
                    case 6:
                      _0x1237b1 = _0x2c015d + "店铺积分🎟️";
                      break;
                    case 9:
                      console.log(_0x382dc5);
                      _0x1237b1 = (_0x382dc5?.["interactPrizeSkuList"][0]?.["skuName"] || "未知") + "🎁";
                      break;
                    case 10:
                      _0x1237b1 = _0x2c015d + "元E卡🎁";
                      break;
                    case 14:
                      _0x1237b1 = _0x2c015d / 100 + "元红包🧧";
                      break;
                    default:
                      _0x1237b1 = "未知奖品（" + _0x3faac2 + "）";
                  }
                  _0x5ce678.push(_0x1237b1);
                }
              }
            }
            if (_0x5ce678.length > 0) {
              console.log("" + _0x44ff4b + _0x5988b7 + " ➜ ✅ " + _0x5083ba + " " + _0x5ce678.join("，"));
              for (const _0x2ac0b3 of _0x5ce678) {
                _0x32b818.insert(_0x2ac0b3);
              }
            } else {
              console.log("" + _0x44ff4b + _0x5988b7 + " ➜ ✅ " + _0x5083ba + " 💨");
            }
            _0x2a7f0a = false;
          } else {
            if (_0x47d86f.code !== 200) {
              const _0x2c4f4a = signStatusMessages[_0x47d86f.code] || _0x47d86f.code + "|活动太火爆";
              [407100001, 407100002, 402].includes(_0x47d86f.code) && invalidTokensMap.set(_0x5988b7, true);
              console.log("" + _0x44ff4b + _0x5988b7 + " ➜ ❌ " + _0x5083ba + " " + _0x2c4f4a);
              (_0x47d86f.code === "-1" || _0x47d86f.code === -1) && (_0x2a7f0a = true);
            } else {
              if (_0x47d86f.msg) {
                console.log("" + _0x44ff4b + _0x5988b7 + " ➜ ❌ " + _0x5083ba + " " + _0x47d86f.msg);
                if (!signStatusMessages[_0x47d86f.code]) {
                  _0x2a7f0a = true;
                }
              } else {
                console.log("" + _0x44ff4b + _0x5988b7 + " ➜ ❌ " + _0x5083ba + " " + JSON.stringify(_0x47d86f));
              }
            }
          }
          break;
      }
    } catch (_0xc74088) {
      console.log("❌ 未能正确处理 " + _0x1e66f5 + " 请求响应 " + (_0xc74088.message || _0xc74088));
    }
  }
  async function _0x28a2e6(_0x5d6d93) {
    let _0x4a3d00 = "",
      _0x25926f = null,
      _0x5e27af = null,
      _0x2e8274 = "GET",
      _0x4c680a = {},
      _0x449ddc = {};
    switch (_0x5d6d93) {
      case "signCollectGift":
        _0x449ddc = {
          appId: "4da33",
          functionId: "interact_center_shopSign_signCollectGift",
          appid: "interCenter_shopSign",
          body: {
            token: _0x5988b7,
            venderId: parseInt(_0x28f45f) || "",
            activityId: parseInt(_0x46064c) || "",
            type: 56,
            actionType: 7
          },
          version: "4.7",
          ua: _0x10669c
        };
        _0x4c680a = await H5st.getH5st(_0x449ddc);
        _0x4a3d00 = "https://api.m.jd.com/api";
        _0x5e27af = Object.assign({}, _0x4c680a.paramsData, {
          jsonp: "jsonp1003"
        });
        break;
    }
    const _0x31fe33 = {
      t: _0x148572,
      loginType: "2"
    };
    _0x25926f && Object.assign(_0x25926f, _0x31fe33);
    _0x5e27af && Object.assign(_0x5e27af, _0x31fe33);
    const _0x3d8527 = {
      url: _0x4a3d00,
      method: _0x2e8274,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "text/plain",
        Host: "api.m.jd.com",
        Referer: "https://h5.m.jd.com/",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": _0x10669c,
        Cookie: _0x4edb30
      },
      params: _0x5e27af,
      data: _0x25926f,
      timeout: 30000
    };
    _0x2e8274 === "GET" && (delete _0x3d8527.data, delete _0x3d8527.headers["Content-Type"]);
    const _0x2c6a35 = 3;
    let _0x54c719 = 0,
      _0x5afeb3 = null,
      _0x3b5d12 = false;
    while (_0x54c719 < _0x2c6a35) {
      _0x5083ba = common.formatTime("HH:mm:ss.S");
      const _0x7ed72d = await common.request(_0x3d8527);
      if (!_0x7ed72d.success) {
        _0x5afeb3 = "" + _0x44ff4b + _0x5988b7 + " ➜ 请求失败（" + _0x7ed72d.error + "）🚫";
        _0x54c719++;
        continue;
      }
      if (!_0x7ed72d.data) {
        _0x5afeb3 = "" + _0x44ff4b + _0x5988b7 + " ➜ 请求失败（无响应数据）🚫";
        _0x54c719++;
        continue;
      }
      _0x3fd3c9(_0x5d6d93, _0x7ed72d.data);
      _0x3b5d12 = false;
      break;
    }
    _0x54c719 >= _0x2c6a35 && (console.log(_0x5afeb3), _0x3b5d12 && ($.outFlag = true));
  }
}
async function concMain(_0x118654 = 1, _0xfd71c3, _0x327f5c, _0x23e571, _0x146444) {
  const _0x57c147 = _0xfd71c3.map(_0x210473 => _0x210473),
    _0x204bfd = decodeURIComponent(common.getCookieValue(_0x327f5c, "pt_pin")),
    _0x573b15 = "【账号" + _0x23e571 + "】" + _0x204bfd + "：",
    _0xf0448b = await common.getLoginStatus(_0x327f5c);
  if (!_0xf0448b && typeof _0xf0448b === "boolean") {
    console.log(_0x573b15 + "账号无效 🚫");
    return;
  }
  const _0x5e5e24 = notify.create(_0x23e571, _0x204bfd),
    _0xb429c2 = common.genUA(_0x204bfd),
    _0xfd4e7a = {
      cookie: _0x327f5c,
      index: _0x23e571,
      title: _0x573b15,
      UA: _0xb429c2,
      message: _0x5e5e24
    };
  let _0x19d932 = 0;
  async function _0x5da93c(_0x1e119a) {
    await _0x146444(_0x1e119a, _0xfd4e7a);
    _0x19d932--;
    _0x651f03();
  }
  async function _0x651f03() {
    while (_0x19d932 < _0x118654 && _0x57c147.length > 0) {
      const _0x350066 = _0x57c147.shift();
      _0x19d932++;
      await _0x5da93c(_0x350066);
    }
  }
  const _0x4574c3 = Math.min(_0x57c147.length, _0x118654),
    _0xdae0a4 = [];
  for (let _0x23ccaf = 0; _0x23ccaf < _0x4574c3; _0x23ccaf++) {
    const _0x8a6a8 = _0x57c147.shift();
    _0x19d932++;
    _0xdae0a4.push(_0x5da93c(_0x8a6a8));
  }
  await Promise.all(_0xdae0a4);
  _0x651f03();
  await new Promise(_0x1362e4 => {
    const _0x29bfcf = setInterval(() => {
      _0x19d932 === 0 && (clearInterval(_0x29bfcf), _0x1362e4());
    }, 100);
  });
}