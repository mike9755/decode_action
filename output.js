//Sun Aug 04 2024 06:26:09 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const common = require("./Rebels_jdCommon"),
  CryptoModule = require("./Rebels_H"),
  fs = require("fs");
!fs.existsSync("./utils/prize") && fs.mkdirSync("./utils/prize");
const prize_record_path = "./utils/prize/addr_record.csv";
if (!fs.existsSync(prize_record_path)) {
  let text = "﻿收货人,手机,奖品,活动链接,具体时间\n";
  fs.writeFileSync(prize_record_path, text, {
    encoding: "utf-8",
    flag: "a"
  });
  console.log("初始化奖品记录文件成功");
}
const delay = _0x1024d4 => new Promise(_0x2b66fd => setTimeout(_0x2b66fd, _0x1024d4));
function formatDate(_0x3c577c) {
  let _0x24710b = _0x3c577c.getFullYear(),
    _0x7d890c = ("0" + (_0x3c577c.getMonth() + 1)).slice(-2),
    _0x3a3e70 = ("0" + _0x3c577c.getDate()).slice(-2),
    _0x51ac6b = ("0" + _0x3c577c.getHours()).slice(-2),
    _0x27bd26 = ("0" + _0x3c577c.getMinutes()).slice(-2);
  return _0x24710b + "-" + _0x7d890c + "-" + _0x3a3e70 + " " + _0x51ac6b + ":" + _0x27bd26;
}
const now = new Date(),
  formattedCurrentTime = formatDate(now);
async function wuxian_savePrize(_0x445c02) {
  let {
    baseUrl: _0x335044,
    cookie: _0x2210cd,
    ua: _0xc6011f,
    activityId: _0x3663e8,
    activityType: _0x520672,
    venderId: _0x4982a8,
    secretPin: _0x884e07,
    prizeName: _0x2d32da,
    generateId: _0x3158ce,
    activityUrl = _0x335044
  } = _0x445c02;
  const _0x147d60 = _getUserConfig(_0x2d32da);
  if (typeof _0x147d60 === "boolean" && !_0x147d60) {
    return false;
  }
  const {
    receiver: _0x526735,
    phone: _0x391cb1,
    province: _0x42a484,
    city: _0x7a013b,
    county: _0x3c8272,
    address: _0x5f5e55,
    areaCode: _0x20e232,
    postalCode: _0x45073e,
    index: _0x1ff160
  } = _0x147d60;
  let _0x512ddf;
  Array.isArray(_0x4982a8) && (_0x512ddf = _0x4982a8[1], _0x4982a8 = _0x4982a8[0]);
  const _0x206d28 = _0x335044 + "/wxAddress/save",
    _0x4cc1e9 = {
      venderId: _0x4982a8,
      pin: _0x335044.includes("cjhy") ? encodeURIComponent(_0x884e07) : _0x884e07,
      activityId: _0x3663e8,
      actType: _0x520672,
      prizeName: _0x2d32da,
      receiver: _0x526735,
      phone: _0x391cb1,
      province: _0x42a484,
      city: _0x7a013b,
      county: _0x3c8272,
      areaCode: _0x20e232,
      address: _0x5f5e55,
      generateId: _0x3158ce,
      postalCode: _0x45073e
    },
    _0x2c60d1 = {
      url: _0x206d28,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x2210cd,
        Origin: _0x335044,
        Referer: activityUrl,
        "User-Agent": _0xc6011f
      },
      data: _0x4cc1e9,
      timeout: 30000
    },
    _0x87f9c5 = 3;
  let _0x463199 = 0,
    _0x1c44fd = null;
  while (_0x463199 < _0x87f9c5) {
    _0x463199 > 0 && (await delay(1000));
    const _0x2d9293 = await common.request(_0x2c60d1);
    if (!_0x2d9293.success) {
      _0x1c44fd = "🚫 savePrize 请求失败 ➜ " + _0x2d9293.error;
      _0x463199++;
      continue;
    }
    if (!_0x2d9293.data) {
      _0x1c44fd = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x463199++;
      continue;
    }
    if (_0x2d9293.data.result) {
      _successCallback(_0x526735, _0x391cb1, _0x1ff160, _0x2d32da, activityUrl);
      return true;
    } else {
      if (_0x463199 === 0 && _0x512ddf) {
        _0x2c60d1.data = {
          venderId: _0x512ddf,
          pin: _0x335044.includes("cjhy") ? encodeURIComponent(_0x884e07) : _0x884e07,
          activityId: _0x3663e8,
          actType: _0x520672,
          prizeName: _0x2d32da,
          receiver: _0x526735,
          phone: _0x391cb1,
          province: _0x42a484,
          city: _0x7a013b,
          county: _0x3c8272,
          areaCode: _0x20e232,
          address: _0x5f5e55,
          generateId: _0x3158ce,
          postalCode: _0x45073e
        };
        _0x463199++;
        continue;
      }
      _0x1c44fd = "🚫 savePrize 保存收货地址失败 ➜ " + (_0x2d9293.data?.["errorMessage"] || JSON.stringify(_0x2d9293.data));
    }
    break;
  }
  _0x463199 >= _0x87f9c5 && console.log(_0x1c44fd);
  return false;
}
async function wxSavePrize(_0x289898, _0x33b9ef, _0x53708f, _0x4fcac7, _0x4cc629, _0x4a8adc, _0x482433, _0x21866, _0x1ffc35) {
  return await wuxian_savePrize({
    baseUrl: _0x289898,
    cookie: _0x33b9ef,
    ua: _0x53708f,
    activityId: _0x4fcac7,
    activityType: _0x4cc629,
    venderId: _0x4a8adc,
    secretPin: _0x482433,
    prizeName: _0x21866,
    generateId: _0x1ffc35
  });
}
async function lzdz1_savePrize(_0x470d27) {
  let {
    baseUrl: _0x65771b,
    requestUrl: _0x1c2fc9,
    uuid: _0x35c7e8,
    cookie: _0x517fc9,
    ua: _0x466374,
    activityId: _0xd8ee11,
    activityType: _0x4b05ca,
    venderId: _0x1f3af0,
    secretPin: _0x2368d2,
    prizeName: _0x3344f5,
    itemsId: _0x4a8ac2,
    activityUrl = _0x65771b
  } = _0x470d27;
  const _0x2a42e7 = _getUserConfig(_0x3344f5);
  if (typeof _0x2a42e7 === "boolean" && !_0x2a42e7) {
    return false;
  }
  const {
      receiver: _0x3af5a2,
      phone: _0x23e5c6,
      province: _0x53db13,
      city: _0x55a16a,
      county: _0x15c737,
      address: _0x43a04e,
      areaCode: _0x15d204,
      postalCode: _0x652a8d,
      index: _0x240a49
    } = _0x2a42e7,
    _0x23c7ba = _0x1c2fc9,
    _0x44d160 = {
      venderId: _0x1f3af0,
      activityId: _0xd8ee11,
      uuid: _0x35c7e8,
      actType: _0x4b05ca,
      prizeName: _0x3344f5,
      receiver: _0x3af5a2,
      phone: _0x23e5c6,
      province: _0x53db13,
      city: _0x55a16a,
      county: _0x15c737,
      areaCode: _0x15d204,
      address: _0x43a04e,
      itemsId: _0x4a8ac2,
      postalCode: _0x652a8d,
      idCardNumber: "",
      pin: _0x2368d2
    },
    _0x19542e = {
      url: _0x23c7ba,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x517fc9,
        Origin: _0x65771b,
        Referer: activityUrl,
        "User-Agent": _0x466374
      },
      data: _0x44d160,
      timeout: 30000
    },
    _0x52745a = 3;
  let _0x2ca72c = 0,
    _0x2eef4b = null;
  while (_0x2ca72c < _0x52745a) {
    _0x2ca72c > 0 && (await delay(1000));
    const _0x1db467 = await common.request(_0x19542e);
    if (!_0x1db467.success) {
      _0x2eef4b = "🚫 savePrize 请求失败 ➜ " + _0x1db467.error;
      _0x2ca72c++;
      continue;
    }
    if (!_0x1db467.data) {
      _0x2eef4b = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x2ca72c++;
      continue;
    }
    if (_0x1db467.data.result) {
      _successCallback(_0x3af5a2, _0x23e5c6, _0x240a49, _0x3344f5, activityUrl);
      return true;
    } else {
      _0x2eef4b = "🚫 savePrize 保存收货地址失败 ➜ " + (_0x1db467.data?.["errorMessage"] || JSON.stringify(_0x1db467.data));
    }
    break;
  }
  _0x2ca72c >= _0x52745a && console.log(_0x2eef4b);
  return false;
}
async function lzdz_savePrize(_0x28593d) {
  let {
    baseUrl: _0x402069,
    requestUrl: _0x34cd73,
    cookie: _0x516653,
    ua: _0x320b0f,
    activityId: _0x3e38c8,
    activityType: _0x4719df,
    venderId: _0x1aa12e,
    secretPin: _0x19d2f0,
    prizeName: _0x25ef55,
    itemsId: _0x10c7ef,
    activityUrl = _0x402069
  } = _0x28593d;
  const _0x509d53 = _getUserConfig(_0x25ef55);
  if (typeof _0x509d53 === "boolean" && !_0x509d53) {
    return false;
  }
  const {
      receiver: _0xe4f89f,
      phone: _0x50f9a8,
      province: _0x5ebed4,
      city: _0x49c7be,
      county: _0x2324fd,
      address: _0x193ccc,
      areaCode: _0x383ae0,
      postalCode: _0x565141,
      index: _0x3bf913
    } = _0x509d53,
    _0x23c6fe = _0x34cd73,
    _0x15268c = {
      venderId: _0x1aa12e,
      activityId: _0x3e38c8,
      actType: _0x4719df,
      prizeName: _0x25ef55,
      receiver: _0xe4f89f,
      phone: _0x50f9a8,
      province: _0x5ebed4,
      city: _0x49c7be,
      county: _0x2324fd,
      areaCode: _0x383ae0,
      address: _0x193ccc,
      itemsId: _0x10c7ef,
      postalCode: _0x565141,
      idCardNumber: "",
      pin: _0x19d2f0
    },
    _0x155d79 = {
      url: _0x23c6fe,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x516653,
        Origin: _0x402069,
        Referer: activityUrl,
        "User-Agent": _0x320b0f
      },
      data: _0x15268c,
      timeout: 30000
    },
    _0x555ee6 = 3;
  let _0x11a9b7 = 0,
    _0x465f2e = null;
  while (_0x11a9b7 < _0x555ee6) {
    _0x11a9b7 > 0 && (await delay(1000));
    const _0x5d7c76 = await common.request(_0x155d79);
    if (!_0x5d7c76.success) {
      _0x465f2e = "🚫 savePrize 请求失败 ➜ " + _0x5d7c76.error;
      _0x11a9b7++;
      continue;
    }
    if (!_0x5d7c76.data) {
      _0x465f2e = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x11a9b7++;
      continue;
    }
    if (_0x5d7c76.data.result) {
      _successCallback(_0xe4f89f, _0x50f9a8, _0x3bf913, _0x25ef55, activityUrl);
      return true;
    } else {
      _0x465f2e = "🚫 savePrize 保存收货地址失败 ➜ " + (_0x5d7c76.data?.["errorMessage"] || JSON.stringify(_0x5d7c76.data));
    }
    break;
  }
  _0x11a9b7 >= _0x555ee6 && console.log(_0x465f2e);
  return false;
}
async function lzkj_interactsaas_savePrize(_0x386fc5) {
  let {
    baseUrl: _0x142dc6,
    newbaseUrl: _0x360942,
    ua: _0x34a7e3,
    token: _0x374b94,
    prizeName: _0x2d8efc,
    orderCode: _0x36b130,
    activityUrl = _0x142dc6
  } = _0x386fc5;
  const _0x12545f = _getUserConfig(_0x2d8efc);
  if (typeof _0x12545f === "boolean" && !_0x12545f) {
    return false;
  }
  const {
      receiver: _0x329a5c,
      phone: _0x28a2e0,
      province: _0x18b762,
      city: _0x347872,
      county: _0x6a8759,
      address: _0x2582a1,
      index: _0x4ab7f6
    } = _0x12545f,
    _0x552f3e = _0x360942 + "/api/my/prize/update",
    _0x2f4019 = {
      realName: _0x329a5c,
      mobile: _0x28a2e0,
      address: _0x2582a1,
      orderCode: _0x36b130,
      province: _0x18b762,
      city: _0x347872,
      county: _0x6a8759
    },
    _0x3cbaac = {
      url: _0x552f3e,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        token: _0x374b94,
        Origin: _0x142dc6,
        Referer: _0x552f3e + "/",
        "User-Agent": _0x34a7e3
      },
      data: _0x2f4019,
      timeout: 30000
    },
    _0x488e62 = 3;
  let _0x445e4c = 0,
    _0x25d9a4 = null;
  while (_0x445e4c < _0x488e62) {
    _0x445e4c > 0 && (await delay(1000));
    const _0x2d932a = await common.request(_0x3cbaac);
    if (!_0x2d932a.success) {
      _0x25d9a4 = "🚫 savePrize 请求失败 ➜ " + _0x2d932a.error;
      _0x445e4c++;
      continue;
    }
    if (!_0x2d932a.data) {
      _0x25d9a4 = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x445e4c++;
      continue;
    }
    if (_0x2d932a.data.resp_code === 0) {
      _successCallback(_0x329a5c, _0x28a2e0, _0x4ab7f6, _0x2d8efc, activityUrl);
      return true;
    } else {
      if (!_0x2d932a.data.success) {
        console.log("🚫 savePrize 保存收货地址失败 ➜ " + (_0x2d932a.data.resp_msg || JSON.stringify(_0x2d932a.data)));
        return false;
      } else {
        _0x25d9a4 = "🚫 savePrize 保存收货地址失败 ➜ " + (_0x2d932a.data.resp_msg || JSON.stringify(_0x2d932a.data));
      }
    }
    break;
  }
  _0x445e4c >= _0x488e62 && console.log(_0x25d9a4);
  return false;
}
async function loreal_savePrize(_0x57ea17) {
  const {
    baseUrl: _0x260177,
    newbaseUrl: _0x50b576,
    cookie: _0x39e6af,
    ua: _0x719080,
    token: _0xf9a9c8,
    prizeName: _0x30e975,
    orderCode: _0x4c1d6a,
    activityUrl = _0x260177
  } = _0x57ea17;
  return await lzkj_interactsaas_savePrize({
    baseUrl: _0x260177,
    newbaseUrl: _0x50b576,
    cookie: _0x39e6af,
    ua: _0x719080,
    token: _0xf9a9c8,
    prizeName: _0x30e975,
    orderCode: _0x4c1d6a,
    activityUrl: activityUrl
  });
}
async function lzkj_interaction_v2_savePrize(_0x52a1a3) {
  let {
    baseUrl: _0x54fb4e,
    newbaseUrl: _0x5d8c88,
    ua: _0x225fd3,
    token: _0x57a1fa,
    activityId: _0x9405a6,
    shopId: _0x2b540c,
    activityType: _0x250018,
    prizeName: _0x355b6f,
    addressId: _0x48d560,
    activityPrizeId: _0x26630b,
    activityUrl = _0x54fb4e
  } = _0x52a1a3;
  const _0x3078e9 = _getUserConfig(_0x355b6f);
  if (typeof _0x3078e9 === "boolean" && !_0x3078e9) {
    return false;
  }
  const {
      receiver: _0x3bba69,
      phone: _0x2b5bfc,
      province: _0x14d307,
      city: _0x121e33,
      county: _0x20c4ef,
      address: _0x41e462,
      index: _0x503d15
    } = _0x3078e9,
    _0x481b70 = _0x5d8c88 + "/api/" + _0x250018 + "/userAddressInfo",
    _0x227bb8 = {
      realName: _0x3bba69,
      mobile: _0x2b5bfc,
      address: _0x41e462,
      province: _0x14d307,
      city: _0x121e33,
      county: _0x20c4ef,
      addressId: _0x48d560,
      activityPrizeId: _0x26630b
    },
    _0x3531df = CryptoModule.wuxianDefense.interactionV2.encrypt(_0x227bb8),
    _0x20464d = {
      url: _0x481b70,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        Connection: "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        Origin: _0x54fb4e,
        Referer: activityUrl,
        "User-Agent": _0x225fd3,
        "Activity-Id": _0x9405a6,
        "Activity-Type": _0x250018,
        "Pin-Token": _0x57a1fa,
        "Shop-Id": _0x2b540c
      },
      data: _0x3531df,
      timeout: 30000
    },
    _0x580a62 = 3;
  let _0x308c77 = 0,
    _0x51634c = null;
  while (_0x308c77 < _0x580a62) {
    _0x308c77 > 0 && (await delay(1000));
    const _0xa621f5 = await common.request(_0x20464d);
    if (!_0xa621f5.success) {
      _0x51634c = "🚫 savePrize 请求失败 ➜ " + _0xa621f5.error;
      _0x308c77++;
      continue;
    }
    if (!_0xa621f5.data) {
      _0x51634c = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x308c77++;
      continue;
    }
    if (_0xa621f5.data.data && typeof _0xa621f5.data.data === "string") {
      try {
        _0xa621f5.data.data = CryptoModule.wuxianDefense.interactionV2.decrypt(_0xa621f5.data.data);
      } catch {}
    }
    if (_0xa621f5.data.code === 200) {
      _successCallback(_0x3bba69, _0x2b5bfc, _0x503d15, _0x355b6f, activityUrl);
      return true;
    } else {
      _0x51634c = "🚫 savePrize 保存收货地址失败 ➜ " + (_0xa621f5.data?.["message"] || JSON.stringify(_0xa621f5.data));
    }
    break;
  }
  _0x308c77 >= _0x580a62 && console.log(_0x51634c);
  return false;
}
async function jinggeng_savePrize(_0x2c0bac) {
  let {
    baseUrl: _0x4886a0,
    cookie: _0x54bb32,
    ua: _0x21ab4f,
    venderId: _0x217fd9,
    prizeName: _0x5c47f4,
    orderCode: _0x43ff0d,
    activityUrl = _0x4886a0
  } = _0x2c0bac;
  const _0x3a5aae = _getUserConfig(_0x5c47f4);
  if (typeof _0x3a5aae === "boolean" && !_0x3a5aae) {
    return false;
  }
  const {
      receiver: _0x26f30a,
      phone: _0x37de6c,
      province: _0x13c84d,
      city: _0x2cb518,
      county: _0x2497a2,
      address: _0x22c762,
      index: _0xb6ed2
    } = _0x3a5aae,
    _0x52400b = _0x4886a0 + "/ql/front/postBuyerInfo",
    _0x33d0af = {
      receiverName: _0x26f30a,
      mobile: _0x37de6c,
      address: _0x13c84d + "+" + _0x2cb518 + "+" + _0x2497a2 + _0x22c762,
      log_id: _0x43ff0d,
      user_id: _0x217fd9
    },
    _0x5d728a = {
      url: _0x52400b,
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: _0x54bb32,
        Origin: _0x4886a0,
        Referer: _0x52400b + "/",
        "User-Agent": _0x21ab4f
      },
      data: _0x33d0af,
      timeout: 30000
    },
    _0x3c34ad = 3;
  let _0x102f90 = 0,
    _0x1decae = null;
  while (_0x102f90 < _0x3c34ad) {
    _0x102f90 > 0 && (await delay(1000));
    const _0x4db892 = await common.request(_0x5d728a);
    if (!_0x4db892.success) {
      _0x1decae = "🚫 savePrize 请求失败 ➜ " + _0x4db892.error;
      _0x102f90++;
      continue;
    }
    if (!_0x4db892.data) {
      _0x1decae = "🚫 savePrize 请求失败 ➜ 无响应数据";
      _0x102f90++;
      continue;
    }
    if (_0x4db892.data.succ) {
      _successCallback(_0x26f30a, _0x37de6c, _0xb6ed2, _0x5c47f4, activityUrl);
      return true;
    } else {
      if (_0x4db892.data.succ === false) {
        console.log("🚫 保存收货地址失败 ➜ " + (_0x4db892.data.msg || JSON.stringify(_0x4db892.data)));
        return false;
      } else {
        _0x1decae = "🚫 savePrize 保存收货地址失败 ➜ " + (_0x4db892.data.msg || JSON.stringify(_0x4db892.data));
      }
    }
    break;
  }
  _0x102f90 >= _0x3c34ad && console.log(_0x1decae);
  return false;
}
function _getUserConfig(_0x454115) {
  try {
    const _0x7c228d = process.env.WX_ADDRESS || "",
      _0x4dc778 = process.env.WX_ADDRESS_BLOCK || "";
    if (_0x7c228d === "") {
      return false;
    }
    const _0x23086b = _0x7c228d.split("|"),
      _0x378a25 = Math.floor(Math.random() * _0x23086b.length);
    if (_0x23086b[_0x378a25] === "") {
      console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n");
      return false;
    }
    const [_0x582e14, _0x2646c4, _0x10c92f, _0x9546d6, _0x4fd780, _0x582d7d, _0xe2040f, _0x23fdd8] = _0x23086b[_0x378a25].split("@");
    if (_0x23fdd8 === undefined) {
      console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n");
      return false;
    }
    for (let _0x1f34c3 = 0; _0x1f34c3 < 7; _0x1f34c3++) {
      if (_0x23086b[_0x1f34c3] === "") {
        console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n");
        return false;
      }
    }
    if (_0x4dc778 !== "") {
      const _0xb7b9e2 = _0x4dc778.split("@");
      if (_0xb7b9e2.some(_0x2c7cbf => _0x454115.includes(_0x2c7cbf))) {
        console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        return false;
      }
    }
    return {
      receiver: _0x582e14,
      phone: _0x2646c4,
      province: _0x10c92f,
      city: _0x9546d6,
      county: _0x4fd780,
      address: _0x582d7d,
      areaCode: _0xe2040f,
      postalCode: _0x23fdd8,
      index: _0x378a25
    };
  } catch (_0x4118fa) {
    console.log("❌ 获取用户收货地址配置信息异常 ➜ " + (_0x4118fa.message || _0x4118fa));
    return false;
  }
}
function _successCallback(_0x3339d0, _0x2e781d, _0x2a7ae6, _0x17a84e, _0x400b94) {
  console.log("已自动提交收货地址 ✅\n登记为随机抽取到的第" + (_0x2a7ae6 + 1) + "套收货地址信息\n联系信息：" + _0x3339d0 + " (" + _0x2e781d.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
  const _0x36f97b = _0x17a84e ? _0x17a84e : "",
    _0x2590d6 = _0x400b94 ? _0x400b94.toString() : "",
    _0x398156 = _0x3339d0 + "," + _0x2e781d + "," + _0x36f97b + (_0x2590d6 ? "," + _0x2590d6 : "") + "," + formattedCurrentTime + "\n";
  fs.writeFileSync(prize_record_path, _0x398156, {
    encoding: "utf-8",
    flag: "a"
  });
}
module.exports = {
  wuxian_savePrize: wuxian_savePrize,
  wxSavePrize: wxSavePrize,
  lzkj_interactsaas_savePrize: lzkj_interactsaas_savePrize,
  loreal_savePrize: loreal_savePrize,
  lzkj_interaction_v2_savePrize: lzkj_interaction_v2_savePrize,
  lzdz1_savePrize: lzdz1_savePrize,
  lzdz_savePrize: lzdz_savePrize,
  jinggeng_savePrize: jinggeng_savePrize
};