import type { NextApiResponse } from "next";
import { ExtendedNextApiRequestUser, ResMessageType, SavedUserDataType } from "../../../utils/types";

import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import Jwt from "jsonwebtoken";
const { JWT_SECRET, JWT_LIMIT } = process.env;

export default async (req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    const data: SavedUserDataType | null = await UserModel.findOne({ email: req.body.email });

    if (!data || data.password !== req.body.password) {
      throw new Error("ユーザー情報がありません");
    }

    const token = Jwt.sign({
      email: req.body.email
    },
      JWT_SECRET,
      {
        expiresIn: JWT_LIMIT
      })

    return res.status(200).json({
      message: `ログイン成功`,
      result: data,
      token: token,
    })

  } catch (error) {
    return res.status(400).json({
      message: `ログイン失敗`,
      error: error.message,
    })
  }

};