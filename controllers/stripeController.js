const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePaymentController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  if (!purchase || !total_amount || !shipping_fee) {
    throw new CustomError.BadRequestError("Check the cart variables.");
  }
  const calculateOrderAmount = () => {
    //I should change it to iterate over item IDs to check if the amounts are real and is not a fake purchase. to be implemented later...
    return total_amount + shipping_fee;
  };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(StatusCodes.CREATED).json({
    clientSecret: paymentIntent.client_secret,
  });
};
module.exports = { stripePaymentController };
