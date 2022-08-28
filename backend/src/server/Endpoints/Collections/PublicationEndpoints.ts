import { Endpoint } from "../type";

export const getPublication: Endpoint = {
  path: (pubid: number) => `/publication/${pubid}`,
  expressPath: '/:pubid',
  type: 'GET',
}

export const getPublicationsOfUser: Endpoint = {
  path: (userid: number) => `/publication/of/user/${userid}`,
  expressPath: '/of/user/:userid',
  type: 'GET',
}

export const create: Endpoint = {
  path: () => '/publication/create',
  expressPath: '/create',
  type: 'POST',
}

export const deletePublicaiton: Endpoint = {
  path: () => '/publication/delete',
  expressPath: '/delete',
  type: 'DELETE',
}