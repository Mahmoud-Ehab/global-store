import { Endpoint } from "../../_modules/Server/Types/Endpoint"

export const getReview: Endpoint = {
  path: (pubid, userid) => `/review/of/publication/${pubid}/of/user/${userid}`,
  expressPath: "/of/publication/:pubid/of/user/:userid",
  type: "GET"
}

export const getReviewsOfPublication: Endpoint = {
  path: (pubid) => `/review/of/publication/${pubid}`,
  expressPath: "/of/publication/:pubid",
  type: "GET"
}

export const getReviewsOfUser: Endpoint = {
  path: (userid) => `/review/of/user/${userid}`,
  expressPath: "/of/user/:userid",
  type: "GET"
}

export const create: Endpoint = {
  path: () => `/review/create`,
  expressPath: "/create",
  type: "POST"
}

export const update: Endpoint = {
  path: () => `/review/update`,
  expressPath: "/update",
  type: "PATCH"
}

export const remove: Endpoint = {
  path: () => `/review/delete`,
  expressPath: "/delete",
  type: "DELETE"
}