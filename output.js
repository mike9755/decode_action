//Sun Sep 22 2024 07:28:25 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const {
  H5st
} = require("./jdCrypto");
async function getH5st(iIiIl1i1, iIIIi111, Il1l1ili = "3.1") {
  const l11lilI = Object.assign({
      "appId": iIiIl1i1,
      "version": Il1l1ili
    }, iIIIi111),
    l1lllil1 = await H5st.getH5st(l11lilI);
  return l1lllil1?.["h5st"];
}
module.exports = getH5st;