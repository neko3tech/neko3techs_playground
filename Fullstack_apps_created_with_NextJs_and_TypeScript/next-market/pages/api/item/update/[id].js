import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";
import auth from "@/utils/auth";

export default auth(async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    console.log('req.body: ', req.body);
    await connectDB();
    await ItemModel.updateOne({ _id: req.query.id }, req.body);

    return res.status(200).json({
      message: `アイテム更新成功`,
    })

  } catch (error) {
    return res.status(400).json({
      message: `アイテム更新失敗`,
      error: error,
    })
  }

});