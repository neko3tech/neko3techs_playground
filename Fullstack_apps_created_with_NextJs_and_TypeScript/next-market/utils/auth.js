import Jwt from "jsonwebtoken";
import { config } from "dotenv";
const { JWT_SECRET } = config().parsed;

export default (handler) => {
  return async (req, res) => {

    if (req.method === "GET") {
      return handler(req, res);
    }

    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "トークンがありません",
      });
    }

    try {
      const decoded = Jwt.verify(token, JWT_SECRET);
      console.log('decoded: ', decoded);

      return handler(req, res);

    } catch (error) {
      return res.status(401).json({
        message: "トークンが無効です",
      });
    }

  }
}