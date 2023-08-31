import type { NextApiRequest } from "next";
import { Types } from "mongoose";

//#region utils
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
//#endregion utils


//#region user
// create.ts, login.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
  body: UserDataType
}

export interface SavedUserDataType extends UserDataType {
  _id: Types.ObjectId,
}
//#endregion user


//#region item
// readall.ts
export interface ResReadAllType {
  message: string,
  data?: SavedItemDataType[],
  error?: string,
}

// readall.ts
export interface SavedItemDataType extends ItemDataType {
  _id: Types.ObjectId,
}

// create.ts
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType,
}

// [id].ts
export interface ResSingleType {
  message: string,
  data?: SavedItemDataType,
  error?: string,
}

//// Frontend
// // [id].ts
export interface SingleDataType {
  data: {
    _id: string,
    title: string,
    image: string,
    price: string,
    description: string,
    email: string,
  }
}
//#endregion item


//#region Common
export interface ResMessageType {
  message: string,
  token?: string,
  result?: object,
  error?: string,
}
//#endregion Common