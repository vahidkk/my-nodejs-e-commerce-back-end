const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: [String],
      default: ["/sample.png"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: [
        "Baby Products",
        "Beauty",
        "Books",
        "Camera",
        "Cell Phones",
        "Electronics",
        "Fine Art",
        "Grocery & Gourmet Foods",
        "Health & Personal Care",
        "Home & Garden",
        "Independent Design",
        "Major Appliances",
        "Music and DVD",
        "Musical Instruments",
        "Office Products",
        "Outdoors",
        "Personal Computers",
        "Software",
        "Sports",
        "Tools",
        "Toys & Games",
        "Video Games",
        "Watches",
        "Stationery ",
      ],
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide producer company name"],
      maxlength: [50, "Company can not be more than 50 characters"],
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});
module.exports = mongoose.model("Product", ProductSchema);
