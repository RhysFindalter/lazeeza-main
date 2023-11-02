/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const orderProduct = async (prodId) => {
  try {
    const stripe = Stripe("pk_test_51NzZ1iBhrogoX7CE5AujROkmYZTpM2VyMaDyookcDKXry8YxYDs2bhNdBt5VXnMR1gWPsgRH8lDIuYoJjwhw3BK900TH0VgeYa");
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/orders/checkout-session/${prodId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
