export const enum RESPONSE_CODE {
  ERROR = 500, // 请求响应失败code码
  SUCCESS = 200, // 请求响应成功code码
  TOKEN_EXPIRED = 401, // 授权失败
  EXIST = 10001, // 已存在
  LOGIN_ERROR = 10002, // 用户名或密码错误
  PASSWORK_INCONFORMITY = 10003, // 密码与确认密码不一致
}

export const PRIVATE_KEY = 'jackchen'; // 自定义jwt加密的私钥

export const JWT_EXPIRED: number = 60 * 60 * 1; // 过期时间24小时
