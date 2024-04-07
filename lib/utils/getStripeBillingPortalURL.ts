import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.TEST_MODE === 'true'
    ? process.env.STRIPE_TEST_SECRET_KEY!
    : process.env.STRIPE_SECRET_KEY!
)

export const getStripeBillingPortalURL = async (
  stripe_customer_id: string = ''
) => {
  const configuration = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: 'myDocQA',
      privacy_policy_url: `${process.env.DOMAIN_NAME}/privacy`,
      terms_of_service_url: `${process.env.DOMAIN_NAME}/terms`,
    },
    features: {
      payment_method_update: {
        enabled: true,
      },
      subscription_update: {
        enabled: true,
        default_allowed_updates: ['price'],
        products:
          process.env.TEST_MODE === 'true'
            ? [
                {
                  // Standard
                  product: 'prod_PngSLRVrZsKZAT',
                  prices: ['price_1Oy55mBcXbsAkNsi66ZtasRs'],
                },
                {
                  // Freemium
                  product: 'prod_PngRUODotUhaYo',
                  prices: ['price_1Oy554BcXbsAkNsiUcDzVPz9'],
                },
              ]
            : [
                {
                  // Premium
                  product: 'prod_PnfrRBsvCW37zt',
                  prices: ['price_1Oy4W1BcXbsAkNsiERM7Pbzb'],
                },
                {
                  // Standard
                  product: 'prod_PnfqQhqltM366e',
                  prices: ['price_1Oy4UkBcXbsAkNsiwi6yn40e'],
                },
                {
                  // Freemium
                  product: 'prod_PnfoLa6p7SfMIy',
                  prices: ['price_1Oy4SWBcXbsAkNsiEjP4Mofb'],
                },
              ],
      },
      subscription_cancel: {
        enabled: true,
      },
      invoice_history: {
        enabled: true,
      },
    },
  })

  const session = await stripe.billingPortal.sessions.create({
    configuration: configuration.id,
    customer: stripe_customer_id,
    return_url: `${process.env.DOMAIN_NAME}/dashboard/account`,
  })

  return session.url
}
