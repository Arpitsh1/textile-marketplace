const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addReview,
  getProductReviews,
} = require("../controllers/reviewController");

router.post("/", authMiddleware, addReview);
router.get("/:productId", getProductReviews);

module.exports = router;