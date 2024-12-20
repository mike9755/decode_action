//Fri Dec 20 2024 14:16:55 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie");
const notify = require("./utils/Rebels_sendJDNotify");
const wpnotify = require("./sendNotify");
const common = require("./utils/Rebels_jdCommon");
const {
  H5st
} = require("./utils/Rebels_H");
const cryptoJS = require("crypto-js");
let taskThreads = process.env.jd_bean_change__threads || "1";
const runInterval = process.env.jd_bean_change_interval || "1500";
const isNotify = (process.env.jd_bean_change_notify || process.env.jd_bean_change_Notify) === "true";
const prizeNotify = process.env.jd_bean_change_prizeNotify === "true";
const mainnotify = process.env.jd_bean_change_mainnotify === "true";
const WP_APP_TOKEN_ONE = process.env.WP_APP_TOKEN_ONE || "";
const pinFilter = (process.env.jd_bean_change_pinFilter || "").split("@");
const ForFarm = !(process.env.jd_bean_change_farm === "false");
const XinForFarm = !(process.env.jd_bean_change_xinfarm === "false");
const wanyiwan = !(process.env.jd_bean_change_wyw === "false");
const hbChannel = !(process.env.jd_bean_change_hbChannel === "false");
const ecard = !(process.env.jd_bean_change_ecard === "false");
const plantBean = !(process.env.jd_bean_change_plantBean === "false");
const market = !(process.env.jd_bean_change_market === "false");
const marketCard = !(process.env.jd_bean_change_marketcard === "false");
const phonebill = !(process.env.jd_bean_change_phonebill === "false");
const Comment = !(process.env.jd_bean_change_comment === "false");
const myhongbao = !(process.env.jd_bean_change_hongbao === "false");
const jingBean = !(process.env.jd_bean_change_jingbean === "false");
const coupon = !(process.env.jd_bean_change_coupon === "false");
const wallet = !(process.env.jd_bean_change_wallet === "false");
const intPerSent = process.env.jd_bean_change_intpersent || "5";
const maxThreads = 1;
const today = new Date($.time("yyyy-MM-dd 00:00:00")).getTime();
const yesterday = today - 86400000;
const tomorrow = today + 86400000;
const dayAfterTomorrow = today + 172800000;
const KEY_TOTAL = 0;
const KEY_TOMORROW = 1;
const KEY_DAY_AFTER_TOMORROW = 2;
let cookiesArr = Object.keys(jdCookie).map(_0x31c44d => jdCookie[_0x31c44d]).filter(_0xd0ec3d => _0xd0ec3d);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    title: $.name
  });
  await Main();
})().catch(_0x3d7f4d => $.logErr(_0x3d7f4d)).finally(() => $.done());
async function Main() {
  try {
    try {
      const _0x24644f = parseInt(taskThreads);
      _0x24644f > 0 && _0x24644f !== 1 && (taskThreads = _0x24644f);
    } catch {
      taskThreads = 1;
    }
    taskThreads = Math.min(taskThreads, maxThreads);
    $.waitTime = null;
    if (runInterval) {
      try {
        const _0x5da20d = parseInt(runInterval);
        _0x5da20d >= 0 && ($.waitTime = _0x5da20d);
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    console.log("==========" + $.name + "变量开启状态==========");
    console.log("间隔时长: [" + $.waitTime / 1000 + "秒]运行间隔时长");
    console.log("东东农场: [" + (ForFarm ? "开启" : "关闭") + "],新东东农场: [" + (XinForFarm ? "开启" : "关闭") + "]");
    console.log("话费积分: [" + (phonebill ? "开启" : "关闭") + "],超市卡余额: [" + (marketCard ? "开启" : "关闭") + "]");
    console.log("评论查询: [" + (Comment ? "开启" : "关闭") + "],礼品卡余额: [" + (ecard ? "开启" : "关闭") + "]");
    console.log("红包查询: [" + (myhongbao ? "开启" : "关闭") + "],玩一玩奖票: [" + (wanyiwan ? "开启" : "关闭") + "]");
    console.log("过期京豆: [" + (jingBean ? "开启" : "关闭") + "],优惠券查询: [" + (coupon ? "开启" : "关闭") + "]");
    console.log("钱包余额: [" + (wallet ? "开启" : "关闭") + "],小程序省钱币: [" + (hbChannel ? "开启" : "关闭") + "]");
    console.log("汪贝余额: [" + (market ? "开启" : "关闭") + "],种豆得豆: [" + (plantBean ? "开启" : "关闭") + "]");
    console.log("代理开关: [" + common.getProxyStatus() + "]");
    console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]" + (isNotify ? ", 分段数量: [" + intPerSent + "]," : ""));
    console.log("单独推送: [" + (prizeNotify ? "开启" : "关闭") + "],一对一推送: [" + (WP_APP_TOKEN_ONE ? "开启" : "关闭") + "]");
    console.log("成熟和快过期通知: [" + (mainnotify ? "开启" : "关闭") + "]");
    console.log("账号过滤: [" + pinFilter.join(", ") + "]");
    console.log("==========" + $.name + "变量状态结束==========");
    console.log("");
    await common.concTask(taskThreads, cookiesArr, taskFnc);
    $.runEnd = false;
  } catch (_0x3ee03d) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x3ee03d);
  }
}
async function taskFnc(_0x169f9d, _0x2938b2) {
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  const _0x12304c = decodeURIComponent(common.getCookieValue(_0x169f9d, "pt_pin"));
  const _0x19202e = "【账号" + _0x2938b2 + "】" + _0x12304c + "：";
  const _0x3f28e1 = notify.create(_0x2938b2, _0x12304c);
  if (pinFilter.length > 0 && (pinFilter.includes(_0x12304c) || pinFilter.includes(encodeURIComponent(_0x12304c)))) {
    _0x3f28e1.fix("已设置跳过运行当前账号");
    console.log(_0x3f28e1.getInlineContent());
    return;
  }
  const _0xf9a968 = await common.getLoginStatus(_0x169f9d);
  if (!_0xf9a968 && typeof _0xf9a968 === "boolean") {
    console.log(_0x19202e + "账号无效");
    _0x3f28e1.fix("账号无效");
    return;
  }
  const _0x265f0f = common.genUA(_0x12304c);
  let _0x822ffe = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  let _0x50b6fd = [];
  let _0x31b66f = [];
  let _0x3a2564 = {
    total: [0, 0, 0],
    common: [0, 0, 0],
    jdapp: [0, 0, 0],
    lite: [0, 0, 0],
    minip: [0, 0, 0]
  };
  let _0xbabd67 = 0;
  let _0x440b9b = {
    today_in: 0,
    today_out: 0,
    yesterday_in: 0,
    yesterday_out: 0,
    detail: {}
  };
  await _0x4e39ca();
  await $.wait(parseInt($.waitTime * 1 + 200, 10));
  await _0x2564d5();
  await $.wait(parseInt($.waitTime * 1 + 200, 10));
  ForFarm && (await _0x23c233(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  XinForFarm && (await _0x920ffb(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  plantBean && (await _0x3f6047(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  coupon && (await _0x14784f(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  wallet && (await _0x5b90ed(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  ecard && (await _0x40635a(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  marketCard && (await _0x4b4f49(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  hbChannel && (await _0x37ab0e(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  wanyiwan && (await _0x21e11c(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  phonebill && (await _0x5815fd(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  market && (await _0x10e87c(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  Comment && (await _0x2173ae(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  myhongbao && (await _0x8e950d(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  jingBean && (await _0x37e6ac(), await $.wait(parseInt($.waitTime * 1 + 200, 10)));
  if (_0x50b6fd && _0x50b6fd.length > 0) {
    console.log("" + _0x19202e);
    console.log("" + _0x50b6fd.join("\n"));
    const _0x3c2a11 = "\n----------------------------------------\n";
    const _0x4f959c = "\n下方详情\n";
    _0x3f28e1.insert("" + _0x4f959c + _0x50b6fd.join("\n") + _0x3c2a11);
    console.log("----------------------------------------");
  }
  prizeNotify && _0x50b6fd && _0x50b6fd.length > 0 && (await notify.sendNotify($.name + "通知", "【京东账号" + _0x2938b2 + "】" + _0x12304c + "\n" + _0x50b6fd.join("\n")));
  mainnotify && _0x31b66f && _0x31b66f.length > 0 && (await notify.sendNotify("白嫖or快过期通知", "【京东账号" + _0x2938b2 + "】" + _0x12304c + "\n" + _0x31b66f.join("\n")));
  if (WP_APP_TOKEN_ONE && _0x50b6fd && _0x50b6fd.length > 0) {
    try {
      await wpnotify.sendNotifybyWxPucher("资产变动通知", "" + _0x50b6fd.join("\n"), "" + _0x12304c);
    } catch (_0x4019b9) {
      _0x4019b9 instanceof TypeError ? console.error("请使用本库配套的sendNotify.js文件进行一对一推送设置") : console.error("请使用本库配套的sendNotify.js文件进行一对一推送设置");
    }
  }
  intPerSent > 0 && (_0x2938b2 % intPerSent == 0 || _0x2938b2 === cookiesArr.length) && isNotify && notify.getMessage() && (await notify.push(), notify.disposeAllMessage());
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  await $.wait(parseInt($.waitTime * 1 + 200, 10));
  async function _0x457c63(_0x241e5b) {
    _0x50b6fd.push(_0x241e5b);
  }
  async function _0x4e39ca() {
    const _0x5a5a7f = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json;charset=UTF-8",
        Cookie: _0x169f9d,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42"
      },
      timeout: 30000
    };
    const _0x321b6c = 3;
    let _0x142933 = 0;
    while (_0x142933 < _0x321b6c) {
      _0x142933 > 0 && (await $.wait(1000));
      const _0x3afbd5 = await common.request(_0x5a5a7f);
      if (_0x3afbd5.data) {
        let _0x929507 = _0x3afbd5.data;
        if (_0x929507.retcode === "0") {
          if (_0x929507.data) {
            if (_0x929507.data && _0x929507.data.userInfo && _0x929507.data.userInfo.baseInfo) {
              let _0x4ab92e = _0x929507.data.userInfo.baseInfo;
              _0x457c63("【账号名称】" + _0x4ab92e.nickname);
              _0x929507.data.userInfo.isPlusVip == 1 ? _0x457c63("【账号信息】PLUS会员，" + _0x4ab92e.levelName + "，" + _0x4ab92e.userLevel + "分") : _0x457c63("【账号信息】普通会员，" + _0x4ab92e.levelName + "，" + _0x4ab92e.userLevel + "分");
              _0x457c63("【当前京豆】" + _0x929507.data.assetInfo.beanNum + "京豆");
            }
            if (_0x929507.data && _0x929507.data.assetInfo && _0x929507.data.assetInfo.baitiaoInfo) {
              let _0x473e76 = _0x929507.data.assetInfo.baitiaoInfo;
              if (_0x473e76.baiTiaoStatus === "0") {
                let _0xbc56bb = parseFloat(_0x473e76.availableLimit) || 0;
                let _0xb8f6d6 = parseFloat(_0x473e76.unpaidForAll) || 0;
                let _0x336ef0 = _0xbc56bb + _0xb8f6d6;
                _0x457c63("【白条余额】" + _0xbc56bb.toFixed(2) + "元,【待还】" + _0xb8f6d6.toFixed(2) + "元,【总额度】" + _0x336ef0.toFixed(2) + "元");
              }
            }
          }
        }
      }
      break;
    }
  }
  async function _0x2564d5(_0x292b78 = 1) {
    params = {
      page: _0x292b78
    };
    const _0x17c286 = {
      url: "https://bean.m.jd.com/beanDetail/detail.json",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json;charset=UTF-8",
        Cookie: _0x169f9d,
        "User-Agent": _0x265f0f
      },
      params: params,
      timeout: 30000
    };
    const _0x45227e = 3;
    let _0xb278cd = 0;
    while (_0xb278cd < _0x45227e) {
      _0xb278cd > 0 && (await $.wait(1000));
      const _0x347c7f = await common.request(_0x17c286);
      if (_0x347c7f.data) {
        let _0x5c2dd7 = _0x347c7f.data;
        if (_0x5c2dd7.code === "0" && _0x5c2dd7.success) {
          let _0x573fba = _0x5c2dd7?.["jingDetailList"] || [];
          let _0x2de87a = _0x573fba?.["length"] ? true : false;
          for (let _0x47cff8 of _0x573fba) {
            let _0x3b6582 = Number(_0x47cff8.amount);
            let _0x2bee30 = new Date(_0x47cff8.date).getTime();
            if (_0x2bee30 < yesterday) {
              _0x2de87a = false;
            } else {
              if (_0x2bee30 < today) {
                _0x3b6582 >= 0 ? _0x440b9b.yesterday_in += _0x3b6582 : _0x440b9b.yesterday_out += _0x3b6582;
              } else {
                if (_0x3b6582 >= 0) {
                  let _0x3e4d09 = _0x47cff8.eventMassage;
                  let _0xbdc2a6 = _0x3e4d09?.["match"](/\[(.*)\]/);
                  _0xbdc2a6 && (_0x3e4d09 = _0xbdc2a6[1]);
                  if (_0x3e4d09?.["includes"]("退还京豆")) {
                    continue;
                  }
                  _0x440b9b.today_in += _0x3b6582;
                  if (!_0x440b9b.detail[_0x3e4d09]) {
                    _0x440b9b.detail[_0x3e4d09] = 0;
                  }
                  _0x440b9b.detail[_0x3e4d09] += _0x3b6582;
                } else {
                  _0x440b9b.today_out += _0x3b6582;
                }
              }
            }
          }
          _0x2de87a ? await _0x2564d5(_0x292b78 + 1) : (_0x457c63("【今日京豆】收入" + _0x440b9b.today_in + "京豆,支出" + _0x440b9b.today_out + "京豆"), _0x457c63("【昨日京豆】收入" + _0x440b9b.yesterday_in + "京豆,支出" + _0x440b9b.yesterday_out + "京豆"));
        }
      }
      break;
    }
  }
  async function _0x5b90ed() {
    params = {
      functionId: "walletBalance",
      body: JSON.stringify({
        walletFlag: 1,
        tenantCode: "jgm",
        bizModelCode: "6",
        bizModeClientType: "M",
        externalLoginType: "1"
      }),
      t: Date.now(),
      appid: "jd-cphdeveloper-m",
      client: "m",
      g_ty: "h5",
      g_tk: "",
      appCode: "ms0ca95114",
      loginType: "2",
      sceneval: "2"
    };
    const _0x4f39b6 = {
      url: "https://api.m.jd.com/api",
      method: "GET",
      headers: {
        origin: "https://wqs.jd.com",
        referer: "https://wqs.jd.com/my/walletnum.html?sceneval=2&jxsid=17176804547450573894&appCode=ms0ca95114",
        "User-Agent": "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
        Cookie: _0x169f9d
      },
      params: params,
      timeout: 30000,
      httpsTlsOptions: common.useAppTls()
    };
    const _0x13f767 = 3;
    let _0x4a139d = 0;
    while (_0x4a139d < _0x13f767) {
      _0x4a139d > 0 && (await $.wait(1000));
      const _0x1a5786 = await common.request(_0x4f39b6);
      if (_0x1a5786.data) {
        let _0x1e480d = _0x1a5786.data;
        _0x1e480d.code === "0" && _0x1e480d.result && _0x457c63("【京东钱包】" + _0x1e480d.result.walletBalance + "元");
      }
      break;
    }
  }
  async function _0x5815fd() {
    body = await _0x547162();
    params = {
      appid: "h5-sep",
      functionId: "DATAWALLET_USER_SIGN_INFO",
      body: JSON.stringify(body),
      client: "m",
      clientVersion: "6.0.0"
    };
    const _0x5bf6b4 = {
      url: "https://api.m.jd.com/api?functionId=DATAWALLET_USER_SIGN_INFO",
      method: "POST",
      headers: {
        Accept: "*/*",
        Cookie: _0x169f9d,
        Referer: "https://mypoint.jd.com/predeem/?sid=&un_area=4_50952_60426_0",
        Origin: "https://mypoint.jd.com",
        "User-Agent": _0x265f0f
      },
      params: params,
      timeout: 30000
    };
    const _0x1a2786 = 3;
    let _0x19c06c = 0;
    while (_0x19c06c < _0x1a2786) {
      _0x19c06c > 0 && (await $.wait(1000));
      const _0x388b9f = await common.request(_0x5bf6b4);
      if (_0x388b9f.data) {
        let _0x448da7 = _0x388b9f.data;
        if (_0x448da7.code === 200) {
          if (_0x448da7.data) {
            let _0xedbc00 = _0x448da7.data.totalNum || 0;
            let _0x428ef6 = "【话费积分】" + _0xedbc00;
            _0xedbc00 > 11.7 && (_0x428ef6 += "(可以兑换话费了)", _0x31b66f.push("【话费积分】" + _0xedbc00 + "(可以兑换话费了,app首页-充值中心)"));
            _0x457c63(_0x428ef6);
          }
        }
      }
      break;
    }
  }
  async function _0x40635a() {
    let _0x548042 = {
      appId: "42e80",
      functionId: "queryGiftCardCountStatusCom",
      appid: "mygiftcard",
      clientVersion: common.getLatestAppVersion(),
      client: "h5",
      body: {
        queryList: "a"
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x2d3b06 = await H5st.getH5st(_0x548042);
    let _0x20f4e1 = _0x2d3b06.paramsData;
    const _0x35b725 = {
      url: "https://api.m.jd.com/api?functionId=queryGiftCardCountStatusCom",
      method: "POST",
      headers: {
        "User-Agent": _0x265f0f,
        origin: "https://mygiftcard.jd.com",
        referer: "https://mygiftcard.jd.com/giftcardForM.html?source=JDAP",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: _0x169f9d
      },
      body: _0x20f4e1,
      timeout: 30000
    };
    const _0x368e08 = 3;
    let _0x55446c = 0;
    while (_0x55446c < _0x368e08) {
      _0x55446c > 0 && (await $.wait(1000));
      const _0xc9c120 = await common.request(_0x35b725);
      if (_0xc9c120.data) {
        let _0xf43111 = _0xc9c120.data;
        _0xf43111.code === "success" && _0xf43111.data && _0x457c63("【礼品卡总额】" + _0xf43111.data.a + "元");
      }
      break;
    }
  }
  async function _0x37ab0e() {
    let _0x2fa038 = {
      appId: "60d61",
      functionId: "miniTask_hbChannelPage",
      appid: "hot_channel",
      clientVersion: "9.13.40",
      client: "apple",
      body: {},
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x46fab1 = await H5st.getH5st(_0x2fa038);
    let _0x8bbef3 = _0x46fab1.paramsData;
    const _0x164968 = {
      url: "https://api.m.jd.com/client.action",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Host: "api.m.jd.com",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x169f9d + "wxapp_scene=1019; Domain=jd.com;",
        Referer: "https://servicewechat.com/wx91d27dbf599dff74/683/page-frame.html",
        "User-Agent": _0x265f0f
      },
      body: _0x8bbef3,
      timeout: 30000
    };
    const _0x5736c3 = 3;
    let _0xc9543d = 0;
    while (_0xc9543d < _0x5736c3) {
      _0xc9543d > 0 && (await $.wait(1000));
      const _0x2c02ec = await common.request(_0x164968);
      if (_0x2c02ec.data) {
        let _0x3d186c = _0x2c02ec.data;
        if (_0x3d186c.code === 0 && _0x3d186c.subCode === 0) {
          if (_0x3d186c.data) {
            const _0x17e10e = _0x3d186c.data?.["point"] || 0;
            const _0x5a19d4 = _0x17e10e ? _0x17e10e / 1000 : 0;
            _0x457c63("【小程序省钱币】" + _0x17e10e + "省钱币(约等于" + _0x5a19d4.toFixed(2) + "元)");
          }
        }
      }
      break;
    }
  }
  async function _0x14784f() {
    let _0x97bd1f = {
      appId: "7478f",
      functionId: "queryJdCouponListAppletForJd",
      appid: "jd-cphdeveloper-m",
      body: {
        bizModelCode: "6",
        externalLoginType: 8,
        bizModeClientType: "M",
        appId: "m91d27dbf599dff74",
        token: "3852b12f8c4d869b7ed3e2b3c68c9436",
        tenantCode: "jgm",
        sourceType: "h5_inter_myjd_couponlist",
        state: 1,
        wxadd: 1,
        filterswitch: 1
      },
      version: "4.7",
      ua: "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1"
    };
    const _0x164bf9 = await H5st.getH5st(_0x97bd1f);
    let _0x47dd5d = Object.assign({}, _0x164bf9.paramsData);
    const _0x23f3bc = {
      _: Date.now(),
      sceneval: 2,
      g_login_type: 1,
      callback: "jsonpCBKD",
      g_tk: 2107090200,
      g_ty: "ls",
      appCode: "ms0ca95114"
    };
    _0x47dd5d && Object.assign(_0x47dd5d, _0x23f3bc);
    const _0x1c0d28 = {
      url: "https://api.m.jd.com/api",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        Connection: "keep-alive",
        Cookie: _0x169f9d,
        Origin: "https://wqs.jd.com",
        Referer: "https://wqs.jd.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1"
      },
      params: _0x47dd5d,
      timeout: 30000,
      httpsTlsOptions: common.useAppTls()
    };
    const _0x5461b5 = 3;
    let _0x5de66d = 0;
    while (_0x5de66d < _0x5461b5) {
      _0x5de66d > 0 && (await $.wait(1000));
      const _0x51bbef = await common.request(_0x1c0d28);
      if (_0x51bbef.data) {
        let _0x217227 = _0x51bbef.data;
        if (_0x217227.code === "0") {
          if (_0x217227.coupon) {
            let _0x4eaeaa = _0x217227.coupon.useable || [];
            let _0x2bd9d5 = parseInt(_0x217227.coupon.useable_count || 0);
            _0x457c63("【优惠券】" + _0x2bd9d5 + "张");
            const _0xbdcc98 = "东东农场".split("@");
            let _0x3f134d = null;
            let _0xb3a51e = null;
            let _0xc24eaa = 0;
            if (_0x4eaeaa.length > 0) {
              _0x4eaeaa.forEach(_0x3c2354 => {
                if (_0x3c2354.hasOwnProperty("couponTitle") && _0x3c2354.couponTitle !== undefined) {
                  if (_0xbdcc98.some(_0x33064b => _0x3c2354.couponTitle.includes(_0x33064b))) {
                    const _0x3f1beb = new Date(Number(_0x3c2354.endTime));
                    (!_0x3f134d || _0x3f1beb < _0x3f134d) && (_0x3f134d = _0x3f1beb, _0xb3a51e = _0x3c2354);
                    _0xc24eaa++;
                  }
                }
              });
              if (_0xc24eaa >= 1) {
                const _0x43455a = _0x3f134d.toLocaleString();
                _0x457c63("【新农场实物券】" + _0xc24eaa + "张(过期时间[" + _0x43455a + "])");
                _0x31b66f.push("【新农场实物券】" + _0xc24eaa + "张(过期时间[" + _0x43455a + "])");
              }
            }
          }
        }
      }
      break;
    }
  }
  async function _0x10e87c() {
    let _0x32be43 = {
      appId: "aace2",
      functionId: "atop_channel_my_score",
      appid: "jd-super-market",
      client: "m",
      body: {
        bizCode: "cn_retail_jdsupermarket",
        scenario: "sign",
        babelChannel: "ttt1",
        isJdApp: "1",
        isWx: "0"
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x5ab3bb = await H5st.getH5st(_0x32be43);
    let _0x513eaf = _0x5ab3bb.paramsData;
    const _0x327d8a = {
      url: "https://api.m.jd.com/",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x169f9d,
        "X-Requested-With": "XMLHttpRequest",
        Referer: "https://pro.m.jd.com/mall/active/3nh7HzSjYemGqAHSbktTrf8rrH8M/index.html",
        "X-Referer-Page": "https://pro.m.jd.com/mall/active/3nh7HzSjYemGqAHSbktTrf8rrH8M/index.html",
        Origin: "https://pro.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": _0x265f0f
      },
      body: _0x513eaf,
      timeout: 30000
    };
    const _0x3bbe3b = 3;
    let _0x25a407 = 0;
    while (_0x25a407 < _0x3bbe3b) {
      _0x25a407 > 0 && (await $.wait(1000));
      const _0x42e358 = await common.request(_0x327d8a);
      if (_0x42e358.data) {
        let _0x39c18f = _0x42e358.data;
        if (_0x39c18f.code === "0" && _0x39c18f.success) {
          if (_0x39c18f.data && _0x39c18f.data.floorData && _0x39c18f.data.floorData.items) {
            let _0x3445c6 = "【汪贝余额】" + _0x39c18f.data.floorData.items[0].restScore + "汪贝";
            _0x39c18f.data.floorData.items[0] && _0x39c18f.data.floorData.items[0].nexp && _0x39c18f.data.floorData.items[0].nexp > 0 && (_0x3445c6 += "(7日内过期" + _0x39c18f.data.floorData.items[0].nexp + ")", _0x31b66f.push("【汪贝余额】" + _0x39c18f.data.floorData.items[0].restScore + "汪贝(7日内过期" + _0x39c18f.data.floorData.items[0].nexp + ")"));
            _0x457c63(_0x3445c6);
          }
        }
      }
      break;
    }
  }
  async function _0x920ffb() {
    let _0x2bc9dc = {
      appId: "c57f6",
      functionId: "farm_home",
      appid: "signed_wh5",
      clientVersion: common.getLatestAppVersion(),
      client: "apple",
      body: {
        version: 3
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true,
      tokenCache: false
    };
    const _0x22976d = await H5st.getH5st(_0x2bc9dc);
    let _0x30112d = _0x22976d.paramsData;
    const _0x2443cf = {
      wqDefault: "false",
      rfs: "0000",
      cthr: "1",
      loginType: "",
      loginWQBiz: "wegame",
      openudid: _0x822ffe,
      uuid: _0x822ffe,
      build: common.getLatestAppBuildVersion(),
      screen: "430*932",
      networkType: "wifi",
      d_brand: "iPhone",
      d_model: "iPhone16,2",
      lang: "zh_CN",
      osVersion: common.getLatestIOSVersion(),
      partner: ""
    };
    _0x30112d && Object.assign(_0x30112d, _0x2443cf);
    const _0x4f5928 = {
      url: "https://api.m.jd.com/client.action",
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x169f9d,
        Host: "api.m.jd.com",
        Referer: "https://h5.m.jd.com/",
        "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
        Origin: "https://h5.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": _0x265f0f
      },
      data: _0x30112d,
      timeout: 30000
    };
    const _0x39aead = 3;
    let _0x507ad2 = 0;
    while (_0x507ad2 < _0x39aead) {
      _0x507ad2 > 0 && (await $.wait(1000));
      const _0x2ccf85 = await common.request(_0x4f5928);
      if (_0x2ccf85.data) {
        let _0x30ef24 = _0x2ccf85.data;
        if (_0x30ef24.code === 0 && _0x30ef24.data) {
          if (_0x30ef24.data.bizCode === 0) {
            const _0x498034 = _0x30ef24.data?.["result"]?.["treeCurrentState"] || 0;
            if (_0x498034 === 0) {
              const _0x50da74 = _0x30ef24.data?.["result"]?.["treeFullStage"];
              const _0x2a33b0 = _0x30ef24.data?.["result"]?.["bottleWater"];
              const _0x1bc636 = _0x30ef24.data?.["result"]?.["waterTips"] || "";
              const _0x374746 = _0x30ef24.data?.["result"]?.["treeLevel"] || 0;
              const _0xcf7d2f = _0x30ef24.data?.["result"]?.["skuName"];
              switch (_0x50da74) {
                case 0:
                  _0x457c63("【新东东农场】未种植作物");
                  break;
                case 1:
                case 2:
                case 3:
                case 4:
                  let _0x5d37eb = "";
                  let _0x42c095 = _0x1bc636.match(/\d+(\.\d+)?%/);
                  _0x42c095 && (_0x5d37eb = _0x42c095[0]);
                  let _0x1f15e1 = "【新东东农场】[等级" + _0x374746 + "][水滴" + _0x2a33b0 + "]";
                  if (_0x42c095) {
                    _0x5d37eb = parseFloat(_0x42c095[0].replace("%", "")) / 100;
                    let _0x36f0fa = 1 - _0x5d37eb;
                    _0x5d37eb = (_0x36f0fa * 100).toFixed(2) + "%";
                    _0x1f15e1 += ",进度[" + _0x5d37eb + "]";
                  }
                  _0x457c63(_0x1f15e1);
                  break;
                case 5:
                  _0x457c63("【新东东农场】" + _0xcf7d2f + "成熟了");
                  break;
              }
            } else {
              _0x457c63("【新东东农场】超过14天未浇水，果树已经枯萎了");
            }
          } else {
            _0x457c63("【新东东农场】活动火爆");
          }
        } else {
          _0x457c63("【新东东农场】活动火爆");
        }
      }
      break;
    }
  }
  async function _0x23c233() {
    let _0x17de14 = {
      appId: "8a2af",
      functionId: "initForFarm",
      appid: "signed_wh5",
      clientVersion: common.getLatestAppVersion(),
      client: "apple",
      body: {
        version: 3
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x1bdff5 = await H5st.getH5st(_0x17de14);
    let _0x4e9a7b = _0x1bdff5.paramsData;
    const _0x4872dc = {
      url: "https://api.m.jd.com/client.action",
      method: "POST",
      headers: {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://carry.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": _0x265f0f,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://carry.m.jd.com/",
        "x-requested-with": "com.jingdong.app.mall",
        Cookie: _0x169f9d
      },
      body: _0x4e9a7b,
      timeout: 30000
    };
    const _0x1f8307 = 3;
    let _0x2d1742 = 0;
    while (_0x2d1742 < _0x1f8307) {
      _0x2d1742 > 0 && (await $.wait(1000));
      const _0x435f05 = await common.request(_0x4872dc);
      if (_0x435f05.data) {
        let _0x3d1c03 = _0x435f05.data;
        if (_0x3d1c03.code === "0") {
          if (_0x3d1c03.farmUserPro) {
            const _0x364667 = _0x3d1c03.farmUserPro.treeState || 0;
            switch (_0x364667) {
              case 0:
                _0x457c63("【东东农场】未种植作物");
                break;
              case 1:
                _0x457c63("【东东农场】[等级" + _0x3d1c03.farmUserPro.prizeLevel + "][水滴" + _0x3d1c03.farmUserPro.totalEnergy + "],进度[" + (_0x3d1c03.farmUserPro?.["treeEnergy"] / _0x3d1c03.farmUserPro?.["treeTotalEnergy"] * 100).toFixed(2) + "%],已浇水" + _0x3d1c03.farmUserPro?.["treeEnergy"] / 10 + "次,还需" + (_0x3d1c03.farmUserPro?.["treeTotalEnergy"] - _0x3d1c03.farmUserPro?.["treeEnergy"]) / 10 + "次");
                break;
              case 2:
              case 3:
                _0x457c63("【东东农场】[" + _0x3d1c03.farmUserPro.name + "]成熟了");
                _0x31b66f.push("【东东农场】[" + _0x3d1c03.farmUserPro.name + "]成熟了，快去兑换奖品吧~");
                break;
            }
          } else {
            _0x457c63("【东东农场】活动火爆");
          }
        } else {
          _0x457c63("【东东农场】活动火爆");
        }
      }
      break;
    }
  }
  async function _0x3f6047() {
    let _0x576cf7 = {
      appId: "d246a",
      functionId: "plantBeanIndex",
      appid: "signed_wh5",
      clientVersion: common.getLatestAppVersion(),
      client: "apple",
      body: {
        monitor_source: "plant_m_plant_index",
        monitor_refer: "",
        version: "9.2.4.3"
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x3c7ddc = await H5st.getH5st(_0x576cf7);
    params = Object.assign({}, _0x3c7ddc.paramsData, {
      osVersion: common.getLatestIOSVersion(),
      uuid: "8fb67fe0ef2e13e4fb6f7420acd15ef066583a87",
      openudid: "8fb67fe0ef2e13e4fb6f7420acd15ef066583a87",
      d_brand: "iPhone",
      d_model: "iPhone11,8",
      uemps: "0-2-999",
      ext: {
        prstate: "0"
      },
      jsonp: "jsonp_" + Date.now() + "_84280"
    });
    const _0x192aec = {
      url: "https://api.m.jd.com/client.action",
      method: "GET",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": _0x265f0f,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
        Cookie: _0x169f9d
      },
      params: params,
      timeout: 30000
    };
    const _0x5036b0 = 3;
    let _0xb5edfb = 0;
    while (_0xb5edfb < _0x5036b0) {
      _0xb5edfb > 0 && (await $.wait(1000));
      const _0x475af8 = await common.request(_0x192aec);
      if (_0x475af8.data) {
        let _0x491117 = _0x475af8.data;
        if (_0x491117.code === "0") {
          const _0x790240 = _0x491117.data?.["roundList"] || [];
          let _0x418ce8 = "";
          _0x790240.forEach(_0x4b48bc => {
            const {
              growth: _0x137806,
              dateDesc: _0x447a5d
            } = _0x4b48bc;
            if (_0x447a5d.includes("本期")) {
              const _0xa78352 = _0x447a5d.replace("本期", "");
              _0x418ce8 += "本期成长值: " + _0x137806 + "(" + _0xa78352.trim() + "); ";
            }
          });
          _0x418ce8 && _0x457c63("【种豆得豆】" + _0x418ce8.slice(0, -2));
        } else {
          _0x457c63("【种豆得豆】活动火爆");
        }
      }
      break;
    }
  }
  async function _0x21e11c() {
    let _0x3deaef = {
      appId: "c81ad",
      functionId: "wanyiwan_home",
      appid: "signed_wh5",
      clientVersion: common.getLatestAppVersion(),
      client: "apple",
      body: {
        outsite: 0,
        firstCall: 0,
        version: 1,
        lbsSwitch: false
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true,
      bu1: "lite_0.1.5",
      tokenCache: false
    };
    const _0xeaacce = await H5st.getH5st(_0x3deaef);
    let _0xe16579 = _0xeaacce.paramsData;
    const _0x59cffc = {
      url: "https://api.m.jd.com/client.action",
      method: "POST",
      headers: {
        origin: "https://prodev.m.jd.com",
        Referer: "https://pro.m.jd.com/mall/active/3fcyrvLZALNPWCEDRvaZJVrzek8v/index.html",
        "User-Agent": _0x265f0f,
        Cookie: _0x169f9d,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*",
        "x-rp-client": "h5_1.0.0"
      },
      body: _0xe16579,
      timeout: 30000
    };
    const _0x3be390 = 3;
    let _0x1caffb = 0;
    while (_0x1caffb < _0x3be390) {
      _0x1caffb > 0 && (await $.wait(1000));
      const _0x6ab508 = await common.request(_0x59cffc);
      if (_0x6ab508.data) {
        let _0x17a67c = _0x6ab508.data;
        if (_0x17a67c.code === 0 && _0x17a67c.data) {
          if (_0x17a67c.data.bizCode === 0) {
            const _0x4609b0 = _0x17a67c.data.result?.["score"] || 0;
            _0x457c63("【玩一玩奖票】" + _0x4609b0 + "奖票");
          } else {
            _0x457c63("【玩一玩奖票】活动火爆");
          }
        }
      }
      break;
    }
  }
  async function _0x4b4f49() {
    let _0x1a61ff = {
      appId: "35fa0",
      functionId: "atop_channel_marketCard_cardInfo",
      appid: "jd-super-market",
      clientVersion: common.getLatestAppVersion(),
      client: "m",
      body: {
        babelChannel: "ttt9",
        isJdApp: "1",
        isWx: "0"
      },
      version: "4.7",
      ua: _0x265f0f,
      t: true
    };
    const _0x28ff15 = await H5st.getH5st(_0x1a61ff);
    let _0x163db9 = _0x28ff15.paramsData;
    const _0x587e3c = {
      url: "https://api.m.jd.com/atop_channel_marketCard_cardInfo",
      method: "POST",
      headers: {
        "User-Agent": _0x265f0f,
        origin: "https://pro.m.jd.com",
        referer: "https://pro.m.jd.com/mall/active/3KehY4eAj3D1iLzFB7p5pb68qXkT/index.html",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Cookie: _0x169f9d,
        "x-rp-client": "h5_1.0.0"
      },
      body: _0x163db9,
      timeout: 30000
    };
    const _0x3058a2 = 3;
    let _0x2d1d9f = 0;
    while (_0x2d1d9f < _0x3058a2) {
      _0x2d1d9f > 0 && (await $.wait(1000));
      const _0x1fbf1d = await common.request(_0x587e3c);
      if (_0x1fbf1d.data) {
        let _0x472086 = _0x1fbf1d.data;
        if (_0x472086.code === "0" && _0x472086.success) {
          if (_0x472086.data) {
            let _0x5453c7 = _0x472086?.["data"]?.["floorData"]?.["items"] || [];
            for (let _0x40578a of _0x5453c7) {
              if (_0x40578a?.["marketCardVO"]) {
                let {
                  expirationGiftAmountDes = "",
                  balance: _0x3b4edc
                } = _0x40578a.marketCardVO;
                let _0x3ab418 = "【超市卡总额】" + _0x3b4edc + "元";
                expirationGiftAmountDes && (_0x3ab418 += "(" + expirationGiftAmountDes + ")", _0x31b66f.push("【超市卡总额】" + _0x3b4edc + "元(" + expirationGiftAmountDes + ")"));
                _0x457c63(_0x3ab418);
              }
            }
          }
        }
      }
      break;
    }
  }
  async function _0x2173ae() {
    signParams = {
      pageIndex: 1,
      pageSize: "10",
      planType: "1",
      status: 1
    };
    params = {
      functionId: "getCommentWareList"
    };
    const _0x3f8cf9 = {
      url: "https://api.m.jd.com/client.action",
      method: "POST",
      headers: {
        Host: "api.m.jd.com",
        accept: "*/*",
        "user-agent": "okhttp/3.12.16;jdmall;android;version/12.2.2;build/168923;",
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        Cookie: _0x169f9d
      },
      params: params,
      data: common.queryStringToObject(await common.getSign("getCommentWareList", signParams)),
      timeout: 30000
    };
    const _0xb7c591 = 3;
    let _0x2b4b79 = 0;
    while (_0x2b4b79 < _0xb7c591) {
      _0x2b4b79 > 0 && (await $.wait(1000));
      const _0x2bd87b = await common.request(_0x3f8cf9);
      if (_0x2bd87b.data) {
        let _0x2fed73 = _0x2bd87b.data;
        if (_0x2fed73.code === "0") {
          let _0x5b8aa7 = _0x2fed73.commentWareListInfo;
          let _0x5758ef = _0x5b8aa7.wait4CommentCount || 0;
          let _0x3deb61 = _0x5b8aa7.commentFinishedCount || 0;
          _0x457c63("【订单评价】已评价[" + _0x3deb61 + "]，未评价[" + _0x5758ef + "]");
        }
      }
      break;
    }
  }
  async function _0x37e6ac() {
    signParams = {
      pageSize: "20",
      page: "1"
    };
    const _0x6f02e0 = {
      url: "https://api.m.jd.com/client.action?functionId=jingBeanDetail",
      method: "POST",
      headers: {
        "User-Agent": _0x265f0f,
        Host: "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x169f9d
      },
      body: common.queryStringToObject(await common.getSign("jingBeanDetail", signParams)),
      timeout: 30000
    };
    const _0x1b6d98 = 3;
    let _0x2be5fc = 0;
    while (_0x2be5fc < _0x1b6d98) {
      _0x2be5fc > 0 && (await $.wait(1000));
      const _0x14f205 = await common.request(_0x6f02e0);
      if (_0x14f205.data) {
        let _0x3b922f = _0x14f205.data;
        if (_0x3b922f.code === 0) {
          if (_0x3b922f.others && _0x3b922f.others.jingBeanExpiringInfo) {
            if (_0x3b922f.others.jingBeanExpiringInfo && Array.isArray(_0x3b922f.others.jingBeanExpiringInfo.detailList) && _0x3b922f.others.jingBeanExpiringInfo.detailList.length > 0) {
              let _0x3231a4 = _0x3b922f.others.jingBeanExpiringInfo.detailList.reduce((_0xbe2eb8, _0xbf97e4) => _0xbe2eb8 + parseInt(_0xbf97e4.amount), 0);
              _0x457c63("【过期京豆】(7日内过期" + _0x3231a4 + "京豆):");
              _0x31b66f.push("【过期京豆】(7日内过期" + _0x3231a4 + "京豆)");
              _0x3b922f.others.jingBeanExpiringInfo.detailList.forEach(_0x36a57b => {
                _0x457c63(" " + _0x36a57b.eventMassage + "[" + _0x36a57b.amount + "京豆]");
              });
            }
          }
        }
      }
      break;
    }
  }
  async function _0x8e950d() {
    signParams = {
      fp: "-1",
      appToken: "apphongbao_token",
      childActivityUrl: "-1",
      country: "cn",
      openId: "-1",
      childActivityId: "-1",
      applicantErp: "-1",
      platformId: "appHongBao",
      isRvc: "-1",
      orgType: "2",
      activityType: "1",
      shshshfpb: "-1",
      platformToken: "apphongbao_token",
      organization: "JD",
      pageClickKey: "-1",
      platform: "1",
      eid: "-1",
      appId: "appHongBao",
      childActiveName: "-1",
      shshshfp: "-1",
      jda: "-1",
      extend: "-1",
      shshshfpa: "-1",
      activityArea: "-1",
      childActivityTime: "-1"
    };
    const _0x39aad8 = {
      url: "https://api.m.jd.com/client.action?functionId=myhongbao_getUsableHongBaoList",
      method: "POST",
      headers: {
        "User-Agent": _0x265f0f,
        Host: "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x169f9d
      },
      body: common.queryStringToObject(await common.getSign("myhongbao_getUsableHongBaoList", signParams)),
      timeout: 30000
    };
    const _0x124042 = 3;
    let _0x581de5 = 0;
    while (_0x581de5 < _0x124042) {
      _0x581de5 > 0 && (await $.wait(1000));
      const _0x3a81d0 = await common.request(_0x39aad8);
      if (_0x3a81d0.data) {
        let _0x17e47e = _0x3a81d0.data;
        if (_0x17e47e.resultCode === 200 && _0x17e47e.success) {
          _0xbabd67 = _0x17e47e?.["count"] || 0;
          for (let _0x4d0978 of _0x17e47e?.["hongBaoList"] || []) {
            let _0x514305 = parseInt(_0x4d0978.balance * 100);
            let _0x476d29 = "";
            if (_0x4d0978?.["orgLimitStr"]?.["includes"]("京东商城")) {
              _0x476d29 = "jdapp";
            } else {
              if (_0x4d0978?.["orgLimitStr"]?.["includes"]("京东购物小程序")) {
                _0x476d29 = "minip";
              } else {
                _0x4d0978?.["orgLimitStr"]?.["includes"]("特价") && (_0x476d29 = "lite");
              }
            }
            let _0x4a2b57 = KEY_TOTAL;
            if (_0x4d0978.endTime < tomorrow) {
              _0x4a2b57 = KEY_TOMORROW;
            } else {
              _0x4d0978.endTime < dayAfterTomorrow && (_0x4a2b57 = KEY_DAY_AFTER_TOMORROW);
            }
            _0x3a2564.total[KEY_TOTAL] += _0x514305;
            _0x476d29 ? _0x3a2564[_0x476d29][KEY_TOTAL] += _0x514305 : _0x3a2564.common[KEY_TOTAL] += _0x514305;
            _0x4a2b57 > KEY_TOTAL && (_0x3a2564.total[_0x4a2b57] += _0x514305, _0x476d29 ? _0x3a2564[_0x476d29][_0x4a2b57] += _0x514305 : _0x3a2564.common[_0x4a2b57] += _0x514305);
          }
          for (let _0xbb5d08 in _0x3a2564) {
            for (let _0x4dca37 = 0; _0x4dca37 < _0x3a2564[_0xbb5d08].length; _0x4dca37++) {
              _0x3a2564[_0xbb5d08][_0x4dca37] = Number(_0x3a2564[_0xbb5d08][_0x4dca37] / 100).toFixed(2);
            }
          }
          await _0x1ff646();
        }
      }
      break;
    }
  }
  async function _0x1ff646() {
    _0x457c63("【总红包数量】[" + _0x3a2564.total[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.total[KEY_TOMORROW] + "],【明晚过期】[" + _0x3a2564.total[KEY_DAY_AFTER_TOMORROW] + "]");
    _0x31b66f.push("【总红包数量】[" + _0x3a2564.total[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.total[KEY_TOMORROW] + "]");
    _0x3a2564.common[0] && _0x457c63("【通用总红包】[" + _0x3a2564.common[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.common[KEY_TOMORROW] + "],【明晚过期】[" + _0x3a2564.common[KEY_DAY_AFTER_TOMORROW] + "]");
    _0x3a2564.jdapp[0] && _0x457c63("【商城总红包】[" + _0x3a2564.jdapp[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.jdapp[KEY_TOMORROW] + "],【明晚过期】[" + _0x3a2564.jdapp[KEY_DAY_AFTER_TOMORROW] + "]");
    _0x3a2564.lite[0] && _0x457c63("【特价版红包】[" + _0x3a2564.lite[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.lite[KEY_TOMORROW] + "],【明晚过期】[" + _0x3a2564.lite[KEY_DAY_AFTER_TOMORROW] + "]");
    _0x3a2564.minip[0] && _0x457c63("【小程序红包】[" + _0x3a2564.minip[KEY_TOTAL] + "],【今晚过期】[" + _0x3a2564.minip[KEY_TOMORROW] + "],【明晚过期】[" + _0x3a2564.minip[KEY_DAY_AFTER_TOMORROW] + "]");
  }
  async function _0x547162(_0x1ca6c1) {
    time = new Date().getTime();
    let _0x256ee2 = _0x1ca6c1 || "";
    const _0x2d3f9c = time + "e9c398ffcb2d4824b4d0a703e38yffdd";
    _0x256ee2 = cryptoJS.MD5(_0x256ee2 + _0x2d3f9c).toString();
    return {
      t: time,
      encStr: _0x256ee2
    };
  }
}