'use strict';
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const {name, total, items, stripeTokenId} = ctx.request.body;
    const {id, username} = ctx.state.user;
    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: 'usd',
      description: `Order ${new Date()} by ${username}`,
      source: stripeTokenId
    });

    const order = await strapi.services.order.create({name, total, items, user: id});
    return order;
  }
};
