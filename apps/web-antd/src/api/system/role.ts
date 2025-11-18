import { requestClient } from '#/api/request';

export namespace RoleApi {
  /** 角色创建参数 */
  export interface RoleCreateParams {
    roleCode: string;
    roleName: string;
    description?: string;
    orderNum?: number;
  }

  /** 角色更新参数 */
  export interface RoleUpdateParams extends RoleCreateParams {
    id: number;
    status?: number;
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
    updateTime: string;
  }

  /** 菜单信息 */
  export interface MenuInfo {
    id: string;
    parentId: string;
    name: string;
    path?: string;
    component?: string;
    menuType: number;
    permissionCode?: string;
    icon?: string;
    title?: string;
    orderNo: number;
    hideMenu: boolean;
    ignoreKeepAlive: boolean;
    affix: boolean;
    status: number;
    children?: MenuInfo[];
  }
}

/**
 * 查询角色列表
 */
export function getRoleListApi() {
  return requestClient.get<RoleApi.RoleInfo[]>('/role/list');
}

/**
 * 查询启用角色列表
 */
export function getEnabledRoleListApi() {
  return requestClient.get<RoleApi.RoleInfo[]>('/role/enabled');
}

/**
 * 获取角色详情
 */
export function getRoleDetailApi(id: number) {
  return requestClient.get<RoleApi.RoleInfo>(`/role/${id}`);
}

/**
 * 创建角色
 */
export function createRoleApi(params: RoleApi.RoleCreateParams) {
  return requestClient.post<number>('/role', params);
}

/**
 * 更新角色
 */
export function updateRoleApi(params: RoleApi.RoleUpdateParams) {
  return requestClient.put<boolean>('/role', params);
}

/**
 * 删除角色
 */
export function deleteRoleApi(id: number) {
  return requestClient.delete<boolean>(`/role/${id}`);
}

/**
 * 分配角色菜单权限
 */
export function assignRoleMenusApi(id: number, menuIds: number[]) {
  return requestClient.put<boolean>(`/role/${id}/menus`, menuIds);
}

/**
 * 获取角色菜单权限
 */
export function getRoleMenusApi(id: number) {
  return requestClient.get<number[]>(`/role/${id}/menus`);
}
