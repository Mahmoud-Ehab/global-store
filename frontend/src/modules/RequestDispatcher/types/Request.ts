export type Request = {
  url: (...param: any) => string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body: Object
}
