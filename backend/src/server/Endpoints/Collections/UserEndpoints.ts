import { Endpoint } from "../type";

export const getUser: Endpoint = {
  path: (id: number) => `/user/${id}`,
  expressPath: '/:userid',
  type: 'GET'
}

export const getUsersLimit: Endpoint = {
  path: (limit: number) => `/user/limit/${limit}`,
  expressPath: '/limit/:limit',
  type: 'GET'
}

export const login: Endpoint = {
  path: () => `/user/login`,
  expressPath: '/login',
  type: 'POST'
}

export const register: Endpoint = {
  path: () => `/user/register`,
  expressPath: '/register',
  type: 'POST'
}

export const deleteUser: Endpoint = {
  path: () => `/user/delete`,
  expressPath: '/delete',
  type: 'DELETE'
}

export const updateUser: Endpoint = {
  path: (limit: number) => `/user/update`,
  expressPath: '/update',
  type: 'PATCH'
}
