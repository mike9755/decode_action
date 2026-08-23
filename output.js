//Sun Aug 23 2026 16:00:13 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
$.version = "v1.0.0";
console.log("当前版本:" + $.version + ",依赖版本:" + $.superVersion);
$.logic = async function () {
  if (!$.superVersion) throw new Error("请更新脚本");
  let I1liiiII = "https://api.m.jd.com/client.action?functionId=rights_receiveJdBean_v1",
    liilil = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://plus.m.jd.com",
      "Host": "api.m.jd.com",
      "x-rp-client": "api.m.jd.com",
      "x-referer-page": "https://plus.m.jd.com/index",
      "Connection": "keep-alive",
      "Accept": "application/json, text/plain, */*",
      "Cookie": "__jd_ref_cls=MPlusNew_AthenaFormal2021PayBean;" + $.cookie,
      "User-Agent": $.ua()
    },
    lIliI11 = "appid=plus_business&loginType=2&loginWQBiz=&body=%7B%7D&h5st=20230811085831358%3B9ign3tz5m69g9ih4%3Bb63ff%3Btk03wa8ef1bf618nXlqPsiYy4GKROy-qX3N5wZjkQ5sP0H75kLKYM_Sr6MwMAzu91Nssxvt7362sCkEQ85peaV_kqJ6S%3B7b5042445b2ed9f19588eee78800106d%3B4.1%3B1691715511358%3B5f7a486ba29fbc5d176654e46394ec5e0bd88693c61e67c8c7fe08d7d4a9d6560dd3036b2d67e71b2f856b240e9736bebef1593a4f99f4c6306f7dd5bab977302e931af5c7d10cadf238431715290f3621aeb7a73594ca529feb15cca8857e74c8059bbeda8f74c6aee7da433829defa9e8d96cb6ccb327468d2f9219b2dd42b4ddb341e0c175924b89a9b77f184f6b8ed202ffc5beffa79d62604460ac6bcb1037144c075e97386f143a49f10c7f01348efe8be865da679474ea90cbff0a8c0ec14ec7bc0fae5d57051772de89508f3df7c6b16d6b3c9e3b61acb0c0f8ea8ffdb08e140c7180cd99957354c4c1b0256a11e52db14fdb2fdb35ab358cb44f83c&x-api-eid-token=/jgUPz6uymy50MQJU4x91hVCA0JH/1qvHEvp5iwAdkKwMxMdIBzftHFhGWutazZjX5zUZrlMmmJ7altpr%2BLxHYdpf7ABFCzOgjsD97KCIb5Iyjjp%2BGvYWAReiQE7KVxnAtQe/hBobYbZOPMn2mlhl6i778nqrXnJ7KqEch1zV8Dgx4ziuvaV8ugIxz5WNnhruRzp9g%3D%3D",
    {
      data: IiliilIi
    } = await $.request(I1liiiII, liilil, lIliI11);
  console.log(IiliilIi);
  IiliilIi?.["rs"]?.["receiveAmount"] && $.putMsg(IiliilIi?.["rs"]?.["receiveAmount"] + "京豆");
};