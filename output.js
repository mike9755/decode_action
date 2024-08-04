//Sun Aug 04 2024 05:47:14 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
class Notification {
  constructor() {
    this.title = "";
    this.content = "";
    this._sendNotify = require("../sendNotify").sendNotify;
    this._accountsArray = [];
    this._messageSeparator = "";
    this._messageMatchKeywords = [];
    this._messageFilterKeywords = [];
    this._messageClearKeywords = [];
    this._showUserName = true;
    this._userNameMasking = false;
    this._nicknames = {};
    this._prefixFormat = "";
    this._defaultPrefixFormat = "【京东账号%】@：";
    this._autoMergeType = "";
    this._initConfig();
  }
  _initConfig() {
    process.env.JD_NOTIFY_MATCH_KEYWORDS && (this._messageMatchKeywords = process.env.JD_NOTIFY_MATCH_KEYWORDS.split("@").map(_0x176f44 => _0x176f44.trim()).filter(Boolean));
    process.env.JD_NOTIFY_FILTER_KEYWORDS && (this._messageFilterKeywords = process.env.JD_NOTIFY_FILTER_KEYWORDS.split("@").map(_0x347e7f => _0x347e7f.trim()).filter(Boolean));
    process.env.JD_NOTIFY_CLEAR_KEYWORDS && (this._messageClearKeywords = process.env.JD_NOTIFY_CLEAR_KEYWORDS.split("|").filter(Boolean));
    this._messageSeparator = process.env.JD_NOTIFY_SEPARATOR || process.env.JD_NOTIFY_DELIMITER || "，";
    if (process.env.JD_NOTIFY_NICKNAMES) {
      const _0x2b674f = process.env.JD_NOTIFY_NICKNAMES.split(",");
      _0x2b674f.forEach(_0x423fb => {
        let _0xa88d03 = _0x423fb.split("@");
        _0xa88d03.length === 2 && _0xa88d03[0] && _0xa88d03[1] && (this._nicknames[_0xa88d03[0]] = _0xa88d03[1]);
      });
    }
    this._showUserName = !(process.env.JD_NOTIFY_SHOW_USERNAME === "false");
    this._userNameMasking = (process.env.JD_NOTIFY_USERNAME_MASKING || process.env.JD_NOTIFY_USERNAME_DESENSITIZATION) === "true";
    this._prefixFormat = process.env.JD_NOTIFY_PREFIX_FORMAT || process.env.JD_NOTIFY_PREFIX_FORMATA || this._defaultPrefixFormat;
    process.env.JD_NOTIFY_AUTO_MERGE_TYPE && (this._autoMergeType = process.env.JD_NOTIFY_AUTO_MERGE_TYPE);
  }
  config({
    title: _0x19ab71,
    content: _0x4e3ea4,
    messageSeparator: _0x3a05ac
  }) {
    _0x19ab71 !== undefined && (this.title = _0x19ab71);
    _0x4e3ea4 !== undefined && (this.content = _0x4e3ea4);
    _0x3a05ac !== undefined && (this._messageSeparator = _0x3a05ac);
  }
  setTitle(_0x18f0b3) {
    this.title = _0x18f0b3;
  }
  unsetTitle() {
    this.title = "";
  }
  getTitle() {
    return this.title;
  }
  setContent(_0x3b621a) {
    this.content = _0x3b621a;
  }
  appendContent(_0x453517) {
    this.content += _0x453517;
  }
  clearContent() {
    this.content = "";
  }
  getContent() {
    return this.content;
  }
  updateContent(_0x3152b6) {
    this.content = _0x3152b6;
  }
  create(_0xe54139, _0x3827fa) {
    const _0x478e29 = this._messageMatchKeywords,
      _0x39c8c0 = this._messageFilterKeywords,
      _0x477698 = this._messageClearKeywords,
      _0xd87c95 = this._prefixFormat,
      _0x54f7da = this._nicknames;
    _0xe54139 === undefined && (_0xe54139 = "");
    const _0x3e1efa = {
      index: "" + _0xe54139,
      userName: _0x3827fa,
      fixed: false,
      messages: [],
      originMessages: [],
      insert(_0x48de84) {
        if (!_0x48de84) {
          return;
        }
        if (_0x3e1efa.fixed) {
          return;
        }
        _0x3e1efa.originMessages.push(_0x48de84.trim());
        if (_0x478e29.length > 0 && !_0x478e29.some(_0x48adf3 => _0x48de84.includes(_0x48adf3))) {
          return;
        } else {
          if (_0x39c8c0.length > 0 && _0x39c8c0.some(_0x459a5a => _0x48de84.includes(_0x459a5a))) {
            return;
          }
        }
        _0x477698.length > 0 && _0x477698.forEach(_0x55d659 => {
          _0x48de84 = _0x48de84.replace(new RegExp(_0x55d659, "g"), "");
        });
        _0x3e1efa.messages.push(_0x48de84.trim());
      },
      fix(_0x508d23) {
        if (!_0x508d23) {
          return;
        }
        _0x3e1efa.fixed = true;
        _0x3e1efa.originMessages = [_0x508d23.trim()];
        if (_0x478e29.length > 0 && !_0x478e29.some(_0x150dc7 => _0x508d23.includes(_0x150dc7))) {
          return;
        } else {
          if (_0x39c8c0.length > 0 && _0x39c8c0.some(_0x1ca76f => _0x508d23.includes(_0x1ca76f))) {
            return;
          }
        }
        _0x477698.length > 0 && _0x477698.forEach(_0x5c9b17 => {
          _0x508d23 = _0x508d23.replace(new RegExp(_0x5c9b17, "g"), "");
        });
        _0x3e1efa.messages = [_0x508d23.trim()];
      },
      updateIndex(_0x72b83a) {
        _0x3e1efa.index = "" + _0x72b83a;
      },
      updateUsername(_0x5cd5af) {
        _0x3e1efa.userName = _0x5cd5af;
      },
      getInlineContent() {
        let _0x5c61bf = this.originMessages.join(this._messageSeparator).trim();
        this._autoMergeType && (_0x5c61bf = this._mergeMessages(_0x5c61bf, this._autoMergeType));
        const _0x16affc = decodeURIComponent(_0x54f7da[this.userName] || this.userName),
          _0xe414ea = _0xd87c95.replace(/%/g, this.index).replace(/@/g, _0x16affc);
        return "" + _0xe414ea + (_0x5c61bf || "无");
      }
    };
    this._accountsArray.push(_0x3e1efa);
    return _0x3e1efa;
  }
  dispose(_0x55f401) {
    this._accountsArray = this._accountsArray.filter(_0x169e93 => _0x169e93 !== _0x55f401);
  }
  disposeByUsername(_0xdc52c9) {
    const _0x4e2e0f = this._accountsArray.find(_0x54ff48 => decodeURIComponent(_0x54ff48.userName) === decodeURIComponent(_0xdc52c9));
    _0x4e2e0f && this.dispose(_0x4e2e0f);
  }
  disposeByIndex(_0x23fdf5) {
    const _0x844313 = this._accountsArray.find(_0x400664 => _0x400664.index === "" + _0x23fdf5);
    _0x844313 && this.dispose(_0x844313);
  }
  disposeAllMessage() {
    this._accountsArray = [];
  }
  getMessage(_0x40691d = false) {
    if (this._accountsArray.length === 0) {
      return "";
    }
    this._formatAcountsMessage();
    if (this._accountsArray.length === 0) {
      return "";
    }
    let _0x1144d5 = [];
    const _0x22f6d4 = this._userNameMasking,
      _0x148c02 = this._showUserName,
      _0xae1302 = !_0x148c02 && this._prefixFormat === this._defaultPrefixFormat ? this._prefixFormat.replace(/：$/, "") : this._prefixFormat;
    for (const {
      userName: _0x1fd323,
      index: _0x5dade7,
      messages: _0x1a4c27
    } of this._accountsArray) {
      let _0x1eaaae = "";
      if (_0x148c02) {
        const _0x43b74d = decodeURIComponent(this._nicknames[_0x1fd323] || _0x1fd323);
        _0x22f6d4 && _0x40691d ? _0x1eaaae = this._desensitizingUserName(_0x43b74d) : _0x1eaaae = _0x43b74d;
      }
      const _0x4f2ccf = _0xae1302.replace(/%/g, _0x5dade7).replace(/@/g, _0x1eaaae),
        _0x183452 = _0x1a4c27.join(this._messageSeparator).trim();
      _0x1144d5.push("" + _0x4f2ccf + _0x183452);
    }
    return _0x1144d5.join("\n").trim();
  }
  reset() {
    this.unsetTitle();
    this.clearContent();
    this.disposeAllMessage();
  }
  async send(_0x4a3bea, _0x14a277) {
    await this._sendNotify(_0x4a3bea, _0x14a277);
  }
  async sendNotify(_0x2cd4aa, _0x3478a) {
    await this.send(_0x2cd4aa, _0x3478a);
  }
  async push() {
    let _0x475c98 = this.content.trim();
    const _0x540ee6 = this.getMessage(true);
    if (_0x540ee6) {
      _0x475c98 = _0x540ee6.trim() + "\n\n" + _0x475c98;
    }
    await this.send(this.title, _0x475c98);
  }
  _mergeMessages(_0x506d09, _0x3e8e70) {
    try {
      function _0x1b3a22(_0x469caf) {
        const _0x3c6e8e = _0x469caf.match(/(\d+)(.+)/);
        return _0x3c6e8e ? {
          count: parseInt(_0x3c6e8e[1]),
          name: _0x3c6e8e[2].trim()
        } : {
          count: null,
          name: _0x469caf
        };
      }
      function _0x13cef1(_0x1a8e3e, _0x11128a, _0x42df67) {
        return _0x11128a !== null && _0x42df67.split("@").includes(_0x1a8e3e);
      }
      for (let _0x156165 = 0; _0x156165 < _0x506d09.length; _0x156165++) {
        const {
          count: _0x235a4b,
          name: _0x10f10b
        } = _0x1b3a22(_0x506d09[_0x156165]);
        if (_0x13cef1(_0x10f10b, _0x235a4b, _0x3e8e70)) {
          for (let _0x4460ec = _0x156165 + 1; _0x4460ec < _0x506d09.length; _0x4460ec++) {
            const {
              count: _0x342008,
              name: _0x46e13d
            } = _0x1b3a22(_0x506d09[_0x4460ec]);
            _0x10f10b === _0x46e13d && (_0x506d09[_0x156165] = "" + (_0x235a4b + _0x342008) + _0x10f10b, _0x506d09.splice(_0x4460ec, 1), _0x4460ec--);
          }
        }
      }
      return _0x506d09;
    } catch {
      return _0x506d09;
    }
  }
  _desensitizingUserName(_0x512fb3) {
    let _0x26106a = "";
    if (_0x512fb3.length < 5) {
      switch (_0x512fb3.length) {
        case 1:
          _0x26106a = _0x512fb3;
          break;
        case 2:
          _0x26106a = _0x512fb3.slice(0, 1) + "*";
          break;
        case 3:
          _0x26106a = _0x512fb3.slice(0, 1) + "*" + _0x512fb3.slice(-1);
          break;
        case 4:
          _0x26106a = _0x512fb3.slice(0, 2) + "**";
          break;
      }
    } else {
      _0x26106a = _0x512fb3.slice(0, 2) + "*".repeat(_0x512fb3.length - 4) + _0x512fb3.slice(-2);
    }
    return _0x26106a;
  }
  _formatAcountsMessage() {
    let _0x49a7c5 = [];
    for (let {
      userName: _0x1b7cad,
      index: _0x282e65,
      messages: _0x401d57
    } of this._accountsArray) {
      _0x401d57 = _0x401d57.filter(_0x11ba94 => _0x11ba94 !== null && _0x11ba94 !== undefined && _0x11ba94 !== "");
      const _0x28f557 = _0x49a7c5.find(_0x2a7086 => _0x2a7086.userName === _0x1b7cad);
      _0x28f557 ? (_0x28f557.index === "" && (_0x28f557.index = _0x282e65), _0x401d57.length > 0 && _0x28f557.messages.push(..._0x401d57)) : _0x49a7c5.push({
        userName: _0x1b7cad,
        index: _0x282e65,
        messages: _0x401d57
      });
    }
    _0x49a7c5 = _0x49a7c5.filter(_0x24dcb1 => _0x24dcb1.messages.length > 0);
    this._autoMergeType && _0x49a7c5.forEach(_0x12179d => {
      _0x12179d.messages = this._mergeMessages(_0x12179d.messages, this._autoMergeType);
    });
    this._accountsArray = _0x49a7c5;
  }
}
module.exports = new Notification();