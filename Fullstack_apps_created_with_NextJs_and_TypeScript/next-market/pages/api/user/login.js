import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemaModels";
import Jwt from "jsonwebtoken";
import { config } from "dotenv";
const { JWT_SECRET, JWT_LIMIT } = config().parsed;

export default async (req, res) => {
  try {
    await connectDB();
    const data = await UserModel.findOne({ email: req.body.email });

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
    console.log('token: ', token);

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