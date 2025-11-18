import { requestClient } from '#/api/request';

export namespace MenuApi {
  /** 菜单创建参数 */
  export interface MenuCreateParams {
    parentId: number;
    name: string;
    path?: string;
    component?: string;
    redirect?: string;
    menuType: number;
    permissionCode?: string;
    icon?: string;
    title?: string;
    orderNo?: number;
    hideMenu?: boolean;
    ignoreKeepAlive?: boolean;
    affix?: boolean;
  }

  /** 菜单更新参数 */
  export interface MenuUpdateParams extends MenuCreateParams {
    id: number;
    status?: number;
  }

  /** 菜单信息 */
  export interface MenuInfo {
    id: string;
    parentId: string;
    name: string;
    path?: string;
    component?: string;
    redirect?: string;
    menuType: number;
    permissionCode?: string;
    icon?: string;
    title?: string;
    orderNo: number;
    hideMenu: boolean;
    ignoreKeepAlive: boolean;
    affix: boolean;
    status: number;
    createTime: string;
    updateTime: string;
    children?: MenuInfo[];
  }

  /** 按钮权限信息 */
  export interface ButtonPermission {
    id: string;
    name: string;
    code: string;
    description?: string;
  }
}

/**
 * 获取菜单树
 */
export function getMenuTreeApi() {
  return requestClient.get<MenuApi.MenuInfo[]>('/menu/tree');
}

/**
 * 获取用户菜单树
 */
export function getUserMenuTreeApi() {
  return requestClient.get<MenuApi.MenuInfo[]>('/menu/user-tree');
}

/**
 * 获取菜单详情
 */
export function getMenuDetailApi(id: number) {
  return requestClient.get<MenuApi.MenuInfo>(`/menu/${id}`);
}

/**
 * 创建菜单
 */
export function createMenuApi(params: MenuApi.MenuCreateParams) {
  return requestClient.post<number>('/menu', params);
}

/**
 * 更新菜单
 */
export function updateMenuApi(params: MenuApi.MenuUpdateParams) {
  return requestClient.put<boolean>('/menu', params);
}

/**
 * 删除菜单
 */
export function deleteMenuApi(id: number) {
  return requestClient.delete<boolean>(`/menu/${id}`);
}

/**
 * 获取按钮权限列表
 */
export function getButtonPermissionsApi() {
  return requestClient.get<MenuApi.ButtonPermission[]>('/menu/buttons');
}
