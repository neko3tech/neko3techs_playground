import type { NextApiResponse } from "next";
import Jwt from "jsonwebtoken";
import { ExtendedNextApiRequestAuth, ResMessageType, DecodedType } from "./types";
const { JWT_SECRET } = process.env;


export default (handler: Function) => {
  return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {

    if (req.method === "GET") {
      return handler(req, res);
    }

    const token = await req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "トークンがありません",
      });
    }

    try {
      const decoded = Jwt.verify(token, JWT_SECRET);
      req.body.email = (decoded as DecodedType).email;

      return handler(req, res);

    } catch (error) {
      return res.status(401).json({
        message: "トークンが無効です",
        error: error.message,
      });
    }

  }
}