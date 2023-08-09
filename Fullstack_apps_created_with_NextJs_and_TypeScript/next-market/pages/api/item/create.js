import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export default async (req, res) => {
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
      error: error
    })
  }

};
