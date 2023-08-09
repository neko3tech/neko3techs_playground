import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";

export default async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    console.log('req.body: ', req.body);
    await connectDB();
    await ItemModel.deleteOne({ _id: req.query.id }, req.body);

    return res.status(200).json({
      message: `アイテム削除成功`,
    })

  } catch (error) {
    return res.status(400).json({
      message: `アイテム削除失敗`,
      error: error,
    })
  }

};