/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../../../complete-node-bootcamp/4-natours/after-section-14/public/js/alerts';
const stripe = Stripe('pk_test_51INONCLhDuYD2o595b6oxBs54vksqkXcRI4vAOvx6G3rmJX818CaR6NB13F7ZIQlxnXvKZWbiFQNJL4hsJrkcYHC0026ehc4rs');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
