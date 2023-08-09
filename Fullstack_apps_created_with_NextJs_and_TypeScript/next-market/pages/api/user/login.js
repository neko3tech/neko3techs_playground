import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemaModels";

export default async (req, res) => {
  try {
    await connectDB();
    const data = await UserModel.findOne({ email: req.body.email });

    if (!data || data.password !== req.body.password) {
      throw new Error("ユーザー情報がありません");
    }

    return res.status(200).json({
      message: `ログイン成功`,
      result: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `ログイン失敗`,
      error: error
    })
  }

};