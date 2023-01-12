const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

// dotenv.config({ path: "config.env" });
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://suchith:EV5GYUy4MpYk2!2@cluster0.2ejxvg2.mongodb.net/food",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
