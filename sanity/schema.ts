import { type SchemaTypeDefinition } from 'sanity'
import homeSchema from './schemas/home-schema'
import cookieConsent from './schemas/cookie-consent-schema'
import pricingSchema from './schemas/pricing-schema'
import pricingPlanSchema from './schemas/pricing-plan-schema'
import planDetailSchema from './schemas/plan-detail-schema'
import privacySchema from './schemas/privacy-schema'
import termsSchema from './schemas/terms-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homeSchema,
    cookieConsent,
    pricingSchema,
    pricingPlanSchema,
    planDetailSchema,
    privacySchema,
    termsSchema,
  ],
}
