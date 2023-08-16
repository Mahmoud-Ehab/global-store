import { Endpoint } from "sfawd"

export const getReview: Endpoint = {
  path: (pubid, userid) => `/review/of/publication/${pubid}/of/user/${userid}`,
  appPath: "/of/publication/:pubid/of/user/:userid",
  type: "GET"
}

export const getReviewsOfPublication: Endpoint = {
  path: (pubid) => `/review/of/publication/${pubid}`,
  appPath: "/of/publication/:pubid",
  type: "GET"
}

export const getReviewsOfUser: Endpoint = {
  path: (userid) => `/review/of/user/${userid}`,
  appPath: "/of/user/:userid",
  type: "GET"
}

export const create: Endpoint = {
  path: () => `/review/create`,
  appPath: "/create",
  type: "POST"
}

export const update: Endpoint = {
  path: () => `/review/update`,
  appPath: "/update",
  type: "PATCH"
}

export const remove: Endpoint = {
  path: () => `/review/delete`,
  appPath: "/delete",
  type: "DELETE"
}