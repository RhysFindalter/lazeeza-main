const Stripe = require("stripe");
const catchAsync = require("../utils/catchAsync");
const Product = require("../modles/productModel");
const handlerFactory = require("./handlerFactory");
const AppError = require("./../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  // 1) Get the currently ordered product
  const product = await Product.findById(req.params.prodId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    customer_email: req.user.email,
    client_reference_id: req.params.prodId,

    line_items: [
      {
        price_data: {
          currency: "nzd",
          product_data: {
            name: `${product.name} Tour`,
            description: product.summary,
          },
          unit_amount: product.sellingPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/jewellery/${
      product.slug
    }`,
  });

  // 3) Send to client
  res.status(200).json({
    status: "success",
    session,
  });
});
