import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);
mock.onGet(/^http/).passThrough();
export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
const resulVO: ResultVO = {
  code: 200,
  data: {},
};
mock.onPost("/api/login").reply((c) => {
  // 获取请求数据
  // 此时请求的js对象已转为json字符串。因此需要转换回JS对象
  const data = c.data;
  const { number, password } = JSON.parse(data);
  if (number == "sadmin" && password == "123456") {
    resulVO.code = 200;
    resulVO.data = {
      role: "243945a3ce",
      id: "1123456789012345678",
      name: "xiaoming",
      number: "12345",
    };
    resulVO.message = "";
    return [
      200,
      resulVO,
      {
        authorization:
          "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6",
      },
    ];
  }
  resulVO.code = 401;
  resulVO.message = "用户名密码错误";
  return [200, resulVO];
});
