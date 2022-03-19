const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
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
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};
module.exports = stripeController;
