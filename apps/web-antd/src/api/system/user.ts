import { requestClient } from '#/api/request';

export namespace UserApi {
  /** 用户查询参数 */
  export interface UserQueryParams {
    pageNo: number;
    pageSize: number;
    username?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    status?: number;
    deptId?: number;
    positionId?: number;
  }

  /** 用户创建参数 */
  export interface UserCreateParams {
    username: string;
    password: string;
    nickname: string;
    email?: string;
    phone?: string;
    sex?: number;
    deptId?: number;
    positionId?: number;
    roleIds: number[];
  }

  /** 用户更新参数 */
  export interface UserUpdateParams {
    id: number;
    username?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    sex?: number;
    deptId?: number;
    positionId?: number;
    roleIds?: number[];
  }

  /** 用户信息 */
  export interface UserInfo {
    id: string;
    username: string;
    nickname: string;
    avatar?: string;
    email?: string;
    phone?: string;
    sex: number;
    deptId?: string;
    positionId?: string;
    status: number;
    lastLoginTime?: string;
    lastLoginIp?: string;
    createTime: string;
    updateTime: string;
    roles?: RoleInfo[];
  }

  /** 角色信息 */
  export interface RoleInfo {
    id: string;
    roleCode: string;
    roleName: string;
    description?: string;
    orderNum: number;
    status: number;
    createTime: string;
  }

  /** 部门信息 */
  export interface DeptInfo {
    id: string;
    parentId: string;
    name: string;
    code?: string;
    orderNum: number;
    leader?: string;
    phone?: string;
    email?: string;
    status: number;
  }

  /** 职位信息 */
  export interface PositionInfo {
    id: string;
    name: string;
    code?: string;
    orderNum: number;
    status: number;
  }
}

/**
 * 分页查询用户
 */
export function getUserPageApi(params: UserApi.UserQueryParams) {
  return requestClient.get<{
    records: UserApi.UserInfo[];
    total: number;
    current: number;
    size: number;
    pages: number;
  }>('/user/list', { params });
}

/**
 * 获取用户详情
 */
export function getUserDetailApi(id: number) {
  return requestClient.get<UserApi.UserInfo>(`/user/${id}`);
}

/**
 * 创建用户
 */
export function createUserApi(params: UserApi.UserCreateParams) {
  return requestClient.post<number>('/user', params);
}

/**
 * 更新用户
 */
export function updateUserApi(params: UserApi.UserUpdateParams) {
  return requestClient.put<boolean>('/user', params);
}

/**
 * 删除用户
 */
export function deleteUserApi(id: number) {
  return requestClient.delete<boolean>(`/user/${id}`);
}

/**
 * 批量删除用户
 */
export function deleteUsersApi(ids: number[]) {
  return requestClient.delete<boolean>('/user/batch', { data: ids });
}

/**
 * 修改用户状态
 */
export function changeUserStatusApi(id: number, status: number) {
  return requestClient.put<boolean>(`/user/${id}/status`, null, {
    params: { status },
  });
}

/**
 * 重置用户密码
 */
export function resetUserPasswordApi(id: number, password: string) {
  return requestClient.put<boolean>(`/user/${id}/password`, null, {
    params: { password },
  });
}

/**
 * 获取当前用户信息
 */
export function getCurrentUserInfoApi() {
  return requestClient.get<UserApi.UserInfo>('/user/info');
}

/**
 * 获取部门列表
 */
export function getDeptListApi() {
  return requestClient.get<UserApi.DeptInfo[]>('/dept/list');
}

/**
 * 获取职位列表
 */
export function getPositionListApi() {
  return requestClient.get<UserApi.PositionInfo[]>('/position/list');
}
