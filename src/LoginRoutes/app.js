const Image = require("./ImageModel");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(morgan("dev"));

// MongoDB connection URI
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/upload64image", async (req, res) => {
  try {
    const imageString = req.body.image;
    const base64Data = imageString.split(",")[1];
    const imageUpload = await Image.create({
      filename: req.body.filename,
      data: base64Data,
    });

    await imageUpload.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getbase64image/:id", async (req, res) => {
  try {
    const image = await Image.find({ filename: req.params.id });
    res.status(200).json({ image: image[0].data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/loginwithbase64/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    const originalImage = await Image.find({ filename: id });
    if (originalImage) {
      const imageString = image.split(",")[1];

      const response = await axios.post("http://localhost:5000/compare-faces", {
        image1: originalImage,
        image2: imageString,
      });
      res.status(200).json(response.data);
    } else {
      console.error("Original image data not found");
      res.status(404).send("Original image data not found");
    }
  } catch (error) {
    console.error("Error in loginwithbase64:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
