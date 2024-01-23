import { type SchemaTypeDefinition } from 'sanity'
import homeSchema from './schemas/home-schema'
import pricingSchema from './schemas/pricing-schema'
import pricingPlanSchema from './schemas/pricing-plan-schema'
import planDetailSchema from './schemas/plan-detail-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homeSchema, pricingSchema, pricingPlanSchema, planDetailSchema],
}
