import { type SchemaTypeDefinition } from 'sanity'
import siteMetadataSchema from './schemas/site-metadata-schema'
import homeSchema from './schemas/home-schema'
import cookieConsent from './schemas/cookie-consent-schema'
import pricingSchema from './schemas/pricing-schema'
import pricingPlanSchema from './schemas/pricing-plan-schema'
import planDetailSchema from './schemas/plan-detail-schema'
import privacySchema from './schemas/privacy-schema'
import termsSchema from './schemas/terms-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteMetadataSchema,
    homeSchema,
    cookieConsent,
    pricingSchema,
    pricingPlanSchema,
    planDetailSchema,
    privacySchema,
    termsSchema,
  ],
}
