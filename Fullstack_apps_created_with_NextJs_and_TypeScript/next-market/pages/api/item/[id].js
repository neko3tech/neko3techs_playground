import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export default async (req, res) => {
  try {
    console.log('req: ', req.query);
    await connectDB();
    const data = await ItemModel.findById(req.query.id);

    return res.status(200).json({
      message: `1件アイテム取得成功`,
      data: data,
    })

  } catch (error) {
    return res.status(400).json({
      message: `1件アイテム取得失敗？？？`,
      error: error,
    })
  }

};