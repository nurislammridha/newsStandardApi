const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  const { categoryName } = req.body;
  try {
    let catName = await Category.findOne({ categoryName });
    //see if user exists
    if (catName) {
      return res.status(400).json({ msg: "Category already exist" });
    }
    category = new Category({ categoryName });
    await category.save();
    res.json("Category inserted succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Category
router.get("/", async (req, res) => {
  try {
    await Category.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was inserted successfully!",
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Category By ID
router.get("/:id", async (req, res) => {
  await Category.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Todo was inserted successfully!",
      });
    }
  });
});

//Update Category
router.put("/:id", async (req, res) => {
  await Category.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Category were updated successfully!",
        });
      }
    }
  );
});

//delete category
router.delete("/:id", async (req, res) => {
  await Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Category was deleted successfully!",
      });
    }
  });
});
module.exports = router;