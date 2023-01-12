const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

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

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
