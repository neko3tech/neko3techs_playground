import { NextApiRequest } from "next";

// schemaModels.ts
export interface ItemDataType {
  title: string,
  image: string,
  price: string,
  description: string,
  email: string,
}

export interface UserDataType {
  name: string,
  email: string,
  password: string,
}


// auth.ts
export interface DecodedType {
  email: string,
}

export interface ExtendedNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string,
  },
  body: {
    email: string,
  },
}


// Common
export interface ResMessageType {
  message: string,
  error?: string,
}
