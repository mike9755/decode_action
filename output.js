//Sun Oct 20 2024 13:14:49 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const fs = require("fs"),
  CryptoJS = require("crypto-js"),
  querystring = require("querystring"),
  common = require("./jdCommon"),
  wuxianDefense = function () {
    const lI111iIl = [],
      llII1IIl = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"],
      l11I1i1i = [...lI111iIl, ...llII1IIl],
      IIiilIl = ["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"];
    function IiIlii1l(lllIi1iI, IIiIil1, lIiI1lI1) {
      let III11l1 = Date.now() + parseInt(lIiI1lI1);
      typeof lllIi1iI !== "object" && (lllIi1iI = JSON.parse(lllIi1iI));
      lllIi1iI.nowTime = III11l1;
      let Il11l = IIiIil1 + III11l1;
      const {
          keyBytes: lllil1Il,
          ivBytes: IlIIiI1l
        } = i11Ii11l(Il11l),
        lIlllii1 = CryptoJS.AES.encrypt(JSON.stringify(lllIi1iI), lllil1Il, {
          "iv": IlIIiI1l,
          "mode": CryptoJS.mode.ECB,
          "padding": CryptoJS.pad.Pkcs7
        });
      return lIlllii1.toString();
    }
    function I1i1iiII(iiIIliiI, l1lIIIII, ll11IIii) {
      let l1iiIi1 = Date.now() + parseInt(ll11IIii),
        liIiil1 = l1lIIIII + l1iiIi1;
      const {
          keyBytes: l111i1Ii,
          ivBytes: il11il1i
        } = i11Ii11l(liIiil1),
        Ilil1IiI = CryptoJS.AES.decrypt(iiIIliiI, l111i1Ii, {
          "iv": il11il1i,
          "mode": CryptoJS.mode.ECB,
          "padding": CryptoJS.pad.Pkcs7
        }),
        iIIii1lI = CryptoJS.enc.Utf8.stringify(Ilil1IiI).toString();
      try {
        return JSON.parse(iIIii1lI);
      } catch {
        return iIIii1lI;
      }
    }
    function IIiliilI(IiI1IIi) {
      {
        const iIi11lII = l11I1i1i,
          II1liIl1 = Object.fromEntries(iIi11lII.map(il1i1ii1 => [il1i1ii1, true])),
          lI1IlIII = II1liIl1[IiI1IIi] !== undefined;
        return lI1IlIII;
      }
    }
    function i1IIl1i1(llIIii1I) {
      llIIii1I = llIIii1I.split("").reverse().join("");
      const IIiIiIIl = new Uint8Array(12),
        i1IlIll1 = new TextEncoder().encode(llIIii1I);
      for (let iIIlI1lI = 0; iIIlI1lI < i1IlIll1.length; iIIlI1lI += 2) {
        let l1i1iiil = i1IlIll1[iIIlI1lI] << 5 | i1IlIll1[iIIlI1lI + 1] & 255;
        l1i1iiil %= 63;
        IIiIiIIl[iIIlI1lI >> 1] = l1i1iiil;
      }
      let i11l1Iii = "";
      for (let llil11l1 = 0; llil11l1 < IIiIiIIl.length; llil11l1++) {
        i11l1Iii += (IIiIiIIl[llil11l1] + 256).toString(2).slice(1);
      }
      let IllIIlIl = "",
        Il1llil1 = "";
      for (let liIli1i = 0; liIli1i < 16; liIli1i++) {
        if (liIli1i !== 0) {
          {
            const I1iill1l = liIli1i * 6,
              lllI1ii1 = i11l1Iii.substring(I1iill1l, I1iill1l + 6);
            let lIll1iIi = parseInt(lllI1ii1, 2);
            const l1l1IIII = Il1llil1.split("");
            for (let i1lIil1i = 0; i1lIil1i < l1l1IIII.length; i1lIil1i++) {
              l1l1IIII[i1lIil1i] === "1" && (lIll1iIi = (lIll1iIi >> 6 - i1lIil1i | lIll1iIi << i1lIil1i) & 63);
            }
            Il1llil1 = (lIll1iIi & 63).toString(2).padStart(6, "0");
          }
        } else Il1llil1 = i11l1Iii.substring(0, 6);
        IllIIlIl += Il1llil1;
      }
      for (let Ilii11il = 0; Ilii11il < 12; Ilii11il++) {
        {
          const i11liIil = Ilii11il * 8;
          IIiIiIIl[Ilii11il] = parseInt(IllIIlIl.substring(i11liIil, i11liIil + 8), 2);
        }
      }
      const II1i1lI = btoa(String.fromCharCode.apply(null, IIiIiIIl));
      return II1i1lI;
    }
    function i11Ii11l(IiIil1li) {
      {
        const IlI1l111 = IiIil1li.substring(0, IiIil1li.length - 5);
        let iIIIiiii = "";
        for (let IIIiiIli = 0; IIIiiIli < IlI1l111.length; IIIiiIli++) {
          {
            let iiil1il = IlI1l111.charCodeAt(IIIiiIli),
              ll1ll1I1 = iiil1il % 10,
              l1lIi1ll = IIiilIl[ll1ll1I1][IIIiiIli];
            iIIIiiii += l1lIi1ll;
          }
        }
        var I1i1llil = iIIIiiii.length,
          Ill11iiI = Math.floor(I1i1llil / 24),
          I1Iiiili = "";
        for (var i11IIl = 0; i11IIl < 24; i11IIl++) {
          var lIllil1 = (i11IIl + 1) * Ill11iiI;
          if (i11IIl === 23) {
            lIllil1 = I1i1llil;
          }
          var i1iiiIli = iIIIiiii.substring(i11IIl * Ill11iiI, lIllil1),
            i1l1Ili1 = [];
          for (var I1lIIl1i = 0; I1lIIl1i < i1iiiIli.length; I1lIIl1i++) {
            i1l1Ili1.push(i1iiiIli.charCodeAt(I1lIIl1i));
          }
          var iIill1i = i1l1Ili1.reduce(function (II1IiIiI, Iilii1I1) {
              return II1IiIiI + Iilii1I1;
            }, 0),
            IlIIII1i = Math.floor(iIill1i / i1l1Ili1.length);
          I1Iiiili += String.fromCharCode(IlIIII1i);
        }
        iIIIiiii = I1Iiiili;
        const iilIli11 = i1IIl1i1(iIIIiiii),
          iiilllIl = CryptoJS.enc.Utf8.parse(iilIli11),
          IIIlI1Il = CryptoJS.enc.Utf8.parse("");
        return {
          "keyBytes": iiilllIl,
          "ivBytes": IIIlI1Il
        };
      }
    }
    const liII11il = function () {
      const iIIIiII = CryptoJS.enc.Utf8.parse("Hd5W5ONsYKmGm9QA"),
        iIll1I1I = CryptoJS.enc.Utf8.parse("2JjUvJEAsA2Yog==");
      function lliiIllI(llli111I) {
        if (typeof llli111I !== "string") {
          llli111I = JSON.stringify(llli111I);
        }
        const I1iilIlI = CryptoJS.enc.Utf8.parse(llli111I),
          I1IIi11I = CryptoJS.AES.encrypt(I1iilIlI, iIIIiII, {
            "iv": iIll1I1I,
            "mode": CryptoJS.mode.CBC,
            "padding": CryptoJS.pad.Pkcs7
          });
        return CryptoJS.enc.Base64.stringify(I1IIi11I.ciphertext);
      }
      function IiIlI1II(Ill11liI) {
        {
          const lI11IiIi = CryptoJS.enc.Base64.parse(Ill11liI),
            IlIiIlli = CryptoJS.enc.Base64.stringify(lI11IiIi),
            i1liIii = CryptoJS.AES.decrypt(IlIiIlli, iIIIiII, {
              "iv": iIll1I1I,
              "mode": CryptoJS.mode.CBC,
              "padding": CryptoJS.pad.Pkcs7
            }),
            lIl11II1 = CryptoJS.enc.Utf8.stringify(i1liIii).toString();
          try {
            return JSON.parse(lIl11II1);
          } catch {
            return lIl11II1;
          }
        }
      }
      return {
        "encrypt": lliiIllI,
        "decrypt": IiIlI1II
      };
    }();
    return {
      "encrypt": IiIlii1l,
      "decrypt": I1i1iiII,
      "isDefenseApi": IIiliilI,
      "interactionV2": liII11il
    };
  }();
async function jsTk(IiiI1IlI, iiiII1ll, I1IIliIl = {}, Ii11l1Il = {}) {
  let li11Ill = {
    "eid": "",
    "jsToken": "",
    "fp": ""
  };
  function lIII1l1I(iIII1Iil) {
    {
      iIII1Iil = JSON.stringify(iIII1Iil);
      iIII1Iil = encodeURIComponent(iIII1Iil);
      var Iil1Iiil = "",
        ii1IiilI = 0;
      do {
        var iiiI1iiI = iIII1Iil.charCodeAt(ii1IiilI++);
        var ilII1i1l = iIII1Iil.charCodeAt(ii1IiilI++);
        var I1iiIi1i = iIII1Iil.charCodeAt(ii1IiilI++);
        var IllI11Il = iiiI1iiI >> 2;
        iiiI1iiI = (iiiI1iiI & 3) << 4 | ilII1i1l >> 4;
        var II1I1iiI = (ilII1i1l & 15) << 2 | I1iiIi1i >> 6;
        var iIIlI1Ii = I1iiIi1i & 63;
        isNaN(ilII1i1l) ? II1I1iiI = iIIlI1Ii = 64 : isNaN(I1iiIi1i) && (iIIlI1Ii = 64);
        Iil1Iiil = Iil1Iiil + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(IllI11Il) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iiiI1iiI) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(II1I1iiI) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(iIIlI1Ii);
      } while (ii1IiilI < iIII1Iil.length);
      return Iil1Iiil + "/";
    }
  }
  try {
    const li11iii = HASH.hash128([IiiI1IlI.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "932x430", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null].join("~~~"), 31);
    li11Ill.fp = li11iii;
    const liIll11i = lIII1l1I(Object.assign({}, {
        "pin": "",
        "oid": "",
        "bizId": "jd-babelh5",
        "fc": "",
        "mode": "strict",
        "p": /^https:/.test(iiiII1ll) ? "s" : "h",
        "fp": li11iii,
        "ctype": 1,
        "v": "3.2.1.1",
        "f": "3",
        "o": iiiII1ll.replace(/^https?:\/\//, ""),
        "qs": "",
        "jsTk": "",
        "qi": "",
        "stk": ""
      }, I1IIliIl)),
      li11ll1I = lIII1l1I(Object.assign({}, {
        "ts": {
          "deviceTime": Date.now(),
          "deviceEndTime": Date.now() + 20
        },
        "ca": {
          "tdHash": ""
        },
        "m": {
          "compatMode": "CSS1Compat"
        },
        "fo": ["Bauhaus 93", "Chalkduster", "Impact", "Menlo", "Papyrus", "Rockwell"],
        "n": {
          "standalone": false,
          "hardwareConcurrency": 4,
          "webdriver": false,
          "maxTouchPoints": 5,
          "cookieEnabled": true,
          "appCodeName": "Mozilla",
          "appName": "Netscape",
          "appVersion": /\/(.+)/g.exec(IiiI1IlI) && /\/(.+)/g.exec(IiiI1IlI)[1] || IiiI1IlI,
          "platform": "iPhone",
          "product": "Gecko",
          "productSub": "20030107",
          "userAgent": IiiI1IlI,
          "vendor": "Apple Computer, Inc.",
          "vendorSub": "",
          "language": "zh-CN",
          "onLine": true,
          "pdfViewerEnabled": true,
          "javaEnabled": false,
          "enumerationOrder": ["sendBeacon", "standalone", "hardwareConcurrency", "clipboard", "audioSession", "credentials", "geolocation", "mediaCapabilities", "mediaSession", "mediaDevices", "permissions", "wakeLock", "locks", "webdriver", "maxTouchPoints", "userActivation", "cookieEnabled", "appCodeName", "appName", "appVersion", "platform", "product", "productSub", "userAgent", "vendor", "vendorSub", "language", "languages", "onLine", "plugins", "mimeTypes", "pdfViewerEnabled", "storage", "requestMediaKeySystemAccess", "getGamepads", "javaEnabled", "canShare", "share"]
        },
        "p": [],
        "w": {
          "devicePixelRatio": 1,
          "screenTop": 0,
          "screenLeft": 0
        },
        "s": {
          "availHeight": 844,
          "availWidth": 390,
          "colorDepth": 24,
          "height": 844,
          "width": 390,
          "pixelDepth": 24
        },
        "sc": {
          "ActiveBorder": "rgb(118, 118, 118)",
          "ActiveCaption": "rgb(0, 0, 0)",
          "AppWorkspace": "rgb(255, 255, 255)",
          "Background": "rgb(255, 255, 255)",
          "ButtonFace": "rgb(239, 239, 239)",
          "ButtonHighlight": "rgb(239, 239, 239)",
          "ButtonShadow": "rgb(239, 239, 239)",
          "ButtonText": "rgb(0, 0, 0)",
          "CaptionText": "rgb(0, 0, 0)",
          "GrayText": "rgb(128, 128, 128)",
          "Highlight": "rgba(51, 181, 229, 0.4)",
          "HighlightText": "rgb(255, 255, 255)",
          "InactiveBorder": "rgb(118, 118, 118)",
          "InactiveCaption": "rgb(255, 255, 255)",
          "InactiveCaptionText": "rgb(128, 128, 128)",
          "InfoBackground": "rgb(255, 255, 255)",
          "InfoText": "rgb(0, 0, 0)",
          "Menu": "rgb(255, 255, 255)",
          "MenuText": "rgb(0, 0, 0)",
          "Scrollbar": "rgb(255, 255, 255)",
          "ThreeDDarkShadow": "rgb(118, 118, 118)",
          "ThreeDFace": "rgb(239, 239, 239)",
          "ThreeDHighlight": "rgb(118, 118, 118)",
          "ThreeDLightShadow": "rgb(118, 118, 118)",
          "ThreeDShadow": "rgb(118, 118, 118)",
          "Window": "rgb(255, 255, 255)",
          "WindowFrame": "rgb(118, 118, 118)",
          "WindowText": "rgb(0, 0, 0)"
        },
        "ss": {
          "cookie": true,
          "localStorage": true,
          "sessionStorage": true,
          "globalStorage": false,
          "indexedDB": true
        },
        "tz": -480,
        "lil": "",
        "wil": ""
      }, Ii11l1Il)),
      i1iiIl1 = {
        "url": "https://gia.jd.com/jsTk.do",
        "method": "POST",
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Connection": "keep-alive",
          "Host": "gia.jd.com",
          "Origin": common.parseUrl(iiiII1ll)?.["origin"] || "https://pro.m.jd.com",
          "Referer": iiiII1ll,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "User-Agent": IiiI1IlI
        },
        "params": {
          "a": liIll11i
        },
        "data": {
          "d": li11ll1I
        },
        "proxy": null,
        "timeout": 60000,
        "debug": false
      };
    let i1Iilll = 0,
      iillI = null;
    const IIiiI1Ii = 1;
    while (i1Iilll < IIiiI1Ii) {
      const lillllI1 = await common.request(i1iiIl1);
      if (!lillllI1.success) {
        iillI = "❌ jsTk 请求失败 ➜ " + lillllI1.error;
        i1Iilll++;
        continue;
      }
      if (!lillllI1.data) {
        iillI = "🚫 jsTk 请求失败 ➜ 无响应数据";
        i1Iilll++;
        continue;
      }
      try {
        const liIillll = lillllI1.data;
        if (liIillll?.["data"]?.["eid"] && liIillll?.["data"]?.["token"]) return li11Ill.eid = liIillll.data.eid, li11Ill.jsToken = liIillll.data.token, li11Ill;
        iillI = "🚫 jsTk 请求异常 ➜ " + JSON.stringify(liIillll);
      } catch (l1liiil1) {
        iillI = "❌ jsTk 在处理接口响应时遇到了错误 ➜ " + (l1liiil1.message || l1liiil1);
      }
      i1Iilll++;
    }
    if (i1Iilll >= IIiiI1Ii) {
      console.log(iillI);
    }
  } catch (illIill1) {
    console.log("❌ 在处理 jsTk 时遇到了错误 ➜ " + (illIill1.message || illIill1));
  }
  return li11Ill;
}
function getJdEnvInfo(II1lil1I, lIi1Iil) {
  function iiiIll1i() {
    try {
      for (var II1IIl1 = [], lli1I1i = 0; 32 > lli1I1i; lli1I1i++) II1IIl1[lli1I1i] = "0123456789abcdef".charAt(Math.floor(16 * Math.random()));
      II1IIl1[14] = "4";
      II1IIl1[19] = "0123456789abcdef".charAt(II1IIl1[19] & 3 | 8);
      II1IIl1[8] = II1IIl1[13] = II1IIl1[18] = II1IIl1[23];
      return II1IIl1.join("");
    } catch (I11IlI1) {
      return "";
    }
  }
  try {
    {
      const il1i1ll = new URL(lIi1Iil),
        iiIlIIl1 = il1i1ll.pathname.slice(0, il1i1ll.pathname.lastIndexOf("/") + 1);
      return {
        "version": "1.0.0",
        "data": common.Base64.encode(JSON.stringify({
          "userAgent": II1lil1I,
          "url": il1i1ll.hostname.concat(iiIlIIl1),
          "urlQStr": il1i1ll.search.slice(1),
          "language": "zh-CN",
          "browser": "applewebkit_chrome",
          "browserVersion": null,
          "os": "NA",
          "osVersion": "NA",
          "screenResolution": "932x430",
          "timezoneOffset": -8,
          "sessionStorage": "true",
          "localStorage": "true",
          "indexedDb": "true",
          "openDatabase": "false",
          "hardwareConcurrency": 4,
          "doNotTrack": "NA",
          "platform": "iPhone",
          "canvasFp": iiiIll1i(),
          "webglFp": "",
          "fp": HASH.hash128([II1lil1I.substring(0, 90), "zh-CN", "applewebkit_chrome", "605.1.15", "NA", "NA", 32, "932x430", -480, "sessionStorageKey", "localStorageKey", "indexedDbKey", "openDatabase", "NA", "iPhone", 10, "NA", "", null, null].join("~~~"), 31),
          "randomId": iiiIll1i()
        }), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")
      };
    }
  } catch (l1Ii1I) {
    return null;
  }
}
class _H5ST4_7 {
  constructor() {
    this._defaultVersion = "4.7";
    this._keyCharsetMap = {
      "algo4_7": "(olf1ll#s-w@!0mw",
      4.7: "X[FMV04Nfvd?Y6M_"
    };
    this._keyMap = {};
    for (const iiIiiiIi in this._keyCharsetMap) {
      this._keyMap[iiIiiiIi] = CryptoJS.enc.Utf8.parse(this._keyCharsetMap[iiIiiiIi]);
    }
    this._iv = CryptoJS.enc.Utf8.parse("0102030405060708");
    this._fvMap = {
      4.7: "h5_file_v4.7.3"
    };
    this._timePaddingMap = {
      4.7: "78"
    };
    this._useAlgoTokenCache = true;
    this._tokenStorageMap = {
      4.7: {}
    };
    this._algoStorageMap = {
      4.7: {}
    };
    this._fpMap = new Map();
    this._latestAppVersionData = {
      "build": "169370",
      "version": "13.1.0"
    };
    this._latestIOSVersion = "17.5";
    this._algorithm4_7 = {
      "enc": CryptoJS.enc
    };
    const Iii1111I = ["MD5", "SHA1", "SHA256", "SHA512"],
      lll1lli = ["HmacMD5", "HmacSHA1", "HmacSHA256", "HmacSHA512"];
    let l1iIii1l = "=LN6GO",
      l11li1i = 3;
    for (let iIiIIIll of Iii1111I) {
      this._algorithm4_7[iIiIIIll] = function (l1I1i1i1) {
        return CryptoJS[iIiIIIll](l1I1i1i1 + l1iIii1l);
      };
    }
    for (let ll1IIII of lll1lli) {
      this._algorithm4_7[ll1IIII] = function (i1ilIiil, iiililli) {
        return CryptoJS[ll1IIII](i1ilIiil + l1iIii1l, iiililli.slice(0, l11li1i).split("").map(iIiIili1 => String.fromCharCode(158 - iIiIili1.charCodeAt(0))).reverse().join("") + iiililli.slice(l11li1i));
      };
    }
    this._algorithm4_7.enc.Base64.encode = function (iil1I111) {
      let iili1II1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("").filter(Boolean),
        llll1l11 = "WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX".split("").filter(Boolean),
        l1ii11II = Object.fromEntries(iili1II1.map((i1Iiliii, l11iliii) => [i1Iiliii, llll1l11[l11iliii]])),
        i1lllIii = iil1I111.ciphertext.toString();
      var Iillili = 3 - iil1I111.ciphertext.sigBytes % 3;
      for (let Ii1ili1i of Array(Iillili)) {
        i1lllIii += "0" + Iillili;
      }
      let iIliIllI = new Buffer.from(i1lllIii, "hex").toString("Base64").split("").reverse().join("");
      return iIliIllI.split("").map(I1ll1Il1 => l1ii11II[I1ll1Il1] || I1ll1Il1).join("").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    };
    this._algorithmMap = {
      4.7: this._algorithm4_7
    };
  }
  async ["getH5st"](iIlII1Ii) {
    let iiiilll = Object.assign({}, iIlII1Ii, {
      "h5st": "",
      "params": "",
      "paramsData": {}
    });
    try {
      {
        if (!(typeof iIlII1Ii === "object" && iIlII1Ii !== null)) return console.log("❌ getH5st 传入参数有误"), iiiilll;else {
          const i1l1iiI1 = ["appId", "appid", "body", "functionId"],
            IiiIili1 = i1l1iiI1.filter(ii1lllll => !iIlII1Ii[ii1lllll]);
          if (IiiIili1.length > 0) return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + IiiIili1.join(", ")), iiiilll;
        }
        iIlII1Ii.version = this._defaultVersion;
        const lIlIlli = this._initParams(iIlII1Ii),
          {
            appid: iiIiiil1,
            body: Ii11l1lI,
            client: IiIllli1,
            clientVersion: iiilIi1,
            functionId: iIlIlilI
          } = iIlII1Ii;
        let llIiilI1 = this._tokenStorageMap[lIlIlli.version][lIlIlli.appId],
          i1ll1Iil = this._algoStorageMap[lIlIlli.version][lIlIlli.appId];
        if (!llIiilI1 || !i1ll1Iil) {
          const iili1ii = await this._requestAlgo(lIlIlli);
          llIiilI1 = iili1ii.token;
          i1ll1Iil = iili1ii.algo;
          this._useAlgoTokenCache && (this._tokenStorageMap[lIlIlli.version][lIlIlli.appId] = llIiilI1, this._algoStorageMap[lIlIlli.version][lIlIlli.appId] = i1ll1Iil);
        }
        if (!llIiilI1 && !i1ll1Iil) return iiiilll;
        const iIlliiIi = {
          "appid": iiIiiil1,
          "body": Ii11l1lI,
          "client": IiIllli1,
          "clientVersion": iiilIi1,
          "functionId": iIlIlilI
        };
        iIlII1Ii?.["t"] && typeof iIlII1Ii.t === "boolean" ? (iIlII1Ii.t = Date.now(), iIlliiIi.t = iIlII1Ii.t) : iIlII1Ii.t = "";
        if (!iIlliiIi.client) delete iIlliiIi.client;
        if (!iIlliiIi.clientVersion) delete iIlliiIi.clientVersion;
        const Ill1111 = this._makeSign(iIlliiIi, llIiilI1, i1ll1Iil, lIlIlli),
          liI1i11i = {
            "functionId": iIlIlilI,
            "body": JSON.stringify(Ii11l1lI),
            "t": "",
            "appid": iiIiiil1,
            "client": "",
            "clientVersion": "",
            "h5st": Ill1111?.["h5st"] || ""
          };
        for (const IIiIillI of ["t", "client", "clientVersion"]) {
          if (iIlII1Ii[IIiIillI]) {
            liI1i11i[IIiIillI] = iIlII1Ii[IIiIillI];
          } else delete liI1i11i[IIiIillI];
        }
        Object.assign(iiiilll, {
          "h5st": Ill1111?.["h5st"] || "",
          "params": querystring.stringify(liI1i11i),
          "paramsData": liI1i11i
        });
      }
    } catch (lI1liiii) {
      console.log("❌ getH5st 遇到了错误 " + (lI1liiii.message || lI1liiii));
    }
    return iiiilll;
  }
  ["_initParams"](lii111i) {
    const liI1IIi = lii111i.version,
      illilii1 = {
        "version": liI1IIi,
        "appId": lii111i?.["appId"] || "",
        "fv": this._fvMap[liI1IIi],
        "fp": "",
        "ua": "",
        "sua": "",
        "av": "",
        "url": "",
        "og": "",
        "referer": lii111i?.["referer"] || "",
        "pin": lii111i?.["pin"] || "",
        "cookie": lii111i?.["cookie"] || ""
      };
    if (lii111i?.["ua"]) {
      let IIilli1I = lii111i.ua,
        i1iii1II = IIilli1I.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        llIi1ili = IIilli1I.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      if (i1iii1II?.["length"] > 0 && llIi1ili?.["length"] > 0) {
        illilii1.ua = IIilli1I;
        illilii1.sua = i1iii1II[1];
        illilii1.av = llIi1ili[0];
      }
    }
    if (!illilii1.ua) {
      let lIiIi11I = this._genUA(),
        i1iIII1i = lIiIi11I.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        I1IliIll = lIiIi11I.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      i1iIII1i?.["length"] > 0 && I1IliIll?.["length"] > 0 && (illilii1.ua = lIiIi11I, illilii1.sua = i1iIII1i[1], illilii1.av = I1IliIll[0]);
    }
    illilii1.version = liI1IIi;
    illilii1.fp = this._fpMap.get(illilii1.ua) || "";
    if (!illilii1.fp) {
      illilii1.fp = this._makeFp4_7();
      illilii1.ua.startsWith("jd") && this._fpMap.set(illilii1.ua, illilii1.fp);
    }
    if (lii111i?.["url"]) {
      try {
        {
          const lilI1l1I = new URL(lii111i.url);
          illilii1.url = lilI1l1I.href;
          illilii1.og = lilI1l1I.origin;
        }
      } catch {}
    }
    return illilii1;
  }
  async ["_requestAlgo"](I1II1i11) {
    try {
      const i1ll1il1 = this._getExpandParamsData(I1II1i11),
        iIiiiili = this._AESEncrypt(JSON.stringify(i1ll1il1, null, 2), this._keyMap.algo4_7, I1II1i11.version),
        li1i1l1l = {
          "version": I1II1i11.version,
          "fp": I1II1i11.fp,
          "appId": I1II1i11.appId,
          "timestamp": Date.now(),
          "platform": "web",
          "expandParams": iIiiiili,
          "fv": I1II1i11.fv
        },
        llI1ll1i = {
          "url": "https://cactus.jd.com/request_algo?g_ty=ajax",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://cactus.jd.com",
            "Host": "cactus.jd.com",
            "Accept": "*/*",
            "User-Agent": I1II1i11?.["ua"] || "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
          },
          "data": li1i1l1l,
          "proxy": null,
          "timeout": 60000,
          "debug": false
        };
      let II1Iiii = 0,
        l1Iilii1 = null;
      const iil11Ii = 1;
      while (II1Iiii < iil11Ii) {
        const IlI1liii = await common.request(llI1ll1i);
        if (!IlI1liii.success) {
          l1Iilii1 = "❌ getH5st request_algo 请求失败 ➜ " + IlI1liii.error;
          II1Iiii++;
          continue;
        }
        if (!IlI1liii.data) {
          l1Iilii1 = "🚫 getH5st request_algo 请求失败 ➜ 无响应数据";
          II1Iiii++;
          continue;
        }
        try {
          const IilIli1I = IlI1liii.data;
          if (IilIli1I?.["data"] && IilIli1I?.["data"]?.["result"]) {
            const II1il1l1 = IilIli1I.data.result?.["algo"],
              IiillII1 = IilIli1I.data.result?.["tk"];
            if (II1il1l1 && IiillII1) return {
              "token": IiillII1,
              "algo": II1il1l1
            };
          }
          l1Iilii1 = "🚫 getH5st request_algo 请求异常 ➜ " + JSON.stringify(IilIli1I);
        } catch (ii1lIi1l) {
          l1Iilii1 = "❌ getH5st request_algo 在处理接口响应时遇到了错误 ➜ " + (ii1lIi1l.message || ii1lIi1l);
        }
        II1Iiii++;
      }
      II1Iiii >= iil11Ii && console.log(l1Iilii1);
    } catch (IIIliII) {
      console.log("❌ getH5st request_algo 在处理API请求时遇到了错误 " + (IIIliII.message || IIIliII));
    }
    return {
      "token": "",
      "algo": ""
    };
  }
  ["_getExpandParamsData"](ililiIi) {
    const I1i1IliI = 430,
      il1iI11 = 932,
      iI111li = 430,
      lII1I = 932;
    return {
      "wc": 0,
      "wd": 0,
      "l": "zh-CN",
      "ls": "zh-CN,zh",
      "ml": 0,
      "pl": 0,
      "av": ililiIi.av,
      "ua": ililiIi.ua,
      "sua": ililiIi.sua,
      "pp": ililiIi.pin ? {
        "p1": ililiIi.pin,
        "p2": ililiIi.pin
      } : {},
      "extend": {
        "wd": 0,
        "l": 0,
        "ls": 0,
        "wk": 0,
        "bu1": "0.1.7",
        "bu2": 0,
        "bu3": 60,
        "bu4": 0,
        "bu5": 0
      },
      "pp1": ililiIi.pin ? "" : ililiIi.cookie,
      "w": I1i1IliI,
      "h": il1iI11,
      "ow": iI111li,
      "oh": lII1I,
      "url": ililiIi.url,
      "og": ililiIi.og,
      "pf": "iPhone",
      "pr": 1,
      "re": ililiIi.referer,
      "random": this._makeRandomStr(10),
      "referer": ililiIi.referer,
      "v": ililiIi.fv,
      "bu2": "",
      "canvas": "",
      "webglFp": "",
      "ccn": 20,
      "ai": ililiIi.appId,
      "fp": ililiIi.fp
    };
  }
  ["_makeSign"](Il1111li, llii1l1I, ilI1I1Il, ll1IliIl) {
    try {
      const iI1lil1I = ll1IliIl.version,
        I111111I = Date.now(),
        iIiIili = new Date(I111111I),
        IIll1Ii1 = "" + iIiIili.getFullYear() + String(iIiIili.getMonth() + 1).padStart(2, "0") + String(iIiIili.getDate()).padStart(2, "0") + String(iIiIili.getHours()).padStart(2, "0") + String(iIiIili.getMinutes()).padStart(2, "0") + String(iIiIili.getSeconds()).padStart(2, "0") + String(iIiIili.getMilliseconds()).padStart(3, "0");
      let II1Illl1 = Object.entries(Il1111li).map(([i1i1IIil, li1Il11l]) => {
          if (i1i1IIil === "body") {
            li1Il11l = CryptoJS.SHA256(JSON.stringify(li1Il11l)).toString();
          }
          return {
            "key": i1i1IIil,
            "value": li1Il11l
          };
        }),
        Ii1Ill1l = "",
        lIIIlIli = "";
      const i1IIIlII = II1Illl1.map(liIlii1I => liIlii1I.key + ":" + liIlii1I.value).join("&"),
        IlIIli1 = new Function("return ".concat(ilI1I1Il))(),
        ilI1l = this._algorithmMap[iI1lil1I] || CryptoJS,
        l111I1i1 = IlIIli1(llii1l1I, ll1IliIl.fp, IIll1Ii1 + this._timePaddingMap[iI1lil1I], ll1IliIl.appId, ilI1l).toString() || "";
      Ii1Ill1l = ilI1l.HmacSHA256(i1IIIlII, l111I1i1).toString();
      let Ill1I1iI = {};
      Ill1I1iI = {
        "sua": ll1IliIl.sua,
        "pp": ll1IliIl.pin ? {
          "p1": ll1IliIl.pin,
          "p2": ll1IliIl.pin
        } : {},
        "extend": {
          "wd": 0,
          "l": 0,
          "ls": 0,
          "wk": 0,
          "bu1": "0.1.7",
          "bu2": -1,
          "bu3": 60,
          "bu4": 0,
          "bu5": 0
        },
        "random": this._makeRandomStr(10),
        "v": ll1IliIl.fv,
        "fp": ll1IliIl.fp
      };
      lIIIlIli = this._AESEncrypt(JSON.stringify(Ill1I1iI, null, 2), this._keyMap[iI1lil1I], iI1lil1I);
      const l11I1II = ["".concat(IIll1Ii1), "".concat(ll1IliIl.fp), "".concat(ll1IliIl.appId), "".concat(llii1l1I), "".concat(Ii1Ill1l), "".concat(iI1lil1I), "".concat(I111111I), "".concat(lIIIlIli)].join(";");
      return {
        "_stk": II1Illl1.map(llIiI11 => llIiI11.key).join(","),
        "_ste": 1,
        "h5st": l11I1II
      };
    } catch (lIIilil1) {
      console.log("❌ getH5st 生成签名时遇到了错误 " + (lIIilil1.message || lIIilil1));
    }
    return {
      "_stk": "",
      "_ste": 0,
      "h5st": ""
    };
  }
  ["_AESEncrypt"](I1IlIlil, IIlllii1, lIiIli1l) {
    const i11liI1I = CryptoJS.enc.Utf8.parse(I1IlIlil),
      iIi111iI = CryptoJS.AES.encrypt(i11liI1I, IIlllii1, {
        "iv": this._iv,
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
      });
    switch (lIiIli1l) {
      case "4.7":
        return this._algorithmMap[lIiIli1l].enc.Base64.encode(iIi111iI);
      default:
        return iIi111iI.ciphertext.toString();
    }
  }
  ["_makeRandomStr"](iliII11 = 32, ii1Il1lI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const iiIII = ii1Il1lI.length;
    let li1ii1ii = "";
    for (let liIlIIiI = 0; liIlIIiI < iliII11; liIlIIiI++) {
      li1ii1ii += ii1Il1lI.charAt(Math.floor(Math.random() * iiIII));
    }
    return li1ii1ii;
  }
  ["_genUA"]() {
    function Iill111(l1iilii = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", iII1Ii1i = "0123456789abcdef") {
      {
        let i1I1l1lI = "";
        for (let IIIIlIi of l1iilii) {
          if (IIIIlIi == "x") i1I1l1lI += iII1Ii1i.charAt(Math.floor(Math.random() * iII1Ii1i.length));else IIIIlIi == "X" ? i1I1l1lI += iII1Ii1i.charAt(Math.floor(Math.random() * iII1Ii1i.length)).toUpperCase() : i1I1l1lI += IIIIlIi;
        }
        return i1I1l1lI;
      }
    }
    const IIllilII = Iill111(),
      ii11 = ["jdapp", "iPhone", this._latestAppVersionData.version, "", "rn/" + IIllilII, "M/5.0", "appBuild/" + this._latestAppVersionData.build, "jdSupportDarkMode/0", "ef/1", "ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Math.floor(Date.now() / 1000) + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D", "Mozilla/5.0 (iPhone; CPU iPhone OS " + this._latestIOSVersion.replace(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      lllIi1II = ii11.join(";");
    return lllIi1II;
  }
  ["_makeFp4_7"]() {
    return this._makeFp4("1uct6d0jhq", 5, 10, 15);
  }
  ["_makeFp4"](lillli11, IlllIli, liiIIIi, iii1llIi) {
    function IlIIliIl(lIi1iIiI, ilIlllil) {
      return lIi1iIiI + Math.floor(Math.random() * (ilIlllil + 1 - lIi1iIiI));
    }
    function llilIIi1(iii1lIll, I11I11Ii) {
      for (var IIIiII11 = [], II1I1l1I = 0; II1I1l1I < iii1lIll.length; II1I1l1I++) {
        {
          var ilI11IlI = iii1lIll[II1I1l1I];
          if (IlIIliIl(0, iii1lIll.length - II1I1l1I - 1) < I11I11Ii - IIIiII11.length && (IIIiII11.push(ilI11IlI), IIIiII11.length == I11I11Ii)) break;
        }
      }
      for (var lliiili = "", llill1I1 = 0; llill1I1 < IIIiII11.length; llill1I1 += 1) {
        {
          var I1llIIli = Math.random() * (IIIiII11.length - llill1I1) | 0;
          lliiili += IIIiII11[I1llIIli];
          IIIiII11[I1llIIli] = IIIiII11[IIIiII11.length - llill1I1 - 1];
        }
      }
      return lliiili;
    }
    function i1i1llIl(iI1ii11, iiii1i11) {
      for (var liI1ll11 = 0; liI1ll11 < iiii1i11.length; liI1ll11 += 1) {
        {
          var lilliii = iI1ii11.indexOf(iiii1i11[liI1ll11]);
          -1 !== lilliii && (iI1ii11 = iI1ii11.replace(iiii1i11[liI1ll11], ""));
        }
      }
      return iI1ii11;
    }
    var lll1iliI = lillli11,
      lIl1I1l = llilIIi1(lll1iliI, IlllIli),
      I1i1Il1I = IlIIliIl(0, 9),
      ilI1llll = i1i1llIl(lll1iliI, lIl1I1l),
      illIlIi1 = {};
    illIlIi1.size = I1i1Il1I;
    illIlIi1.num = ilI1llll;
    var IlIIliIl = this._makeRandomStr(illIlIi1.size, illIlIi1.num) + lIl1I1l + this._makeRandomStr(liiIIIi - I1i1Il1I, ilI1llll) + I1i1Il1I,
      IIIil1lI = IlIIliIl.split(""),
      i1ii11lI = IIIil1lI.slice(0, iii1llIi),
      lI1illI = IIIil1lI.slice(iii1llIi),
      iI1I11I = [];
    while (i1ii11lI.length > 0) {
      iI1I11I.push((35 - parseInt(i1ii11lI.pop(), 36)).toString(36));
    }
    iI1I11I = iI1I11I.concat(lI1illI);
    return iI1I11I.join("");
  }
}
class H5stJSDOM {
  constructor() {
    this.jsdom = require("jsdom");
    this.domWindow3_1 = null;
    this.domWindow3_1_UA = null;
    this.domWindow4_1 = null;
    this.domWindow4_1_UA = null;
    this.domWindow4_2 = null;
    this.domWindow4_2_UA = null;
    this.domWindow4_3 = null;
    this.domWindow4_3_UA = null;
    this.domWindow4_4 = null;
    this.domWindow4_4_UA = null;
    this.domWindow4_7 = null;
    this.domWindow4_7_UA = null;
    this._latestAppVersionData = {
      "build": "169370",
      "version": "13.1.0"
    };
    this._latestIOSVersion = "17.5";
    this._useAlgoTokenCache = true;
    this._H47 = new _H5ST4_7();
  }
  async ["_sleep"](i1llI1I1) {
    return new Promise((lIi11ii1, IiIIiiIl) => {
      setTimeout(() => {
        lIi11ii1(i1llI1I1);
      }, i1llI1I1);
    });
  }
  async ["_loadH5Sdk"](ilI1iil, il1ii11) {
    const {
      JSDOM: liiiiiIi
    } = this.jsdom;
    let iilIl1ii = new this.jsdom.ResourceLoader({
        "userAgent": il1ii11
      }),
      I1III1l1 = new this.jsdom.VirtualConsole(),
      llIiIl11 = {
        "url": "http://localhost",
        "userAgent": il1ii11,
        "runScripts": "dangerously",
        "resources": iilIl1ii,
        "includeNodeLocations": true,
        "storageQuota": 1000000000,
        "pretendToBeVisual": true,
        "virtualConsole": I1III1l1
      },
      iI11iliI = "";
    switch (ilI1iil) {
      case "3.1":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_1.js", "utf-8") + "</script>";
        break;
      case "4.1":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_2.js", "utf-8") + "</script>";
        break;
      case "4.2":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_3.js", "utf-8") + "</script>";
        break;
      case "4.3":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_4.js", "utf-8") + "</script>";
        break;
      case "4.4":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_5.js", "utf-8") + "</script>";
        break;
      case "4.7":
        iI11iliI = "<script>" + fs.readFileSync(__dirname + "/assets/index_6.js", "utf-8") + "</script>";
        break;
    }
    const iI1i11I1 = new liiiiiIi("<body>\n    " + iI11iliI + "\n</body>", llIiIl11);
    do {
      await this._sleep(100);
    } while (!iI1i11I1.window.ParamsSign);
    switch (ilI1iil) {
      case "3.1":
        this.domWindow3_1 = iI1i11I1.window;
        break;
      case "4.1":
        this.domWindow4_1 = iI1i11I1.window;
        break;
      case "4.2":
        this.domWindow4_2 = iI1i11I1.window;
        break;
      case "4.3":
        this.domWindow4_3 = iI1i11I1.window;
        break;
      case "4.4":
        this.domWindow4_4 = iI1i11I1.window;
        break;
      case "4.7":
        this.domWindow4_7 = iI1i11I1.window;
        break;
    }
  }
  async ["_signWaap"](lI1lIlii, I1IIIl1I, l1lIliI) {
    const lI1IIIil = new l1lIliI.ParamsSign({
      "appId": lI1lIlii,
      "preRequest": false,
      "debug": false,
      "onSign"({
        code: IIli11l1,
        message: i1i1llI,
        data: lIIli
      }) {},
      "onRequestTokenRemotely"({
        code: i1I1i,
        message: l1iIIlIi
      }) {},
      "onRequestToken"({
        code: IiIlI11I,
        message: lIIlIii
      }) {}
    });
    let ii1l1il = {
      "appid": I1IIIl1I.appid,
      "body": CryptoJS.SHA256(JSON.stringify(I1IIIl1I.body)).toString(),
      "client": I1IIIl1I.client || "",
      "clientVersion": I1IIIl1I.clientVersion || "",
      "functionId": I1IIIl1I.functionId
    };
    for (const Il1ii11l of ["client", "clientVersion"]) {
      !I1IIIl1I[Il1ii11l] && delete ii1l1il[Il1ii11l];
    }
    I1IIIl1I?.["t"] && (ii1l1il.t = I1IIIl1I.t);
    let III11l1I = await lI1IIIil.sign(ii1l1il);
    (!III11l1I?.["h5st"] || III11l1I.h5st === "null") && (console.log("❌ getH5st 签名生成失败"), III11l1I.h5st = "");
    return III11l1I?.["h5st"] || "";
  }
  async ["getH5st"](iiIi11l1) {
    let illIIl1 = Object.assign({}, iiIi11l1, {
      "h5st": "",
      "params": "",
      "paramsData": {}
    });
    try {
      if (!(typeof iiIi11l1 === "object" && iiIi11l1 !== null)) {
        console.log("❌ getH5st 传入参数有误");
        return illIIl1;
      } else {
        {
          const li11I1Ii = ["appId", "appid", "body", "functionId"],
            illiI1I1 = li11I1Ii.filter(ii1ilill => !iiIi11l1[ii1ilill]);
          if (illiI1I1.length > 0) {
            console.log("❌ getH5st 传入参数有误，缺少必要参数：" + illiI1I1.join(", "));
            return illIIl1;
          }
        }
      }
      switch (iiIi11l1?.["version"]) {
        case "3.1":
        case "4.1":
        case "4.2":
        case "4.3":
        case "4.4":
        case "4.7":
          break;
        default:
          iiIi11l1.version = "4.7";
          break;
      }
      if (iiIi11l1.version === "4.7") return this._H47._useAlgoTokenCache = this._useAlgoTokenCache, await this._H47.getH5st(iiIi11l1);
      const {
          appId: l11iIll1,
          appid: lIIIil11,
          body: IIIII1,
          client: l11I11I,
          clientVersion: I11IIIi1,
          functionId: Ili1i1lI,
          version: i11II1l
        } = iiIi11l1,
        I1l1111 = this._genUA(),
        iliIIli = iiIi11l1?.["ua"] || I1l1111,
        ilIIli1i = "domWindow" + i11II1l.replace(".", "_"),
        lillI1l1 = ilIIli1i + "_UA";
      (!this[ilIIli1i] || this[lillI1l1] && this[lillI1l1] !== iliIIli) && (await this._loadH5Sdk(i11II1l, iliIIli), this[lillI1l1] = iliIIli);
      const I111I11i = {
        "appid": lIIIil11,
        "body": IIIII1,
        "client": l11I11I,
        "clientVersion": I11IIIi1,
        "functionId": Ili1i1lI
      };
      iiIi11l1?.["t"] && typeof iiIi11l1.t === "boolean" ? (iiIi11l1.t = Date.now(), I111I11i.t = iiIi11l1.t) : iiIi11l1.t = "";
      if (!I111I11i.client) delete I111I11i.client;
      if (!I111I11i.clientVersion) delete I111I11i.clientVersion;
      const I1ii11l1 = await this._signWaap(l11iIll1, I111I11i, this[ilIIli1i]),
        iiilIiil = {
          "functionId": Ili1i1lI,
          "body": JSON.stringify(IIIII1),
          "t": "",
          "appid": lIIIil11,
          "client": "",
          "clientVersion": "",
          "h5st": I1ii11l1 || ""
        };
      for (const ll11li1l of ["t", "client", "clientVersion"]) {
        iiIi11l1[ll11li1l] ? iiilIiil[ll11li1l] = iiIi11l1[ll11li1l] : delete iiilIiil[ll11li1l];
      }
      Object.assign(illIIl1, {
        "h5st": I1ii11l1 || "",
        "params": querystring.stringify(iiilIiil),
        "paramsData": iiilIiil
      });
      return illIIl1;
    } catch (lI1IIllI) {
      console.log("❌ getH5st 遇到了错误 " + (lI1IIllI.message || lI1IIllI));
    }
    return illIIl1;
  }
  ["_genUA"]() {
    function I1ilIili(l11I11l = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", i11Iiiil = "0123456789abcdef") {
      let I1Ili11 = "";
      for (let liilIlIl of l11I11l) {
        if (liilIlIl == "x") I1Ili11 += i11Iiiil.charAt(Math.floor(Math.random() * i11Iiiil.length));else liilIlIl == "X" ? I1Ili11 += i11Iiiil.charAt(Math.floor(Math.random() * i11Iiiil.length)).toUpperCase() : I1Ili11 += liilIlIl;
      }
      return I1Ili11;
    }
    const iIII1Iii = I1ilIili(),
      iilI1iII = ["jdapp", "iPhone", this._latestAppVersionData.version, "", "rn/" + iIII1Iii, "M/5.0", "appBuild/" + this._latestAppVersionData.build, "jdSupportDarkMode/0", "ef/1", "ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Math.floor(Date.now() / 1000) + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D", "Mozilla/5.0 (iPhone; CPU iPhone OS " + this._latestIOSVersion.replace(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      l11111l1 = iilI1iII.join(";");
    return l11111l1;
  }
}
const HASH = function () {
  function l1III1(llI1111, IIiiiIII) {
    {
      llI1111 = [llI1111[0] >>> 16, 65535 & llI1111[0], llI1111[1] >>> 16, 65535 & llI1111[1]];
      IIiiiIII = [IIiiiIII[0] >>> 16, 65535 & IIiiiIII[0], IIiiiIII[1] >>> 16, 65535 & IIiiiIII[1]];
      var i1ililli = [0, 0, 0, 0];
      i1ililli[3] += llI1111[3] + IIiiiIII[3];
      i1ililli[2] += i1ililli[3] >>> 16;
      i1ililli[3] &= 65535;
      i1ililli[2] += llI1111[2] + IIiiiIII[2];
      i1ililli[1] += i1ililli[2] >>> 16;
      i1ililli[2] &= 65535;
      i1ililli[1] += llI1111[1] + IIiiiIII[1];
      i1ililli[0] += i1ililli[1] >>> 16;
      i1ililli[1] &= 65535;
      i1ililli[0] += llI1111[0] + IIiiiIII[0];
      i1ililli[0] &= 65535;
      return [i1ililli[0] << 16 | i1ililli[1], i1ililli[2] << 16 | i1ililli[3]];
    }
  }
  function IIiI111I(I1IliIiI, lillliI) {
    I1IliIiI = [I1IliIiI[0] >>> 16, 65535 & I1IliIiI[0], I1IliIiI[1] >>> 16, 65535 & I1IliIiI[1]];
    lillliI = [lillliI[0] >>> 16, 65535 & lillliI[0], lillliI[1] >>> 16, 65535 & lillliI[1]];
    var lIi1I1ll = [0, 0, 0, 0];
    lIi1I1ll[3] += I1IliIiI[3] * lillliI[3];
    lIi1I1ll[2] += lIi1I1ll[3] >>> 16;
    lIi1I1ll[3] &= 65535;
    lIi1I1ll[2] += I1IliIiI[2] * lillliI[3];
    lIi1I1ll[1] += lIi1I1ll[2] >>> 16;
    lIi1I1ll[2] &= 65535;
    lIi1I1ll[2] += I1IliIiI[3] * lillliI[2];
    lIi1I1ll[1] += lIi1I1ll[2] >>> 16;
    lIi1I1ll[2] &= 65535;
    lIi1I1ll[1] += I1IliIiI[1] * lillliI[3];
    lIi1I1ll[0] += lIi1I1ll[1] >>> 16;
    lIi1I1ll[1] &= 65535;
    lIi1I1ll[1] += I1IliIiI[2] * lillliI[2];
    lIi1I1ll[0] += lIi1I1ll[1] >>> 16;
    lIi1I1ll[1] &= 65535;
    lIi1I1ll[1] += I1IliIiI[3] * lillliI[1];
    lIi1I1ll[0] += lIi1I1ll[1] >>> 16;
    lIi1I1ll[1] &= 65535;
    lIi1I1ll[0] += I1IliIiI[0] * lillliI[3] + I1IliIiI[1] * lillliI[2] + I1IliIiI[2] * lillliI[1] + I1IliIiI[3] * lillliI[0];
    lIi1I1ll[0] &= 65535;
    return [lIi1I1ll[0] << 16 | lIi1I1ll[1], lIi1I1ll[2] << 16 | lIi1I1ll[3]];
  }
  function iliI1IiI(l1lliiI1, l1IIlIil) {
    return 32 === (l1IIlIil %= 64) ? [l1lliiI1[1], l1lliiI1[0]] : l1IIlIil < 32 ? [l1lliiI1[0] << l1IIlIil | l1lliiI1[1] >>> 32 - l1IIlIil, l1lliiI1[1] << l1IIlIil | l1lliiI1[0] >>> 32 - l1IIlIil] : [l1lliiI1[1] << (l1IIlIil -= 32) | l1lliiI1[0] >>> 32 - l1IIlIil, l1lliiI1[0] << l1IIlIil | l1lliiI1[1] >>> 32 - l1IIlIil];
  }
  function I1i1l11l(il1iIll1, l11i11i) {
    return 0 === (l11i11i %= 64) ? il1iIll1 : l11i11i < 32 ? [il1iIll1[0] << l11i11i | il1iIll1[1] >>> 32 - l11i11i, il1iIll1[1] << l11i11i] : [il1iIll1[1] << l11i11i - 32, 0];
  }
  function Ili1i1I1(I1illlii, II111l1l) {
    return [I1illlii[0] ^ II111l1l[0], I1illlii[1] ^ II111l1l[1]];
  }
  function II1iilil(l1llil1l) {
    l1llil1l = Ili1i1I1(l1llil1l, [0, l1llil1l[0] >>> 1]);
    l1llil1l = Ili1i1I1(l1llil1l = IIiI111I(l1llil1l, [4283543511, 3981806797]), [0, l1llil1l[0] >>> 1]);
    return Ili1i1I1(l1llil1l = IIiI111I(l1llil1l, [3301882366, 444984403]), [0, l1llil1l[0] >>> 1]);
  }
  return {
    "hash128": function (iIlIIlII, lilli1I) {
      {
        for (var IiII11l1, l111Iili, II1lliiI = lilli1I || 0, il11IIiI = (lilli1I = (iIlIIlII = iIlIIlII || "").length % 16, iIlIIlII.length - lilli1I), I11iiill = [0, II1lliiI], II1lliiI = [0, II1lliiI], iiII1Il = [2277735313, 289559509], l1II1III = [1291169091, 658871167], ll11ll11 = 0; ll11ll11 < il11IIiI; ll11ll11 += 16) IiII11l1 = [255 & iIlIIlII.charCodeAt(ll11ll11 + 4) | (255 & iIlIIlII.charCodeAt(ll11ll11 + 5)) << 8 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 6)) << 16 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 7)) << 24, 255 & iIlIIlII.charCodeAt(ll11ll11) | (255 & iIlIIlII.charCodeAt(ll11ll11 + 1)) << 8 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 2)) << 16 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 3)) << 24], l111Iili = [255 & iIlIIlII.charCodeAt(ll11ll11 + 12) | (255 & iIlIIlII.charCodeAt(ll11ll11 + 13)) << 8 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 14)) << 16 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 15)) << 24, 255 & iIlIIlII.charCodeAt(ll11ll11 + 8) | (255 & iIlIIlII.charCodeAt(ll11ll11 + 9)) << 8 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 10)) << 16 | (255 & iIlIIlII.charCodeAt(ll11ll11 + 11)) << 24], IiII11l1 = iliI1IiI(IiII11l1 = IIiI111I(IiII11l1, iiII1Il), 31), I11iiill = l1III1(I11iiill = iliI1IiI(I11iiill = Ili1i1I1(I11iiill, IiII11l1 = IIiI111I(IiII11l1, l1II1III)), 27), II1lliiI), I11iiill = l1III1(IIiI111I(I11iiill, [0, 5]), [0, 1390208809]), l111Iili = iliI1IiI(l111Iili = IIiI111I(l111Iili, l1II1III), 33), II1lliiI = l1III1(II1lliiI = iliI1IiI(II1lliiI = Ili1i1I1(II1lliiI, l111Iili = IIiI111I(l111Iili, iiII1Il)), 31), I11iiill), II1lliiI = l1III1(IIiI111I(II1lliiI, [0, 5]), [0, 944331445]);
        switch (IiII11l1 = [0, 0], l111Iili = [0, 0], lilli1I) {
          case 15:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 14)], 48));
          case 14:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 13)], 40));
          case 13:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 12)], 32));
          case 12:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 11)], 24));
          case 11:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 10)], 16));
          case 10:
            l111Iili = Ili1i1I1(l111Iili, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 9)], 8));
          case 9:
            l111Iili = IIiI111I(l111Iili = Ili1i1I1(l111Iili, [0, iIlIIlII.charCodeAt(ll11ll11 + 8)]), l1II1III);
            II1lliiI = Ili1i1I1(II1lliiI, l111Iili = IIiI111I(l111Iili = iliI1IiI(l111Iili, 33), iiII1Il));
          case 8:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 7)], 56));
          case 7:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 6)], 48));
          case 6:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 5)], 40));
          case 5:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 4)], 32));
          case 4:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 3)], 24));
          case 3:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 2)], 16));
          case 2:
            IiII11l1 = Ili1i1I1(IiII11l1, I1i1l11l([0, iIlIIlII.charCodeAt(ll11ll11 + 1)], 8));
          case 1:
            IiII11l1 = IIiI111I(IiII11l1 = Ili1i1I1(IiII11l1, [0, iIlIIlII.charCodeAt(ll11ll11)]), iiII1Il);
            I11iiill = Ili1i1I1(I11iiill, IiII11l1 = IIiI111I(IiII11l1 = iliI1IiI(IiII11l1, 31), l1II1III));
        }
        I11iiill = l1III1(I11iiill = Ili1i1I1(I11iiill, [0, iIlIIlII.length]), II1lliiI = Ili1i1I1(II1lliiI, [0, iIlIIlII.length]));
        II1lliiI = l1III1(II1lliiI, I11iiill);
        I11iiill = l1III1(I11iiill = II1iilil(I11iiill), II1lliiI = II1iilil(II1lliiI));
        II1lliiI = l1III1(II1lliiI, I11iiill);
        return ("00000000" + (I11iiill[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (I11iiill[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (II1lliiI[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (II1lliiI[1] >>> 0).toString(16)).slice(-8);
      }
    }
  };
}();
module.exports = {
  "wuxianDefense": wuxianDefense,
  "jsTk": jsTk,
  "getJdEnvInfo": getJdEnvInfo,
  "H5st": new H5stJSDOM()
};