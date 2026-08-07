const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create({
      product: req.body.productId,
      buyer: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("buyer", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};