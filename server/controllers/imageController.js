import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;

    if (!prompt || !userId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Missing fields" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }

    if (user.creditBalance < 1) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Insufficient credits" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    console.log("ClipDrop API Key:", process.env.CLIPDROP_API_KEY);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    user.creditBalance -= 1;
    await user.save();

    res.json({
      statusCode: 200,
      message: "Image generated successfully",
      image: resultImage,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ statusCode: 500, message: "Server Error" });
  }
};
