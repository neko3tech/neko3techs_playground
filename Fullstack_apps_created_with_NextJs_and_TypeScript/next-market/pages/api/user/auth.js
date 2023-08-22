import Jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export default (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = Jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      message: `認証成功`,
      result: decoded.email,
    })

  } catch (error) {
    return res.status(401).json({
      message: `認証失敗`,
      result: undefined,
      error: error.message,
    })
  }

};
