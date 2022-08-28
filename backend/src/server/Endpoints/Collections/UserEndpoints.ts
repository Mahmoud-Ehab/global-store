import { Endpoint } from "../type";

export const getUser: Endpoint = {
  path: (id) => `/user/${id}`,
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

export const update: Endpoint = {
  path: (limit: number) => `/user/update`,
  expressPath: '/update',
  type: 'PATCH'
}

export const remove: Endpoint = {
  path: () => `/user/delete`,
  expressPath: '/delete',
  type: 'DELETE'
}