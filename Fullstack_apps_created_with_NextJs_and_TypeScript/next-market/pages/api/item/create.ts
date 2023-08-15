import type { NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import auth from "../../../utils/auth";
import { ExtendedNextApiRequestItem, ResMessageType } from "../../../utils/types";

export default auth(async (req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    const data = await ItemModel.create(req.body);

    return res.status(200).json({
      message: `アイテム作成成功`,
      result: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `アイテム作成失敗`,
      error: error.message,
    })
  }

});
