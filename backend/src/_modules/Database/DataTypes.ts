export type User = {
  id: string,
  token: string,
  username: string,
  password: string,
  nickname: string, 
  cr: number,
  trw: number,
}

export type Publication = {
  id: number,
  user_id: string,
  title: string,
  description: string,
  price: number,
  currency: string,
  phone: string,
}

export type Review = {
  user_id: string,
  publication_id: number,
  title: string,
  body: string,
}
