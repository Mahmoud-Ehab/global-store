
type Response = {
  code: number,
  message: string,
  metadata?: object,
}

export const Done = (metadata?: object) => ({
  code: 200,
  message: "query fulfilled.", 
  metadata,
})

export const Authenticated: Response = {
  code: 200,
  message: "authenticated.", 
  metadata: {
    auth: true
  }
}

export const BadRequest: Response = {
  code: 400,
  message: "The request cannot be fulfilled, the request data is insufficient or wrong.", 
}

export const AuthenticationFailed: Response = {
  code: 401,
  message: "authentication failed.", 
  metadata: {
    auth: false
  }
}

export const NotFound: Response = {
  code: 404,
  message: "requested resource not found.",
}

export const DBError = (code: number) => {
  if (code == 23505) return {
    code: 409,
    message: "Entry already exists.", 
  }
  else return {
    code: 500,
    message: "Internal error in the database.",
    metadata: {
      dbcode: code,
    }
  }
}

