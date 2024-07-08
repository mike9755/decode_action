//Mon Jul 08 2024 09:34:39 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const path = require("path"),
  common = require("./jdCommon");
let scriptName = null,
  expireMinutes = 29;
try {
  let tmpMinutes = parseInt(process.env.JD_ISV_TOKEN_CACHE_EXPIRE_MINUTES || "29");
  expireMinutes = tmpMinutes;
} catch {}
const defaultCacheTTL = expireMinutes * 60 * 1000,
  TokenCache = new common.DataCache(process.env.JD_ISV_TOKEN_CUSTOM_CACHE || __dirname + "/token.json", defaultCacheTTL, 180000),
  lzkjPinFilter = (process.env.JD_ISV_TOKEN_LZKJ_PIN_FILTER || "").split("@"),
  lzkjPinFilter_interactsaas_and_interaction_v1 = (process.env.JD_ISV_TOKEN_LZKJ_INTERACTSAAS_AND_INTERACTION_V1_PIN_FILTER || process.env.JD_ISV_TOKEN_LZKJ_NEW_PIN_FILTER || "").split("@"),
  lzkjPinFilter_interaction_v2 = (process.env.JD_ISV_TOKEN_LZKJ_INTERACTION_V2_PIN_FILTER || "").split("@"),
  cjhyPinFilter = (process.env.JD_ISV_TOKEN_CJHY_PIN_FILTER || "").split("@");
let requestAxiosProxyConfig, requestDynamicProxyConfig;
try {
  const proxyAddress = process.env.JD_ISV_TOKEN_HTTP_PROXY || process.env.JD_ISV_TOKEN_PROXY || "";
  if (proxyAddress) {
    const proxyConfig = common._getProxyConfigWithAddress(proxyAddress);
    proxyConfig ? (requestAxiosProxyConfig = proxyConfig, console.log("🌐 已启用 getToken 局部静态代理")) : console.log("❌ 提供的代理地址无效，跳过启用 getToken 局部静态代理");
  } else {
    const proxyApi = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_API || process.env.JD_ISV_TOKEN_PROXY_API || "";
    if (proxyApi) {
      requestDynamicProxyConfig = {
        "api": null,
        "proxyConfig": null,
        "useLimit": null,
        "timeLimit": null,
        "fetchFailContinue": null,
        "extractTimestamp": null,
        "lastUseTimeStamp": null,
        "usedTimes": null
      };
      requestDynamicProxyConfig.api = proxyApi;
      const useLimit = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_USE_LIMIT || process.env.JD_ISV_TOKEN_PROXY_API_MAX || "1";
      try {
        requestDynamicProxyConfig.useLimit = parseInt(useLimit);
      } catch {
        requestDynamicProxyConfig.useLimit = 1;
      }
      const timeLimit = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_TIME_LIMIT || "30000";
      try {
        requestDynamicProxyConfig.timeLimit = parseInt(timeLimit);
      } catch {
        requestDynamicProxyConfig.timeLimit = 10000;
      }
      requestDynamicProxyConfig.fetchFailContinue = (process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_FETCH_FAIL_CONTINUE || "false") === "true";
      console.log("🌐 已启用 getToken 局部动态代理");
    }
  }
  const globalProxy = process.env.JD_ISV_GLOBAL_PROXY === "true";
  if (globalProxy) try {
    require("global-agent/bootstrap");
    console.log("🌐 已启用 global-agent 全局代理");
  } catch (lI11llll) {
    console.log("❌ getToken 代理模块加载失败 ➜ " + lI11llll.message);
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
  } catch (l1lIlII1) {
    console.log("❌ getToken Redis模块加载失败 ➜ " + l1lIlII1.message);
  }
  if (redis) try {
    redisClient = redis.createClient({
      "url": redisUrl
    });
  } catch (IliIlI) {
    console.log("❌ getToken Redis连接异常 ➜ " + (IliIlI.message || IliIlI));
  }
}
async function _redisCacheGet(i11IIIli) {
  const Ilil1Il = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, ptPin) : "" + redisKey + i11IIIli),
    IliI1I1i = 3;
  let Iii1Ill = null;
  for (let lllill = 0; lllill < IliI1I1i; lllill++) {
    try {
      await redisClient.connect();
    } catch {}
    try {
      const II1I1ll1 = await redisClient.get(Ilil1Il);
      if (II1I1ll1) return II1I1ll1;
      Iii1Ill = null;
      break;
    } catch (lIiIlIII) {
      Iii1Ill = lIiIlIII.message || lIiIlIII;
    }
  }
  if (Iii1Ill) console.log("🚫 getToken Redis缓存读取失败 ➜ " + Iii1Ill);
  return "";
}
async function _redisCachePut(li1lII, l1ii1iil) {
  const lIIili11 = Math.floor((Date.now() + defaultCacheTTL) / 1000),
    Il11iiIi = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, ptPin) : "" + redisKey + li1lII),
    III1l1iI = l1ii1iil,
    IlI1ll1i = 3;
  let lI11lIl1 = null;
  for (let iilIl11 = 0; iilIl11 < IlI1ll1i; iilIl11++) {
    try {
      await redisClient.connect();
    } catch {}
    try {
      await redisClient.set(Il11iiIi, III1l1iI);
      await redisClient.EXPIREAT(Il11iiIi, lIIili11);
      lI11lIl1 = null;
      break;
    } catch (liliI1i1) {
      lI11lIl1 = liliI1i1.message || liliI1i1;
    }
  }
  if (lI11lIl1) console.log("🚫 getToken Redis缓存写入失败 ➜ " + lI11lIl1);
}
async function _redisClientClose() {
  try {
    await redisClient.disconnect();
  } catch (i1i1IiI) {
    errorMessage = i1i1IiI.message || i1i1IiI;
  }
}
async function getToken(IlI1, IlIlI1Il, li11IliI = true) {
  let ilIiI1I = "";
  try {
    const IlIIlIi1 = decodeURIComponent(common.getCookieValue(IlI1, "pt_pin"));
    if (IlIIlIi1) {
      if (!scriptName) {
        const i11llI1I = require.main.filename;
        scriptName = path.basename(i11llI1I, ".js");
      }
      if (li11IliI) {
        let l111ilil = [];
        if (IlIlI1Il.includes("lzkj")) {
          if (scriptName.startsWith("jd_lzkj_v2_")) l111ilil = lzkjPinFilter_interaction_v2;else scriptName.startsWith("jd_lzkj_") ? l111ilil = lzkjPinFilter_interactsaas_and_interaction_v1 : l111ilil = lzkjPinFilter;
        } else IlIlI1Il.includes("cjhy") && (l111ilil = cjhyPinFilter);
        if (l111ilil.length > 0 && (l111ilil.includes(IlIIlIi1) || l111ilil.includes(encodeURIComponent(IlIIlIi1)))) return console.log("已设置跳过运行该账号（全局屏蔽）"), "";
        ilIiI1I = TokenCache.get(IlIIlIi1) || "";
        if (ilIiI1I) return ilIiI1I;
        if (redisClient) {
          ilIiI1I = await _redisCacheGet(IlIIlIi1);
          if (ilIiI1I) {
            return ilIiI1I;
          }
        }
      }
    }
    const iIlI1ll = await common.getSign("isvObfuscator", {
      "url": IlIlI1Il,
      "id": ""
    });
    if (!iIlI1ll) return console.log("🚫 getToken 签名获取失败"), "";
    let ll1liliI = null,
      Iii1I = false;
    if (requestAxiosProxyConfig || requestDynamicProxyConfig) {
      if (requestAxiosProxyConfig) ll1liliI = requestAxiosProxyConfig;else {
        if (requestDynamicProxyConfig) {
          if (requestDynamicProxyConfig.proxyConfig) ll1liliI = requestDynamicProxyConfig.proxyConfig, Iii1I = true;else {
            const IlI1IIl = await common.getProxyAddressWithApi(requestDynamicProxyConfig.api),
              l1I11II1 = common._getProxyConfigWithAddress(IlI1IIl);
            if (l1I11II1) {
              requestDynamicProxyConfig.extractTimestamp = Date.now();
              requestDynamicProxyConfig.usedTimes = 0;
              requestDynamicProxyConfig.proxyConfig = l1I11II1;
              ll1liliI = l1I11II1;
              Iii1I = true;
            } else {
              if (!requestDynamicProxyConfig.fetchFailContinue) {
                return console.log("🚫 getToken 请求错误 ➜ 获取动态代理地址失败，已设置跳过请求"), "";
              }
            }
          }
        }
      }
    }
    const i1IiIli = {
        "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
        "method": "POST",
        "headers": {
          "Host": "api.m.jd.com",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": common.genUA(IlIIlIi1) || "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
          "Accept-Language": "zh-Hans-CN;q=1",
          "Accept-Encoding": "gzip, deflate, br",
          "J-E-H": common.getJEH(),
          "J-E-C": common.getJEC(IlIIlIi1),
          "Cookie": IlI1
        },
        "proxy": ll1liliI,
        "data": iIlI1ll,
        "timeout": 60000
      },
      l1IIIl = 2;
    let i1li1lli = 0,
      iiI1iIi = null;
    while (i1li1lli < l1IIIl) {
      const Ill1iIll = await common.request(i1IiIli);
      if (Iii1I) {
        requestDynamicProxyConfig.lastUseTimeStamp = Date.now();
        requestDynamicProxyConfig.usedTimes++;
        const i11lllll = requestDynamicProxyConfig.useLimit > 0 && requestDynamicProxyConfig.usedTimes >= requestDynamicProxyConfig.useLimit,
          i11iI11l = requestDynamicProxyConfig.timeLimit > 0 && Date.now() - requestDynamicProxyConfig.extractTimestamp >= requestDynamicProxyConfig.timeLimit;
        (i11lllll || i11iI11l) && (requestDynamicProxyConfig.proxyConfig = null, requestDynamicProxyConfig.lastUseTimeStamp = null, requestDynamicProxyConfig.extractTimestamp = null, requestDynamicProxyConfig.usedTimes = 0);
      }
      if (!Ill1iIll.success) {
        iiI1iIi = "❌ getToken 请求失败 ➜ " + Ill1iIll.error;
        i1li1lli++;
        continue;
      }
      if (!Ill1iIll.data) {
        iiI1iIi = "🚫 getToken 请求失败 ➜ 无响应数据";
        i1li1lli++;
        continue;
      }
      try {
        const lliI1iI1 = Ill1iIll.data;
        if (lliI1iI1.code === "0") {
          ilIiI1I = lliI1iI1.token;
          TokenCache.put(IlIIlIi1, ilIiI1I, defaultCacheTTL);
          redisClient && redisSubmit && (await _redisCachePut(IlIIlIi1, ilIiI1I));
        } else {
          if (lliI1iI1.code === "3" && lliI1iI1.errcode === 264) {
            console.log("🚫 getToken 接口响应异常 ➜ 账号无效");
          } else console.log("🚫 getToken 接口响应异常 ➜ " + JSON.stringify(lliI1iI1));
        }
      } catch (illIiliI) {
        console.log("🚫 getToken 在处理接口响应时遇到了错误 ➜ " + (illIiliI.message || illIiliI));
      }
      break;
    }
    return i1li1lli >= l1IIIl && console.log(iiI1iIi), ilIiI1I;
  } catch (lil1II) {
    return console.log("🚫 getToken 在处理请求时遇到了错误"), console.log(lil1II), ilIiI1I;
  } finally {
    redisClient && (await _redisClientClose());
  }
}
module.exports = getToken;