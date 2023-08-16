import { Endpoint } from "sfawd"

export const getUser: Endpoint = {
  path: (id) => `/user/${id}`,
  appPath: '/:userid',
  type: 'GET'
}

export const getUsersLimit: Endpoint = {
  path: (limit: number) => `/user/limit/${limit}`,
  appPath: '/limit/:limit',
  type: 'GET'
}

export const login: Endpoint = {
  path: () => `/user/login`,
  appPath: '/login',
  type: 'POST'
}

export const register: Endpoint = {
  path: () => `/user/register`,
  appPath: '/register',
  type: 'POST'
}

export const update: Endpoint = {
  path: (limit: number) => `/user/update`,
  appPath: '/update',
  type: 'PATCH'
}

export const remove: Endpoint = {
  path: () => `/user/delete`,
  appPath: '/delete',
  type: 'DELETE'
}