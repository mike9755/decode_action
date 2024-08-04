//Sun Aug 04 2024 05:03:38 GMT+0000 (Coordinated Universal Time)
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
    this.proxyPoolEnabled = false;
    this.proxyMode = "";
    this._requestDebugMode = false;
    this._requestAxiosProxyConfig = null;
    this._requestDynamicProxyConfig = null;
    this._requestDynamicProxyShowAddress = false;
    this._requestDynamicProxyPrintAddressFormat = "刷新动态代理配置：<address>";
    this._requestNoProxyList = null;
    this._requestFailMessagesMap = {
      301: "永久移动 [301 · Moved Permanently]",
      302: "临时移动 [302 · Found]",
      304: "资源未修改 [304 · Not Modified]",
      307: "临时重定向 [307 · Temporary Redirect]",
      308: "永久重定向 [308 · Permanent Redirect]",
      400: "请求错误 [400 · Bad Request]",
      401: "未授权 [401 · Unauthorized]",
      403: "禁止访问 [403 · Forbidden]",
      404: "资源未找到 [404 · Not Found]",
      405: "方法不被允许 [405 · Method Not Allowed]",
      406: "不可接受 [406 · Not Acceptable]",
      408: "请求超时 [408 · Request Timeout]",
      429: "请求过多 [429 · Too Many Requests]",
      413: "请求实体过大 [413 · Payload Too Large]",
      414: "请求的 URI 过长 [414 · URI Too Long]",
      415: "不支持的媒体类型 [415 · Unsupported Media Type]",
      416: "请求范围不符合要求 [416 · Range Not Satisfiable]",
      493: "禁止访问 [493 · Forbidden]",
      500: "服务器内部错误 [500 · Internal Server Error]",
      501: "服务器不支持请求 [501 · Not Implemented]",
      502: "网关错误 [502 · Bad Gateway]",
      503: "服务不可用 [503 · Service Unavailable]",
      504: "网关超时 [504 · Gateway Timeout]",
      505: "HTTP 版本不受支持 [505 · HTTP Version Not Supported]"
    };
    this._requestErrorMessagesMap = {
      ECONNABORTED: "请求被中断",
      ECONNRESET: "连接被对方重置",
      ECONNREFUSED: "服务器拒绝连接",
      ETIMEDOUT: "网络请求超时",
      ENOTFOUND: "无法解析的域名或地址",
      EPROTO: "协议错误",
      EHOSTUNREACH: "无法到达服务器主机",
      ENETUNREACH: "无法到达网络",
      EADDRINUSE: "网络地址已被使用",
      EPIPE: "向已关闭的写入流进行写入",
      ERR_BAD_OPTION_VALUE: "无效或不支持的配置选项值",
      ERR_BAD_OPTION: "无效的配置选项",
      ERR_NETWORK: "网络错误",
      ERR_FR_TOO_MANY_REDIRECTS: "请求被重定向次数过多",
      ERR_DEPRECATED: "使用了已弃用的特性或方法",
      ERR_BAD_RESPONSE: "服务器响应无效或无法解析",
      ERR_BAD_REQUEST: "请求无效或缺少必需参数",
      ERR_CANCELED: "请求被用户取消",
      ERR_NOT_SUPPORT: "当前环境不支持此特性或方法",
      ERR_INVALID_URL: "请求的 URL 无效",
      ERR_TLS_CERT_ALTNAME_INVALID: "TLS 证书的主机名无效",
      ERR_TLS_CERT_REJECTED: "TLS 证书被拒绝",
      ERR_HTTP2_STREAM_CANCEL: "HTTP2 流被取消",
      ERR_HTTP2_SESSION_ERROR: "HTTP2 会话出错",
      ERR_QUICSESSION_VERSION_NEGOTIATION: "QUIC 会话版本协商失败",
      EAI_AGAIN: "DNS 查找超时",
      ERR_CONNECTION_TIMED_OUT: "连接超时",
      ERR_INTERNET_DISCONNECTED: "互联网连接已断开",
      ERR_SSL_PROTOCOL_ERROR: "SSL 协议错误",
      ERR_ADDRESS_UNREACHABLE: "地址无法到达",
      ERR_BLOCKED_BY_CLIENT: "请求被客户端阻止",
      ERR_BLOCKED_BY_RESPONSE: "响应被阻止",
      ERR_CERT_COMMON_NAME_INVALID: "证书的通用名称无效",
      ERR_CERT_DATE_INVALID: "证书日期无效",
      ERR_CERT_AUTHORITY_INVALID: "证书颁发机构无效",
      ERR_CONTENT_LENGTH_MISMATCH: "内容长度不匹配",
      ERR_INSECURE_RESPONSE: "响应不安全",
      ERR_NAME_NOT_RESOLVED: "名称无法解析",
      ERR_NETWORK_CHANGED: "网络更改",
      ERR_NO_SUPPORTED_PROXIES: "没有支持的代理",
      ERR_PROXY_CONNECTION_FAILED: "代理连接失败",
      ERR_SSL_VERSION_OR_CIPHER_MISMATCH: "SSL 版本或密码不匹配",
      ERR_TIMED_OUT: "操作超时",
      ERR_TOO_MANY_REDIRECTS: "重定向过多",
      ERR_UNSAFE_PORT: "不安全的端口",
      ERR_SSL_OBSOLETE_VERSION: "SSL 版本过时",
      ERR_CERT_REVOKED: "证书已被吊销",
      ERR_CERT_TRANSPARENCY_REQUIRED: "需要证书透明度",
      ERR_SSL_PINNED_KEY_NOT_IN_CERT_CHAIN: "固定的 SSL 密钥不在证书链中",
      ERR_TUNNEL_CONNECTION_FAILED: "隧道连接失败"
    };
    this._latestAppVersionData = {
      build: "169427",
      version: "13.1.3"
    };
    this._latestLiteAppVersionData = {
      build: "1676",
      version: "6.26.0"
    };
    this._latestJDJRAppVersionData = {
      version: "6.9.0",
      jdPaySdkVersion: "4.01.26.00",
      stockSDK: "stocksdk-iphone_6.0.0"
    };
    this._key = "1cecd735454d4703243f4d5a8c395114";
    this._latestIOSVersion = "17.5.1";
    this._appHttpsTlsOptions = {
      ciphers: ["TLS_AES_128_GCM_SHA256", "TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-CHACHA20-POLY1305"].join(":")
    };
    this.Base64 = Base64Algorithm;
    this.DataCache = LocalStorageCache;
    this._shopMemberActivityIds = new Map();
    this._H5st = null;
    this._Table = null;
    this._HttpsProxyAgent = null;
    this._genSignModelPath = __dirname + "/Rebels_Sign";
    this._jdCryptoModelPath = __dirname + "/Rebels_H";
    this._hasInitAppSignConfig = false;
    this._initRequestConfig();
  }
  _initRequestConfig() {
    try {
      const _0x2068e4 = require.main.filename,
        _0x281d40 = path.basename(_0x2068e4, ".js");
      this._requestNoProxyList = (process.env[_0x281d40 + "_no_proxy"] || process.env.RS_NO_PROXY || "").split(",").filter(_0x75f8b6 => _0x75f8b6 !== "");
      this._requestBlacklist = (process.env.RS_PROXY_BLACKLIST || "").split(/,|&|@/).filter(_0x39cedb => _0x39cedb.trim() !== "");
      const _0x59b846 = process.env[_0x281d40 + "_proxy_tunnrl"] || process.env.RS_PROXY_TUNNRL || "",
        _0x3db634 = (process.env.RS_TUNNRL_WHITRLIST || "").split("&").filter(Boolean);
      if (this._requestBlacklist.some(_0x565772 => process.mainModule.filename.includes(_0x565772))) {
        console.log("❌ 代理黑名单命中，禁止使用代理");
      } else {
        if (_0x59b846 && _0x3db634.length > 0) {
          const _0x557398 = _0x3db634.some(_0x527f0d => process.mainModule.filename.includes(_0x527f0d));
          if (_0x557398) {
            const _0x43e01a = this._getProxyConfigWithAddress(_0x59b846);
            _0x43e01a ? (this._requestAxiosProxyConfig = _0x43e01a, console.log("\n====================使用代理池模式(新)===================\n"), this.proxyPoolEnabled = true, this.proxyMode = "代理池模式") : console.log("❌ 提供的代理地址无效，跳过启用全局静态代理");
          }
        }
      }
      if (!this.proxyPoolEnabled && !this._requestBlacklist.some(_0x3478c4 => process.mainModule.filename.includes(_0x3478c4))) {
        const _0x49f686 = process.env[_0x281d40 + "_proxy_api"] || process.env.RS_PROXY_API || "",
          _0x5750cf = (process.env.RS_API_WHITELIST || "").split("&").filter(Boolean);
        if (_0x49f686 && _0x5750cf.length > 0) {
          const _0x55d2a4 = _0x5750cf.some(_0x42c93d => process.mainModule.filename.includes(_0x42c93d));
          if (_0x55d2a4) {
            this._requestDynamicProxyConfig = {
              api: null,
              proxyConfig: null,
              useLimit: null,
              timeLimit: null,
              fetchFailContinue: null,
              extractTimestamp: null,
              lastUseTimeStamp: null,
              usedTimes: null
            };
            this._requestDynamicProxyConfig.api = _0x49f686;
            const _0x22ee47 = process.env[_0x281d40 + "_proxy_use_limit"] || process.env.RS_PROXY_USE_LIMIT || "0";
            try {
              this._requestDynamicProxyConfig.useLimit = parseInt(_0x22ee47);
            } catch {
              this._requestDynamicProxyConfig.useLimit = 1;
            }
            const _0x21211a = process.env[_0x281d40 + "_proxy_time_limit"] || process.env.RS_PROXY_TIME_LIMIT || "20000";
            try {
              this._requestDynamicProxyConfig.timeLimit = parseInt(_0x21211a);
            } catch {
              this._requestDynamicProxyConfig.timeLimit = 20000;
            }
            this._requestDynamicProxyConfig.fetchFailContinue = (process.env[_0x281d40 + "_proxy_fetch_fail_continue"] || process.env.RS_PROXY_FETCH_FAIL_CONTINUE || "true") === "true";
            this._requestDynamicProxyShowAddress = (process.env[_0x281d40 + "_proxy_show_address"] || process.env.RS_PROXY_HTTP_DYNAMIC_PROXY_SHOW_ADDRESS || "false") === "true";
            console.log("\n=====================使用API模式(新)=====================\n");
            this.proxyPoolEnabled = true;
            this.proxyMode = "API模式";
          }
        }
      }
      Object.assign(axios.defaults, {
        headers: {
          common: {
            "User-Agent": this._defaultUserAgent
          }
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        maxRedirects: Infinity,
        timeout: 60000,
        transformResponse: [_0x4dbe80 => {
          try {
            return JSON.parse(_0x4dbe80);
          } catch {}
          try {
            const _0x2820a5 = /[\w$.]+\(\s*({[\s\S]*?})\s*\)\s*;?/;
            if (_0x2820a5.test(_0x4dbe80)) {
              const _0x1906e2 = _0x4dbe80.match(_0x2820a5)[1];
              return JSON.parse(_0x1906e2);
            }
          } catch {}
          return _0x4dbe80;
        }]
      });
    } catch (_0x5a21c6) {
      console.log("❌ 初始化 HTTP 请求配置时遇到了错误\n" + _0x5a21c6);
    }
  }
  getProxyStatus() {
    return this.proxyPoolEnabled ? this.proxyMode + "开启" : "关闭";
  }
  _initAppSignConfig() {
    const _0x44b8da = ["http://sign.257999.xyz/sign"],
      _0x271986 = process.env.JD_SIGN_API || _0x44b8da[Math.floor(Math.random() * _0x44b8da.length)];
    this._appSignConfig = {
      requestApi: _0x271986,
      bodyField: process.env.JD_SIGN_API_BODY_FIELD || "body",
      functionIdField: process.env.JD_SIGN_API_FUNCTIONID_FIELD || "fn",
      requestMethod: null,
      requestContentType: null,
      genSign: null
    };
    try {
      const _0x5d966b = process.env.JD_SIGN_API_METHOD;
      _0x5d966b && _0x5d966b.toUpperCase() === "GET" ? this._appSignConfig.requestMethod = "GET" : this._appSignConfig.requestMethod = "POST";
    } catch {}
    try {
      const _0x5f151c = process.env.JD_SIGN_API_CONTENT_TYPE;
      _0x5f151c && _0x5f151c.indexOf("application/x-www-form-urlencoded") !== -1 ? this._appSignConfig.requestContentType = _0x5f151c : this._appSignConfig.requestContentType = "application/json; charset=utf-8";
    } catch {}
    try {
      this._appSignConfig.genSign = require(this._genSignModelPath);
    } catch {}
  }
  genRandomString(_0x2d77de = 32, _0x3c3231 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const _0x31c18d = _0x3c3231.length;
    let _0x300b3f = "";
    for (let _0x3b29a5 = 0; _0x3b29a5 < _0x2d77de; _0x3b29a5++) {
      _0x300b3f += _0x3c3231.charAt(Math.floor(Math.random() * _0x31c18d));
    }
    return _0x300b3f;
  }
  parseUrl(_0x516e70) {
    try {
      return new URL(_0x516e70);
    } catch (_0x3561d6) {
      return {};
    }
  }
  parseUrlParameter(_0x2a1164) {
    try {
      const _0x7bbe1c = {},
        _0xafeed5 = this.parseUrl(_0x2a1164),
        _0x5444aa = new URLSearchParams(_0xafeed5?.["search"]);
      for (const [_0xa71f87, _0x3ebf10] of _0x5444aa) {
        _0x7bbe1c[_0xa71f87] = _0x3ebf10;
      }
      if (_0xafeed5?.["hash"] && _0xafeed5.hash.includes("#/")) {
        const _0x4dfca1 = _0xafeed5.hash.replace("#/", ""),
          _0xcb774 = _0x4dfca1.includes("?") ? new URLSearchParams(_0x4dfca1.split("?").slice(1).join("?")) : new URLSearchParams();
        for (const [_0x3af73b, _0x23497f] of _0xcb774) {
          _0x7bbe1c[_0x3af73b] = _0x23497f;
        }
      }
      return _0x7bbe1c;
    } catch {
      return {};
    }
  }
  getUrlParameter(_0x35571c, _0x43917a) {
    try {
      const _0x314935 = this.parseUrl(_0x35571c),
        _0xea764e = _0x314935.searchParams.get(_0x43917a);
      return _0xea764e || "";
    } catch {
      return "";
    }
  }
  objectToQueryString(_0x24995f) {
    try {
      const _0x24ff36 = [];
      for (const _0x4ed375 in _0x24995f) {
        if (_0x24995f.hasOwnProperty(_0x4ed375)) {
          const _0x3cf224 = _0x24995f[_0x4ed375],
            _0x4ba01f = encodeURIComponent(_0x4ed375),
            _0x4d38cb = _0x3cf224 === null || _0x3cf224 === undefined ? "" : encodeURIComponent(_0x3cf224);
          _0x24ff36.push(_0x4ba01f + "=" + _0x4d38cb);
        }
      }
      return _0x24ff36.join("&");
    } catch {
      return "";
    }
  }
  queryStringToObject(_0xc69e5e) {
    try {
      const _0x38f6a9 = {},
        _0x5ba0da = _0xc69e5e.split("&");
      for (const _0x5f4791 of _0x5ba0da) {
        const [_0x1fecec, _0x598859] = _0x5f4791.split("=");
        _0x38f6a9[decodeURIComponent(_0x1fecec)] = _0x598859 === undefined ? null : decodeURIComponent(_0x598859);
      }
      return _0x38f6a9;
    } catch {
      return {};
    }
  }
  parseResponseCookie(_0x499b8c) {
    const _0x574519 = {};
    try {
      if (typeof _0x499b8c === "object" && _0x499b8c?.["headers"] && _0x499b8c?.["headers"]["set-cookie"]) {
        const _0xc7e82d = _0x499b8c.headers["set-cookie"];
        for (const _0x1408ef of _0xc7e82d) {
          const _0xa933c = _0x1408ef.split(";")[0];
          _0x574519[_0xa933c.substring(0, _0xa933c.indexOf("="))] = _0xa933c.substring(_0xa933c.indexOf("=") + 1);
        }
      }
    } catch {}
    return _0x574519;
  }
  getResponseCookie(_0x3c1238, _0x4421e5 = "") {
    let _0x1bcdf8 = "";
    const _0x302c10 = this.parseResponseCookie(_0x3c1238),
      _0x569a9f = Object.keys(_0x302c10);
    if (_0x569a9f.length > 0) {
      _0x569a9f.forEach(_0x47b352 => {
        _0x1bcdf8 += _0x47b352 + "=" + _0x302c10[_0x47b352] + "; ";
      });
      _0x1bcdf8 = _0x1bcdf8.trim();
    } else {
      if (_0x4421e5) {
        return _0x4421e5;
      }
    }
    return _0x1bcdf8;
  }
  getCookieValue(_0x2a1081, _0x68562) {
    if (!_0x2a1081 || !_0x68562) {
      return "";
    }
    const _0x5d9d3b = new RegExp(_0x68562 + "=([^;]*)"),
      _0x4415b5 = _0x5d9d3b.exec(_0x2a1081.trim().replace(/\s/g, ""));
    return _0x4415b5 && _0x4415b5[1] || "";
  }
  parseCookie(_0xbb7833) {
    const _0x54f5fc = {},
      _0x560f63 = _0xbb7833.split(";");
    for (const _0x4c0f50 of _0x560f63) {
      const [_0x408906, _0x2a162d] = _0x4c0f50.trim().split("=");
      _0x54f5fc[_0x408906] = _0x2a162d;
    }
    return _0x54f5fc;
  }
  filterCookieByFields(_0x585342, _0x302a77) {
    const _0x290696 = _0x585342.split(/;\s*/),
      _0x4a086c = _0x290696.filter(_0x3ba382 => {
        const _0x243d5f = _0x3ba382.split("=")[0];
        return _0x302a77.includes(_0x243d5f);
      });
    return _0x4a086c.join("; ");
  }
  getLatestIOSVersion() {
    return this._latestIOSVersion || "";
  }
  formatTime(_0x17101f, _0x15cbb2 = Date.now()) {
    const _0x15b36c = new Date(_0x15cbb2);
    let _0x58e663 = _0x17101f;
    const _0x125989 = {
      YYYY: _0x15b36c.getFullYear(),
      MM: String(_0x15b36c.getMonth() + 1).padStart(2, "0"),
      DD: String(_0x15b36c.getDate()).padStart(2, "0"),
      HH: String(_0x15b36c.getHours()).padStart(2, "0"),
      mm: String(_0x15b36c.getMinutes()).padStart(2, "0"),
      ss: String(_0x15b36c.getSeconds()).padStart(2, "0"),
      S: String(_0x15b36c.getMilliseconds()).padStart(3, "0")
    };
    Object.keys(_0x125989).forEach(_0x2deaf5 => {
      _0x58e663 = _0x58e663.replace(new RegExp(_0x2deaf5, "g"), _0x125989[_0x2deaf5]);
    });
    return _0x58e663;
  }
  async request(_0x7876f3) {
    let _0x47693c = {
        success: false,
        status: null,
        data: null,
        headers: null,
        error: null,
        connected: false
      },
      _0x5e82df = this._requestDebugMode,
      _0x14aa51 = null;
    try {
      if (!_0x7876f3 || !_0x7876f3.url) {
        console.log("❌ 调用请求方法无效，缺少必要的参数！");
        _0x47693c.error = "缺少必要的请求参数";
        return _0x47693c;
      }
      _0x7876f3.hasOwnProperty("debug") && (_0x5e82df = _0x7876f3.debug, delete _0x7876f3.debug);
      const _0x437854 = this._requestAxiosProxyConfig,
        _0x31376c = this._requestDynamicProxyConfig,
        _0x6b6439 = this._requestNoProxyList;
      _0x7876f3.body && (_0x7876f3.data = _0x7876f3.body, delete _0x7876f3.body);
      for (const _0x15213f of ["data", "params"]) {
        !_0x7876f3[_0x15213f] && delete _0x7876f3[_0x15213f];
      }
      _0x7876f3.method = (_0x7876f3.method || "get").toLowerCase();
      if (_0x7876f3.proxy && typeof _0x7876f3.proxy === "string") {
        const _0x37b0b4 = this._getProxyConfigWithAddress(_0x7876f3.proxy);
        _0x37b0b4 ? _0x7876f3.proxy = _0x37b0b4 : (console.log("❌ 代理配置无效，跳过使用代理"), delete _0x7876f3.proxy);
      }
      _0x7876f3.data && typeof _0x7876f3.data === "object" && (!_0x7876f3.headers || !_0x7876f3.headers["Content-Type"] || _0x7876f3.headers["Content-Type"].includes("application/x-www-form-urlencoded")) && (_0x7876f3.data = querystring.stringify(_0x7876f3.data));
      if (_0x7876f3.httpsTlsOptions && typeof _0x7876f3.httpsTlsOptions === "object" && _0x7876f3.url.includes("https://")) {
        _0x14aa51 = _0x7876f3.httpsTlsOptions;
        Object.assign(https.globalAgent.options, _0x14aa51);
        delete _0x7876f3.httpsTlsOptions;
      } else {
        _0x7876f3.hasOwnProperty("httpsTlsOptions") && delete _0x7876f3.httpsTlsOptions;
      }
      let _0x5a8bd6 = false;
      if (!["proxy", "httpAgent", "httpsAgent"].some(_0x40eba8 => _0x7876f3.hasOwnProperty(_0x40eba8))) {
        if (_0x437854 || _0x31376c) {
          let _0x3bd5f7 = true;
          const _0x1545c6 = this.parseUrl(_0x7876f3.url).hostname || _0x7876f3.url;
          for (const _0x2a8340 of _0x6b6439) {
            const _0x5757ef = new RegExp("^" + _0x2a8340.split("*").join(".*") + "$");
            if (_0x5757ef.test(_0x1545c6.hostname)) {
              _0x3bd5f7 = false;
              _0x5e82df && console.log("ℹ️ 该代理请求命中 NO_PROXY 规则 ➜ " + _0x2a8340);
              break;
            }
          }
          if (_0x3bd5f7) {
            if (_0x437854) {
              _0x7876f3.proxy = _0x437854;
            } else {
              if (_0x31376c) {
                if (_0x31376c.proxyConfig) {
                  _0x7876f3.proxy = _0x31376c.proxyConfig;
                  _0x5a8bd6 = true;
                } else {
                  const _0x497074 = await this.getProxyAddressWithApi(_0x31376c.api),
                    _0x1ef56e = this._getProxyConfigWithAddress(_0x497074);
                  if (_0x1ef56e) {
                    Object.assign(_0x31376c, {
                      extractTimestamp: Date.now(),
                      usedTimes: 0,
                      proxyConfig: _0x1ef56e
                    });
                    _0x7876f3.proxy = _0x1ef56e;
                    _0x5a8bd6 = true;
                    this._requestDynamicProxyShowAddress && console.log(this._requestDynamicProxyPrintAddressFormat.replace(/<address>/g, this._getProxyAddressWithConfig(_0x7876f3.proxy)));
                  } else {
                    if (!_0x31376c.fetchFailContinue) {
                      _0x47693c.error = "获取动态代理地址失败，已设置跳过请求";
                      return _0x47693c;
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (const _0x50742b of ["proxy", "httpAgent", "httpsAgent"]) {
        !_0x7876f3[_0x50742b] && delete _0x7876f3[_0x50742b];
      }
      _0x7876f3.proxy && (this._loadModule("HttpsProxyAgent"), _0x7876f3.httpsAgent = this._genHttpsAgentWithProxyConfig(_0x7876f3.proxy), delete _0x7876f3.proxy);
      await axios(_0x7876f3).then(async _0x48ea05 => {
        if (_0x5a8bd6) {
          _0x31376c.lastUseTimeStamp = Date.now();
          _0x31376c.usedTimes++;
          const _0xf2684b = _0x31376c.useLimit > 0 && _0x31376c.usedTimes >= _0x31376c.useLimit,
            _0x56f681 = _0x31376c.timeLimit > 0 && Date.now() - _0x31376c.extractTimestamp >= _0x31376c.timeLimit;
          (_0xf2684b || _0x56f681) && Object.assign(_0x31376c, {
            proxyConfig: null,
            lastUseTimeStamp: null,
            extractTimestamp: null,
            usedTimes: 0
          });
        }
        _0x47693c.success = true;
        _0x47693c.status = _0x48ea05.status;
        _0x47693c.data = _0x48ea05.data;
        _0x47693c.headers = _0x48ea05.headers;
        _0x47693c.connected = true;
        if (typeof _0x7876f3.onSuccess === "function") {
          try {
            await _0x7876f3.onSuccess(_0x48ea05.data, _0x48ea05);
          } catch (_0x1bab49) {
            console.log("❌ 调用 onSuccess 回调时遇到了错误 " + (_0x1bab49.message || _0x1bab49));
          }
        }
        _0x5e82df && this._handleRequestDebugPrint(_0x48ea05, true);
      }).catch(async _0x46777d => {
        if (_0x5a8bd6) {
          _0x31376c.lastUseTimeStamp = Date.now();
          _0x31376c.usedTimes++;
          const _0x2f6258 = _0x31376c.useLimit > 0 && _0x31376c.usedTimes >= _0x31376c.useLimit,
            _0x2e9132 = _0x31376c.timeLimit > 0 && Date.now() - _0x31376c.extractTimestamp >= _0x31376c.timeLimit;
          (_0x2f6258 || _0x2e9132) && Object.assign(_0x31376c, {
            proxyConfig: null,
            lastUseTimeStamp: null,
            extractTimestamp: null,
            usedTimes: 0
          });
        }
        let _0x34f324;
        if (_0x46777d.response) {
          _0x47693c.connected = true;
          const _0x3a5059 = _0x46777d.response?.["status"];
          _0x46777d.response.data && (_0x47693c.data = _0x46777d.response.data);
          _0x46777d.response.headers && (_0x47693c.headers = _0x46777d.response.headers);
          _0x34f324 = this._requestFailMessagesMap[_0x3a5059] || "请求失败 [Response code " + _0x3a5059 + "]";
        } else {
          _0x5a8bd6 && Object.assign(_0x31376c, {
            proxyConfig: null,
            lastUseTimeStamp: null,
            extractTimestamp: null,
            usedTimes: 0
          });
          _0x46777d.request ? _0x34f324 = (this._requestErrorMessagesMap[_0x46777d.code] ?? "未知网络错误") + " [" + _0x46777d.code + "]" : _0x34f324 = _0x46777d.message || "未知错误状态";
        }
        (_0x46777d.config?.["httpAgent"] || _0x46777d.config?.["httpsAgent"]) && (_0x34f324 += "（🌐该请求通过代理发出）");
        _0x47693c.error = _0x34f324 || null;
        _0x47693c.status = _0x46777d.response?.["status"] || null;
        if (typeof _0x7876f3.onFailOrError === "function") {
          try {
            await _0x7876f3.onFailOrError(_0x46777d, _0x47693c.error, _0x47693c.connected);
          } catch (_0x32bf48) {
            console.log("❌ 调用 onFailOrError 回调时遇到了错误 " + (_0x32bf48.message || _0x32bf48));
          }
        } else {
          if (typeof _0x7876f3.onFail === "function" && _0x47693c.connected) {
            try {
              await _0x7876f3.onFail(_0x46777d, _0x47693c.error, _0x47693c.status);
            } catch (_0xc72b8b) {
              console.log("❌ 调用 onFail 回调时遇到了错误 " + (_0xc72b8b.message || _0xc72b8b));
            }
          } else {
            if (typeof _0x7876f3.onError === "function" && !_0x47693c.connected) {
              try {
                await _0x7876f3.onError(_0x46777d, _0x47693c.error);
              } catch (_0x4ab058) {
                console.log("❌ 调用 onError 回调时遇到了错误 " + (_0x4ab058.message || _0x4ab058));
              }
            }
          }
        }
        _0x5e82df && (this._handleRequestDebugPrint(_0x46777d, false), console.log("❌ 请求失败原因 ➜ " + _0x47693c.error));
      });
      _0x14aa51 && Object.keys(_0x14aa51).forEach(_0x42a606 => {
        https.globalAgent.options[_0x42a606] = null;
      });
    } catch (_0x1c29a8) {
      _0x47693c.error = _0x1c29a8.message || _0x1c29a8;
      _0x5e82df && console.log("❌ 在处理 HTTP 请求时遇到了错误 ➜ " + _0x1c29a8);
    }
    return _0x47693c;
  }
  async get(_0x263162) {
    return await this.request(Object.assign({}, _0x263162, {
      method: "get"
    }));
  }
  async post(_0xf47ee6) {
    return await this.request(Object.assign({}, _0xf47ee6, {
      method: "post"
    }));
  }
  async put(_0x4a8e97) {
    return await this.request(Object.assign({}, _0x4a8e97, {
      method: "put"
    }));
  }
  async delete(_0xdc8169) {
    return await this.request(Object.assign({}, _0xdc8169, {
      method: "delete"
    }));
  }
  _handleRequestDebugPrint(_0x12baf2, _0x16debe = true) {
    this._loadModule("TablePrint");
    if (!this._Table) {
      return;
    }
    const _0x5d57b9 = this._Table;
    console.log("--------------------- 🔧 HTTP REQUEST DEBUG 🔧 -------------------------");
    try {
      let _0x2e6813,
        _0x1f914a = null;
      _0x2e6813 = new _0x5d57b9({
        columns: [{
          title: "类型",
          name: "type",
          alignment: "left"
        }, {
          title: "说明",
          name: "info",
          alignment: "left"
        }],
        charLength: {
          "🟢": 2,
          "🔴": 2,
          "❌": 2
        }
      });
      _0x2e6813.addRow({
        type: "请求结果",
        info: "" + (_0x16debe ? "🟢" : _0x12baf2?.["response"] ? "🔴" : "❌") + (_0x12baf2?.["status"] ? " " + _0x12baf2.status : _0x12baf2?.["response"] ? " " + _0x12baf2.response?.["status"] : "") + " - " + "".concat(_0x12baf2?.["config"]?.["method"] || "未知").toUpperCase()
      });
      if (_0x12baf2?.["config"]?.["url"]) {
        try {
          _0x1f914a = new URL(_0x12baf2.config.url);
          _0x2e6813.addRow({
            type: "请求地址",
            info: _0x1f914a.origin
          });
          _0x2e6813.addRow({
            type: "请求路径",
            info: _0x1f914a.pathname
          });
        } catch {
          _0x2e6813.addRow({
            type: "请求地址",
            info: _0x12baf2.config.url
          });
        }
      }
      _0x2e6813.printTable();
      if (_0x1f914a && _0x1f914a?.["search"] || _0x12baf2?.["config"]?.["params"]) {
        try {
          const _0x54ee86 = Object.assign({}, new URLSearchParams(_0x1f914a?.["search"]) || {}, _0x12baf2?.["config"]?.["params"] || {});
          if (Object.keys(_0x54ee86).length > 0) {
            _0x2e6813 = new _0x5d57b9({
              columns: [{
                title: "名称",
                name: "label",
                alignment: "left"
              }, {
                title: "值",
                name: "value",
                alignment: "left"
              }]
            });
            for (let _0x3a557c in _0x54ee86) {
              _0x2e6813.addRow({
                label: decodeURIComponent(_0x3a557c),
                value: decodeURIComponent(_0x54ee86[_0x3a557c])
              });
            }
            console.log("\n✧ 请求参数");
            _0x2e6813.printTable();
          }
        } catch {}
      }
      if (_0x12baf2?.["config"]?.["httpAgent"] || _0x12baf2?.["config"]?.["httpsAgent"]) {
        const _0x1bcfac = (_0x12baf2.config?.["httpAgent"] || _0x12baf2.config?.["httpsAgent"])?.["proxy"],
          _0x44619d = {
            protocol: _0x1bcfac.protocol.replace(":", ""),
            hostname: _0x1bcfac.hostname,
            port: _0x1bcfac.port
          };
        _0x1bcfac.port;
        if (_0x1bcfac instanceof URL) {
          (_0x1bcfac.username || _0x1bcfac.password) && (_0x44619d.username = _0x1bcfac.username, _0x44619d.password = _0x1bcfac.password);
        } else {
          if (_0x1bcfac.auth) {
            const _0x339a13 = _0x1bcfac.auth.split(":");
            _0x44619d.username = _0x339a13[0];
            _0x44619d.password = _0x339a13[1];
          }
        }
        _0x2e6813 = new _0x5d57b9({
          columns: [{
            title: "名称",
            name: "label",
            alignment: "left"
          }, {
            title: "值",
            name: "value",
            alignment: "left"
          }]
        });
        for (let _0x37fcc6 in _0x44619d) {
          let _0x5d7ddd = _0x44619d[_0x37fcc6];
          typeof _0x5d7ddd === "object" && (_0x5d7ddd = JSON.stringify(_0x5d7ddd));
          _0x2e6813.addRow({
            label: _0x37fcc6,
            value: _0x5d7ddd
          });
        }
        console.log("\n✧ HTTP 代理配置");
        _0x2e6813.printTable();
      }
      if (_0x12baf2?.["config"]?.["headers"]) {
        const _0x11f9ab = _0x12baf2.config.headers;
        _0x2e6813 = new _0x5d57b9({
          columns: [{
            title: "名称",
            name: "label",
            alignment: "left"
          }, {
            title: "值",
            name: "value",
            alignment: "left",
            maxLen: 80
          }]
        });
        for (let _0x25c75d in _0x11f9ab) {
          let _0x199282 = _0x11f9ab[_0x25c75d];
          typeof _0x199282 === "object" && (_0x199282 = JSON.stringify(_0x199282));
          _0x2e6813.addRow({
            label: _0x25c75d,
            value: _0x199282
          });
        }
        console.log("\n✧ 请求 Headers");
        _0x2e6813.printTable();
      }
      if (_0x12baf2?.["config"]?.["data"]) {
        let _0x284993 = _0x12baf2.config.data;
        if (typeof _0x284993 === "object") {
          _0x284993 = JSON.stringify(JSON.parse(_0x284993));
        } else {
          if (typeof _0x284993 === "string") {
            try {
              const _0x2d6bca = JSON.parse(_0x284993);
              _0x284993 = JSON.stringify(_0x2d6bca);
            } catch {
              _0x284993 = JSON.stringify(_0x284993).slice(1, -1);
            }
          }
        }
        console.log("\n✧ 请求 Body\n" + _0x284993);
      }
      if (!_0x16debe && !_0x12baf2?.["response"]) {
        console.log("\n------------------------------------------------------------------------");
        return;
      }
      if (_0x12baf2?.["headers"]) {
        const _0x48b141 = _0x12baf2.headers;
        _0x2e6813 = new _0x5d57b9({
          columns: [{
            title: "名称",
            name: "label",
            alignment: "left"
          }, {
            title: "值",
            name: "value",
            alignment: "left",
            maxLen: 80
          }]
        });
        for (let _0x329755 in _0x48b141) {
          let _0x26541c = _0x48b141[_0x329755];
          typeof _0x26541c !== "string" && (_0x26541c = JSON.stringify(_0x26541c));
          _0x2e6813.addRow({
            label: _0x329755,
            value: _0x26541c
          });
        }
        console.log("\n✧ 响应 Headers");
        _0x2e6813.printTable();
      }
      if (_0x12baf2?.["data"]) {
        let _0x3f1bc7 = _0x12baf2.data;
        if (typeof _0x3f1bc7 === "object") {
          _0x3f1bc7 = JSON.stringify(_0x3f1bc7);
        } else {
          if (typeof _0x3f1bc7 === "string") {
            try {
              const _0x541523 = JSON.parse(_0x3f1bc7);
              _0x3f1bc7 = JSON.stringify(_0x541523);
            } catch {
              _0x3f1bc7 = JSON.stringify(_0x3f1bc7).slice(1, -1);
            }
          }
        }
        console.log("\n✧ 响应 Body\n" + _0x3f1bc7);
      }
    } catch (_0x3fbc2b) {
      console.log("❌ 处理 REQUEST DEBUG PRINT 时遇到了错误 ➜ " + (_0x3fbc2b.message || _0x3fbc2b));
    }
    console.log("\n------------------------------------------------------------------------");
  }
  async getProxyAddressWithApi(_0x5cff7d) {
    let _0x466a0a = "";
    try {
      const _0x4f8de0 = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{1,5}\b/g,
        _0x286e4c = {
          url: _0x5cff7d,
          method: "post",
          proxy: null,
          timeout: 30000
        };
      let _0x4de214 = 0,
        _0x14acc3 = null;
      const _0x475e65 = 1;
      while (_0x4de214 < _0x475e65) {
        const _0x8e8553 = await this.request(_0x286e4c);
        if (!_0x8e8553.success) {
          _0x14acc3 = _0x8e8553.error;
          _0x4de214++;
          continue;
        }
        if (!_0x8e8553.data) {
          _0x14acc3 = "无响应数据";
          _0x4de214++;
          continue;
        }
        const _0x135dec = _0x8e8553.data;
        if (typeof _0x135dec === "object") {
          if (_0x135dec?.["data"]) {
            let _0x56d24f = _0x135dec.data;
            if (Array.isArray(_0x56d24f) && _0x56d24f.length > 0) {
              _0x56d24f = _0x56d24f[0];
              if (_0x56d24f?.["ip"] && _0x56d24f?.["port"]) {
                _0x466a0a = _0x56d24f.ip + ":" + _0x56d24f.port;
              } else {
                _0x56d24f?.["IP"] && _0x56d24f?.["Port"] && (_0x466a0a = _0x56d24f.IP + ":" + _0x56d24f.Port);
              }
            } else {
              if (_0x56d24f?.["proxy_list"] && Array.isArray(_0x56d24f.proxy_list) && _0x56d24f.proxy_list.length > 0) {
                const _0x3b56d9 = _0x56d24f.proxy_list[0];
                typeof _0x3b56d9 === "object" && _0x3b56d9?.["ip"] && _0x3b56d9?.["port"] ? _0x466a0a = _0x3b56d9.ip + ":" + _0x3b56d9.port : _0x466a0a = _0x3b56d9;
              }
            }
            _0x466a0a && !_0x4f8de0.test(_0x466a0a) && (_0x466a0a = "");
          }
          !_0x466a0a && (_0x14acc3 = "接口响应数据异常：" + JSON.stringify(_0x135dec));
        } else {
          const _0x1eed9e = _0x135dec.match(_0x4f8de0);
          _0x1eed9e && (_0x466a0a = _0x1eed9e[0]);
          !_0x466a0a && (_0x14acc3 = "接口响应数据异常：" + _0x135dec);
        }
        if (_0x466a0a) {
          return _0x466a0a;
        }
        _0x4de214++;
      }
      _0x4de214 >= _0x475e65 && console.log("⚠ 提取代理地址失败 ➜ " + _0x14acc3);
    } catch (_0x1104dd) {
      console.log("❌ 在处理请求代理API获取代理地址时遇到了错误\n" + _0x1104dd);
    }
    return _0x466a0a;
  }
  _getProxyConfigWithAddress(_0x22fb44 = "") {
    try {
      if (!_0x22fb44) {
        return null;
      }
      !_0x22fb44.includes("://") && (_0x22fb44 = "http://" + _0x22fb44);
      const _0x2a570c = this.parseUrl(_0x22fb44);
      if (_0x2a570c?.["hostname"]) {
        const _0x3795ad = {
          protocol: _0x2a570c.protocol.replace(":", "") === "https" ? "https" : "http",
          host: _0x2a570c.hostname,
          port: parseInt(_0x2a570c?.["port"] || "8080"),
          auth: {
            username: _0x2a570c?.["username"] || "",
            password: _0x2a570c?.["password"] || ""
          }
        };
        _0x2a570c?.["username"] || _0x2a570c?.["password"];
        return _0x3795ad;
      }
    } catch {}
    return null;
  }
  _getProxyAddressWithConfig(_0x40e2b3 = null) {
    try {
      if (!_0x40e2b3) {
        return null;
      }
      const _0x33fb20 = Object.assign({}, _0x40e2b3);
      let _0x59eda6 = "";
      _0x33fb20.auth && (_0x59eda6 = (_0x33fb20.auth?.["username"] || "") + ":" + (_0x33fb20.auth?.["password"] || "") + "@");
      return _0x33fb20.protocol + "://" + _0x59eda6 + _0x33fb20.host + ":" + _0x33fb20.port;
    } catch {
      return JSON.stringify(_0x40e2b3);
    }
  }
  _genHttpsAgentWithProxyConfig(_0xd8d40a) {
    try {
      if (!this._HttpsProxyAgent) {
        return null;
      }
      if (!_0xd8d40a) {
        return null;
      }
      let _0x4cd4da = (_0xd8d40a?.["protocol"] || "http") + "://";
      _0xd8d40a?.["auth"] && (_0x4cd4da += (_0xd8d40a.auth?.["username"] || "") + ":" + (_0xd8d40a.auth?.["password"] || "") + "@");
      _0x4cd4da += _0xd8d40a?.["host"] + ":" + (_0xd8d40a?.["port"] || "8080");
      return new this._HttpsProxyAgent(_0x4cd4da);
    } catch (_0x4f4f1e) {
      console.log("❌ 加载代理时遇到了错误 ➜ " + (_0x4f4f1e.message || _0x4f4f1e));
    }
    return null;
  }
  _getH5STConfig() {
    return {
      url: "http://h5.257999.xyz/h5"
    };
  }
  async concTaskNormal(_0x38a9aa = "3", _0x456e6d = 100, _0x1a0b30) {
    let _0x4b5435 = false,
      _0xd0821b = 0,
      _0x5a5c0f = 0;
    async function _0x43ad88(_0x2cb467) {
      const _0x1a28eb = await _0x1a0b30(_0x2cb467);
      if (_0x1a28eb) {
        if (typeof _0x1a28eb === "boolean") {
          _0x4b5435 = true;
        } else {
          typeof _0x1a28eb === "object" && _0x1a28eb?.["runEnd"] && (_0x4b5435 = true);
        }
      }
      _0xd0821b--;
      _0x4240e5();
    }
    async function _0x4240e5() {
      while (_0xd0821b < _0x38a9aa && _0x456e6d > 0 && !_0x4b5435) {
        _0x456e6d--;
        _0xd0821b++;
        _0x5a5c0f++;
        await _0x43ad88(_0x5a5c0f);
      }
      _0x4b5435 && (await new Promise(_0xe05a21 => {
        const _0x462c64 = setInterval(() => {
          _0xd0821b === 0 && (clearInterval(_0x462c64), _0xe05a21());
        }, 100);
      }));
    }
    const _0x42558 = Math.min(_0x456e6d, _0x38a9aa),
      _0xbfaee6 = [];
    for (let _0x1fafdb = 0; _0x1fafdb < _0x42558; _0x1fafdb++) {
      _0x456e6d--;
      _0xd0821b++;
      _0x5a5c0f++;
      _0xbfaee6.push(_0x43ad88(_0x5a5c0f));
    }
    await Promise.all(_0xbfaee6);
    _0x4240e5();
    await new Promise(_0x4d6e14 => {
      const _0x1fe705 = setInterval(() => {
        (_0xd0821b === 0 || _0x4b5435) && (clearInterval(_0x1fe705), _0x4d6e14());
      }, 100);
    });
  }
  setCookie(_0x4b1e51) {
    this._Cookie = _0x4b1e51;
  }
  unsetCookie() {
    this._Cookie = "";
    this._UserAgent = "";
  }
  getCookie() {
    return this._Cookie;
  }
  getLatestAppVersion() {
    return this._latestAppVersionData.version || "";
  }
  getLatestAppBuildVersion() {
    return this._latestAppVersionData.build || "";
  }
  getLatestLiteAppVersion() {
    return this._latestLiteAppVersionData.version || "";
  }
  getLatestLiteAppBuildVersion() {
    return this._latestLiteAppVersionData.build || "";
  }
  getErrorMsg(_0x44442e, _0x1569c1 = ["msg", "message", "errMsg", "errMessage", "errorMsg", "errorMessage", "bizMsg", "subMsg", "echo", "error", "resp_msg", "txt", "rlt", "displayMsg", "resultMsg", "desc"], _0x563f23 = "") {
    if (!_0x44442e) {
      return _0x563f23;
    }
    for (let _0x8c0cb of _0x1569c1) {
      if (_0x44442e.hasOwnProperty(_0x8c0cb)) {
        return _0x44442e[_0x8c0cb];
      }
    }
    return _0x563f23;
  }
  maskUserName(_0x511289 = "", _0x3d9958 = "*") {
    if (!_0x511289) {
      return "";
    }
    if (_0x511289.length <= 1) {
      return _0x3d9958;
    }
    if (_0x511289.length < 5) {
      return _0x511289.slice(0, 1) + _0x3d9958.repeat(_0x511289.length - 1);
    }
    return _0x511289.slice(0, 2) + _0x3d9958.repeat(_0x511289.length - 4) + _0x511289.slice(-2);
  }
  genUuid(_0x26409f = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x49d1f7 = "0123456789abcdef") {
    let _0x46d354 = "";
    for (let _0x2e3651 of _0x26409f) {
      if (_0x2e3651 === "x") {
        _0x46d354 += _0x49d1f7.charAt(Math.floor(Math.random() * _0x49d1f7.length));
      } else {
        _0x2e3651 === "X" ? _0x46d354 += _0x49d1f7.charAt(Math.floor(Math.random() * _0x49d1f7.length)).toUpperCase() : _0x46d354 += _0x2e3651;
      }
    }
    return _0x46d354;
  }
  genUA(_0x41a29b = "", _0x1307b8 = "jd") {
    if (_0x41a29b && this._UserAgentMap.has(_0x41a29b)) {
      return this._UserAgentMap.get(_0x41a29b);
    }
    const _0x271d9d = _0x1307b8 === "lite" ? "lite" : _0x1307b8 === "jr" ? "jr" : "jd",
      _0x558519 = {
        jd: {
          app: "jdapp",
          appBuild: this._latestAppVersionData.build,
          clientVersion: this._latestAppVersionData.version
        },
        lite: {
          app: "jdltapp",
          appBuild: this._latestLiteAppVersionData.build,
          clientVersion: this._latestLiteAppVersionData.version
        },
        jr: {
          clientVersion: this._latestJDJRAppVersionData.version,
          jdPaySdkVersion: this._latestJDJRAppVersionData.jdPaySdkVersion,
          stockSDK: this._latestJDJRAppVersionData.stockSDK
        }
      },
      _0x159c26 = [this._latestIOSVersion].map(_0x3c3a03 => {
        let _0x50018d = _0x3c3a03.split(".");
        return _0x50018d.join(".");
      }),
      _0x5a8a7a = _0x159c26[Math.floor(Math.random() * _0x159c26.length)],
      _0x3adee = "iPhone; CPU iPhone OS " + _0x5a8a7a.replace(".", "_") + " like Mac OS X",
      {
        clientVersion: _0x4db167
      } = _0x558519[_0x271d9d];
    let _0xea0baf, _0x3c6844;
    switch (_0x271d9d) {
      case "jr":
        const {
          stockSDK: _0x196819,
          jdPaySdkVersion: _0xac3bda
        } = _0x558519[_0x271d9d];
        _0xea0baf = ["Mozilla/5.0 (" + _0x3adee + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/application=JDJR-App", "clientType=ios", "iosType=iphone", "clientVersion=" + _0x4db167, "HiClVersion=" + _0x4db167, "isUpdate=0", "osVersion=" + _0x5a8a7a, "osName=iOS", "screen=932*430", "src=App Store", "netWork=1", "netWorkType=1", "CpayJS=UnionPay/1.0 JDJR", "stockSDK=" + _0x196819, "sPoint=", "jdPay=(*#@jdPaySDK*#@jdPayChannel=jdfinance", "jdPayChannelVersion=" + _0x4db167, "jdPaySdkVersion=" + _0xac3bda, "jdPayClientName=iOS*#@jdPaySDK*#@)"];
        _0x3c6844 = "&";
        break;
      case "jd":
      case "lite":
      default:
        const {
            app: _0xb674d8,
            appBuild: _0x538502
          } = _0x558519[_0x271d9d],
          _0x34d0fd = !!_0x41a29b ? JSON.stringify(this.getCipherConf({
            ud: CryptoJS.SHA1(_0x41a29b).toString(),
            sv: _0x5a8a7a,
            iad: ""
          }, _0x271d9d)) : "";
        _0xea0baf = [_0xb674d8, "iPhone", _0x4db167, "", "rn/" + this.genUuid(), "M/5.0", "appBuild/" + _0x538502, "jdSupportDarkMode/0", "ef/1", _0x34d0fd ? "ep/" + encodeURIComponent(_0x34d0fd) : "", "Mozilla/5.0 (" + _0x3adee + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
        _0x3c6844 = ";";
        break;
    }
    const _0x2bc14e = _0xea0baf.join(_0x3c6844);
    _0x41a29b && this._UserAgentMap.set(_0x41a29b, _0x2bc14e);
    if (this._Cookie) {
      this._UserAgent = _0x2bc14e;
    }
    return _0x2bc14e;
  }
  genUAWithJDJR() {
    return this.genUA("", "jr");
  }
  getJEH(_0x3dfff4 = "") {
    !_0x3dfff4 && (_0x3dfff4 = "JD4iPhone/" + this.getLatestAppBuildVersion() + " (iPhone; iOS " + this.getLatestIOSVersion() + "; Scale/3.00)");
    return encodeURIComponent(JSON.stringify(this.getCipherConf({
      "User-Agent": encodeURIComponent(_0x3dfff4)
    })));
  }
  getJEC(_0x4997a1) {
    return encodeURIComponent(JSON.stringify(this.getCipherConf({
      pin: encodeURIComponent(_0x4997a1)
    })));
  }
  getCipherConf(_0x372607, _0x5cb02a = "jd") {
    if (_0x372607 && typeof _0x372607 === "object") {
      for (let _0x115231 in _0x372607) {
        _0x372607[_0x115231] = this.Base64.encode(_0x372607[_0x115231]);
      }
    } else {
      _0x372607 && typeof _0x372607 === "string" ? _0x372607 = this.Base64.encode(_0x372607) : _0x372607 = {};
    }
    return {
      ciphertype: 5,
      cipher: _0x372607,
      ts: Math.floor(Date.now() / 1000),
      hdid: "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
      version: "1.0.3",
      appname: _0x5cb02a === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
      ridx: -1
    };
  }
  async getLoginStatus(_0x49b4d3 = this._Cookie) {
    if (!_0x49b4d3) {
      console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    try {
      const _0x46efa4 = {
        url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
        method: "GET",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh-Hans;q=0.9",
          Cookie: _0x49b4d3,
          Host: "plogin.m.jd.com",
          "User-Agent": this._UserAgent || this._defaultUserAgent
        },
        timeout: 30000,
        debug: false
      };
      let _0x3d8c89 = 0,
        _0x5e0d64 = null;
      const _0x54ef2f = 1;
      while (_0x3d8c89 < _0x54ef2f) {
        const _0x36204f = await this.request(_0x46efa4);
        if (!_0x36204f.success) {
          _0x5e0d64 = "🚫 getLoginStatus 请求失败 ➜ " + _0x36204f.error;
          _0x3d8c89++;
          continue;
        }
        if (!_0x36204f.data) {
          _0x5e0d64 = "🚫 getLoginStatus 请求异常 ➜ 无响应数据";
          _0x3d8c89++;
          continue;
        }
        const _0x3ca87b = _0x36204f.data?.["islogin"];
        if (_0x3ca87b === "1") {
          return true;
        } else {
          if (_0x3ca87b === "0") {
            return false;
          }
        }
        _0x3d8c89++;
      }
      _0x3d8c89 >= _0x54ef2f && console.log(_0x5e0d64);
    } catch (_0x5e5168) {
      console.log("❌ getLoginStatus 在处理请求中遇到了错误\n" + _0x5e5168);
    }
    return undefined;
  }
  enctoken(_0x1d7861 = this._Cookie, _0x5b38f5 = this._key) {
    const _0x99e8c0 = CryptoJS.AES.encrypt(_0x1d7861, _0x5b38f5).toString();
    return _0x99e8c0;
  }
  async joinShopMember(_0x343939, _0xc33bd1 = this._Cookie, _0x287326 = "") {
    if (!_0xc33bd1) {
      console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    if (!_0x343939) {
      return undefined;
    }
    try {
      this._loadModule("h5st");
      if (!this._H5st) {
        return undefined;
      }
      _0x343939 = "".concat(_0x343939);
      const _0x299f95 = {
        venderId: _0x343939,
        bindByVerifyCodeFlag: 1,
        registerExtend: {},
        writeChildFlag: 0,
        channel: 406,
        appid: "27004",
        needSecurity: true,
        bizId: "shopmember_m_jd_com"
      };
      !_0x287326 && this._shopMemberActivityIds.has(_0x343939) && (_0x287326 = this._shopMemberActivityIds.get(_0x343939));
      _0x287326 && (_0x299f95.activityId = _0x287326);
      const _0x105c29 = {
          appId: "27004",
          appid: "shopmember_m_jd_com",
          functionId: "bindWithVender",
          clientVersion: "9.2.0",
          client: "H5",
          body: _0x299f95,
          version: "4.7",
          t: true,
          ua: this._UserAgent || this._defaultUserAgent
        },
        _0x42e0b4 = await this._H5st.getH5st(_0x105c29);
      if (!_0x42e0b4.paramsData) {
        return undefined;
      }
      const _0x546306 = {
          url: "https://api.m.jd.com/client.action",
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Origin: "https://pages.jd.com",
            Referer: "https://pages.jd.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this._UserAgent || this._defaultUserAgent,
            Cookie: _0xc33bd1
          },
          data: Object.assign({}, _0x42e0b4.paramsData, {
            area: "",
            screen: "1290*2796",
            uuid: "88888"
          }),
          timeout: 30000
        },
        _0xe7f710 = await this.request(_0x546306);
      if (!_0xe7f710.success) {
        console.log("🚫 joinShopMember 请求失败 ➜ " + _0xe7f710.error);
        return undefined;
      }
      if (!_0xe7f710.data) {
        console.log("🚫 joinShopMember 请求异常 ➜ 无响应数据");
        return undefined;
      }
      const _0x246145 = _0xe7f710.data;
      if (_0x246145?.["success"] === true) {
        if (_0x246145?.["result"] && _0x246145.result?.["giftInfo"]) {
          for (let _0x3d2e28 of _0x246145.result?.["giftInfo"]?.["giftList"]) {
            console.log(" >> 入会获得：" + _0x3d2e28.discountString + _0x3d2e28.prizeName);
          }
        }
        if (_0x246145?.["message"] === "加入店铺会员成功") {
          return true;
        } else {
          if (_0x246145?.["message"] === "活动太火爆，请稍后再试") {
            console.log("🚫 加入店铺会员失败 ➜ " + _0x246145.message);
          } else {
            console.log("🚫 加入店铺会员失败 ➜ " + _0x246145?.["message"]);
            return false;
          }
        }
      } else {
        if (_0x246145?.["message"]) {
          console.log("🚫 加入店铺会员失败 ➜ " + _0x246145.message);
          return false;
        } else {
          console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(_0x246145));
        }
      }
    } catch (_0x5a4f98) {
      console.log("❌ joinShopMember 在处理请求中遇到了错误\n" + _0x5a4f98);
    }
    return undefined;
  }
  async getShopMemberStatus(_0x2c644d, _0x32e85a = this._Cookie) {
    if (!_0x32e85a) {
      console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    if (!_0x2c644d) {
      return undefined;
    }
    try {
      this._loadModule("h5st");
      if (!this._H5st) {
        return undefined;
      }
      _0x2c644d = "".concat(_0x2c644d);
      const _0x356515 = {
          appId: "27004",
          appid: "shopmember_m_jd_com",
          functionId: "getShopOpenCardInfo",
          clientVersion: "9.2.0",
          client: "H5",
          body: {
            venderId: _0x2c644d,
            payUpShop: true,
            queryVersion: "10.5.2",
            appid: "27004",
            needSecurity: true,
            bizId: "shopmember_m_jd_com",
            channel: 406
          },
          version: "4.7",
          t: true,
          ua: this._UserAgent || this._defaultUserAgent
        },
        _0x532d8a = await this._H5st.getH5st(_0x356515);
      if (!_0x532d8a.paramsData) {
        return undefined;
      }
      const _0x478a5b = {
          url: "https://api.m.jd.com/client.action",
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Origin: "https://pages.jd.com",
            Referer: "https://pages.jd.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this._UserAgent || this._defaultUserAgent,
            Cookie: _0x32e85a
          },
          data: Object.assign({}, _0x532d8a.paramsData, {
            area: "",
            screen: "1290*2796",
            uuid: "88888"
          }),
          timeout: 30000
        },
        _0x4e1ee0 = await this.request(_0x478a5b);
      if (!_0x4e1ee0.success) {
        console.log("🚫 getShopMemberStatus 请求失败 ➜ " + _0x4e1ee0.error);
        return undefined;
      }
      if (!_0x4e1ee0.data) {
        console.log("🚫 getShopMemberStatus 请求异常 ➜ 无响应数据");
        return undefined;
      }
      const _0x2e2353 = _0x4e1ee0.data;
      if (_0x2e2353?.["success"] === true) {
        let _0x4a948f = _0x2e2353.result;
        Array.isArray(_0x4a948f) && (_0x4a948f = _0x4a948f[0]);
        const _0x3d653d = _0x4a948f?.["interestsRuleList"]?.[0]?.["interestsInfo"]?.["activityId"];
        _0x3d653d && this._shopMemberActivityIds.set(_0x2c644d, _0x3d653d);
        return _0x4a948f?.["userInfo"]?.["openCardStatus"] === 1;
      } else {
        _0x2e2353?.["message"] ? console.log("🚫 获取店铺会员状态异常 ➜ " + _0x2e2353.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(_0x2e2353));
      }
    } catch (_0x55c7b2) {
      console.log("❌ getShopMemberStatus 在处理请求中遇到了错误\n" + _0x55c7b2);
    }
    return undefined;
  }
  async randomSign(_0x59f13b, _0x1bc71d, _0x5870e6, _0xe5d3d3 = this._Cookie) {
    const _0x4e60de = await this.request({
        url: _0x5870e6,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fn: _0x59f13b,
          body: _0x1bc71d
        }),
        timeout: 30000
      }),
      _0x5390a4 = _0x4e60de.data;
    if (_0x5390a4 && _0x5390a4.body) {
      return _0x5390a4.body;
    }
  }
  async getShopDetail(_0x1efc73 = {
    venderId: "",
    shopId: ""
  }, _0x33212a = this._Cookie) {
    const {
      venderId: _0xa418b3,
      shopId: _0x10ed48
    } = _0x1efc73;
    if (!_0xa418b3 && !_0x10ed48) {
      return {};
    }
    try {
      const _0xeed1 = {
          url: "https://api.m.jd.com/client.action",
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://shop.m.jd.com",
            Referer: "https://shop.m.jd.com/",
            Host: "api.m.jd.com",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": this._defaultUserAgent,
            "X-Referer-Page": "https://shop.m.jd.com/shop/introduce",
            "X-Rp-Client": "h5_1.0.0",
            Cookie: _0x33212a || ""
          },
          data: {
            functionId: "whx_getMShopDetail",
            body: JSON.stringify({
              shopId: "".concat(_0x10ed48 || ""),
              venderId: "".concat(_0xa418b3 || ""),
              source: "m-shop"
            }),
            t: Date.now().toString(),
            appid: "shop_m_jd_com",
            clientVersion: "11.0.0",
            client: "wh5",
            area: "",
            uuid: ""
          },
          timeout: 30000
        },
        _0x1102e2 = await this.request(_0xeed1);
      if (!_0x1102e2.success) {
        console.log("🚫 getShopDetail 请求失败 ➜ " + _0x1102e2.error);
        return {};
      }
      if (!_0x1102e2.data) {
        console.log("🚫 getShopDetail 请求异常 ➜ 无响应数据");
        return {};
      }
      const _0x1d73d2 = _0x1102e2.data;
      if (_0x1d73d2.code === "200" && _0x1d73d2.success === true && _0x1d73d2.data) {
        return _0x1d73d2?.["data"] || {};
      }
    } catch (_0x579b66) {
      console.log("❌ getShopDetail 在处理请求中遇到了错误\n" + _0x579b66);
    }
    return {};
  }
  async getShopId(_0x2051fa, _0x304fd9 = this._Cookie) {
    if (!_0x2051fa) {
      return null;
    }
    try {
      const _0x32cf84 = await this.getShopDetail({
        venderId: _0x2051fa
      }, _0x304fd9);
      return _0x32cf84?.["shopBaseInfo"]?.["shopId"] || null;
    } catch (_0x31bd3f) {
      console.log("❌ getShopId 在处理请求中遇到了错误\n" + _0x31bd3f);
    }
    return null;
  }
  async getVenderId(_0x14f8a1, _0xc70de8 = this._Cookie) {
    if (!_0x14f8a1) {
      return null;
    }
    try {
      const _0x4b3290 = await this.getShopDetail({
        shopId: _0x14f8a1
      }, _0xc70de8);
      return _0x4b3290?.["shopBaseInfo"]?.["venderId"] || null;
    } catch (_0x11e2cd) {
      console.log("❌ getVenderId 在处理请求中遇到了错误\n" + _0x11e2cd);
    }
    return null;
  }
  async getShopName(_0x4fda96 = {
    venderId: "",
    shopId: ""
  }, _0x4206da = this._Cookie) {
    const {
      venderId: _0x38fd07,
      shopId: _0x41988e
    } = _0x4fda96;
    if (!_0x38fd07 && !_0x41988e) {
      return null;
    }
    try {
      const _0xd11d59 = await this.getShopDetail(_0x4fda96, _0x4206da);
      return _0xd11d59?.["shopBaseInfo"]?.["shopName"] || null;
    } catch (_0xed46dc) {
      console.log("❌ getShopName 在处理请求中遇到了错误\n" + _0xed46dc);
    }
    return null;
  }
  async followShop(_0x22c3a3, _0x50b7c5, _0x299ff7 = this._Cookie) {
    if (!_0x299ff7) {
      console.log("🚫 followShop 请求失败 ➜ 未设置Cookie");
      return undefined;
    }
    if (!_0x22c3a3 && typeof _0x22c3a3 !== "boolean" || !_0x50b7c5) {
      return undefined;
    }
    try {
      const _0x396897 = {
          url: "https://api.m.jd.com/client.action",
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://shop.m.jd.com",
            Referer: "https://shop.m.jd.com/",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            Cookie: _0x299ff7,
            "User-Agent": this._defaultUserAgent
          },
          data: {
            functionId: "whx_followShop",
            body: JSON.stringify({
              shopId: _0x50b7c5,
              follow: _0x22c3a3
            }),
            t: Date.now(),
            appid: "shop_m_jd_com",
            clientVersion: "11.0.0",
            client: "wh5"
          },
          timeout: 30000
        },
        _0x2e2a8f = await this.request(_0x396897);
      if (!_0x2e2a8f.success) {
        console.log("🚫 followShop 请求失败 ➜ " + _0x2e2a8f.error);
        return undefined;
      }
      if (!_0x2e2a8f.data) {
        console.log("🚫 followShop 请求异常 ➜ 无响应数据");
        return undefined;
      }
      const _0x54e55f = _0x2e2a8f.data;
      if (_0x54e55f?.["code"] === "0") {
        return _0x54e55f?.["result"]?.["code"] === "0";
      } else {
        if (_0x54e55f?.["msg"]) {
          return false;
        } else {
          console.log("🚫 " + (_0x22c3a3 ? "关注" : "取关") + "店铺异常 ➜ " + JSON.stringify(_0x54e55f));
        }
      }
    } catch (_0x1a677e) {
      console.log("❌ followShop 在处理请求中遇到了错误\n" + _0x1a677e);
    }
    return undefined;
  }
  useAppTls(_0x55e427 = {}) {
    return Object.assign({}, this._appHttpsTlsOptions, _0x55e427);
  }
  async getH5st(_0x3b0eaa, _0x4a4914) {
    const _0x3a2212 = this._getH5STConfig();
    let _0x53d66e = {
      Authorization: _0x4a4914 || "",
      "Content-Type": "application/json"
    };
    const _0x50ff0e = await this.request({
        url: _0x3a2212.url,
        method: "POST",
        headers: _0x53d66e,
        body: JSON.stringify(_0x3b0eaa),
        timeout: 30000
      }),
      _0x12d4d9 = _0x50ff0e.data;
    if (_0x12d4d9 && _0x12d4d9.code === 200) {
      return _0x12d4d9.data;
    }
  }
  async concTask(_0x5211ce = "3", _0x3941a6, _0x49d02e) {
    const _0x2e284c = _0x3941a6.slice();
    let _0x2f6aba = false,
      _0x29805d = 0,
      _0x16fe0c = 0;
    async function _0x578e06(_0x119542, _0x2a60dc) {
      const _0x1790f6 = await _0x49d02e(_0x119542, _0x2a60dc);
      if (_0x1790f6) {
        if (typeof _0x1790f6 === "boolean") {
          _0x2f6aba = true;
        } else {
          typeof _0x1790f6 === "object" && _0x1790f6?.["runEnd"] && (_0x2f6aba = true);
        }
      }
      _0x29805d--;
      _0x5b736e();
    }
    async function _0x5b736e() {
      while (_0x29805d < _0x5211ce && _0x2e284c.length > 0 && !_0x2f6aba) {
        const _0x2e88a7 = _0x2e284c.shift();
        _0x29805d++;
        _0x16fe0c++;
        await _0x578e06(_0x2e88a7, _0x16fe0c);
      }
      _0x2f6aba && (await new Promise(_0x3c8feb => {
        const _0x16770f = setInterval(() => {
          _0x29805d === 0 && (clearInterval(_0x16770f), _0x3c8feb());
        }, 100);
      }));
    }
    const _0x2e74e1 = Math.min(_0x2e284c.length, _0x5211ce),
      _0x1cc91a = [];
    for (let _0x3e7652 = 0; _0x3e7652 < _0x2e74e1; _0x3e7652++) {
      const _0x20570a = _0x2e284c.shift();
      _0x29805d++;
      _0x16fe0c++;
      _0x1cc91a.push(_0x578e06(_0x20570a, _0x16fe0c));
    }
    await Promise.all(_0x1cc91a);
    _0x5b736e();
    await new Promise(_0x57b830 => {
      const _0x1bdddd = setInterval(() => {
        (_0x29805d === 0 || _0x2f6aba) && (clearInterval(_0x1bdddd), _0x57b830());
      }, 100);
    });
  }
  async getSign(_0x59be74, _0x5a1cf1) {
    !this._hasInitAppSignConfig && (this._initAppSignConfig(), this._hasInitAppSignConfig = true);
    let _0x30dd12 = "";
    try {
      const _0x358454 = this._appSignConfig;
      if (_0x358454.genSign) {
        try {
          _0x30dd12 = _0x358454.genSign(_0x59be74, _0x5a1cf1);
        } catch (_0x99e61b) {
          console.log("🚫 getSign 获取本地签名遇到了错误 ➜ " + (_0x99e61b.message || _0x99e61b));
        }
        if (_0x30dd12) {
          return _0x30dd12;
        } else {
          console.log("🚫 getSign 本地签名获取失败");
        }
      }
      let _0xfce888 = {
        [_0x358454.functionIdField]: _0x59be74,
        [_0x358454.bodyField]: _0x5a1cf1
      };
      const _0x508cc2 = {
        url: _0x358454.requestApi,
        method: _0x358454.requestMethod.toLowerCase(),
        headers: {
          "Content-Type": _0x358454.requestContentType
        },
        data: null,
        timeout: 60000,
        proxy: null,
        debug: false
      };
      _0x358454.requestMethod === "GET" ? (_0x358454.requestApi += "?" + this.objectToQueryString(_0xfce888), delete _0x508cc2.data, delete _0x508cc2.headers["Content-Type"]) : _0x358454.requestContentType.indexOf("application/x-www-form-urlencoded") !== -1 ? (typeof _0xfce888[_0x358454.bodyField] === "object" && (_0xfce888[_0x358454.bodyField] = JSON.stringify(_0xfce888[_0x358454.bodyField])), _0x508cc2.data = this.objectToQueryString(_0xfce888)) : _0x508cc2.data = JSON.stringify(_0xfce888);
      const _0x40d985 = await this.request(_0x508cc2);
      if (!_0x40d985.success) {
        console.log("🚫 getSign 请求失败 ➜ " + _0x40d985.error);
        return _0x30dd12;
      }
      if (!_0x40d985.data) {
        console.log("🚫 getSign 请求异常 ➜ 无响应数据");
        return _0x30dd12;
      }
      let _0x517620 = _0x40d985.data;
      if (typeof _0x40d985.data === "object") {
        _0x517620.data && (_0x517620 = _0x517620.data);
        for (const _0x215812 of ["body", "convertUrl", "convertUrlNew"]) {
          if (_0x517620?.[_0x215812] && this._checkSignStrFormat(_0x517620[_0x215812])) {
            _0x30dd12 = _0x517620[_0x215812];
            break;
          }
        }
        !_0x30dd12 && console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(_0x517620));
      } else {
        this._checkSignStrFormat(_0x517620) ? _0x30dd12 = _0x517620 : console.log("🚫 getSign 响应数据解析异常 ➜ " + _0x517620);
      }
    } catch (_0x3cde32) {
      console.log("🚫 getSign 在处理请求中遇到了错误\n" + _0x3cde32);
    }
    return _0x30dd12;
  }
  _checkSignStrFormat(_0x8513ea) {
    const _0x18baee = ["body=", "st=", "sign=", "sv="];
    for (let _0x157572 = 0; _0x157572 < _0x18baee.length; _0x157572++) {
      if (!_0x8513ea.includes(_0x18baee[_0x157572])) {
        return false;
      }
    }
    return true;
  }
  _loadModule(_0x3f23ec) {
    switch (_0x3f23ec) {
      case "h5st":
        if (!this._H5st) {
          try {
            const {
              H5st: _0x2bf111
            } = require(this._jdCryptoModelPath);
            this._H5st = _0x2bf111;
          } catch (_0x260b35) {
            console.log("❌ h5st 组件加载失败");
          }
        }
        break;
      case "TablePrint":
        if (!this._Table) {
          try {
            const {
              Table: _0x2c1788
            } = require("console-table-printer");
            this._Table = _0x2c1788;
          } catch (_0x2c4893) {
            console.log("❌ console-table-printer 表格打印模块加载失败 " + (_0x2c4893.message || _0x2c4893));
          }
        }
        break;
      case "HttpsProxyAgent":
        if (!this._HttpsProxyAgent) {
          try {
            const {
              HttpsProxyAgent: _0x4a4706
            } = require("https-proxy-agent");
            this._HttpsProxyAgent = _0x4a4706;
          } catch (_0x4e3a6e) {
            try {
              this._HttpsProxyAgent = require("https-proxy-agent");
            } catch (_0x5360f1) {
              console.log("❌ https-proxy-agent 代理模块加载失败 " + (_0x5360f1.message || _0x5360f1));
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
  static _utf8Encode(_0x48e2ff) {
    _0x48e2ff = _0x48e2ff.replace(/rn/g, "n");
    let _0x5911e2 = "",
      _0x2a1667;
    for (let _0x11e879 = 0; _0x11e879 < _0x48e2ff.length; _0x11e879++) {
      _0x2a1667 = _0x48e2ff.charCodeAt(_0x11e879);
      if (_0x2a1667 < 128) {
        _0x5911e2 += String.fromCharCode(_0x2a1667);
      } else {
        _0x2a1667 > 127 && _0x2a1667 < 2048 ? (_0x5911e2 += String.fromCharCode(_0x2a1667 >> 6 | 192), _0x5911e2 += String.fromCharCode(_0x2a1667 & 63 | 128)) : (_0x5911e2 += String.fromCharCode(_0x2a1667 >> 12 | 224), _0x5911e2 += String.fromCharCode(_0x2a1667 >> 6 & 63 | 128), _0x5911e2 += String.fromCharCode(_0x2a1667 & 63 | 128));
      }
    }
    return _0x5911e2;
  }
  static _utf8Decode(_0x36528c) {
    let _0x40901a = "",
      _0x20b3f3,
      _0xa7e6f9,
      _0x39b56f,
      _0x192f11 = 0;
    while (_0x192f11 < _0x36528c.length) {
      _0x20b3f3 = _0x36528c.charCodeAt(_0x192f11);
      if (_0x20b3f3 < 128) {
        _0x40901a += String.fromCharCode(_0x20b3f3);
        _0x192f11++;
      } else {
        _0x20b3f3 > 191 && _0x20b3f3 < 224 ? (_0xa7e6f9 = _0x36528c.charCodeAt(_0x192f11 + 1), _0x40901a += String.fromCharCode((_0x20b3f3 & 31) << 6 | _0xa7e6f9 & 63), _0x192f11 += 2) : (_0xa7e6f9 = _0x36528c.charCodeAt(_0x192f11 + 1), _0x39b56f = _0x36528c.charCodeAt(_0x192f11 + 2), _0x40901a += String.fromCharCode((_0x20b3f3 & 15) << 12 | (_0xa7e6f9 & 63) << 6 | _0x39b56f & 63), _0x192f11 += 3);
      }
    }
    return _0x40901a;
  }
  static encode(_0x583721, _0x4e4606 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    let _0x5caa6b = "",
      _0x2aa4c9,
      _0x3c527,
      _0x405b1d,
      _0x3957a1,
      _0x3c5f5e,
      _0x2c9a2a,
      _0x463831,
      _0xdf5edb = 0;
    _0x583721 = this._utf8Encode(_0x583721);
    while (_0xdf5edb < _0x583721.length) {
      _0x2aa4c9 = _0x583721.charCodeAt(_0xdf5edb++);
      _0x3c527 = _0x583721.charCodeAt(_0xdf5edb++);
      _0x405b1d = _0x583721.charCodeAt(_0xdf5edb++);
      _0x3957a1 = _0x2aa4c9 >> 2;
      _0x3c5f5e = (_0x2aa4c9 & 3) << 4 | _0x3c527 >> 4;
      _0x2c9a2a = (_0x3c527 & 15) << 2 | _0x405b1d >> 6;
      _0x463831 = _0x405b1d & 63;
      if (isNaN(_0x3c527)) {
        _0x2c9a2a = _0x463831 = 64;
      } else {
        isNaN(_0x405b1d) && (_0x463831 = 64);
      }
      _0x5caa6b = _0x5caa6b + _0x4e4606.charAt(_0x3957a1) + _0x4e4606.charAt(_0x3c5f5e) + _0x4e4606.charAt(_0x2c9a2a) + _0x4e4606.charAt(_0x463831);
    }
    while (_0x5caa6b.length % 4 > 1) {
      _0x5caa6b += "=";
    }
    return _0x5caa6b;
  }
  static decode(_0x10f70b, _0x11bd01 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
    let _0x51361b = "",
      _0x5253a2,
      _0x43ea4d,
      _0x5a94ff,
      _0x57fec7,
      _0x1e55a1,
      _0x112885,
      _0x12782a,
      _0x1dae95 = 0;
    while (_0x1dae95 < _0x10f70b.length) {
      _0x57fec7 = _0x11bd01.indexOf(_0x10f70b.charAt(_0x1dae95++));
      _0x1e55a1 = _0x11bd01.indexOf(_0x10f70b.charAt(_0x1dae95++));
      _0x112885 = _0x11bd01.indexOf(_0x10f70b.charAt(_0x1dae95++));
      _0x12782a = _0x11bd01.indexOf(_0x10f70b.charAt(_0x1dae95++));
      _0x5253a2 = _0x57fec7 << 2 | _0x1e55a1 >> 4;
      _0x43ea4d = (_0x1e55a1 & 15) << 4 | _0x112885 >> 2;
      _0x5a94ff = (_0x112885 & 3) << 6 | _0x12782a;
      _0x51361b += String.fromCharCode(_0x5253a2);
      if (_0x112885 !== 64) {
        _0x51361b += String.fromCharCode(_0x43ea4d);
      }
      if (_0x12782a !== 64) {
        _0x51361b += String.fromCharCode(_0x5a94ff);
      }
    }
    _0x51361b = this._utf8Decode(_0x51361b);
    return _0x51361b;
  }
}
class LocalStorageCache {
  constructor(_0x330c4b = null, _0x57ce5c = 0, _0x2113b3 = null) {
    this.saveFile = _0x330c4b;
    this.defaultTTL = _0x57ce5c;
    this.reloadInterval = _0x2113b3;
    this.lastLoad = 0;
    this.data = new Map();
    this.pendingWrites = false;
    this.load();
  }
  load() {
    if (this.saveFile && fs.existsSync(this.saveFile)) {
      try {
        const _0x374902 = fs.readFileSync(this.saveFile, "utf8"),
          _0x494e56 = JSON.parse(_0x374902);
        this.data = new Map(Object.entries(_0x494e56));
      } catch (_0x425ac2) {}
    }
    this.lastLoad = this.now();
  }
  save() {
    if (this.saveFile && !this.pendingWrites) {
      this.pendingWrites = true;
      try {
        const _0x133a29 = JSON.stringify(Object.fromEntries(this.data));
        fs.writeFileSync(this.saveFile, _0x133a29, "utf8");
      } catch {}
      this.pendingWrites = false;
    }
  }
  clear() {
    this.data.clear();
  }
  _checkAndReload(_0x1b9a39 = this.now()) {
    if (!this.reloadInterval || !this.saveFile) {
      return;
    }
    _0x1b9a39 - this.lastLoad > this.reloadInterval && this.load();
  }
  now() {
    return Date.now();
  }
  put(_0x47cf6b, _0x4872b9 = null, _0x24a57e = 0, _0xa26c63) {
    this._checkAndReload();
    _0x24a57e = _0x24a57e === 0 ? this.defaultTTL : _0x24a57e;
    const _0x18f6b1 = _0x24a57e === 0 ? 0 : this.now() + _0x24a57e;
    let _0x54c2ff = null;
    this.data.has(_0x47cf6b) && (_0x54c2ff = this.data.get(_0x47cf6b).val);
    _0x4872b9 !== null ? this.data.set(_0x47cf6b, {
      expires: _0x18f6b1,
      val: _0x4872b9
    }) : this.data.delete(_0x47cf6b);
    this.save();
    if (_0xa26c63 && _0x54c2ff) {
      _0xa26c63(_0x54c2ff);
    }
    return _0x54c2ff;
  }
  get(_0x218bfa, _0x234690) {
    this._checkAndReload();
    let _0x1711d7 = null;
    if (this.data.has(_0x218bfa)) {
      const _0x42b457 = this.data.get(_0x218bfa);
      _0x42b457.expires === 0 || this.now() < _0x42b457.expires ? _0x1711d7 = _0x42b457.val : (_0x1711d7 = null, this.nuke(_0x218bfa));
    }
    if (_0x234690) {
      _0x234690(_0x1711d7);
    }
    return _0x1711d7;
  }
  del(_0xe79773, _0x479453) {
    this._checkAndReload();
    let _0xed0ed3 = null;
    this.data.has(_0xe79773) && (_0xed0ed3 = this.data.get(_0xe79773).val, this.data.delete(_0xe79773), this.save());
    if (_0x479453) {
      _0x479453(_0xed0ed3);
    }
    return _0xed0ed3;
  }
  nuke(_0x2955d6) {
    this._checkAndReload();
    this.data.has(_0x2955d6) && (this.data.delete(_0x2955d6), this.save());
  }
}
module.exports = new Common();