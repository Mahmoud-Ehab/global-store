import { Endpoint } from "../type";

export const getPublication: Endpoint = {
  path: (pubid: number) => `/publication/${pubid}`,
  expressPath: '/:pubid',
  type: 'GET',
}

export const getPublicationsWithLimit: Endpoint = {
  path: (limit: number) => `/publication/limit/${limit}`,
  expressPath: '/limit/:limit',
  type: 'GET',
}

export const getPublicationsWithLimitAndOffset: Endpoint = {
  path: (limit: number, offset: number) => `/publication/limit/${limit}/offset/${offset}`,
  expressPath: '/limit/:limit/offset/:offset',
  type: 'GET',
}

export const getPublicationsOfUser: Endpoint = {
  path: (userid) => `/publication/of/user/${userid}`,
  expressPath: '/of/user/:userid',
  type: 'GET',
}

export const update: Endpoint = {
  path: () => '/publication/update',
  expressPath: '/update',
  type: 'PATCH',
}
export const create: Endpoint = {
  path: () => '/publication/create',
  expressPath: '/create',
  type: 'POST',
}

export const remove: Endpoint = {
  path: () => '/publication/delete',
  expressPath: '/delete',
  type: 'DELETE',
}