//Sun Aug 04 2024 06:22:29 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const path = require("path"),
  common = require("./Rebels_jdCommon");
let scriptName = null,
  expireMinutes = 29;
try {
  expireMinutes = parseInt(process.env.JD_ISV_TOKEN_CACHE_EXPIRE_MINUTES || "29");
} catch {}
const defaultCacheTTL = expireMinutes * 60 * 1000,
  TokenCache = new common.DataCache(process.env.JD_ISV_TOKEN_CUSTOM_CACHE || __dirname + "/token.json", defaultCacheTTL, 180000),
  lzkjPinFilter = (process.env.JD_ISV_TOKEN_LZKJ_PIN_FILTER || "").split("@"),
  lzkjPinFilter_interactsaas_and_interaction_v1 = (process.env.JD_ISV_TOKEN_LZKJ_INTERACTSAAS_AND_INTERACTION_V1_PIN_FILTER || process.env.JD_ISV_TOKEN_LZKJ_NEW_PIN_FILTER || process.env.JD_ISV_TOKEN_LZKJ_LOREAL_PIN_FILTER || "").split("@"),
  lzkjPinFilter_interaction_v2 = (process.env.JD_ISV_TOKEN_LZKJ_INTERACTION_V2_PIN_FILTER || "").split("@"),
  cjhyPinFilter = (process.env.JD_ISV_TOKEN_CJHY_PIN_FILTER || "").split("@");
let requestAxiosProxyConfig, requestDynamicProxyConfig;
try {
  const proxyAddress = process.env.RS_ISV_TOKEN_PROXY_TUNNRL || process.env.JD_ISV_TOKEN_PROXY || "";
  if (proxyAddress) {
    const proxyConfig = common._getProxyConfigWithAddress(proxyAddress);
    proxyConfig ? (requestAxiosProxyConfig = proxyConfig, console.log("\n===============启用 getToken 代理池代理(新)==============\n")) : console.log("❌ 提供的代理地址无效，跳过启用 getToken 代理池代理");
  } else {
    const proxyApi = process.env.RS_ISV_TOKEN_PROXY_API || process.env.JD_ISV_TOKEN_PROXY_API || "";
    if (proxyApi) {
      requestDynamicProxyConfig = {
        api: null,
        proxyConfig: null,
        useLimit: null,
        timeLimit: null,
        fetchFailContinue: null,
        extractTimestamp: null,
        lastUseTimeStamp: null,
        usedTimes: null
      };
      requestDynamicProxyConfig.api = proxyApi;
      const useLimit = process.env.RS_ISV_TOKEN_PROXY_USE_LIMIT || process.env.JD_ISV_TOKEN_PROXY_API_MAX || "0";
      try {
        requestDynamicProxyConfig.useLimit = parseInt(useLimit);
      } catch {
        requestDynamicProxyConfig.useLimit = 1;
      }
      const timeLimit = process.env.RS_ISV_TOKEN_PROXY_TIME_LIMIT || "10000";
      try {
        requestDynamicProxyConfig.timeLimit = parseInt(timeLimit);
      } catch {
        requestDynamicProxyConfig.timeLimit = 10000;
      }
      requestDynamicProxyConfig.fetchFailContinue = (process.env.RS_ISV_TOKEN_PROXY_FETCH_FAIL_CONTINUE || "true") === "true";
      console.log("\n================启用 getToken API代理(新)================\n");
    }
  }
  const globalProxy = process.env.RS_ISV_TOKEN_GLOBAL_PROXY === "true";
  if (globalProxy) {
    try {
      require("global-agent/bootstrap");
      console.log("\n===============启用 getToken 代理池代理(旧)==============\n");
    } catch (_0x5d3b58) {
      console.log("❌ getToken 代理模块加载失败 ➜ " + _0x5d3b58.message);
    }
  }
} catch {}
const redisUrl = process.env.JD_ISV_TOKEN_REDIS_CACHE_URL || "",
  redisKey = process.env.JD_ISV_TOKEN_REDIS_CACHE_KEY || "",
  redisSubmit = !(process.env.JD_ISV_TOKEN_REDIS_CACHE_SUBMIT === "false"),
  hasRedisKey = /<pt_pin>/.test(redisKey);
let redisClient = null;
if (redisUrl) {
  let redis = null;
  try {
    redis = require("redis");
  } catch (_0x4c863e) {
    console.log("❌ getToken Redis模块加载失败 ➜ " + _0x4c863e.message);
  }
  if (redis) {
    try {
      redisClient = redis.createClient({
        url: redisUrl
      });
    } catch (_0x33bb6c) {
      console.log("❌ getToken Redis连接异常 ➜ " + (_0x33bb6c.message || _0x33bb6c));
    }
  }
}
async function _redisCacheGet(_0x44767a) {
  const _0x473627 = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, ptPin) : "" + redisKey + _0x44767a),
    _0x132d9c = 3;
  let _0xeaa6f6 = null;
  for (let _0x376b6c = 0; _0x376b6c < _0x132d9c; _0x376b6c++) {
    try {
      await redisClient.connect();
    } catch {}
    try {
      const _0x5267a9 = await redisClient.get(_0x473627);
      if (_0x5267a9) {
        return _0x5267a9;
      }
      _0xeaa6f6 = null;
      break;
    } catch (_0x2e1a17) {
      _0xeaa6f6 = _0x2e1a17.message || _0x2e1a17;
    }
  }
  if (_0xeaa6f6) {
    console.log("🚫 getToken Redis缓存读取失败 ➜ " + _0xeaa6f6);
  }
  return "";
}
async function _redisCachePut(_0x55b9ab, _0xcd9c6b) {
  const _0xa83899 = Math.floor((Date.now() + defaultCacheTTL) / 1000),
    _0x27299f = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, ptPin) : "" + redisKey + _0x55b9ab),
    _0x277355 = _0xcd9c6b,
    _0x4765bf = 3;
  let _0x260ba1 = null;
  for (let _0x504ca0 = 0; _0x504ca0 < _0x4765bf; _0x504ca0++) {
    try {
      await redisClient.connect();
    } catch {}
    try {
      await redisClient.set(_0x27299f, _0x277355);
      await redisClient.EXPIREAT(_0x27299f, _0xa83899);
      _0x260ba1 = null;
      break;
    } catch (_0x1edb20) {
      _0x260ba1 = _0x1edb20.message || _0x1edb20;
    }
  }
  if (_0x260ba1) {
    console.log("🚫 getToken Redis缓存写入失败 ➜ " + _0x260ba1);
  }
}
async function _redisClientClose() {
  try {
    await redisClient.disconnect();
  } catch (_0x56fd6c) {}
}
async function getToken(_0x1f149a, _0x3d4799, _0x1cfcd0 = true) {
  let _0x3413fc = "";
  try {
    const _0x54d815 = decodeURIComponent(common.getCookieValue(_0x1f149a, "pt_pin"));
    if (_0x54d815) {
      if (!scriptName) {
        const _0x315ca7 = require.main.filename;
        scriptName = path.basename(_0x315ca7, ".js");
      }
      if (_0x1cfcd0) {
        let _0x16ee3d = [];
        if (_0x3d4799.includes("lzkj")) {
          if (scriptName.startsWith("jd_lzkj_v2_")) {
            _0x16ee3d = lzkjPinFilter_interaction_v2;
          } else {
            scriptName.startsWith("jd_lzkj_") ? _0x16ee3d = lzkjPinFilter_interactsaas_and_interaction_v1 : _0x16ee3d = lzkjPinFilter;
          }
        } else {
          _0x3d4799.includes("cjhy") && (_0x16ee3d = cjhyPinFilter);
        }
        if (_0x16ee3d.length > 0 && (_0x16ee3d.includes(_0x54d815) || _0x16ee3d.includes(encodeURIComponent(_0x54d815)))) {
          console.log("已设置跳过运行该账号（全局屏蔽）");
          return "";
        }
        _0x3413fc = TokenCache.get(_0x54d815) || "";
        if (_0x3413fc) {
          return _0x3413fc;
        }
        if (redisClient) {
          _0x3413fc = await _redisCacheGet(_0x54d815);
          if (_0x3413fc) {
            return _0x3413fc;
          }
        }
      }
    }
    const _0x12673f = await common.getSign("isvObfuscator", {
      url: _0x3d4799,
      id: ""
    });
    if (!_0x12673f) {
      console.log("🚫 getToken 签名获取失败");
      return "";
    }
    let _0x8d99f3 = null,
      _0x215132 = false;
    if (requestAxiosProxyConfig || requestDynamicProxyConfig) {
      if (requestAxiosProxyConfig) {
        _0x8d99f3 = requestAxiosProxyConfig;
      } else {
        if (requestDynamicProxyConfig) {
          if (requestDynamicProxyConfig.proxyConfig) {
            _0x8d99f3 = requestDynamicProxyConfig.proxyConfig;
            _0x215132 = true;
          } else {
            const _0x400de7 = await common.getProxyAddressWithApi(requestDynamicProxyConfig.api),
              _0x506ae6 = common._getProxyConfigWithAddress(_0x400de7);
            if (_0x506ae6) {
              requestDynamicProxyConfig.extractTimestamp = Date.now();
              requestDynamicProxyConfig.usedTimes = 0;
              requestDynamicProxyConfig.proxyConfig = _0x506ae6;
              _0x8d99f3 = _0x506ae6;
              console.log("刷新Token代理IP：" + _0x506ae6.host + ":" + _0x506ae6.port);
              _0x215132 = true;
            } else {
              if (!requestDynamicProxyConfig.fetchFailContinue) {
                console.log("🚫 getToken 请求错误 ➜ 获取动态代理地址失败，已设置跳过请求");
                return "";
              }
            }
          }
        }
      }
    }
    const _0x53b58a = {
        url: "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        method: "POST",
        headers: {
          Host: "api.m.jd.com",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": common.genUA(_0x54d815) || "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Accept-Encoding": "gzip, deflate, br",
          "J-E-H": common.getJEH(),
          "J-E-C": common.getJEC(_0x54d815),
          Cookie: _0x1f149a
        },
        proxy: _0x8d99f3,
        data: _0x12673f,
        timeout: 60000
      },
      _0x234d76 = 2;
    let _0x4853e7 = 0,
      _0x50c2f7 = null;
    while (_0x4853e7 < _0x234d76) {
      const _0x1f54d8 = await common.request(_0x53b58a);
      if (_0x215132) {
        requestDynamicProxyConfig.lastUseTimeStamp = Date.now();
        requestDynamicProxyConfig.usedTimes++;
        const _0x2255e8 = requestDynamicProxyConfig.useLimit > 0 && requestDynamicProxyConfig.usedTimes >= requestDynamicProxyConfig.useLimit,
          _0x17e683 = requestDynamicProxyConfig.timeLimit > 0 && Date.now() - requestDynamicProxyConfig.extractTimestamp >= requestDynamicProxyConfig.timeLimit;
        (_0x2255e8 || _0x17e683) && (requestDynamicProxyConfig.proxyConfig = null, requestDynamicProxyConfig.lastUseTimeStamp = null, requestDynamicProxyConfig.extractTimestamp = null, requestDynamicProxyConfig.usedTimes = 0);
      }
      if (!_0x1f54d8.success) {
        _0x50c2f7 = "❌ getToken 请求失败 ➜ " + _0x1f54d8.error;
        _0x4853e7++;
        continue;
      }
      if (!_0x1f54d8.data) {
        _0x50c2f7 = "🚫 getToken 请求失败 ➜ 无响应数据";
        _0x4853e7++;
        continue;
      }
      try {
        const _0x5dd301 = _0x1f54d8.data;
        if (_0x5dd301.code === "0") {
          _0x3413fc = _0x5dd301.token;
          TokenCache.put(_0x54d815, _0x3413fc, defaultCacheTTL);
          redisClient && redisSubmit && (await _redisCachePut(_0x54d815, _0x3413fc));
        } else {
          _0x5dd301.code === "3" && _0x5dd301.errcode === 264 ? console.log("🚫 getToken 接口响应异常 ➜ 账号无效") : console.log("🚫 getToken 接口响应异常 ➜ " + JSON.stringify(_0x5dd301));
        }
      } catch (_0x5e0c60) {
        console.log("🚫 getToken 在处理接口响应时遇到了错误 ➜ " + (_0x5e0c60.message || _0x5e0c60));
      }
      break;
    }
    _0x4853e7 >= _0x234d76 && console.log(_0x50c2f7);
    return _0x3413fc;
  } catch (_0x17c8fd) {
    console.log("🚫 getToken 在处理请求时遇到了错误");
    console.log(_0x17c8fd);
    return _0x3413fc;
  } finally {
    redisClient && (await _redisClientClose());
  }
}
module.exports = getToken;