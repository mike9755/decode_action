//Mon Jul 08 2024 09:32:41 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const fs = require("fs"),
  path = require("path"),
  https = require("https"),
  axios = require("axios").default,
  CryptoJS = require("crypto-js"),
  querystring = require("querystring");
class Common {
  constructor() {
    this._Cookie = "";
    this._UserAgent = "";
    this._UserAgentMap = new Map();
    this._defaultUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0";
    this._appSignConfig = null;
    this._requestDebugMode = false;
    this._requestAxiosProxyConfig = null;
    this._requestDynamicProxyConfig = null;
    this._requestDynamicProxyShowAddress = false;
    this._requestDynamicProxyPrintAddressFormat = "刷新动态代理配置：<address>";
    this._requestNoProxyList = null;
    this._requestFailMessagesMap = {
      400: "请求错误 [400 Bad Request]",
      401: "未授权 [401 Unauthorized]",
      403: "禁止访问 [403 Forbidden]",
      493: "禁止访问 [493 Forbidden]",
      404: "资源未找到 [404 Not Found]",
      408: "请求超时 [408 Request Timeout]",
      429: "请求过多 [429 Too Many Requests]",
      500: "服务器内部错误 [500 Internal Server Error]",
      502: "网关错误 [502 Bad Gateway]",
      503: "服务不可用 [503 Service Unavailable]"
    };
    this._requestErrorMessagesMap = {
      "ECONNABORTED": "请求被中断",
      "ECONNRESET": "连接被对方重置",
      "ECONNREFUSED": "服务器拒绝连接",
      "ETIMEDOUT": "网络请求超时",
      "ENOTFOUND": "无法解析的域名或地址",
      "EPROTO": "协议错误",
      "EHOSTUNREACH": "无法到达服务器主机",
      "ENETUNREACH": "无法到达网络",
      "EADDRINUSE": "网络地址已被使用",
      "EPIPE": "向已关闭的写入流进行写入",
      "ERR_BAD_OPTION_VALUE": "无效或不支持的配置选项值",
      "ERR_BAD_OPTION": "无效的配置选项",
      "ERR_NETWORK": "网络错误",
      "ERR_FR_TOO_MANY_REDIRECTS": "请求被重定向次数过多",
      "ERR_DEPRECATED": "使用了已弃用的特性或方法",
      "ERR_BAD_RESPONSE": "服务器响应无效或无法解析",
      "ERR_BAD_REQUEST": "请求无效或缺少必需参数",
      "ERR_CANCELED": "请求被用户取消",
      "ERR_NOT_SUPPORT": "当前环境不支持此特性或方法",
      "ERR_INVALID_URL": "请求的 URL 无效",
      "ERR_TLS_CERT_ALTNAME_INVALID": "TLS 证书的主机名无效",
      "ERR_TLS_CERT_REJECTED": "TLS 证书被拒绝",
      "ERR_HTTP2_STREAM_CANCEL": "HTTP2 流被取消",
      "ERR_HTTP2_SESSION_ERROR": "HTTP2 会话出错",
      "ERR_QUICSESSION_VERSION_NEGOTIATION": "QUIC 会话版本协商失败",
      "EAI_AGAIN": "DNS 查找超时"
    };
    this._latestAppVersionData = {
      "build": "169370",
      "version": "13.1.0"
    };
    this._latestLiteAppVersionData = {
      "build": "1676",
      "version": "6.26.0"
    };
    this._latestIOSVersion = "17.5";
    this._appHttpsTlsOptions = {
      "ciphers": ["TLS_GREASE 0x7a 0x7a", "TLS_AES_128_GCM_SHA256", "TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256", "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256", "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA", "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA", "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA", "TLS_RSA_WITH_AES_256_GCM_SHA384", "TLS_RSA_WITH_AES_128_GCM_SHA256", "TLS_RSA_WITH_AES_256_CBC_SHA", "TLS_RSA_WITH_AES_128_CBC_SHA", "TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA", "TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA", "TLS_RSA_WITH_3DES_EDE_CBC_SHA", "TLS_ECDHE_ECDSA_AES256_GCM_SHA384", "TLS_ECDHE_RSA_AES256_GCM_SHA384", "TLS_DHE_RSA_AES256_GCM_SHA384", "TLS_ECDHE_ECDSA_CHACHA20_POLY1305", "TLS_ECDHE_RSA_CHACHA20_POLY1305", "TLS_DHE_RSA_CHACHA20_POLY1305", "TLS_ECDHE_ECDSA_AES128_GCM_SHA256", "TLS_ECDHE_RSA_AES128_GCM_SHA256", "TLS_DHE_RSA_AES128_GCM_SHA256", "TLS_ECDHE_ECDSA_AES256_SHA384", "TLS_ECDHE_RSA_AES256_SHA384", "TLS_DHE_RSA_AES256_SHA256", "TLS_ECDHE_ECDSA_AES128_SHA256", "TLS_ECDHE_RSA_AES128_SHA256", "TLS_DHE_RSA_AES128_SHA256", "TLS_RSA_PSK_AES256_GCM_SHA384", "TLS_DHE_PSK_AES256_GCM_SHA384", "TLS_RSA_PSK_CHACHA20_POLY1305", "TLS_DHE_PSK_CHACHA20_POLY1305", "TLS_ECDHE_PSK_CHACHA20_POLY1305", "TLS_AES256_GCM_SHA384", "TLS_PSK_AES256_GCM_SHA384", "TLS_PSK_CHACHA20_POLY1305", "TLS_RSA_PSK_AES128_GCM_SHA256", "TLS_DHE_PSK_AES128_GCM_SHA256", "TLS_AES128_GCM_SHA256", "TLS_PSK_AES128_GCM_SHA256", "TLS_AES256_SHA256", "TLS_AES128_SHA256"].join(":")
    };
    this.Base64 = Base64Algorithm;
    this.DataCache = LocalStorageCache;
    this._shopMemberActivityIds = new Map();
    this._H5st = null;
    this._Table = null;
    this._HttpsProxyAgent = null;
    this._genSignModelPath = __dirname + "/genSign";
    this._jdCryptoModelPath = __dirname + "/jdCrypto";
    this._hasInitAppSignConfig = false;
    this._initRequestConfig();
  }
  ["_initRequestConfig"]() {
    try {
      const iIiiilII = require.main.filename,
        iIII1ill = path.basename(iIiiilII, ".js");
      this._requestNoProxyList = (process.env[iIII1ill + "_no_proxy"] || process.env.JD_COMMON_REQUEST_NO_PROXY || "").split(",").filter(lii1IIIl => lii1IIIl !== "");
      const llli1I1i = process.env[iIII1ill + "_http_proxy"] || process.env.JD_COMMON_REQUEST_HTTP_PROXY || "";
      if (llli1I1i) {
        const lIlIl111 = this._getProxyConfigWithAddress(llli1I1i);
        lIlIl111 ? (this._requestAxiosProxyConfig = lIlIl111, console.log("🌐 已启用全局静态代理")) : console.log("❌ 提供的代理地址无效，跳过启用全局静态代理");
      } else {
        const iiiIii1l = process.env[iIII1ill + "_http_dynamic_proxy_api"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_API || "";
        if (iiiIii1l) {
          this._requestDynamicProxyConfig = {
            "api": null,
            "proxyConfig": null,
            "useLimit": null,
            "timeLimit": null,
            "fetchFailContinue": null,
            "extractTimestamp": null,
            "lastUseTimeStamp": null,
            "usedTimes": null
          };
          this._requestDynamicProxyConfig.api = iiiIii1l;
          const ll11i11 = process.env[iIII1ill + "_http_dynamic_proxy_use_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_USE_LIMIT || "1";
          try {
            this._requestDynamicProxyConfig.useLimit = parseInt(ll11i11);
          } catch {
            this._requestDynamicProxyConfig.useLimit = 1;
          }
          const IilII11i = process.env[iIII1ill + "_http_dynamic_proxy_time_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_TIME_LIMIT || "30000";
          try {
            this._requestDynamicProxyConfig.timeLimit = parseInt(IilII11i);
          } catch {
            this._requestDynamicProxyConfig.timeLimit = 10000;
          }
          this._requestDynamicProxyConfig.fetchFailContinue = (process.env[iIII1ill + "_http_dynamic_proxy_fetch_fail_continue"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_FETCH_FAIL_CONTINUE || "false") === "true";
          this._requestDynamicProxyShowAddress = (process.env[iIII1ill + "_http_dynamic_proxy_show_address"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_SHOW_ADDRESS || "false") === "true";
          console.log("🌐 已启用全局动态代理");
        }
      }
      Object.assign(axios.defaults, {
        "headers": {
          "common": {
            "User-Agent": this._defaultUserAgent
          }
        },
        "maxContentLength": Infinity,
        "maxBodyLength": Infinity,
        "maxRedirects": Infinity,
        "timeout": 60000,
        "transformResponse": [iiIIl => {
          try {
            return JSON.parse(iiIIl);
          } catch {}
          try {
            const iill11Il = /[\w$.]+\(\s*({[\s\S]*?})\s*\)\s*;?/;
            if (iill11Il.test(iiIIl)) {
              const iIIil1il = iiIIl.match(iill11Il)[1];
              return JSON.parse(iIIil1il);
            }
          } catch {}
          return iiIIl;
        }]
      });
    } catch (lIlI1Ill) {
      console.log("❌ 初始化 HTTP 请求配置时遇到了错误\n" + lIlI1Ill);
    }
  }
  ["_initAppSignConfig"]() {
    this._appSignConfig = {
      "requestApi": process.env.JD_SIGN_API || "http://api.nolanstore.cc/sign",
      "bodyField": process.env.JD_SIGN_API_BODY_FIELD || "body",
      "functionIdField": process.env.JD_SIGN_API_FUNCTIONID_FIELD || "fn",
      "requestMethod": null,
      "requestContentType": null,
      "genSign": null
    };
    try {
      const lliiI1Ii = process.env.JD_SIGN_API_METHOD;
      lliiI1Ii && lliiI1Ii.toUpperCase() === "GET" ? this._appSignConfig.requestMethod = "GET" : this._appSignConfig.requestMethod = "POST";
    } catch {}
    try {
      const IlI1ilI = process.env.JD_SIGN_API_CONTENT_TYPE;
      if (IlI1ilI && IlI1ilI.indexOf("application/x-www-form-urlencoded") !== -1) {
        this._appSignConfig.requestContentType = IlI1ilI;
      } else {
        this._appSignConfig.requestContentType = "application/json; charset=utf-8";
      }
    } catch {}
    try {
      this._appSignConfig.genSign = require(this._genSignModelPath);
    } catch {}
  }
  ["genRandomString"](llI1l1 = 32, iillI1ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const II1II1l1 = iillI1ii.length;
    let i1iiIil1 = "";
    for (let i1IIIi = 0; i1IIIi < llI1l1; i1IIIi++) {
      i1iiIil1 += iillI1ii.charAt(Math.floor(Math.random() * II1II1l1));
    }
    return i1iiIil1;
  }
  ["parseUrl"](l1lliI1) {
    try {
      const iIiI111i = new URL(l1lliI1);
      return iIiI111i;
    } catch (lIlliili) {
      return {};
    }
  }
  ["parseUrlParameter"](iilIiIIi) {
    try {
      const I111i1II = {},
        l1iIl1li = this.parseUrl(iilIiIIi),
        iII11Ill = new URLSearchParams(l1iIl1li?.["search"]);
      for (const [Iilliil1, iIIilII1] of iII11Ill) {
        I111i1II[Iilliil1] = iIIilII1;
      }
      if (l1iIl1li?.["hash"] && l1iIl1li.hash.includes("#/")) {
        const i1iiI11i = l1iIl1li.hash.replace("#/", ""),
          ilI1Illi = i1iiI11i.includes("?") ? new URLSearchParams(i1iiI11i.split("?").slice(1).join("?")) : new URLSearchParams();
        for (const [l1l1illI, ll1IlIi1] of ilI1Illi) {
          I111i1II[l1l1illI] = ll1IlIi1;
        }
      }
      return I111i1II;
    } catch {
      return {};
    }
  }
  ["getUrlParameter"](IiIll11i, I1ilI1li) {
    try {
      const I1illl = this.parseUrl(IiIll11i),
        liii11I = I1illl.searchParams.get(I1ilI1li);
      return liii11I || "";
    } catch {
      return "";
    }
  }
  ["objectToQueryString"](iiilII1l) {
    try {
      const IilliiIi = [];
      for (const Il111ii1 in iiilII1l) {
        if (iiilII1l.hasOwnProperty(Il111ii1)) {
          const I11iIIii = iiilII1l[Il111ii1],
            I1l11II1 = encodeURIComponent(Il111ii1),
            Ii1li11l = I11iIIii === null || I11iIIii === undefined ? "" : encodeURIComponent(I11iIIii);
          IilliiIi.push(I1l11II1 + "=" + Ii1li11l);
        }
      }
      return IilliiIi.join("&");
    } catch {
      return "";
    }
  }
  ["queryStringToObject"](ili1ilIi) {
    try {
      const l1iIIi11 = {},
        Ili1IIi1 = ili1ilIi.split("&");
      for (const llllIIii of Ili1IIi1) {
        const [iIIlI1l1, l1lill1] = llllIIii.split("=");
        l1iIIi11[decodeURIComponent(iIIlI1l1)] = l1lill1 === undefined ? null : decodeURIComponent(l1lill1);
      }
      return l1iIIi11;
    } catch {
      return {};
    }
  }
  ["parseResponseCookie"](Ii1Iili) {
    const ii1iI1i = {};
    try {
      if (typeof Ii1Iili === "object" && Ii1Iili?.["headers"] && Ii1Iili?.["headers"]["set-cookie"]) {
        const iiIlliiI = Ii1Iili.headers["set-cookie"];
        for (const ii1ll1ll of iiIlliiI) {
          const ll1i1i1I = ii1ll1ll.split(";")[0];
          ii1iI1i[ll1i1i1I.substr(0, ll1i1i1I.indexOf("="))] = ll1i1i1I.substr(ll1i1i1I.indexOf("=") + 1);
        }
      }
    } catch {}
    return ii1iI1i;
  }
  ["getResponseCookie"](l1IiI1, i1IIil1l = "") {
    let lIIlIi11 = "";
    const lil1ii1 = this.parseResponseCookie(l1IiI1),
      I1llllii = Object.keys(lil1ii1);
    if (I1llllii.length > 0) I1llllii.forEach(ii1Il1il => {
      lIIlIi11 += ii1Il1il + "=" + lil1ii1[ii1Il1il] + "; ";
    }), lIIlIi11 = lIIlIi11.trim();else {
      if (i1IIil1l) return i1IIil1l;
    }
    return lIIlIi11;
  }
  ["getCookieValue"](i1111, il1IiII1) {
    if (!i1111 || !il1IiII1) return "";
    const llllIIil = new RegExp(il1IiII1 + "=([^;]*)"),
      III1liI1 = llllIIil.exec(i1111.trim().replace(/\s/g, ""));
    return III1liI1 && III1liI1[1] || "";
  }
  ["parseCookie"](iIiilll1) {
    const i1iiIlli = {},
      i1i1Ii1 = iIiilll1.split(";");
    for (const I1Illi1i of i1i1Ii1) {
      const [iIi11i, ilIliiiI] = I1Illi1i.trim().split("=");
      i1iiIlli[iIi11i] = ilIliiiI;
    }
    return i1iiIlli;
  }
  ["filterCookieByFields"](l11lliIi, iiil1lii) {
    const I11lii1i = l11lliIi.split(/;\s*/),
      llIlIlil = I11lii1i.filter(l111iilI => {
        const Il1li = l111iilI.split("=")[0];
        return iiil1lii.includes(Il1li);
      });
    return llIlIlil.join("; ");
  }
  ["getLatestIOSVersion"]() {
    return this._latestIOSVersion || "";
  }
  ["formatTime"](I1IIi1iI, l11iII1i = Date.now()) {
    const iIiIiIi1 = new Date(l11iII1i);
    let iIII1il = I1IIi1iI;
    const lI1IiIl1 = {
      "YYYY": iIiIiIi1.getFullYear(),
      "MM": String(iIiIiIi1.getMonth() + 1).padStart(2, "0"),
      "DD": String(iIiIiIi1.getDate()).padStart(2, "0"),
      "HH": String(iIiIiIi1.getHours()).padStart(2, "0"),
      "mm": String(iIiIiIi1.getMinutes()).padStart(2, "0"),
      "ss": String(iIiIiIi1.getSeconds()).padStart(2, "0"),
      "S": String(iIiIiIi1.getMilliseconds()).padStart(3, "0")
    };
    return Object.keys(lI1IiIl1).forEach(i1Iii11 => {
      iIII1il = iIII1il.replace(new RegExp(i1Iii11, "g"), lI1IiIl1[i1Iii11]);
    }), iIII1il;
  }
  async ["request"](li111111) {
    let iI1i1IiI = {
        "success": false,
        "status": null,
        "data": null,
        "headers": null,
        "error": null,
        "connected": false
      },
      il1llII1 = this._requestDebugMode,
      Il1iliIi = null;
    try {
      if (!li111111 || !li111111.url) return console.log("❌ 调用请求方法无效，缺少必要的参数！"), iI1i1IiI.error = "缺少必要的请求参数", iI1i1IiI;
      li111111.hasOwnProperty("debug") && (il1llII1 = li111111.debug, delete li111111.debug);
      const Ill1i1I = this._requestAxiosProxyConfig,
        l1lii1l1 = this._requestDynamicProxyConfig,
        II1ii1Ii = this._requestNoProxyList;
      li111111.body && (li111111.data = li111111.body, delete li111111.body);
      for (const i11lilli of ["data", "params"]) {
        !li111111[i11lilli] && delete li111111[i11lilli];
      }
      li111111.method = (li111111.method || "get").toLowerCase();
      if (li111111.proxy && typeof li111111.proxy === "string") {
        const li1iIi1I = this._getProxyConfigWithAddress(li111111.proxy);
        li1iIi1I ? li111111.proxy = li1iIi1I : (console.log("❌ 代理配置无效，跳过使用代理"), delete li111111.proxy);
      }
      if (li111111.data && typeof li111111.data === "object" && (!li111111.headers || !li111111.headers["Content-Type"] || li111111.headers["Content-Type"].includes("application/x-www-form-urlencoded"))) {
        li111111.data = querystring.stringify(li111111.data);
      }
      if (li111111.httpsTlsOptions && typeof li111111.httpsTlsOptions === "object" && li111111.url.includes("https://")) Il1iliIi = li111111.httpsTlsOptions, Object.assign(https.globalAgent.options, Il1iliIi), delete li111111.httpsTlsOptions;else li111111.hasOwnProperty("httpsTlsOptions") && delete li111111.httpsTlsOptions;
      let ilillII = false;
      if (!["proxy", "httpAgent", "httpsAgent"].some(Il1iiIIl => li111111.hasOwnProperty(Il1iiIIl))) {
        if (Ill1i1I || l1lii1l1) {
          let i1lI1 = true;
          const l1ill1li = this.parseUrl(li111111.url).hostname || li111111.url;
          for (const ii1Ill1i of II1ii1Ii) {
            const iill1IiI = new RegExp("^" + ii1Ill1i.split("*").join(".*") + "$");
            if (iill1IiI.test(l1ill1li.hostname)) {
              i1lI1 = false;
              il1llII1 && console.log("ℹ️ 该代理请求命中 NO_PROXY 规则 ➜ " + ii1Ill1i);
              break;
            }
          }
          if (i1lI1) {
            if (Ill1i1I) li111111.proxy = Ill1i1I;else {
              if (l1lii1l1) {
                if (l1lii1l1.proxyConfig) li111111.proxy = l1lii1l1.proxyConfig, ilillII = true;else {
                  const lii1Il1i = await this.getProxyAddressWithApi(l1lii1l1.api),
                    lIilII1 = this._getProxyConfigWithAddress(lii1Il1i);
                  if (lIilII1) Object.assign(l1lii1l1, {
                    "extractTimestamp": Date.now(),
                    "usedTimes": 0,
                    "proxyConfig": lIilII1
                  }), li111111.proxy = lIilII1, ilillII = true, this._requestDynamicProxyShowAddress && console.log(this._requestDynamicProxyPrintAddressFormat.replace(/<address>/g, this._getProxyAddressWithConfig(li111111.proxy)));else {
                    if (!l1lii1l1.fetchFailContinue) {
                      return iI1i1IiI.error = "获取动态代理地址失败，已设置跳过请求", iI1i1IiI;
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (const llI1iii1 of ["proxy", "httpAgent", "httpsAgent"]) {
        !li111111[llI1iii1] && delete li111111[llI1iii1];
      }
      if (li111111.proxy) {
        this._loadModule("HttpsProxyAgent");
        li111111.httpsAgent = this._genHttpsAgentWithProxyConfig(li111111.proxy);
        delete li111111.proxy;
      }
      await axios(li111111).then(liI1lIl1 => {
        if (ilillII) {
          l1lii1l1.lastUseTimeStamp = Date.now();
          l1lii1l1.usedTimes++;
          const i1i1I1i1 = l1lii1l1.useLimit > 0 && l1lii1l1.usedTimes >= l1lii1l1.useLimit,
            IiIi = l1lii1l1.timeLimit > 0 && Date.now() - l1lii1l1.extractTimestamp >= l1lii1l1.timeLimit;
          (i1i1I1i1 || IiIi) && Object.assign(l1lii1l1, {
            "proxyConfig": null,
            "lastUseTimeStamp": null,
            "extractTimestamp": null,
            "usedTimes": 0
          });
        }
        iI1i1IiI.success = true;
        iI1i1IiI.status = liI1lIl1.status;
        iI1i1IiI.data = liI1lIl1.data;
        iI1i1IiI.headers = liI1lIl1.headers;
        iI1i1IiI.connected = true;
        il1llII1 && this._handleRequestDebugPrint(liI1lIl1, true);
      }).catch(I1ilIlIi => {
        if (ilillII) {
          l1lii1l1.lastUseTimeStamp = Date.now();
          l1lii1l1.usedTimes++;
          const lIl1I11l = l1lii1l1.useLimit > 0 && l1lii1l1.usedTimes >= l1lii1l1.useLimit,
            lII1111I = l1lii1l1.timeLimit > 0 && Date.now() - l1lii1l1.extractTimestamp >= l1lii1l1.timeLimit;
          (lIl1I11l || lII1111I) && Object.assign(l1lii1l1, {
            "proxyConfig": null,
            "lastUseTimeStamp": null,
            "extractTimestamp": null,
            "usedTimes": 0
          });
        }
        let il1llii1 = null;
        if (I1ilIlIi.response) {
          iI1i1IiI.connected = true;
          const i11liIiI = I1ilIlIi.response?.["status"];
          I1ilIlIi.response.data && (iI1i1IiI.data = I1ilIlIi.response.data);
          I1ilIlIi.response.headers && (iI1i1IiI.headers = I1ilIlIi.response.headers);
          il1llii1 = this._requestFailMessagesMap[i11liIiI] || "请求失败 [Response code " + i11liIiI + "]";
        } else {
          ilillII && Object.assign(l1lii1l1, {
            "proxyConfig": null,
            "lastUseTimeStamp": null,
            "extractTimestamp": null,
            "usedTimes": 0
          });
          I1ilIlIi.request ? il1llii1 = (this._requestErrorMessagesMap[I1ilIlIi.code] ?? "未知网络错误") + " [" + I1ilIlIi.code + "]" : il1llii1 = I1ilIlIi.message || "未知错误状态";
        }
        (I1ilIlIi.config?.["httpAgent"] || I1ilIlIi.config?.["httpsAgent"]) && (il1llii1 += "（🌐该请求通过代理发出）");
        iI1i1IiI.error = il1llii1;
        iI1i1IiI.status = I1ilIlIi.response?.["status"] || null;
        if (il1llII1) {
          this._handleRequestDebugPrint(I1ilIlIi, false);
          console.log("❌ 请求失败原因 ➜ " + iI1i1IiI.error);
        }
      });
      Il1iliIi && Object.keys(Il1iliIi).forEach(iI11ii1I => {
        https.globalAgent.options[iI11ii1I] = null;
      });
    } catch (i1llli1) {
      iI1i1IiI.error = i1llli1.message || i1llli1;
      il1llII1 && console.log("❌ 在处理 HTTP 请求时遇到了错误 ➜ " + i1llli1);
    }
    return iI1i1IiI;
  }
  async ["get"](IIll1i1I) {
    return await this.request(Object.assign({}, IIll1i1I, {
      "method": "get"
    }));
  }
  async ["post"](IliiIil1) {
    return await this.request(Object.assign({}, IliiIil1, {
      "method": "post"
    }));
  }
  async ["put"](II1I1iII) {
    return await this.request(Object.assign({}, II1I1iII, {
      "method": "put"
    }));
  }
  async ["delete"](i11I1II) {
    return await this.request(Object.assign({}, i11I1II, {
      "method": "delete"
    }));
  }
  ["_handleRequestDebugPrint"](l1i1iI1I, ii1iiIi1 = true) {
    this._loadModule("TablePrint");
    if (!this._Table) return;
    const i1liIll = this._Table;
    console.log("------------------------ 🔧 REQUEST DEBUG ------------------------------");
    try {
      let l1i1iII = null,
        l1ii1iIi = null;
      l1i1iII = new i1liIll({
        "columns": [{
          "title": "类型",
          "name": "type",
          "alignment": "left"
        }, {
          "title": "说明",
          "name": "info",
          "alignment": "left"
        }],
        "charLength": {
          "🟢": 2,
          "🔴": 2,
          "❌": 2
        }
      });
      l1i1iII.addRow({
        "type": "请求结果",
        "info": "" + (ii1iiIi1 ? "🟢" : l1i1iI1I?.["response"] ? "🔴" : "❌") + (l1i1iI1I?.["status"] ? " " + l1i1iI1I.status : l1i1iI1I?.["response"] ? " " + l1i1iI1I.response?.["status"] : "") + " - " + "".concat(l1i1iI1I?.["config"]?.["method"] || "未知").toUpperCase()
      });
      if (l1i1iI1I?.["config"]?.["url"]) {
        try {
          l1ii1iIi = new URL(l1i1iI1I.config.url);
          l1i1iII.addRow({
            "type": "请求地址",
            "info": l1ii1iIi.origin
          });
          l1i1iII.addRow({
            "type": "请求路径",
            "info": l1ii1iIi.pathname
          });
        } catch {
          l1i1iII.addRow({
            "type": "请求地址",
            "info": l1i1iI1I.config.url
          });
        }
      }
      l1i1iII.printTable();
      if (l1ii1iIi && l1ii1iIi?.["search"] || l1i1iI1I?.["config"]?.["params"]) try {
        const lIiIiIli = Object.assign({}, new URLSearchParams(l1ii1iIi.search) || {}, l1i1iI1I?.["config"]?.["params"] || {});
        if (Object.keys(lIiIiIli).length > 0) {
          l1i1iII = new i1liIll({
            "columns": [{
              "title": "名称",
              "name": "label",
              "alignment": "left"
            }, {
              "title": "值",
              "name": "value",
              "alignment": "left"
            }]
          });
          for (let iill1li1 in lIiIiIli) {
            l1i1iII.addRow({
              "label": decodeURIComponent(iill1li1),
              "value": decodeURIComponent(lIiIiIli[iill1li1])
            });
          }
          console.log("\n✧ 请求参数");
          l1i1iII.printTable();
        }
      } catch {}
      if (l1i1iI1I?.["config"]?.["httpAgent"] || l1i1iI1I?.["config"]?.["httpsAgent"]) {
        const Illi1Ill = (l1i1iI1I.config?.["httpAgent"] || l1i1iI1I.config?.["httpsAgent"])?.["proxy"],
          i1liI1li = {
            "protocol": Illi1Ill.protocol.replace(":", ""),
            "hostname": Illi1Ill.hostname
          };
        Illi1Ill.port && (i1liI1li.port = Illi1Ill.port);
        if (Illi1Ill instanceof URL) (Illi1Ill.username || Illi1Ill.password) && (i1liI1li.username = Illi1Ill.username, i1liI1li.password = Illi1Ill.password);else {
          if (Illi1Ill.auth) {
            const IIIlI1I1 = Illi1Ill.auth.split(":");
            i1liI1li.username = IIIlI1I1[0];
            i1liI1li.password = IIIlI1I1[1];
          }
        }
        l1i1iII = new i1liIll({
          "columns": [{
            "title": "名称",
            "name": "label",
            "alignment": "left"
          }, {
            "title": "值",
            "name": "value",
            "alignment": "left"
          }]
        });
        for (let liIi1I1I in i1liI1li) {
          let IiiIl = i1liI1li[liIi1I1I];
          typeof IiiIl === "object" && (IiiIl = JSON.stringify(IiiIl));
          l1i1iII.addRow({
            "label": liIi1I1I,
            "value": IiiIl
          });
        }
        console.log("\n✧ HTTP 代理配置");
        l1i1iII.printTable();
      }
      if (l1i1iI1I?.["config"]?.["headers"]) {
        const ii1ii111 = l1i1iI1I.config.headers;
        l1i1iII = new i1liIll({
          "columns": [{
            "title": "名称",
            "name": "label",
            "alignment": "left"
          }, {
            "title": "值",
            "name": "value",
            "alignment": "left",
            "maxLen": 80
          }]
        });
        for (let ii1lIl11 in ii1ii111) {
          let IIii1lIl = ii1ii111[ii1lIl11];
          typeof IIii1lIl === "object" && (IIii1lIl = JSON.stringify(IIii1lIl));
          l1i1iII.addRow({
            "label": ii1lIl11,
            "value": IIii1lIl
          });
        }
        console.log("\n✧ 请求 Headers");
        l1i1iII.printTable();
      }
      if (l1i1iI1I?.["config"]?.["data"]) {
        let lli1lil = l1i1iI1I.config.data;
        if (typeof lli1lil === "object") lli1lil = JSON.stringify(JSON.parse(lli1lil));else {
          if (typeof lli1lil === "string") try {
            const Ilili1iI = JSON.parse(lli1lil);
            lli1lil = JSON.stringify(Ilili1iI);
          } catch {
            lli1lil = JSON.stringify(lli1lil).slice(1, -1);
          }
        }
        console.log("\n✧ 请求 Body\n" + lli1lil);
      }
      if (!ii1iiIi1 && !l1i1iI1I?.["response"]) {
        console.log("\n------------------------------------------------------------------------");
        return;
      }
      if (l1i1iI1I?.["headers"]) {
        const IIlli1II = l1i1iI1I.headers;
        l1i1iII = new i1liIll({
          "columns": [{
            "title": "名称",
            "name": "label",
            "alignment": "left"
          }, {
            "title": "值",
            "name": "value",
            "alignment": "left",
            "maxLen": 80
          }]
        });
        for (let III1i1il in IIlli1II) {
          let IiiIli11 = IIlli1II[III1i1il];
          typeof IiiIli11 !== "string" && (IiiIli11 = JSON.stringify(IiiIli11));
          l1i1iII.addRow({
            "label": III1i1il,
            "value": IiiIli11
          });
        }
        console.log("\n✧ 响应 Headers");
        l1i1iII.printTable();
      }
      if (l1i1iI1I?.["data"]) {
        let Ii1l1iil = l1i1iI1I.data;
        if (typeof Ii1l1iil === "object") Ii1l1iil = JSON.stringify(Ii1l1iil);else {
          if (typeof Ii1l1iil === "string") try {
            const I11IIIlI = JSON.parse(Ii1l1iil);
            Ii1l1iil = JSON.stringify(I11IIIlI);
          } catch {
            Ii1l1iil = JSON.stringify(Ii1l1iil).slice(1, -1);
          }
        }
        console.log("\n✧ 响应 Body\n" + Ii1l1iil);
      }
    } catch (Ilii1lI) {
      console.log("❌ 处理 REQUEST DEBUG PRINT 时遇到了错误 ➜ " + (Ilii1lI.message || Ilii1lI));
    }
    console.log("\n------------------------------------------------------------------------");
  }
  async ["getProxyAddressWithApi"](I11I1i1i) {
    let lII1ilIl = "";
    try {
      const Ill1I1I = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{1,5}\b/g,
        iil1iIlI = {
          "url": I11I1i1i,
          "method": "post",
          "proxy": null,
          "timeout": 30000
        };
      let IIlI1i1 = 0,
        IIi1I1li = null;
      const I1Iill1l = 1;
      while (IIlI1i1 < I1Iill1l) {
        const IiIl1l11 = await this.request(iil1iIlI);
        if (!IiIl1l11.success) {
          IIi1I1li = IiIl1l11.error;
          IIlI1i1++;
          continue;
        }
        if (!IiIl1l11.data) {
          IIi1I1li = "无响应数据";
          IIlI1i1++;
          continue;
        }
        const IiIllli1 = IiIl1l11.data;
        if (typeof IiIllli1 === "object") {
          if (IiIllli1?.["data"]) {
            let iI1Iill = IiIllli1.data;
            if (Array.isArray(iI1Iill) && iI1Iill.length > 0) {
              iI1Iill = iI1Iill[0];
              if (iI1Iill?.["ip"] && iI1Iill?.["port"]) lII1ilIl = iI1Iill.ip + ":" + iI1Iill.port;else iI1Iill?.["IP"] && iI1Iill?.["Port"] && (lII1ilIl = iI1Iill.IP + ":" + iI1Iill.Port);
            } else {
              if (iI1Iill?.["proxy_list"] && Array.isArray(iI1Iill.proxy_list) && iI1Iill.proxy_list.length > 0) {
                const iIl1Il1i = iI1Iill.proxy_list[0];
                if (typeof iIl1Il1i === "object" && iIl1Il1i?.["ip"] && iIl1Il1i?.["port"]) lII1ilIl = iIl1Il1i.ip + ":" + iIl1Il1i.port;else {
                  lII1ilIl = iIl1Il1i;
                }
              }
            }
            if (lII1ilIl && !Ill1I1I.test(lII1ilIl)) {
              lII1ilIl = "";
            }
          }
          !lII1ilIl && (IIi1I1li = "接口响应数据异常：" + JSON.stringify(IiIllli1));
        } else {
          const l111iIlI = IiIllli1.match(Ill1I1I);
          l111iIlI && (lII1ilIl = l111iIlI[0]);
          !lII1ilIl && (IIi1I1li = "接口响应数据异常：" + IiIllli1);
        }
        if (lII1ilIl) {
          return lII1ilIl;
        }
        IIlI1i1++;
      }
      IIlI1i1 >= I1Iill1l && console.log("⚠ 提取代理地址失败 ➜ " + IIi1I1li);
    } catch (iI1IIiIi) {
      console.log("❌ 在处理请求代理API获取代理地址时遇到了错误\n" + iI1IIiIi);
    }
    return lII1ilIl;
  }
  ["_getProxyConfigWithAddress"](ililIiII = "") {
    try {
      if (!ililIiII) return null;
      !ililIiII.includes("://") && (ililIiII = "http://" + ililIiII);
      const i1Iii11I = this.parseUrl(ililIiII);
      if (i1Iii11I?.["hostname"]) {
        const iili1II1 = {
          "protocol": i1Iii11I.protocol.replace(":", "") === "https" ? "https" : "http",
          "host": i1Iii11I.hostname,
          "port": parseInt(i1Iii11I?.["port"] || "8080")
        };
        return (i1Iii11I?.["username"] || i1Iii11I?.["password"]) && (iili1II1.auth = {
          "username": i1Iii11I?.["username"] || "",
          "password": i1Iii11I?.["password"] || ""
        }), iili1II1;
      }
    } catch {}
    return null;
  }
  ["_getProxyAddressWithConfig"](illiilli = null) {
    try {
      if (!illiilli) return null;
      const l1Iil1I = Object.assign({}, illiilli);
      let ii1IllI = "";
      return l1Iil1I.auth && (ii1IllI = (l1Iil1I.auth?.["username"] || "") + ":" + (l1Iil1I.auth?.["password"] || "") + "@"), l1Iil1I.protocol + "://" + ii1IllI + l1Iil1I.host + ":" + l1Iil1I.port;
    } catch {
      return JSON.stringify(illiilli);
    }
  }
  ["_genHttpsAgentWithProxyConfig"](ll1iIill) {
    try {
      if (!this._HttpsProxyAgent) {
        return null;
      }
      if (!ll1iIill) {
        return null;
      }
      let l1ii11i1 = (ll1iIill?.["protocol"] || "http") + "://";
      return ll1iIill?.["auth"] && (l1ii11i1 += (ll1iIill.auth?.["username"] || "") + ":" + (ll1iIill.auth?.["password"] || "") + "@"), l1ii11i1 += ll1iIill?.["host"] + ":" + (ll1iIill?.["port"] || "8080"), new this._HttpsProxyAgent(l1ii11i1);
    } catch (Ii1l1lil) {
      console.log("❌ 加载代理时遇到了错误 ➜ " + (Ii1l1lil.message || Ii1l1lil));
    }
    return null;
  }
  async ["concTaskNormal"](I1l1llIl = "3", IlIIIi11 = 100, illlllIi) {
    let i1il1lil = false,
      ilii1III = 0,
      Ii1l1l1I = 0;
    async function ll111iIl(Ili1ii) {
      const lllliIli = await illlllIi(Ili1ii);
      if (lllliIli) {
        if (typeof lllliIli === "boolean") i1il1lil = true;else {
          if (typeof lllliIli === "object") {
            lllliIli?.["runEnd"] && (i1il1lil = true);
          }
        }
      }
      ilii1III--;
      li1Ii11l();
    }
    async function li1Ii11l() {
      while (ilii1III < I1l1llIl && IlIIIi11 > 0 && !i1il1lil) {
        IlIIIi11--;
        ilii1III++;
        Ii1l1l1I++;
        await ll111iIl(Ii1l1l1I);
      }
      i1il1lil && (await new Promise(lllIlIll => {
        const lIIil1ll = setInterval(() => {
          ilii1III === 0 && (clearInterval(lIIil1ll), lllIlIll());
        }, 100);
      }));
    }
    const lIlIlili = Math.min(IlIIIi11, I1l1llIl),
      ii1IIlI = [];
    for (let iiiiI11I = 0; iiiiI11I < lIlIlili; iiiiI11I++) {
      IlIIIi11--;
      ilii1III++;
      Ii1l1l1I++;
      ii1IIlI.push(ll111iIl(Ii1l1l1I));
    }
    await Promise.all(ii1IIlI);
    li1Ii11l();
    await new Promise(IIIIilIi => {
      const IiI1iII1 = setInterval(() => {
        if (ilii1III === 0 || i1il1lil) {
          clearInterval(IiI1iII1);
          IIIIilIi();
        }
      }, 100);
    });
  }
  ["setCookie"](iIli1i) {
    this._Cookie = iIli1i;
  }
  ["unsetCookie"]() {
    this._Cookie = "";
    this._UserAgent = "";
  }
  ["getCookie"]() {
    return this._Cookie;
  }
  ["getLatestAppVersion"]() {
    return this._latestAppVersionData.version || "";
  }
  ["getLatestAppBuildVersion"]() {
    return this._latestAppVersionData.build || "";
  }
  ["getLatestLiteAppVersion"]() {
    return this._latestLiteAppVersionData.version || "";
  }
  ["getLatestLiteAppBuildVersion"]() {
    return this._latestLiteAppVersionData.build || "";
  }
  ["getErrorMsg"](Ililllil, IlIiillI = ["msg", "message", "errMsg", "errMessage", "errorMessage", "bizMsg", "subMsg", "echo", "error", "resp_msg", "txt", "rlt", "displayMsg", "resultMsg", "desc"], llIii1l1 = "") {
    if (!Ililllil) return llIii1l1;
    for (let li1Ili1i of IlIiillI) {
      if (Ililllil.hasOwnProperty(li1Ili1i)) {
        return Ililllil[li1Ili1i];
      }
    }
    return llIii1l1;
  }
  ["maskUserName"](l1il11il = "", I1ill11 = "*") {
    if (!l1il11il) return "";
    if (l1il11il.length <= 1) return I1ill11;
    if (l1il11il.length < 5) {
      return l1il11il.slice(0, 1) + I1ill11.repeat(l1il11il.length - 1);
    }
    return l1il11il.slice(0, 2) + I1ill11.repeat(l1il11il.length - 4) + l1il11il.slice(-2);
  }
  ["genUuid"](iII1Iiil = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", ili1I11i = "0123456789abcdef") {
    let lIliIiII = "";
    for (let IIlIilii of iII1Iiil) {
      if (IIlIilii == "x") lIliIiII += ili1I11i.charAt(Math.floor(Math.random() * ili1I11i.length));else IIlIilii == "X" ? lIliIiII += ili1I11i.charAt(Math.floor(Math.random() * ili1I11i.length)).toUpperCase() : lIliIiII += IIlIilii;
    }
    return lIliIiII;
  }
  ["genUA"](iilIilIl = "", i1111l = "jd") {
    if (iilIilIl && this._UserAgentMap.has(iilIilIl)) return this._UserAgentMap.get(iilIilIl);
    const iiIli1I1 = {
        "jd": {
          "app": "jdapp",
          "appBuild": this._latestAppVersionData.build,
          "clientVersion": this._latestAppVersionData.version
        },
        "lite": {
          "app": "jdltapp",
          "appBuild": this._latestLiteAppVersionData.build,
          "clientVersion": this._latestLiteAppVersionData.version
        }
      },
      i1i1iIi1 = i1111l === "lite" ? "lite" : "jd",
      {
        app: IllIiili,
        appBuild: II1lilll,
        clientVersion: iI1il1iI
      } = iiIli1I1[i1i1iIi1],
      IIiI1il1 = [this._latestIOSVersion].map(llii11i => {
        let lIllII1I = llii11i.split(".");
        if (lIllII1I.length > 2) lIllII1I.pop();
        return lIllII1I.join(".");
      }),
      ilIi1i = IIiI1il1[Math.floor(Math.random() * IIiI1il1.length)],
      i1IilliI = this.genUuid(),
      ii1lIIII = !!iilIilIl ? JSON.stringify(this.getCipherConf({
        "ud": CryptoJS.SHA1(iilIilIl).toString(),
        "sv": ilIi1i,
        "iad": ""
      }, i1i1iIi1)) : "",
      I1IIIIil = "iPhone; CPU iPhone OS " + ilIi1i.replace(".", "_") + " like Mac OS X",
      liiIII1 = [IllIiili, "iPhone", iI1il1iI, "", "rn/" + i1IilliI, "M/5.0", "appBuild/" + II1lilll, "jdSupportDarkMode/0", "ef/1", ii1lIIII ? "ep/" + encodeURIComponent(ii1lIIII) : "", "Mozilla/5.0 (" + I1IIIIil + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      iiIiliIl = liiIII1.join(";");
    iilIilIl && this._UserAgentMap.set(iilIilIl, iiIiliIl);
    if (this._Cookie) this._UserAgent = iiIiliIl;
    return iiIiliIl;
  }
  ["getJEH"](l111li1l) {
    return !l111li1l && (l111li1l = "JD4iPhone/" + this.getLatestAppBuildVersion() + " (iPhone; iOS " + this.getLatestIOSVersion() + "; Scale/3.00)"), encodeURIComponent(JSON.stringify(this.getCipherConf({
      "User-Agent": encodeURIComponent(l111li1l)
    })));
  }
  ["getJEC"](illiliil) {
    return encodeURIComponent(JSON.stringify(this.getCipherConf({
      "pin": encodeURIComponent(illiliil)
    })));
  }
  ["getCipherConf"](IiiIiiii, i1111I11 = "jd") {
    if (IiiIiiii && typeof IiiIiiii === "object") for (let IllIii in IiiIiiii) {
      IiiIiiii[IllIii] = this.Base64.encode(IiiIiiii[IllIii]);
    } else IiiIiiii && typeof IiiIiiii === "string" ? IiiIiiii = this.Base64.encode(IiiIiiii) : IiiIiiii = {};
    return {
      "ciphertype": 5,
      "cipher": IiiIiiii,
      "ts": Math.floor(Date.now() / 1000),
      "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      "version": "1.0.3",
      "appname": i1111I11 === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
      "ridx": -1
    };
  }
  async ["getLoginStatus"](liIiiIll = this._Cookie) {
    if (!liIiiIll) return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;
    try {
      const Ill1Il1 = {
        "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
        "method": "GET",
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh-Hans;q=0.9",
          "Cookie": liIiiIll,
          "Host": "plogin.m.jd.com",
          "User-Agent": this._UserAgent || this._defaultUserAgent
        },
        "timeout": 30000,
        "debug": false
      };
      let iliiliii = 0,
        IIl1iill = null;
      const l1i1II = 1;
      while (iliiliii < l1i1II) {
        const lliliiI1 = await this.request(Ill1Il1);
        if (!lliliiI1.success) {
          IIl1iill = "🚫 getLoginStatus 请求失败 ➜ " + lliliiI1.error;
          iliiliii++;
          continue;
        }
        if (!lliliiI1.data) {
          IIl1iill = "🚫 getLoginStatus 请求异常 ➜ 无响应数据";
          iliiliii++;
          continue;
        }
        const iI1iI1i = lliliiI1.data?.["islogin"];
        if (iI1iI1i === "1") return true;else {
          if (iI1iI1i === "0") return false;
        }
        iliiliii++;
      }
      iliiliii >= l1i1II && console.log(IIl1iill);
    } catch (I1l1l1li) {
      console.log("❌ getLoginStatus 在处理请求中遇到了错误\n" + I1l1l1li);
    }
    return undefined;
  }
  async ["joinShopMember"](IiiillIl, llIl1ill = this._Cookie, lli1l1lI = "") {
    if (!llIl1ill) {
      return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
    }
    if (!IiiillIl) {
      return undefined;
    }
    try {
      this._loadModule("h5st");
      if (!this._H5st) return undefined;
      IiiillIl = "".concat(IiiillIl);
      const iIlI1iil = {
        "venderId": IiiillIl,
        "bindByVerifyCodeFlag": 1,
        "registerExtend": {},
        "writeChildFlag": 0,
        "channel": 406,
        "appid": "27004",
        "needSecurity": true,
        "bizId": "shopmember_m_jd_com"
      };
      !lli1l1lI && this._shopMemberActivityIds.has(IiiillIl) && (lli1l1lI = this._shopMemberActivityIds.get(IiiillIl));
      lli1l1lI && (iIlI1iil.activityId = lli1l1lI);
      const Il1liI = {
          "appId": "27004",
          "appid": "shopmember_m_jd_com",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": iIlI1iil,
          "version": "4.7",
          "t": true,
          "ua": this._UserAgent || this._defaultUserAgent
        },
        IIIliI1I = await this._H5st.getH5st(Il1liI);
      if (!IIIliI1I.paramsData) {
        return undefined;
      }
      const iIIlIII1 = {
          "url": "https://api.m.jd.com/client.action",
          "method": "POST",
          "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Origin": "https://pages.jd.com",
            "Referer": "https://pages.jd.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this._UserAgent || this._defaultUserAgent,
            "Cookie": llIl1ill
          },
          "data": Object.assign({}, IIIliI1I.paramsData, {
            "area": "",
            "screen": "1290*2796",
            "uuid": "88888"
          }),
          "timeout": 30000
        },
        liIiii1i = await this.request(iIIlIII1);
      if (!liIiii1i.success) return console.log("🚫 joinShopMember 请求失败 ➜ " + liIiii1i.error), undefined;
      if (!liIiii1i.data) {
        return console.log("🚫 joinShopMember 请求异常 ➜ 无响应数据"), undefined;
      }
      const iiiiliI1 = liIiii1i.data;
      if (iiiiliI1?.["success"] === true) {
        if (iiiiliI1?.["result"] && iiiiliI1.result?.["giftInfo"]) {
          for (let li1l1ii of iiiiliI1.result?.["giftInfo"]?.["giftList"]) {
            console.log(" >> 入会获得：" + li1l1ii.discountString + li1l1ii.prizeName);
          }
        }
        if (iiiiliI1?.["message"] === "加入店铺会员成功") return true;else {
          if (iiiiliI1?.["message"] === "活动太火爆，请稍后再试") console.log("🚫 加入店铺会员失败 ➜ " + iiiiliI1.message);else return console.log("🚫 加入店铺会员失败 ➜ " + iiiiliI1?.["message"]), false;
        }
      } else {
        if (iiiiliI1?.["message"]) {
          return console.log("🚫 加入店铺会员失败 ➜ " + iiiiliI1.message), false;
        } else console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(iiiiliI1));
      }
    } catch (lIli11Ii) {
      console.log("❌ joinShopMember 在处理请求中遇到了错误\n" + lIli11Ii);
    }
    return undefined;
  }
  async ["getShopMemberStatus"](IIIlIIII, ilIIiiIl = this._Cookie) {
    if (!ilIIiiIl) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
    if (!IIIlIIII) return undefined;
    try {
      this._loadModule("h5st");
      if (!this._H5st) {
        return undefined;
      }
      IIIlIIII = "".concat(IIIlIIII);
      const ii1iII1I = {
          "appId": "27004",
          "appid": "shopmember_m_jd_com",
          "functionId": "getShopOpenCardInfo",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": {
            "venderId": IIIlIIII,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "27004",
            "needSecurity": true,
            "bizId": "shopmember_m_jd_com",
            "channel": 406
          },
          "version": "4.7",
          "t": true,
          "ua": this._UserAgent || this._defaultUserAgent
        },
        IIi1I1Il = await this._H5st.getH5st(ii1iII1I);
      if (!IIi1I1Il.paramsData) {
        return undefined;
      }
      const IIliIlIl = {
          "url": "https://api.m.jd.com/client.action",
          "method": "POST",
          "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Origin": "https://pages.jd.com",
            "Referer": "https://pages.jd.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this._UserAgent || this._defaultUserAgent,
            "Cookie": ilIIiiIl
          },
          "data": Object.assign({}, IIi1I1Il.paramsData, {
            "area": "",
            "screen": "1290*2796",
            "uuid": "88888"
          }),
          "timeout": 30000
        },
        Ill111lI = await this.request(IIliIlIl);
      if (!Ill111lI.success) return console.log("🚫 getShopMemberStatus 请求失败 ➜ " + Ill111lI.error), undefined;
      if (!Ill111lI.data) {
        return console.log("🚫 getShopMemberStatus 请求异常 ➜ 无响应数据"), undefined;
      }
      const IiiIi1 = Ill111lI.data;
      if (IiiIi1?.["success"] === true) {
        let II1I1Iil = IiiIi1.result;
        if (Array.isArray(II1I1Iil)) {
          II1I1Iil = II1I1Iil[0];
        }
        const II1liiii = II1I1Iil?.["interestsRuleList"]?.[0]?.["interestsInfo"]?.["activityId"];
        return II1liiii && this._shopMemberActivityIds.set(IIIlIIII, II1liiii), II1I1Iil?.["userInfo"]?.["openCardStatus"] === 1 ? true : false;
      } else {
        if (IiiIi1?.["message"]) console.log("🚫 获取店铺会员状态异常 ➜ " + IiiIi1.message);else {
          console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(IiiIi1));
        }
      }
    } catch (Iil1IiiI) {
      console.log("❌ getShopMemberStatus 在处理请求中遇到了错误\n" + Iil1IiiI);
    }
    return undefined;
  }
  async ["getShopDetail"](illiIIIi = {
    "venderId": "",
    "shopId": ""
  }, lIIllil = this._Cookie) {
    const {
      venderId: Iii1i1ii,
      shopId: l1ii11II
    } = illiIIIi;
    if (!Iii1i1ii && !l1ii11II) {
      return {};
    }
    try {
      const iiiiilli = {
          "url": "https://api.m.jd.com/client.action",
          "method": "POST",
          "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://shop.m.jd.com",
            "Referer": "https://shop.m.jd.com/",
            "Host": "api.m.jd.com",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": this._defaultUserAgent,
            "X-Referer-Page": "https://shop.m.jd.com/shop/introduce",
            "X-Rp-Client": "h5_1.0.0",
            "Cookie": lIIllil || ""
          },
          "data": {
            "functionId": "whx_getMShopDetail",
            "body": JSON.stringify({
              "shopId": "".concat(l1ii11II || ""),
              "venderId": "".concat(Iii1i1ii || ""),
              "source": "m-shop"
            }),
            "t": Date.now().toString(),
            "appid": "shop_m_jd_com",
            "clientVersion": "11.0.0",
            "client": "wh5",
            "area": "",
            "uuid": ""
          },
          "timeout": 30000
        },
        i1I1ilI = await this.request(iiiiilli);
      if (!i1I1ilI.success) return console.log("🚫 getShopDetail 请求失败 ➜ " + i1I1ilI.error), {};
      if (!i1I1ilI.data) return console.log("🚫 getShopDetail 请求异常 ➜ 无响应数据"), {};
      const I1i11lIl = i1I1ilI.data;
      if (I1i11lIl.code === "200" && I1i11lIl.success === true && I1i11lIl.data) {
        return I1i11lIl?.["data"] || {};
      }
    } catch (Ii1Ii1) {
      console.log("❌ getShopDetail 在处理请求中遇到了错误\n" + Ii1Ii1);
    }
    return {};
  }
  async ["getShopId"](iiI1iIIl, IlIi1Iii = this._Cookie) {
    if (!iiI1iIIl) {
      return null;
    }
    try {
      const IllIlIl1 = await this.getShopDetail({
        "venderId": iiI1iIIl
      }, IlIi1Iii);
      return IllIlIl1?.["shopBaseInfo"]?.["shopId"] || null;
    } catch (Il11IIIl) {
      console.log("❌ getShopId 在处理请求中遇到了错误\n" + Il11IIIl);
    }
    return null;
  }
  async ["getVenderId"](illi1111, ii1IliIi = this._Cookie) {
    if (!illi1111) return null;
    try {
      const i11l11II = await this.getShopDetail({
        "shopId": illi1111
      }, ii1IliIi);
      return i11l11II?.["shopBaseInfo"]?.["venderId"] || null;
    } catch (IIlilIll) {
      console.log("❌ getVenderId 在处理请求中遇到了错误\n" + IIlilIll);
    }
    return null;
  }
  async ["getShopName"](ll1lliiI = {
    "venderId": "",
    "shopId": ""
  }, ll11Ill1 = this._Cookie) {
    const {
      venderId: I11il,
      shopId: il1I11I1
    } = ll1lliiI;
    if (!I11il && !il1I11I1) {
      return null;
    }
    try {
      const iliIliil = await this.getShopDetail(ll1lliiI, ll11Ill1);
      return iliIliil?.["shopBaseInfo"]?.["shopName"] || null;
    } catch (Iilll11l) {
      console.log("❌ getShopName 在处理请求中遇到了错误\n" + Iilll11l);
    }
    return null;
  }
  async ["followShop"](il1II1ii, l111111l, IliIill = this._Cookie) {
    if (!IliIill) return console.log("🚫 followShop 请求失败 ➜ 未设置Cookie"), undefined;
    if (!il1II1ii && typeof il1II1ii !== "boolean" || !l111111l) {
      return undefined;
    }
    try {
      const llI11l1i = {
          "url": "https://api.m.jd.com/client.action",
          "method": "POST",
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://shop.m.jd.com",
            "Referer": "https://shop.m.jd.com/",
            "Connection": "keep-alive",
            "Accept-Language": "zh-cn",
            "Cookie": IliIill,
            "User-Agent": this._defaultUserAgent
          },
          "data": {
            "functionId": "whx_followShop",
            "body": JSON.stringify({
              "shopId": l111111l,
              "follow": il1II1ii
            }),
            "t": Date.now(),
            "appid": "shop_m_jd_com",
            "clientVersion": "11.0.0",
            "client": "wh5"
          },
          "timeout": 30000
        },
        l1iliI11 = await this.request(llI11l1i);
      if (!l1iliI11.success) return console.log("🚫 followShop 请求失败 ➜ " + l1iliI11.error), undefined;
      if (!l1iliI11.data) return console.log("🚫 followShop 请求异常 ➜ 无响应数据"), undefined;
      const I11IlI = l1iliI11.data;
      if (I11IlI?.["code"] === "0") return I11IlI?.["result"]?.["code"] === "0" ? true : false;else {
        if (I11IlI?.["msg"]) return false;else console.log("🚫 " + (il1II1ii ? "关注" : "取关") + "店铺异常 ➜ " + JSON.stringify(I11IlI));
      }
    } catch (IlI11Ill) {
      console.log("❌ followShop 在处理请求中遇到了错误\n" + IlI11Ill);
    }
    return undefined;
  }
  ["useAppTls"](Ii1Illil = {}) {
    return Object.assign({}, this._appHttpsTlsOptions, Ii1Illil);
  }
  async ["concTask"](lIilliIl = "3", Ii1lI1I1, ilill111) {
    const l1lIll1I = Ii1lI1I1.slice();
    let lIiII1i1 = false,
      IIl1ll1 = 0,
      li1i1iII = 0;
    async function i1111ii1(liIIiIIl, ilillIll) {
      const Illlilll = await ilill111(liIIiIIl, ilillIll);
      if (Illlilll) {
        if (typeof Illlilll === "boolean") lIiII1i1 = true;else {
          if (typeof Illlilll === "object") {
            if (Illlilll?.["runEnd"]) {
              lIiII1i1 = true;
            }
          }
        }
      }
      IIl1ll1--;
      I1iIiIl1();
    }
    async function I1iIiIl1() {
      while (IIl1ll1 < lIilliIl && l1lIll1I.length > 0 && !lIiII1i1) {
        const l1lIlI11 = l1lIll1I.shift();
        IIl1ll1++;
        li1i1iII++;
        await i1111ii1(l1lIlI11, li1i1iII);
      }
      lIiII1i1 && (await new Promise(iIlli1I => {
        const iI1111l1 = setInterval(() => {
          IIl1ll1 === 0 && (clearInterval(iI1111l1), iIlli1I());
        }, 100);
      }));
    }
    const l1i1IiiI = Math.min(l1lIll1I.length, lIilliIl),
      iIl1l = [];
    for (let ii1ll = 0; ii1ll < l1i1IiiI; ii1ll++) {
      const IIliIIiI = l1lIll1I.shift();
      IIl1ll1++;
      li1i1iII++;
      iIl1l.push(i1111ii1(IIliIIiI, li1i1iII));
    }
    await Promise.all(iIl1l);
    I1iIiIl1();
    await new Promise(I1iI1IIi => {
      const I1l1IIl1 = setInterval(() => {
        (IIl1ll1 === 0 || lIiII1i1) && (clearInterval(I1l1IIl1), I1iI1IIi());
      }, 100);
    });
  }
  async ["getSign"](i11I1ili, IIi11IIl) {
    !this._hasInitAppSignConfig && (this._initAppSignConfig(), this._hasInitAppSignConfig = true);
    let IIIlI1i = "";
    try {
      const ii11Ill = this._appSignConfig;
      if (ii11Ill.genSign) {
        try {
          IIIlI1i = ii11Ill.genSign(i11I1ili, IIi11IIl);
        } catch (lil1lliI) {
          console.log("🚫 getSign 获取本地签名遇到了错误 ➜ " + (lil1lliI.message || lil1lliI));
        }
        if (IIIlI1i) return IIIlI1i;else console.log("🚫 getSign 本地签名获取失败");
      }
      let Il1i11lI = {
        [ii11Ill.functionIdField]: i11I1ili,
        [ii11Ill.bodyField]: IIi11IIl
      };
      const l1I11I1 = {
        "url": ii11Ill.requestApi,
        "method": ii11Ill.requestMethod.toLowerCase(),
        "headers": {
          "Content-Type": ii11Ill.requestContentType
        },
        "data": null,
        "timeout": 60000,
        "proxy": null,
        "debug": false
      };
      ii11Ill.requestMethod === "GET" ? (ii11Ill.requestApi += "?" + this.objectToQueryString(Il1i11lI), delete l1I11I1.data, delete l1I11I1.headers["Content-Type"]) : ii11Ill.requestContentType.indexOf("application/x-www-form-urlencoded") !== -1 ? (typeof Il1i11lI[ii11Ill.bodyField] === "object" && (Il1i11lI[ii11Ill.bodyField] = JSON.stringify(Il1i11lI[ii11Ill.bodyField])), l1I11I1.data = this.objectToQueryString(Il1i11lI)) : l1I11I1.data = JSON.stringify(Il1i11lI);
      const I1i11i1l = await this.request(l1I11I1);
      if (!I1i11i1l.success) {
        return console.log("🚫 getSign 请求失败 ➜ " + I1i11i1l.error), IIIlI1i;
      }
      if (!I1i11i1l.data) return console.log("🚫 getSign 请求异常 ➜ 无响应数据"), IIIlI1i;
      let lI1iIlii = I1i11i1l.data;
      if (typeof I1i11i1l.data === "object") {
        lI1iIlii.data && (lI1iIlii = lI1iIlii.data);
        for (const iliI1l1l of ["body", "convertUrl", "convertUrlNew"]) {
          if (lI1iIlii?.[iliI1l1l] && this._checkSignStrFormat(lI1iIlii[iliI1l1l])) {
            IIIlI1i = lI1iIlii[iliI1l1l];
            break;
          }
        }
        !IIIlI1i && console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(lI1iIlii));
      } else this._checkSignStrFormat(lI1iIlii) ? IIIlI1i = lI1iIlii : console.log("🚫 getSign 响应数据解析异常 ➜ " + lI1iIlii);
    } catch (IliiiII) {
      console.log("🚫 getSign 在处理请求中遇到了错误\n" + IliiiII);
    }
    return IIIlI1i;
  }
  ["_checkSignStrFormat"](liliiIl1) {
    const ilIlilii = ["body=", "st=", "sign=", "sv="];
    for (let liilI1I1 = 0; liilI1I1 < ilIlilii.length; liilI1I1++) {
      if (!liliiIl1.includes(ilIlilii[liilI1I1])) {
        return false;
      }
    }
    return true;
  }
  ["_loadModule"](IiiIii) {
    switch (IiiIii) {
      case "h5st":
        if (!this._H5st) try {
          const {
            H5st: i11iIIi1
          } = require(this._jdCryptoModelPath);
          this._H5st = i11iIIi1;
        } catch (iliiIIlI) {
          console.log("❌ h5st 组件加载失败");
        }
        break;
      case "TablePrint":
        if (!this._Table) try {
          const {
            Table: liII1IIl
          } = require("console-table-printer");
          this._Table = liII1IIl;
        } catch (Il111lii) {
          console.log("❌ TablePrint 组件加载失败");
        }
        break;
      case "HttpsProxyAgent":
        if (!this._HttpsProxyAgent) {
          try {
            const {
              HttpsProxyAgent: iIl1Illi
            } = require("https-proxy-agent");
            this._HttpsProxyAgent = iIl1Illi;
          } catch (i1llIli) {
            try {
              const I11i1Ill = require("https-proxy-agent");
              this._HttpsProxyAgent = I11i1Ill;
            } catch (ili1111I) {
              console.log("❌ https-proxy-agent 代理模块加载失败");
            }
          }
        }
        break;
      default:
        break;
    }
  }
}
class Base64Algorithm {
  static ["_utf8Encode"](l1il1l1l) {
    l1il1l1l = l1il1l1l.replace(/rn/g, "n");
    let i11ili1l = "",
      ililIIII;
    for (let ll1IIiI = 0; ll1IIiI < l1il1l1l.length; ll1IIiI++) {
      ililIIII = l1il1l1l.charCodeAt(ll1IIiI);
      if (ililIIII < 128) {
        i11ili1l += String.fromCharCode(ililIIII);
      } else {
        if (ililIIII > 127 && ililIIII < 2048) i11ili1l += String.fromCharCode(ililIIII >> 6 | 192), i11ili1l += String.fromCharCode(ililIIII & 63 | 128);else {
          i11ili1l += String.fromCharCode(ililIIII >> 12 | 224);
          i11ili1l += String.fromCharCode(ililIIII >> 6 & 63 | 128);
          i11ili1l += String.fromCharCode(ililIIII & 63 | 128);
        }
      }
    }
    return i11ili1l;
  }
  static ["_utf8Decode"](i1iiIli1) {
    let i1I11II = "",
      liIi1lIl,
      iI11lliI,
      iI111iil,
      iI11lIii = 0;
    while (iI11lIii < i1iiIli1.length) {
      liIi1lIl = i1iiIli1.charCodeAt(iI11lIii);
      if (liIi1lIl < 128) i1I11II += String.fromCharCode(liIi1lIl), iI11lIii++;else liIi1lIl > 191 && liIi1lIl < 224 ? (iI11lliI = i1iiIli1.charCodeAt(iI11lIii + 1), i1I11II += String.fromCharCode((liIi1lIl & 31) << 6 | iI11lliI & 63), iI11lIii += 2) : (iI11lliI = i1iiIli1.charCodeAt(iI11lIii + 1), iI111iil = i1iiIli1.charCodeAt(iI11lIii + 2), i1I11II += String.fromCharCode((liIi1lIl & 15) << 12 | (iI11lliI & 63) << 6 | iI111iil & 63), iI11lIii += 3);
    }
    return i1I11II;
  }
  static ["encode"](I1IIiliI, Il1i111I = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    let I1Ilil1 = "",
      lII11li1,
      ll1iil,
      iiI1iiii,
      iI111lIi,
      i11iiiIl,
      Iillill1,
      llIliIII,
      Ii11li1i = 0;
    I1IIiliI = this._utf8Encode(I1IIiliI);
    while (Ii11li1i < I1IIiliI.length) {
      lII11li1 = I1IIiliI.charCodeAt(Ii11li1i++);
      ll1iil = I1IIiliI.charCodeAt(Ii11li1i++);
      iiI1iiii = I1IIiliI.charCodeAt(Ii11li1i++);
      iI111lIi = lII11li1 >> 2;
      i11iiiIl = (lII11li1 & 3) << 4 | ll1iil >> 4;
      Iillill1 = (ll1iil & 15) << 2 | iiI1iiii >> 6;
      llIliIII = iiI1iiii & 63;
      if (isNaN(ll1iil)) {
        Iillill1 = llIliIII = 64;
      } else isNaN(iiI1iiii) && (llIliIII = 64);
      I1Ilil1 = I1Ilil1 + Il1i111I.charAt(iI111lIi) + Il1i111I.charAt(i11iiiIl) + Il1i111I.charAt(Iillill1) + Il1i111I.charAt(llIliIII);
    }
    while (I1Ilil1.length % 4 > 1) I1Ilil1 += "=";
    return I1Ilil1;
  }
  static ["decode"](illI11I, li1IIlii = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    let lIlI1l1l = "",
      li111ill,
      lii11Il,
      I111li1l,
      illI1111,
      llliilll,
      lIIllili,
      lI11liIi,
      lii1l1Ii = 0;
    while (lii1l1Ii < illI11I.length) {
      illI1111 = li1IIlii.indexOf(illI11I.charAt(lii1l1Ii++));
      llliilll = li1IIlii.indexOf(illI11I.charAt(lii1l1Ii++));
      lIIllili = li1IIlii.indexOf(illI11I.charAt(lii1l1Ii++));
      lI11liIi = li1IIlii.indexOf(illI11I.charAt(lii1l1Ii++));
      li111ill = illI1111 << 2 | llliilll >> 4;
      lii11Il = (llliilll & 15) << 4 | lIIllili >> 2;
      I111li1l = (lIIllili & 3) << 6 | lI11liIi;
      lIlI1l1l += String.fromCharCode(li111ill);
      if (lIIllili != 64) lIlI1l1l += String.fromCharCode(lii11Il);
      if (lI11liIi != 64) lIlI1l1l += String.fromCharCode(I111li1l);
    }
    return lIlI1l1l = this._utf8Decode(lIlI1l1l), lIlI1l1l;
  }
}
class LocalStorageCache {
  constructor(lli1I1lI = null, liIIlIII = 0, l111Iii = null) {
    this.saveFile = lli1I1lI;
    this.defaultTTL = liIIlIII;
    this.reloadInterval = l111Iii;
    this.lastLoad = 0;
    this.data = new Map();
    this.pendingWrites = false;
    this.writeDebounceTime = 5000;
    this.load();
  }
  ["load"]() {
    if (this.saveFile && fs.existsSync(this.saveFile)) {
      try {
        const Ii1illiI = fs.readFileSync(this.saveFile, "utf8"),
          l1IIlIli = JSON.parse(Ii1illiI);
        this.data = new Map(Object.entries(l1IIlIli));
      } catch (iI1illI1) {}
    }
    this.lastLoad = this.now();
  }
  ["save"]() {
    if (this.saveFile && !this.pendingWrites) {
      this.pendingWrites = true;
      try {
        const II11i1ll = JSON.stringify(Object.fromEntries(this.data));
        fs.writeFileSync(this.saveFile, II11i1ll, "utf8");
      } catch {}
      this.pendingWrites = false;
    }
  }
  ["clear"]() {
    this.data.clear();
  }
  ["_checkAndReload"](l11IlI11 = this.now()) {
    if (!this.reloadInterval || !this.saveFile) return;
    l11IlI11 - this.lastLoad > this.reloadInterval && this.load();
  }
  ["now"]() {
    return Date.now();
  }
  ["put"](lIIli1i1, illiIi1l = null, II1l11ii = 0, il1IllIl) {
    this._checkAndReload();
    II1l11ii = II1l11ii === 0 ? this.defaultTTL : II1l11ii;
    const IlI1iI = II1l11ii === 0 ? 0 : this.now() + II1l11ii;
    let l1Il111l = null;
    this.data.has(lIIli1i1) && (l1Il111l = this.data.get(lIIli1i1).val);
    illiIi1l !== null ? this.data.set(lIIli1i1, {
      "expires": IlI1iI,
      "val": illiIi1l
    }) : this.data.delete(lIIli1i1);
    this.save();
    if (il1IllIl && l1Il111l) il1IllIl(l1Il111l);
    return l1Il111l;
  }
  ["get"](IIl11l1, il1IliI) {
    this._checkAndReload();
    let II1li1i1 = null;
    if (this.data.has(IIl11l1)) {
      const Ii1I1lil = this.data.get(IIl11l1);
      Ii1I1lil.expires === 0 || this.now() < Ii1I1lil.expires ? II1li1i1 = Ii1I1lil.val : (II1li1i1 = null, this.nuke(IIl11l1));
    }
    if (il1IliI) il1IliI(II1li1i1);
    return II1li1i1;
  }
  ["del"](I1illliI, iliIlI1i) {
    this._checkAndReload();
    let Il1IlII1 = null;
    this.data.has(I1illliI) && (Il1IlII1 = this.data.get(I1illliI).val, this.data.delete(I1illliI), this.save());
    if (iliIlI1i) iliIlI1i(Il1IlII1);
    return Il1IlII1;
  }
  ["nuke"](i1IlIl) {
    this._checkAndReload();
    this.data.has(i1IlIl) && (this.data.delete(i1IlIl), this.save());
  }
}
module.exports = new Common();