import { Response } from "../Storage/Response"

export const Done = (metadata?: object): Response => ({
  code: 200,
  message: "query fulfilled.", 
  metadata,
})

export const Authenticated = (token: string): Response => ({
  code: 200,
  message: "authentication failed.", 
  metadata: {
    auth: true,
    token
  }
})

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

export const InvalidToken: Response = {
  code: 403,
  message: "You have used an invalid token. Try signing in again"
}

export const NotFound: Response = {
  code: 404,
  message: "requested resource not found.",
}

export const AlreadyExists: Response = {
  code: 409,
  message: "Entry already exists.", 
}

export const InteranlError: Response = {
  code: 500,
  message: "Internal error.", 
}
