import Stripe from "stripe";

// requests to API on /api/stripe

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const formatCartItemsForStripe = items => items.map((item) => {
  const img = item.image[0].asset._ref;
  const newImage = img
    .replace(
      "image-",
      `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`
    )
    .replace("-webp", ".webp");

  return {
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        images: [newImage],
      },
      unit_amount: item.price * 100,
    },
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
    },
    quantity: item.quantity,
  };
});

export default async function handler(
  req,
  res
) {
  if (req.method === "POST") {
    console.log("here ... POST");
    console.log("cartItems", req.body.cartItems);

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1L7Q4xI1ORSKu4Ml5Zlg21Qp" }, // FREE SHIPPING
          { shipping_rate: "shr_1L7Q5RI1ORSKu4MlbPaDLX8b" }, // FAST SHIPPING
        ],
        line_items: formatCartItemsForStripe(req.body.cartItems),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
