import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    username: string;
    password: string;
    captcha?: string;
    captchaKey?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  export interface RefreshTokenResult {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  /** 用户信息返回值 */
  export interface UserInfoResult {
    userId: string;
    username: string;
    nickname: string;
    avatar?: string;
    email?: string;
    phone?: string;
    sex: number;
    deptId?: string;
    positionId?: string;
    status: number;
    roles: string[];
    permCodes: string[];
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi(refreshToken: string) {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', null, {
    params: { refreshToken },
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout');
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<AuthApi.UserInfoResult>('/auth/user-info');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  const userInfo = await getUserInfoApi();
  return userInfo.permCodes;
}

/**
 * 生成验证码
 */
export async function getCaptchaApi(captchaKey: string) {
  return requestClient.get<string>('/auth/captcha', {
    params: { captchaKey },
  });
}
