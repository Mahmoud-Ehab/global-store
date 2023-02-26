export type Request = {
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body: Object
}
