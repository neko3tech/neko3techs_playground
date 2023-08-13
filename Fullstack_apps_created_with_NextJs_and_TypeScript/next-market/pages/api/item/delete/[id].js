import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";
import auth from "@/utils/auth";

export default auth(async (req, res) => {
  try {
    console.log('req.query: ', req.query);
    console.log('req.body: ', req.body);

    await connectDB();
    const { email } = await ItemModel.findById(req.query.id);

    if (email !== req.body.email) {
      throw new Error("アイテム作成者以外の削除はできません");
    }

    const result = await ItemModel.updateOne({ _id: req.query.id }, req.body);
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