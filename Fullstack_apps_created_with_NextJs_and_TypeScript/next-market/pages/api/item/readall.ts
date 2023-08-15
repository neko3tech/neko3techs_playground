import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import { SavedItemDataType, ResReadAllType } from "../../../utils/types";

export default async (req: NextApiRequest, res: NextApiResponse<ResReadAllType>) => {
  try {
    await connectDB();
    const data: SavedItemDataType[] | null = await ItemModel.find();

    return res.status(200).json({
      message: `全件アイテム取得成功`,
      data: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `全件アイテム取得失敗`,
      error: error.message,
    })
  }

};