import { Endpoint } from "sfawd"

export const getPublication: Endpoint = {
  path: (pubid: number) => `/publication/${pubid}`,
  appPath: '/:pubid',
  type: 'GET',
}

export const getPublicationsWithLimit: Endpoint = {
  path: (limit: number) => `/publication/limit/${limit}`,
  appPath: '/limit/:limit',
  type: 'GET',
}

export const getPublicationsWithLimitAndOffset: Endpoint = {
  path: (limit: number, offset: number) => `/publication/limit/${limit}/offset/${offset}`,
  appPath: '/limit/:limit/offset/:offset',
  type: 'GET',
}

export const getPublicationsOfUser: Endpoint = {
  path: (userid) => `/publication/of/user/${userid}`,
  appPath: '/of/user/:userid',
  type: 'GET',
}

export const update: Endpoint = {
  path: () => '/publication/update',
  appPath: '/update',
  type: 'PATCH',
}
export const create: Endpoint = {
  path: () => '/publication/create',
  appPath: '/create',
  type: 'POST',
}

export const remove: Endpoint = {
  path: () => '/publication/delete',
  appPath: '/delete',
  type: 'DELETE',
}