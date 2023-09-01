import { NextApiResponse } from "next";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";
import { ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType } from "../../../../utils/types";

export default auth(async (req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    const data: SavedItemDataType | null = await ItemModel.findById(req.query.id);

    if (!data)
      throw new Error("アイテムが存在しません");

    if (data.email !== req.body.email)
      throw new Error("アイテム作成者以外の削除はできません");

    const result = await ItemModel.deleteOne({ _id: req.query.id }, req.body);

    return res.status(200).json({
      message: `アイテム削除成功`,
      result: result,
    })

  } catch (error) {
    return res.status(400).json({
      message: `アイテム削除失敗`,
      error: error.message,
    })
  }

});