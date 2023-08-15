import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import { SavedItemDataType, ResSingleType } from "../../../utils/types";


export default async (req: NextApiRequest, res: NextApiResponse<ResSingleType>) => {
  try {
    await connectDB();
    const data: SavedItemDataType | null = await ItemModel.findById(req.query.id);

    if (!data)
      throw new Error("アイテムが存在しません");

    return res.status(200).json({
      message: `1件アイテム取得成功`,
      data: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `1件アイテム取得失敗`,
      error: error.message,
    })
  }

};