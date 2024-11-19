import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "Authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.userId = decoded.id; // It's better to attach to req.userId instead of req.body
    } else {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Authorization denied" });
    }

    next();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ statusCode: 500, message: "Server Error" });
  }
};

export default userAuth;
