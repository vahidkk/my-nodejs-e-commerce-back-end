const mongoose = require("mongoose");
const CustomError = require("../errors");

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: [String], required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  color: { type: String, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

OrderSchema.post("save", async function (next) {
  if (this.status === "paid") {
    for (const i of this.orderItems) {
      await this.model("Product")
        .findOne({ _id: i.product.toString() }, async function (err, item) {
          item.inventory = item.inventory - i.amount;

          try {
            if (item.inventory < 0) {
              throw new CustomError.BadRequestError(
                "This number of products is not available in our warehouse"
              );
            } else {
              await item.save();
            }
          } catch (err) {
            console.log(err);
          }
        })
        .clone();
    }
  }
});

module.exports = mongoose.model("Order", OrderSchema);
