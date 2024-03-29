import type { NextApiResponse } from "next";
import { ExtendedNextApiRequestUser, ResMessageType } from "../../../utils/types";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

export default async (req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    const data = await UserModel.create(req.body);

    return res.status(200).json({
      message: `ユーザー作成成功`,
      result: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `ユーザー作成失敗`,
      error: error
    })
  }

};
