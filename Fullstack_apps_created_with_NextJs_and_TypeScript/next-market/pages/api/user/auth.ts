import { NextApiResponse } from "next";
import Jwt from "jsonwebtoken";
import { ExtendedNextApiRequestAuth, ResMessageType, DecodedType } from "../../../utils/types";
const { JWT_SECRET } = process.env;

export default (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = Jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      message: `認証成功`,
      result: { email: (decoded as DecodedType).email },
    })

  } catch (error) {
    return res.status(401).json({
      message: `認証失敗`,
      result: undefined,
      error: error.message,
    })
  }

};
